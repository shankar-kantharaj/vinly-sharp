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

  // Check if filterDataByUser has data (not initial empty state)
  const hasFilters = Object.keys(filterDataByUser).length > 0;

  // Determine current data source based on state
  const getCurrentDataSource = () => {
    if (hasSearched) {
      return cafeListBySearch;
    } else if (hasFilters) {
      return recommendedCafesByLocationFiltersAndSearches;
    } else {
      return cafeList;
    }
  };

  // API call for recommended cafes when filters change
  useEffect(() => {
    const apiCallToGetCafesByLocationFiltersSearches = async () => {
      if (hasFilters) {
        const requestBody = {
          ...userLocation,
          filter: filterDataByUser,
          recent_searches: ['Cafes', 'Vinyl'],
          limit: 4,
        };
        await getRecommendedCafesByLocationFiltersSearches(requestBody, dispatch);
      }
    };
    apiCallToGetCafesByLocationFiltersSearches();
  }, [filterDataByUser, hasFilters, userLocation]);

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

  // Filter data based on search query and current data source
  useEffect(() => {
    const currentData = getCurrentDataSource();
    
    if (searchQuery.trim().length === 0) {
      setFilteredData(currentData);
    } else {
      const filtered = currentData.filter(
        (cafe: any) =>
          cafe?.cafe_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cafe?.address?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, cafeList, recommendedCafesByLocationFiltersAndSearches, cafeListBySearch, hasSearched, hasFilters]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    navigation.goBack();
  };

  // Handle search input change
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length === 0 && hasSearched) {
      setHasSearched(false);
    }
  };

  // Get appropriate heading based on current state
  const getHeading = () => {
    if (hasSearched) {
      return 'Search results';
    } else if (hasFilters) {
      return 'Recommendations';
    } else {
      return 'Cafes you may like';
    }
  };

  // Get appropriate empty message based on current state
  const getEmptyMessage = () => {
    if (searchQuery.trim() !== '') {
      return 'No cafes found matching your search.';
    } else if (hasSearched) {
      return 'No cafes found for your search.';
    } else if (hasFilters) {
      return 'No recommendations available.';
    } else {
      return 'No cafes available.';
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
                placeholder="Search by cafe name..."
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
              {getHeading()}
            </Text>
            <View style={styles.filteredItemsOutline}>
              {filteredData.length === 0 ? (
                <View style={{ width: '100%' }}>
                  <Text style={styles.noCafeText}>
                    {getEmptyMessage()}
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
