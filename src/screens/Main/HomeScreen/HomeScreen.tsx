import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './HomeStyles';
import Header from '../../../components/Header/Header';
import Recommendation from './Sections/Recommendation/Recommendation';
import ExploreCafeSpaces from './Sections/ExploreCafeSpaces/ExploreCafeSpaces';
import BottomSheet from '@gorhom/bottom-sheet';
import { appColors } from '../../../constants/colors';

const HomeScreen = () => {
  return (
    <LinearGradient
      // colors={}
      start={{ x: 0, y: 0 }} // Starting point (left)
      end={{ x: 0.7, y: 0.2 }}
      colors={appColors.backgroundGradientColors}
      style={styles.container}
    >
      <SafeAreaView style={{margin: 20}}>
        <Header />
        <ScrollView>
          <Recommendation />
          <ExploreCafeSpaces />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
