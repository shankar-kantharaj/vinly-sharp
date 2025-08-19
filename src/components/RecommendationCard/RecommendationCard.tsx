import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { futura } from '../../constants/fonts_exports';

const RecommendationCard = () => {
  const width = Dimensions.get('window').width;

  return (
    <View style={{ marginTop: 8 }}>
      <LinearGradient
        colors={['#251f1f', '#321a1c']}
        start={{ x: 0, y: 0 }} // Starting point (left)
        end={{ x: 1, y: 0 }}
        style={{ width: width * 0.44, borderRadius: 10 }}
      >
        <View style={{ width: '100%' }}>
          <Image
            source={require('../../assets/images/cafe-image.png')}
            style={{ width: '100%', height: 80, resizeMode: 'cover' }}
          />
           <View style={styles.flagshipOutline}>
              <Text style={styles.flagshipText}>Flagship</Text>
            </View>
        </View>
        <View style={{ paddingVertical: 8, paddingHorizontal: 5 }}>
          <Text style={styles.shopName}>Brew & Chew</Text>
          <Text
            style={styles.shopAddress}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            42nd Main, Sector 2, 12th Cross Road Whitefield
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    marginTop: 13,
  },
  card: {
    width: '50%',
    borderRadius: 10,
    overflow: 'hidden', // Makes sure the image fits within rounded corners
    elevation: 5, // Adds shadow for better visibility on Android
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden', // Ensures the label is contained within the image area
  },
  cardImage: {
    height: 100,
    width: '100%',
    resizeMode: 'contain', // Ensures the image covers the area without distortion
  },
  label: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#f1c40f', // Yellow background for the label
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#777',
  },

  shopName: {
    color: 'white',
    fontFamily: futura.semi,
    alignSelf: 'flex-start',
  },
  shopAddress: {
    fontSize: 13,
    color: '#EBD5D19E',
    fontFamily: futura.medium,
  },
  flagshipOutline: {
    backgroundColor: '#221F20',
    position: 'absolute',
    borderTopLeftRadius: 8,
    bottom: 0,
    right: 0,
  },
  flagshipText: {
    color: 'white',
    fontFamily: futura.book,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

export default RecommendationCard;
