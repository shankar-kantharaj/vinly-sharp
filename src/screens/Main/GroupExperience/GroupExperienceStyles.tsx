import { Dimensions, StyleSheet, Text, View } from 'react-native' 
import { isAndroid } from '../../../constants/variables';

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
  topSection: { 
   
  },
});