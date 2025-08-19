import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { backgroundGradientColors } from '../../../constants/colors';
import { styles } from './HomeStyles';
import Header from '../../../components/Header/Header';
import Recommendation from './Sections/Recommendation/Recommendation';
import ExploreCafeSpaces from './Sections/ExploreCafeSpaces/ExploreCafeSpaces';

const HomeScreen = () => {
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
        <Recommendation />
        <ExploreCafeSpaces />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;
