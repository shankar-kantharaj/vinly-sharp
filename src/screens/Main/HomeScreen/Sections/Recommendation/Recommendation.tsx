import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './RecommendationStyles';
import RecommendationCard from '../../../../../components/RecommendationCard/RecommendationCard';
import { useNavigation } from '@react-navigation/native';

const Recommendation = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation()
  interface recommendationDataType{
    name:string,
    address:string
  }
  const recommendationData = [
    {
      name: 'Brew & Chew',
      address: '42nd Main, Sector 2, 12th Cross Road Whitefield.',
    },
    {
      name: 'Brew & Bloom',
      address: '42nd Main, Sector 2, 12th Cross Road Whitefield.',
    },
    {
      name: 'Bean There, Done That',
      address: '42nd Main, Sector 2, 12th Cross Road Whitefield.',
    },
    {
      name: 'Aroma Oasis',
      address: '42nd Main, Sector 2, 12th Cross Road Whitefield.',
    },
  ];
  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <Text style={styles.sectionTitile}>Recommended for you</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('RecommendedScreen' as never)}} style={styles.rowBetweenCenter}>
          <Text style={styles.viewAllText}>View all</Text>
          <Image
            source={require('../../../../../assets/images/rightArrow.png')}
            style={styles.viewAllIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardsOutline}>
        <RecommendationCard />
        <RecommendationCard />
        <RecommendationCard />
        <RecommendationCard />
      </View>
    </View>
  );
};

export default Recommendation;
