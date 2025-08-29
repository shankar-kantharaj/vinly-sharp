import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './ExploreCafeSpacesStyles';
import CafeCard from '../../../../../components/CafeCard/CafeCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { CafeDataType } from '../../../../../api/auth/main/safety-types';
import {
  getCafeList,
  getCafeListBySelectedFilters,
} from '../../../../../api/auth/main/cafesApi'; 

const ExploreCafeSpaces = () => {
  const dispatch = useDispatch();  
  const width = Dimensions.get('window').width;
  const { cafeList, cafeListBySelectedFilters } = useSelector((state: RootState) => state.cafes);
  const { userLocation } = useSelector((state: RootState) => state.userDetails);
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  
  // Determine which data source to use based on filters
  const hasFilters = filterDataByUser && Object.keys(filterDataByUser).length > 0;
  const currentCafeData = hasFilters ? cafeListBySelectedFilters : cafeList;
  const cafeListData = currentCafeData?.data;
  const cafeListPagination = currentCafeData?.pagination;
 
  // Simplified state
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  console.log('Current cafe data:', currentCafeData);
  console.log('Has filters:', hasFilters);
  console.log('Filter data:', filterDataByUser);

  // Monitor cafeList changes to detect when API response comes back
  useEffect(() => {
    if (cafeListData?.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
      setLoading(false);
    }
    
    // Update loading state when new data arrives
    if (cafeListData?.length > 0 && loading) {
      setLoading(false);
    }
  }, [cafeListData, isInitialLoad, loading]);

  // API call function that chooses the right endpoint
  const fetchCafes = async (page: number = 0, limit: number = 20) => {
    if (hasFilters) {
      await getCafeListBySelectedFilters(
        filterDataByUser,
        userLocation,
        page,
        limit,
        dispatch
      );
    } else {
      await getCafeList(
        userLocation.latitude,
        userLocation.longitude,
        page,
        limit,
        dispatch
      );
    }
  };

  // Initial API call
  useEffect(() => {
    const apiCallForGettingCafeList = async () => {
      setLoading(true);
      setIsInitialLoad(true);
      try {
        await fetchCafes(0, 20);
        setLimit(20);
      } catch (error) {
        console.error('Error fetching initial cafe list:', error);
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    apiCallForGettingCafeList();
  }, []);

  // Watch for filter changes
  useEffect(() => {
    const handleFilterChange = async () => {
      setLoading(true);
      setIsInitialLoad(true);
      try {
        await fetchCafes(0, 20);
        setLimit(20);
      } catch (error) {
        console.error('Error fetching filtered cafe list:', error);
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    // Only call if not initial load to avoid double API calls
    if (!isInitialLoad) {
      handleFilterChange();
    }
  }, [filterDataByUser]);

  // Load more data function
  const loadMoreData = async () => {
    if (loading || !cafeListPagination?.hasNextPage) return;

    setLoading(true);
    const newLimit = limit + 20;
    
    try {
      await fetchCafes(0, newLimit);
      setLimit(newLimit);
    } catch (error) {
      console.error('Error loading more cafes:', error);
      setLoading(false);
    }
  };

  // Handle end reached - use API pagination data
  const handleEndReached = () => {
    if (cafeListPagination?.hasNextPage && !loading) {
      console.log('started fetching more data');
      loadMoreData();
    } else {
      console.log('No more data to load or already loading', cafeListPagination?.hasNextPage, loading);
    }
  };

  // Render footer with loading indicator - only show if there's more data
  const renderFooter = () => {
    if (!loading || !cafeListPagination?.hasNextPage) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#E4DAD7" />
        <Text style={styles.loadingText}>Loading more cafes...</Text>
      </View>
    );
  };
 
  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.sectionTitile}>Explore cafe spaces</Text>
          <Text style={styles.sectionSecAddress}>
            {cafeListPagination?.totalElements || 0} Music experience near you
            {hasFilters && <Text style={styles.sectionSecAddress}> (Filtered)</Text>}
          </Text>
        </View>
      </View>
      
      <View>
        {isInitialLoad ? (
          <View style={styles.initialLoader}>
            <ActivityIndicator size="large" color="#E4DAD7" />
            <Text style={styles.loadingText}>
              {hasFilters ? 'Loading filtered cafes...' : 'Loading cafes...'}
            </Text>
          </View>
        ) : (
          <FlatList
            scrollEnabled
            data={cafeListData || []}
            renderItem={({ item }: { item: CafeDataType }) => {
              return (
                <CafeCard
                  cafeName={item?.cafeName}
                  cafeAddress={item?.address}
                  cafeImage={require('../../../../../assets/images/cafe-image-rec.png')}
                  isFavorite={true}
                />
              );
            }}
            ListEmptyComponent={
              <Text style={styles.noCafeText}>
                {hasFilters ? 'No cafes found with selected filters' : 'No cafes found'}
              </Text>
            }
            ListFooterComponent={renderFooter}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default ExploreCafeSpaces;
