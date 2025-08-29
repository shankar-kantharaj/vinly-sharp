import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './RecommendedListingStyles';
import CafeCard from '../../../../../components/CafeCard/CafeCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import {
  getRecommendations,
  getRecommendedCafesByLocationFilters,
} from '../../../../../api/auth/main/cafesApi';
import { CafeDataType } from '../../../../../api/auth/main/safety-types';

const RecommendedListing = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userLocation } = useSelector((state: RootState) => state.userDetails);
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  const { cafeList, recommendations } = useSelector(
    (state: RootState) => state.cafes,
  );

  const recommendationsData = recommendations?.data || [];
  const recommendationsPagination = recommendations?.pagination || {};

  // State for pagination
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Monitor recommendations changes to detect when API response comes back
  useEffect(() => {
    if (recommendationsData?.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
      setLoading(false);
    }
    
    // Update loading state when new data arrives
    if (recommendationsData?.length > 0 && loading) {
      setLoading(false);
    }
  }, [recommendationsData, isInitialLoad, loading]);
  
  // Initial API call
  useEffect(() => {
    const apiCallToGetRecommendations = async () => {
      setLoading(true);
      try {
        await getRecommendations(
          userLocation.latitude,
          userLocation.longitude,
          0,
          20,
          dispatch,
        );
        setLimit(20);
      } catch (error) {
        console.error('Error fetching initial recommendations:', error);
        setLoading(false);
        setIsInitialLoad(false);
      }
    };
    
    apiCallToGetRecommendations();
  }, []);

  // Load more data function
  const loadMoreData = async () => {
    if (loading || !recommendationsPagination?.hasNextPage) return;

    setLoading(true);
    const newLimit = limit + 20;
    
    try {
      await getRecommendations(
        userLocation.latitude,
        userLocation.longitude,
        0,
        newLimit,
        dispatch,
      );
      setLimit(newLimit);
    } catch (error) {
      console.error('Error loading more recommendations:', error);
      setLoading(false);
    }
  };

  // Handle end reached - use API pagination data
  const handleEndReached = () => {
    if (recommendationsPagination?.hasNextPage && !loading) {
      console.log('started fetching more recommendations');
      loadMoreData();
    } else {
      console.log('No more data to load or already loading', recommendationsPagination?.hasNextPage, loading);
    }
  };

  // Render footer with loading indicator - only show if there's more data
  const renderFooter = () => {
    if (!loading || !recommendationsPagination?.hasNextPage) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#E4DAD7" />
        <Text style={styles.loadingText}>Loading more recommendations...</Text>
      </View>
    );
  };

  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.sectionTitile}>Recommended for you</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.rowBetweenCenter}
        >
          <Image
            source={require('../../../../../assets/images/leftArrow.png')}
            style={styles.viewAllIcon}
          />
          <Text style={styles.viewAllText}> Go back</Text>
        </TouchableOpacity>
      </View>
      
      {isInitialLoad ? (
        <View style={styles.initialLoader}>
          <ActivityIndicator size="large" color="#E4DAD7" />
          <Text style={styles.loadingText}>Loading recommendations...</Text>
        </View>
      ) : (
        <FlatList
          scrollEnabled={true}
          data={recommendationsData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.cafeCardsOutline}
          renderItem={({ item }: { item: CafeDataType }) => (
            <CafeCard
              cafeName={item.cafeName}
              cafeAddress={item.address}
              cafeImage={require('../../../../../assets/images/cafe-image.png')}
              isFavorite={true}
            />
          )}
          ListEmptyComponent={<Text style={styles.noDataText}>No recommended cafes found.</Text>}
          ListFooterComponent={renderFooter}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default RecommendedListing;
