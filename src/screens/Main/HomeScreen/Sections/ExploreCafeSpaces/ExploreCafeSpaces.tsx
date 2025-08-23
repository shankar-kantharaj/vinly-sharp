import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
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
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  const width = Dimensions.get('window').width;
  const { cafeList, cafeListBySelectedFilters } = useSelector(
    (state: RootState) => state.cafes
  ); // Access user state
  useEffect(() => {
    const apiCallForGettingCafeList = async () => {
      await getCafeList(12.9716, 77.5946, dispatch);
    };

    apiCallForGettingCafeList();
  }, []);

  useEffect(() => {
    const apiCallToGetCafesBySelectedFilters = async () => {
      if (Object.keys(filterDataByUser).length === 0) {
        return;
      }
      console.log('Filter Data By User in Home Screen : ', filterDataByUser);
      await getCafeListBySelectedFilters(filterDataByUser, dispatch);
    };
    apiCallToGetCafesBySelectedFilters();
    return () => {};
  }, [filterDataByUser]);

  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.sectionTitile}>Explore cafe spaces</Text>
          <Text style={styles.sectionSecAddress}>
            1231 Music experience near you
          </Text>
        </View>
        <View style={styles.rowBetweenCenter}>
          <Text style={styles.viewAllText}>View all</Text>
          <Image
            source={require('../../../../../assets/images/rightArrow.png')}
            style={styles.viewAllIcon}
          />
        </View>
      </View>
      <View style={styles.cafeCardsOutline}>
        <FlatList
          scrollEnabled
          data={
            cafeListBySelectedFilters && cafeListBySelectedFilters.length > 0
              ? cafeListBySelectedFilters
              : cafeList
          }
          renderItem={({ item }: { item: CafeDataType }) => {
            return (
              <CafeCard
                cafeName={item?.cafe_name}
                cafeAddress={item?.address}
                cafeImage={require('../../../../../assets/images/cafe-image-rec.png')}
                isFavorite={true}
              />
            );
          }}
          ListEmptyComponent={<Text style={styles.noCafeText}>No cafes found</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ExploreCafeSpaces;
