import { Dimensions, StyleSheet } from 'react-native';
import { bauhaus, futura } from '../../../constants/fonts_exports';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#241c1c', // Optional: Set a background color
  },
  logoImage: {
    width: '75%',
    resizeMode: 'contain', // Ensures the image covers the entire screen without distortion
  },
  topSection: {
    width: '100%',
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    height: height * 0.55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  welcomeTextOutline:{
    marginHorizontal: 20,
  },
  welcomeHeading:{
    color: '#ECEBDB',
    fontFamily: bauhaus.bold,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 26
  },
  welcomeSubHeading:{
    color: '#E3E9ED',
    fontFamily: futura.book,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26
  },
  customButtonWidth:{
    width : width * 0.9
  },
  dotsContainer: {
    flexDirection: 'row', 
    bottom: 10,
    justifyContent: 'center',
  },
  dot: { 
    margin: 3,
    color: '#d3d3d3', // Default inactive dot color
  },
  activeDot: {
    color: '#333', // Active dot color
  },
});
