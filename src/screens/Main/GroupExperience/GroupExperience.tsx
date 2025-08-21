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

const GroupExperience = () => {
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
          <View style={styles.topSection}>
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
              Explore cafe’s with group experience; enjoy and share the vinyl
              experience
            </Text>
            <Image
              source={require('../../../assets/images/group-experience-banner.png')} // Replace with your splash image path
              style={styles.bannerImage}
            />
          </View>
          <View style={{}}>
            <CafeCard
              cafeName="The Cozy Corner"
              cafeAddress="42nd Main, Sector 2, 12th Cross Road Whitefield"
              cafeImage={require('../../../assets/images/cafe-image-rec.png')}
              isFavorite={true}
            />
            <CafeCard
              cafeName="The Cozy Corner"
              cafeAddress="42nd Main, Sector 2, 12th Cross Road Whitefield"
              cafeImage={require('../../../assets/images/cafe-image-rec.png')}
              isFavorite={true}
            />
            <CafeCard
              cafeName="The Cozy Corner"
              cafeAddress="42nd Main, Sector 2, 12th Cross Road Whitefield"
              cafeImage={require('../../../assets/images/cafe-image-rec.png')}
              isFavorite={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GroupExperience;
