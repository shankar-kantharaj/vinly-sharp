import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './ExploreCafeSpacesStyles';
import CafeCard from '../../../../../components/CafeCard/CafeCard';

const ExploreCafeSpaces = () => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.sectionTitile}>Explore cafe spaces</Text>
          <Text style={styles.sectionSecAddress}>1231 Music experience near you</Text>
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

export default ExploreCafeSpaces;
