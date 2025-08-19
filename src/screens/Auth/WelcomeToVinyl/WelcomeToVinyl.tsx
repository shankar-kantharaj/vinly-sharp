import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './WelcomeToVinylStyles';
import CustomButton from '../../../components/Buttons/CustomButtons';
import LinearGradient from 'react-native-linear-gradient';

const WelcomToVinyl = () => {
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(1); // Track the active image index

  // Define the images array with static paths
  const images = [
    require('../../../assets/images/auth/welcome-image1.png'), // Image 0
    require('../../../assets/images/auth/welcome-image2.png'), // Image 1
    require('../../../assets/images/auth/welcome-image3.png'), // Image 1
  ];

  // Change the background image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % images.length); // Loop back after last image
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <ImageBackground
      source={images[activeIndex]} // Use the image based on the active index
      style={styles.container}
    >
      {/* Top section */}
      <View style={styles.topSection}>
        <Image
          source={require('../../../assets/images/auth/logo-primary.png')} // Replace with your splash image path
          style={styles.logoImage}
        />
      </View>

      {/* Bottom section */}
      <LinearGradient
        colors={['transparent', '#200706']}
        style={styles.bottomSection}
      >
        {/* content section */}
        <View style={styles.welcomeTextOutline}>
          <Text style={styles.welcomeHeading}>
            Welcome to Vinyl Sharp! Your Next Adventure Awaits
          </Text>
          <Text style={styles.welcomeSubHeading}>
            Embark on a literary journey with AI-curated book recommendations
            that match your unique tastes for an adventure in every read
          </Text>
        </View>

        <View>
          <CustomButton
            width={`${styles.customButtonWidth.width}`}
            text="Login"
            textColor="#ECEBDB"
            onPress={() => {}}
            backgroundColor="#561314"
          />
          <CustomButton
            width={`${styles.customButtonWidth.width}`}
            text="Sign up"
            textColor="#561314"
            onPress={() => {}}
            backgroundColor="#C7BDAC"
          />
          <CustomButton
            width={`${styles.customButtonWidth.width}`}
            text="Skip Login"
            textColor="#C7BDAC"
            onPress={() => {
              navigation.reset({
                index: 0, // The first screen after reset
                routes: [
                  {
                    name: 'BottomTabBar' as never,
                    params: { screen: 'GroupExp' },
                  },
                ],
              });
                // navigation.navigate('BottomTabBar' as never);
            }}
            backgroundColor="transparent"
          />
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <Text
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]} // Highlight the active dot
            >
              ●
            </Text>
          ))}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomToVinyl;
