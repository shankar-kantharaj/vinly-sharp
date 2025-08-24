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
import { styles } from './RecommendedListingStyles';
import CafeCard from '../../../../../components/CafeCard/CafeCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { getRecommendedCafesByLocationFilters } from '../../../../../api/auth/main/cafesApi';
import { CafeDataType } from '../../../../../api/auth/main/safety-types';

const RecommendedListing = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userLocation } = useSelector((state: RootState) => state.userDetails);
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  const { cafeList, recommendedCafesByLocationFilters } = useSelector(
    (state: RootState) => state.cafes,
  );

  useEffect(() => {
    const apiCallToGetCafesByLocationFilters = async () => {
      if (Object.keys(filterDataByUser).length === 0) {
        return;
      }
      const requestBody = {
        ...userLocation,
        filter: filterDataByUser,
        limit: 10,
      };
      await getRecommendedCafesByLocationFilters(requestBody, dispatch);
    };
    apiCallToGetCafesByLocationFilters();
    return () => {};
  }, [filterDataByUser]);

  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.sectionTitile}>
            Recommended for you{recommendedCafesByLocationFilters.length}{' '}
          </Text>
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
      <FlatList
        scrollEnabled={true}
        ListEmptyComponent={<Text>No recommended cafes found.</Text>}
        data={
          recommendedCafesByLocationFilters &&
          recommendedCafesByLocationFilters.length > 0
            ? recommendedCafesByLocationFilters
            : cafeList
        }
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cafeCardsOutline}
        renderItem={({ item }: { item: CafeDataType }) => (
          <CafeCard
            cafeName={item.cafe_name}
            cafeAddress={item.address}
            cafeImage={require('../../../../../assets/images/cafe-image.png')}
            isFavorite={true}
          />
        )}
      />
    </View>
  );
};

export default RecommendedListing;
