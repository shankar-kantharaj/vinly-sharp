import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/Header/Header';
import { styles } from './GroupExperienceStyles';
import CafeCard from '../../../components/CafeCard/CafeCard';
import { bauhaus, futura } from '../../../constants/fonts_exports';
import { appColors } from '../../../constants/colors';
import { useSelector } from 'react-redux';
import { CafeDataType } from '../../../api/auth/main/safety-types';

const GroupExperience = () => {
  const { cafeList, cafeListBySelectedFilters } = useSelector(
    (state: any) => state.cafes,
  );

  // Determine which data to display
  const displayData =
    cafeListBySelectedFilters && cafeListBySelectedFilters.length > 0
      ? cafeListBySelectedFilters
      : cafeList;

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.7, y: 0.2 }}
      colors={appColors.backgroundGradientColors}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, margin: 20 }}>
        <Header /> 
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Top Section - Group Experience Content */}
          <View>
            <Text
              style={{ fontFamily: bauhaus.bold, color: 'white', fontSize: 16 }}
            >
              Group Experience 
            </Text>
            <Text
              style={{
                fontFamily: futura.semi,
                color: 'white',
                marginTop: 3.5,
              }}
            >
              Explore cafe's with group experience; enjoy and share the vinyl
              experience
            </Text>
            <Image
              source={require('../../../assets/images/group-experience-banner.png')}
              style={styles.bannerImage}
            />
          </View>

          {/* Cafe Cards Section */}
          <View>
            {displayData.length === 0 ? (
              <Text style={styles.noCafeText}>No cafes found</Text>
            ) : (
              displayData.map((item: CafeDataType, index: number) => (
                <CafeCard
                  key={index}
                  cafeName={item?.cafe_name}
                  cafeAddress={item?.address}
                  cafeImage={require('../../../assets/images/cafe-image-rec.png')}
                  isFavorite={true}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GroupExperience;
