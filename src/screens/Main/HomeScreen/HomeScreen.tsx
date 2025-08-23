import { SafeAreaView, StyleSheet, View, FlatList, Alert } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './HomeStyles';
import Header from '../../../components/Header/Header';
import Recommendation from './Sections/RecommendedForYou/RecommendedForYou';
import ExploreCafeSpaces from './Sections/ExploreCafeSpaces/ExploreCafeSpaces';
import { appColors } from '../../../constants/colors';
import { getCafeList, getCafeListBySelectedFilters } from '../../../api/auth/main/cafesApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {filterDataByUser} = useSelector((state:RootState) => state.filter); // Access filter state



  const sections = [
    { key: 'recommendation', component: <Recommendation /> },
    { key: 'explore', component: <ExploreCafeSpaces /> },
  ];

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.7, y: 0.2 }}
      colors={appColors.backgroundGradientColors}
      style={styles.container}
    >
      <SafeAreaView style={{ margin: 20 }}>
        <Header />
        <FlatList
          data={sections}
          renderItem={({ item }) => item.component}
          keyExtractor={item => item.key}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
