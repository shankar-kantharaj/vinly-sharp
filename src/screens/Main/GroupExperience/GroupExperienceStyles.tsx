import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { isAndroid } from '../../../constants/variables';
import { futura } from '../../../constants/fonts_exports';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
  },
  bannerImage: {
    width: '100%',
    height: 116,
    resizeMode: 'contain', // Ensures the image covers the entire screen without distortion
  }, 
  // noCafeText: {
  //   fontFamily: futura.bold,
  //   color: 'white',
  //   fontSize: 15,
  //   textAlign: 'center',
  //   marginTop: 20,
  // }, 
 
 
 
  noCafeText: {
    color: 'white',
    fontFamily: futura.medium,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
