import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { futura } from '../../constants/fonts_exports';
import { isAndroid } from '../../constants/variables';
import LinearGradient from 'react-native-linear-gradient';
// import { styles } from './CafeCardStyles'

// Define types for the props
interface CafeCardProps {
  cafeName: string;
  cafeAddress: string;
  cafeImage: any; // Image source can be either a static import or URL (use `any` type for flexibility)
  distance: string | number; // Optional distance prop
  isFavorite: boolean;
}

// CafeCard Component
const CafeCardWithLocation: React.FC<CafeCardProps> = ({
  cafeName,
  cafeAddress,
  cafeImage,
  distance = '400m',
  isFavorite,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#141414', '#303030']}
      style={{borderRadius: 10, marginTop: isAndroid ? 15 : 15}}
    >
      <View style={styles.cardOutline}>
        <View
          style={[
            styles.ImageOutline, 
          ]}
        >
          <Image
            source={require('../..//assets/images/cafe-image-rec.png')}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              borderRadius: 8,
            }}
          />
        </View>

        <View style={styles.rowStartCenter}>
          <View>
            <Image
              source={require('../../assets/images/location-white.png')}
              style={{ height: 18, width: 18, resizeMode: 'contain' }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                fontFamily: futura.medium,
                marginTop: 3,
              }}
            >
              {distance} Km
            </Text>
          </View>
          <View style={{ paddingLeft: 8, width: '100%' }}>
            <Text style={styles.cafeName}>{cafeName}</Text>
            <Text
              style={styles.cafeAddress}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cafeAddress}
            </Text>
          </View>

          {/* Heart icon indicating whether the cafe is a favorite */}
        </View>
      </View>
    </LinearGradient>
  );
};

export default CafeCardWithLocation;

const styles = StyleSheet.create({
  rowStartCenter: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 3,
  },
  cardOutline: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  cafeName: {
    color: 'white',
    fontFamily: futura.bold,
  },
  cafeAddress: {
    width: '93%',
    color: '#EBD5D19E',
    fontFamily: futura.medium,
    fontSize: 12.5,
  },
  ImageOutline: { 
    height: 170, 
    width: '100%', 
    alignItems: 'center',  
   },
  flagshipOutline: {
    backgroundColor: '#561214',
    position: 'absolute',
    borderRadius: 5,
    bottom: 12,
    right: 15,
  },
  flagshipText: {
    color: 'white',
    fontFamily: futura.semi,
    fontSize: 12,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
});
