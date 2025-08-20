  import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './RecommendedListingStyles';
import CafeCard from '../../../../../components/CafeCard/CafeCard';
import { useNavigation } from '@react-navigation/native';

const RecommendedListing = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation()

  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.sectionTitile}>Recommended for you</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.rowBetweenCenter}>
          <Image
            source={require('../../../../../assets/images/leftArrow.png')}
            style={styles.viewAllIcon}
          />
          <Text style={styles.viewAllText}> Go back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cafeCardsOutline}>
        <CafeCard
            cafeName="The Cozy Corner"
            cafeAddress="42nd Main, Sector 2, 12th Cross Road Whitefield"
            cafeImage={require('../../../../../assets/images/cafe-image-rec.png')}
            isFavorite={true}
          />
        <CafeCard
            cafeName="The Cozy Corner"
            cafeAddress="42nd Main, Sector 2, 12th Cross Road Whitefield"
            cafeImage={require('../../../../../assets/images/cafe-image-rec.png')}
            isFavorite={true}
          />
        <CafeCard
            cafeName="The Cozy Corner"
            cafeAddress="42nd Main, Sector 2, 12th Cross Road Whitefield"
            cafeImage={require('../../../../../assets/images/cafe-image-rec.png')}
            isFavorite={true}
          />
         
      </View>
    </View>
  );
};

export default RecommendedListing;
