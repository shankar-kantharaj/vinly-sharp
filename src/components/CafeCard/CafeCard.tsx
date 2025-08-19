import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { futura } from '../../constants/fonts_exports';
// import { styles } from './CafeCardStyles'

const CafeCard = () => {
  return (
    <View style={styles.cardOutline}>
      <View style={styles.rowBetweenCenter}>
        <View>
          <Text style={styles.cafeName}>The Cozy Corner</Text>
          <Text style={styles.cafeAddress}>
            42nd Main, Sector 2, 12th Cross Road Whitefield
          </Text>
        </View>
        <View
          style={{
            // marginTop: 5,
            // borderColor: '#867f78',
            // borderWidth: 1.5,
            // height: 40,
            // width: 43,
            // borderRadius: 10, 
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/images/heart-active.png')}
            style={{ height: 25, width: 25, resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* Cafe image section below */}
      <View
        style={[
          styles.ImageOutline,
          { height: 170, width: '100%', alignItems: 'center', marginTop: 12,},
        ]}
      >
        <Image
          source={require('../../assets/images/cafe-image-rec.png')}
          style={{ height: '100%', width: '100%', resizeMode: 'cover',borderRadius: 8 }}
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
