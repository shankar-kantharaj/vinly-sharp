import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { backgroundGradientColors } from '../../../constants/colors'; 
import { styles } from './RecommendedStyles';
import Header from '../../../components/Header/Header';
import ExploreCafeSpaces from '../HomeScreen/Sections/ExploreCafeSpaces/ExploreCafeSpaces';
import RecommendedListing from './Sections/RecommendedListing/RecommendedListing';
const RecommendedScreen = () => {
  return (
    <LinearGradient
      // colors={}
      start={{ x: 0, y: 0 }} // Starting point (left)
      end={{ x: 0.7, y: 0.2 }}
      colors={backgroundGradientColors}
      style={styles.container}
    >
      <Header />
      <ScrollView>  
        <RecommendedListing />
      </ScrollView>
    </LinearGradient>
  );
};

export default RecommendedScreen;