import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { futura } from '../../constants/fonts_exports';

// Define the props interface
interface RecommendationCardProps {
  cafeName: string;
  cafeAddress: string;
  cafeImage?: any; // For require() images or {uri: 'url'} for network images
  category?: string; // e.g., "Flagship", "Premium", etc.
  onPress?: () => void; // Optional callback when card is pressed
  width?: number; // Optional custom width
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  cafeName,
  cafeAddress,
  cafeImage,
  category = 'Flagship', // Default category
  onPress,
  width: customWidth,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = customWidth || screenWidth * 0.44;

  // Determine image source
  const imageSource = cafeImage || require('../../assets/images/cafe-image.png');

  const CardContent = () => (
    <LinearGradient
      colors={['#251f1f', '#321a1c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientContainer, { width: cardWidth, height: 130 }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.cafeImage}
        />
        {category && (
          <View style={styles.categoryOutline}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cafeName} numberOfLines={1} ellipsizeMode="tail">
          {cafeName}
        </Text>
        <Text
          style={[styles.cafeAddress, { width: cardWidth - 50 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {cafeAddress}
        </Text>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.cardWrapper}>
      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <CardContent />
        </TouchableOpacity>
      ) : (
        <CardContent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 8,
  },
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  cafeImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  categoryOutline: {
    backgroundColor: '#221F20',
    position: 'absolute',
    borderTopLeftRadius: 8,
    bottom: 0,
    right: 0,
  },
  categoryText: {
    color: 'white',
    fontFamily: futura.book,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  textContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  cafeName: {
    color: 'white',
    fontFamily: futura.semi,
    fontSize: 14,
    marginBottom: 2,
  },
  cafeAddress: { 
    fontSize: 12,
    color: '#EBD5D19E',
    fontFamily: futura.medium,
    lineHeight: 16,
    paddingBottom: 10,
  },
});

export default RecommendationCard;
