import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CafeCard from '../CafeCard/CafeCard';
import { isAndroid } from '../../constants/variables';
import { futura } from '../../constants/fonts_exports';
import {
  getCafeListBySearch,
  getRecommendedCafesByLocationFiltersSearches,
} from '../../api/auth/main/cafesApi';
import { RootState } from '../../redux/store';

interface Props {
  navigation: any; // You can use proper navigation type from @react-navigation/native
}

function SearchCafe({ navigation }: Props) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Get data from Redux store
  const { userLocation } = useSelector((state: RootState) => state.userDetails);
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  const {
    cafeList,
    cafeListBySearch,
    recommendedCafesByLocationFiltersAndSearches,
  } = useSelector((state: RootState) => state.cafes);

  // Determine base data source
  const baseData = hasSearched
    ? cafeListBySearch
    : recommendedCafesByLocationFiltersAndSearches;

  // Handle search submission (API call)
  const handleSearchSubmit = async () => {
    if (searchQuery.trim().length > 0) {
      try {
        await getCafeListBySearch(searchQuery.trim(), userLocation, dispatch);
        setHasSearched(true);
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };
 

  // Filter data based on search query (local filtering)
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredData(baseData);
    } else {
      const filtered = baseData.filter(
        (cafe: any) =>
          cafe?.cafe_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cafe?.address?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, baseData, hasSearched]);

  useEffect(() => {
    const apiCallToGetCafesByLocationFiltersSearches = async () => {
      if (Object.keys(filterDataByUser).length === 0) {
        return;
      }
      const requestBody = {
        ...userLocation,
        filter: filterDataByUser,
        recent_searches: ['Cafes', 'Vinyl'],
        limit: 4,
      };
      await getRecommendedCafesByLocationFiltersSearches(requestBody, dispatch);
    };
    apiCallToGetCafesByLocationFiltersSearches();
    return () => {};
  }, [filterDataByUser]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    setFilteredData([]);
    navigation.goBack();
  };

  // Initialize filtered data when section mounts
  useEffect(() => {
    if (!hasSearched) {
      setFilteredData(cafeList);
    }
  }, [cafeList, hasSearched]);

  // Handle search input change
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length === 0 && hasSearched) {
      setHasSearched(false);
    }
  };

  return (
    <View style={styles.fill}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={styles.topArea}>
          <View style={styles.topBar}>
            <View style={styles.searchBarOutline}>
              <TouchableOpacity onPress={handleClearSearch}>
                <Image
                  source={require('../../assets/images/leftArrow.png')}
                  style={styles.leftArrowIcon}
                />
              </TouchableOpacity>
              <TextInput
                autoFocus
                style={styles.searchInput}
                placeholderTextColor={'#7A7778'}
                placeholder="Cafe, mood, location.."
                value={searchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearchSubmit}
                onChangeText={handleSearchInputChange}
              />
            </View>
          </View>
        </SafeAreaView>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchResultsOutline}>
            <Text style={styles.searchResultHeading}>
              {hasSearched ? 'Search results' : 'Recommendations'}
            </Text>
            <View style={styles.filteredItemsOutline}>
              {filteredData.length === 0 ? (
                <View style={{ width: '100%' }}>
                  <Text style={styles.noCafeText}>
                    {hasSearched
                      ? 'No cafes found for your search.'
                      : 'No cafes available.'}
                  </Text>
                </View>
              ) : (
                filteredData.map((cafe: any, index: number) => (
                  <CafeCard
                    key={index}
                    cafeName={cafe?.cafe_name}
                    cafeAddress={cafe?.address}
                    cafeImage={require('../../assets/images/cafe-image-rec.png')}
                    isFavorite={cafe?.isFavorite || false}
                  />
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#121111',
  },
  topArea: {
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  topBar: {},
  searchResultsOutline: {
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#221F20CC',
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '93%',
    paddingVertical: 10,
  },
  searchBarOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#221F20CC',
    borderRadius: 40,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: isAndroid ? 0 : 12,
  },
  leftArrowIcon: {
    height: 17,
    width: 17,
    resizeMode: 'cover',
    marginTop: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: futura.medium,
    marginTop: 5,
    color: 'white',
    fontSize: 15,
  },
  filteredItemsOutline: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  searchResultHeading: {
    color: '#e4dad7b5',
    fontFamily: futura.medium,
    fontSize: 17,
  },
  noCafeText: {
    color: 'white',
    fontFamily: futura.bold,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default SearchCafe;
