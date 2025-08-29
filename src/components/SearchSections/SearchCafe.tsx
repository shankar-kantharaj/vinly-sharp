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
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CafeCard from '../CafeCard/CafeCard';
import { isAndroid } from '../../constants/variables';
import { futura } from '../../constants/fonts_exports';
import {
  getCafeListBySearch,
  getRecommendations,
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
  const { recommendations, cafeListBySearch } = useSelector(
    (state: RootState) => state.cafes,
  );

  const recommendationsData = recommendations?.data || [];
  const recommendationsPagination = recommendations?.pagination || {};

  const cafeListBySearchData = cafeListBySearch?.data || [];
  const cafeListBySearchPagination = cafeListBySearch?.pagination || {};

  // Determine current data source based on state
  const getCurrentDataSource = () => {
    if (hasSearched) {
      return cafeListBySearchData;
    } else {
      return recommendationsData;
    }
  };

  // API call for recommended cafes when component mounts
  useEffect(() => {
    const apiCallToGetRecommendations = async () => {
      await getRecommendations(
        userLocation.latitude,
        userLocation.longitude,
        0,
        20,
        dispatch,
      );
    };
    apiCallToGetRecommendations();
  }, []);

  // Auto search when user types more than 2 characters
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          await getCafeListBySearch(searchQuery.trim(), userLocation, dispatch);
          setHasSearched(true);
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else if (searchQuery.trim().length === 0) {
        // If search is cleared, go back to recommendations
        setHasSearched(false);
      }
    };

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(performSearch, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, userLocation, dispatch]);

  // Filter data based on search query and current data source (local filtering)
  useEffect(() => {
    const currentData = getCurrentDataSource();
    setFilteredData(currentData);
  }, [recommendations, cafeListBySearch, hasSearched]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    navigation.goBack();
  };

  // Handle search input change
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  // Get appropriate heading based on current state
  const getHeading = () => {
    if (hasSearched && searchQuery.trim().length > 2) {
      return `Search results for "${searchQuery}"`;
    } else {
      return 'Cafes you may like';
    }
  };

  // Get appropriate empty message based on current state
  const getEmptyMessage = () => {
    if (hasSearched && searchQuery.trim().length > 2) {
      return `No cafes found for "${searchQuery}".`;
    } else {
      return 'No cafes available.';
    }
  };

  return (
    <View style={styles.fill}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.fill}
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
                placeholder="Search by cafe name"
                value={searchQuery}
                returnKeyType="search"
                onChangeText={handleSearchInputChange}
              />
            </View>
          </View>
        </SafeAreaView>

        <Text style={styles.searchResultHeading}>{getHeading()}</Text>

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          } 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          style={styles.flatListStyle}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.noCafeText}>{getEmptyMessage()}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <CafeCard
              cafeName={item?.cafeName}
              cafeAddress={item?.address}
              cafeImage={require('../../assets/images/cafe-image-rec.png')}
              isFavorite={item?.isFavorite || false}
              distance={item?.distance || 0}
            />
          )}
        />
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
  flatListStyle: {
    backgroundColor: '#221F20CC',
    marginHorizontal: 12,
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  flatListContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  searchResultHeading: {
    color: '#e4dad7b5',
    fontFamily: futura.medium,
    fontSize: 17,
    marginTop: 15,
    marginLeft: 17,
    marginBottom: 5,
  },
  noCafeText: {
    color: 'white',
    fontFamily: futura.bold,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default SearchCafe;
