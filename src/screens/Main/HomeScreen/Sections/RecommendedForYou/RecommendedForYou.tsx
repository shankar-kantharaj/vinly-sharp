import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './RecommendedForYouStyles';
import RecommendationCard from '../../../../../components/RecommendationCard/RecommendationCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { CafeDataType } from '../../../../../api/auth/main/safety-types';
import { getRecommendedCafesByLocationFiltersSearches } from '../../../../../api/auth/main/cafesApi';

const RecommendedForYou = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userLocation } = useSelector((state: RootState) => state.userDetails );
  const { filterDataByUser } = useSelector((state: RootState) => state.filter );
  const { cafeList, recommendedCafesByLocationFiltersAndSearches } = useSelector((state: RootState) => state.cafes );
  useEffect(() => {
    const apiCallToGetCafesBySelectedFilters = async () => {
      if (Object.keys(filterDataByUser).length === 0) {
        return;
      } 
      const requestBody = {
        ...userLocation,
        filter: filterDataByUser,
        recent_searches: [],
        limit: 4,
      };
      await getRecommendedCafesByLocationFiltersSearches(requestBody, dispatch);
    };
    apiCallToGetCafesBySelectedFilters();
    return () => {};
  }, [filterDataByUser]);
  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <Text style={styles.sectionTitile}>Recommended for you</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RecommendedScreen' as never);
          }}
          style={styles.rowBetweenCenter}
        >
          <Text style={styles.viewAllText}>View all</Text>
          <Image
            source={require('../../../../../assets/images/rightArrow.png')}
            style={styles.viewAllIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardsOutline}>
        {(recommendedCafesByLocationFiltersAndSearches &&
        recommendedCafesByLocationFiltersAndSearches.length > 0
          ? recommendedCafesByLocationFiltersAndSearches
          : cafeList
        ).map((item: CafeDataType, index: number) => (
          <RecommendationCard
            key={index}
            cafeName={item.cafe_name}
            cafeAddress={item.address}
            cafeImage={require('../../../../../assets/images/cafe-image.png')}
            category={'Flagship'}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};

export default RecommendedForYou;
