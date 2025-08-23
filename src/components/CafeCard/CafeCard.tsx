import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { futura } from '../../constants/fonts_exports';
// import { styles } from './CafeCardStyles'

// Define types for the props
interface CafeCardProps {
  cafeName: string;
  cafeAddress: string;
  cafeImage: any; // Image source can be either a static import or URL (use `any` type for flexibility)
  isFavorite: boolean;
}

// CafeCard Component
const CafeCard: React.FC<CafeCardProps> = ({ cafeName, cafeAddress, cafeImage, isFavorite }) => {
  return (
    <View style={styles.cardOutline}>
      {/* Row for cafe name, address, and heart icon */}
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.cafeName}>{cafeName}</Text>
          <Text style={styles.cafeAddress} numberOfLines={2} ellipsizeMode='tail'>{cafeAddress}</Text>
        </View>

        {/* Heart icon indicating whether the cafe is a favorite */}
        <Image
          source={isFavorite ? require('../../assets/images/heart-active.png') : require('../../assets/images/heart-inactive.png')}
          style={{ height: 25, width: 25, resizeMode: 'contain' }}
        />
      </View>

      {/* Cafe image section */}
      <View style={[styles.ImageOutline, { height: 170, width: '100%', alignItems: 'center', marginTop: 12 }]}>
        <Image
          source={require('../../assets/images/cafe-image-rec.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 8,
          }}
        />
        <View style={styles.flagshipOutline}>
          <Text style={styles.flagshipText}>Book Now</Text>
        </View>
      </View>
    </View>
  );
};

export default CafeCard;

const styles = StyleSheet.create({
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardOutline: {
    width: '100%',
    borderRadius: 10,
    // borderColor: '#ECEBDB',
    borderColor: '#845555',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  cafeName: {
    color: 'white',
    fontFamily: futura.bold,
    fontSize: 15,
  },
  cafeAddress: {
    width: 250,
    color: '#EBD5D19E',
    fontFamily: futura.medium,
    fontSize: 12.5,
  },
  ImageOutline: {},
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
