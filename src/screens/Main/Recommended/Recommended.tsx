import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './RecommendedStyles';
import Header from '../../../components/Header/Header';
import RecommendedListing from './Sections/RecommendedListing/RecommendedListing';
import { appColors } from '../../../constants/colors';
const RecommendedScreen = () => {
  return (
    <LinearGradient
      // colors={}
      start={{ x: 0, y: 0 }} // Starting point (left)
      end={{ x: 0.7, y: 0.2 }}
      colors={appColors.backgroundGradientColors}
      style={styles.container}
    >
      <SafeAreaView style={{ margin: 20, flex: 1 }}>
        <Header />
        <RecommendedListing />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RecommendedScreen;
