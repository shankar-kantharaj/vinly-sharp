import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import CafeCard from '../CafeCard/CafeCard';
import { isAndroid } from '../../constants/variables';
import { futura } from '../../constants/fonts_exports';
import CafeCardWithLocation from '../CafeCard/CafeCardWithLocation';
import CustomButton from '../Buttons/CustomButtons';
import LinearGradient from 'react-native-linear-gradient';

type Props = { visible: boolean; onClose: () => void };

const dummyCafeData = [
  {
    cafeName: 'The Cozy Corner',
    cafeAddress: '42nd Main, Sector 2, 12th Cross Road Whitefield',
    cafeImage: require('../../assets/images/cafe-image-rec.png'),
    isFavorite: true,
  },
  {
    cafeName: 'Brew & Chew',
    cafeAddress: '42nd Main, Sector 3, 14th Cross Road Whitefield',
    cafeImage: require('../../assets/images/cafe-image-rec.png'),
    isFavorite: false,
  },
  {
    cafeName: 'Vinyl Cafe',
    cafeAddress: '42nd Main, Sector 4, 10th Cross Road Whitefield',
    cafeImage: require('../../assets/images/cafe-image-rec.png'),
    isFavorite: true,
  },
  {
    cafeName: 'Brew Bloom',
    cafeAddress: '42nd Main, Sector 1, 5th Cross Road Whitefield',
    cafeImage: require('../../assets/images/cafe-image-rec.png'),
    isFavorite: false,
  },
];

const searchedItems = ['New Cafe', 'Brew & Chew', 'Vinyl', 'The cozy corner'];

export default function LocationModal({ visible, onClose }: Props) {
  const [showEnableLocationModal, setShowEnableLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCafes, setFilteredCafes] = useState(dummyCafeData); // Initially, show all cafes

  // Handle back button press for closing modal
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [visible, onClose]);

  // Update the filtered cafes based on search query
  useEffect(() => {
    const result = dummyCafeData.filter(
      cafe =>
        cafe.cafeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.cafeAddress.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCafes(result);
  }, [searchQuery]);

  return (
    <View>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Backdrop */}
          <Pressable style={styles.backdrop} onPress={onClose} />

          {/* Top-pinned container */}
          <SafeAreaView style={styles.topArea}>
            <View style={styles.rowBetweenCenter}>
              <Text style={styles.heading}>Select a location</Text>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require('../../assets/images/close.png')}
                  style={{ height: 20, width: 20, resizeMode: 'cover' }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.topBar}>
              <View style={styles.searchBarOutline}>
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery('');
                    onClose();
                  }}
                >
                  <Image
                    source={require('../../assets/images/leftArrow.png')}
                    style={styles.leftArrowIcon}
                  />
                </TouchableOpacity>
                <TextInput
                  autoFocus
                  style={styles.searchInput}
                  placeholderTextColor={'#7A7778'}
                  placeholder="Cafe, mood, location.."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowEnableLocationModal(true);
                }}
                style={styles.useLocationOutline}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/images/location-white.png')}
                    style={styles.leftArrowIcon}
                  />
                  <Text style={styles.useLocationText}>
                    Use current location
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/right-chevron.png')}
                  style={styles.chevronRightIcon}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <ScrollView>
            {/* Results section */}
            <View style={[styles.searchResultsOutline]}>
              <Text style={styles.searchResultHeading}>Suggestions </Text>
              <View style={styles.filteredItemsOutline}>
                {filteredCafes.length === 0 ? (
                  <View style={{ width: '100%' }}>
                    <Text style={styles.noCafeText}>No cafes found.</Text>
                  </View>
                ) : (
                  filteredCafes.map((cafe, index) => (
                    <CafeCardWithLocation
                      key={index}
                      cafeName={cafe.cafeName}
                      cafeAddress={cafe.cafeAddress}
                      cafeImage={cafe.cafeImage}
                      isFavorite={cafe.isFavorite}
                    />
                  ))
                )}
              </View>
            </View>
            {/* {searchQuery.length > 0 ? (
         
          ) : (
            <View />
          )} */}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={showEnableLocationModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowEnableLocationModal(false);
        }}
        statusBarTranslucent
      >
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={styles.secModalFill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Backdrop */}
          <Pressable style={styles.secModalBackdrop} />

          {/* Top-pinned container */}
          <LinearGradient
            colors={['#141414', '#303030']}
            start={{ x: 0, y: 0 }} // Starting point (left)
            end={{ x: 1, y: 0 }}
            style={{
              backgroundColor: '#2f2f2f',
              width: '90%',
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 10,
            }}
          >
            <View style={[styles.rowBetweenCenter, { paddingBottom: 0 }]}>
              <Text style={styles.enableLocationHeading}>
                Enable location service
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowEnableLocationModal(false);
                }}
              >
                <Image
                  source={require('../../assets/images/close.png')}
                  style={{ height: 20, width: 20, resizeMode: 'cover' }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.enableLocationSubHeading}>
              Please enable location services to find nearby cafes.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 25,
              }}
            >
              <CustomButton
                width={150}
                height={40}
                text={'Cancel'}
                onPress={() => {
                  setShowEnableLocationModal(false);
                }}
                backgroundColor="#ECEBDB"
                textColor="#561314"
              />
              <View style={{ width: 10 }} />
              <CustomButton
                width={150}
                height={40}
                text={'Enable location'}
                onPress={() => {
                  setShowEnableLocationModal(false);
                }}
              />
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'rgba(59, 22, 22, 0.64)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
  },
  topArea: {
    paddingTop: 30,
    marginHorizontal: 15,
  },
  topBar: {},
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  heading: {
    color: '#E4DAD7',
    fontFamily: futura.bold,
    fontSize: 18,
  },
  enableLocationHeading: {
    color: '#fff',
    fontFamily: futura.book,
    fontSize: 20,
  },
  enableLocationSubHeading: {
    color: '#E4DAD7',
    fontFamily: futura.book,
    fontSize: 15,
    paddingTop: 3,
  },
  recentSearchOutline: {
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#221F20CC',
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '93%',
    paddingVertical: 10,
  },
  searchResultsOutline: {
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '93%',
    paddingVertical: 10,
  },
  searchBarOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C111B66',
    borderRadius: 40,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: isAndroid ? 0 : 12,
  },
  useLocationOutline: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#561314',
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  leftArrowIcon: {
    height: 17,
    width: 17,
    resizeMode: 'cover',
    marginTop: 3,
  },
  chevronRightIcon: {
    height: 17,
    width: 17,
    resizeMode: 'cover',
    marginTop: 3,
  },
  searchInput: {
    marginLeft: 8,
    fontFamily: futura.medium,
    marginTop: 5,
    color: 'white',
    fontSize: 15,
  },
  recentSearchText: {
    color: '#e4dad7b5',
    fontFamily: futura.medium,
    fontSize: 17,
  },
  clearAllOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 3,
    // borderColor: '#55504b',
    // borderWidth: 1,
  },
  clearAllText: {
    color: 'red',
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontFamily: futura.medium,
  },
  closeIcon: {
    height: 15,
    width: 15,
    resizeMode: 'cover',
  },
  searchIcon: {
    height: 13,
    width: 13,
    resizeMode: 'cover',
  },
  searchItems: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
  },
  filteredItemsOutline: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  searchedTextOutline: {
    borderRadius: 3,
    borderColor: '#55504b',
    borderWidth: 1,
    marginRight: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  searchedText: {
    color: 'lightgray',
    fontFamily: futura.medium,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  searchResultHeading: {
    color: '#e4dad7b5',
    fontFamily: futura.medium,
    fontSize: 17,
  },
  noCafeText: {
    color: 'white',
    fontFamily: futura.bold,
    textAlign: 'center',
    marginVertical: 10,
  },

  useLocationText: {
    color: 'white',
    fontFamily: futura.medium,
    paddingLeft: 10,
    fontSize: 15,
  },
  secModalFill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 22, 22, 0.56)',
  },
  secModalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
  },
});
