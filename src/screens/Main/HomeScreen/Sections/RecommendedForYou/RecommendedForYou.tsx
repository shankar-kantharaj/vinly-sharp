import { 
  Image, 
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './RecommendedForYouStyles';
import RecommendationCard from '../../../../../components/CafeCard/RecommendationCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { CafeDataType } from '../../../../../api/auth/main/safety-types';
import { getRecommendations, getRecommendedCafesByLocationFilters } from '../../../../../api/auth/main/cafesApi';

const RecommendedForYou = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userLocation } = useSelector((state: RootState) => state.userDetails);
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  const { cafeList, recommendations } = useSelector(
    (state: RootState) => state.cafes,
  );

  const recommendationsData = recommendations?.data || [];
  const recommendationsPagination = recommendations?.pagination || {};
  useEffect(() => {
    const apiCallToGetRecommendations = async () => {
     
      await getRecommendations(userLocation.latitude, userLocation.longitude, 0, 20, dispatch);
    };
    apiCallToGetRecommendations();
    return () => {};
  }, []);
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
        {recommendationsData && recommendationsData.length > 0 ? (
          recommendationsData.slice(0, 4).map((item: CafeDataType, index: number) => (
            <RecommendationCard
              key={index}
              cafeName={item.cafeName}
              cafeAddress={item.address}
              cafeImage={require('../../../../../assets/images/cafe-image.png')}
              category={item.isFlagship ? 'Flagship' : ''}
              onPress={() => {}}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>There's no recommendations available</Text>
        )}
      </View>
    </View>
  );
};

export default RecommendedForYou;
