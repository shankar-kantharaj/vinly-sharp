import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate to the Home screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate('WelcomeToVinyl' as never); // Use 'replace' to remove the splash screen from the navigation stack
    }, 2000);

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={require('../../../assets/images/auth/splashScreen.png')} style={styles.container}>
      {/* Full-screen image */}
      <Image
        source={require('../../../assets/images/auth/logo-primary.png')} // Replace with your splash image path
        style={styles.splashImage}
      />
    </ImageBackground >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#241c1c', // Optional: Set a background color
  },
  splashImage: {
    width: '75%', 
    resizeMode: 'contain', // Ensures the image covers the entire screen without distortion
  },
});

export default SplashScreen;
