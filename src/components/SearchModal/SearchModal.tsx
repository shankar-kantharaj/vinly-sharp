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
} from 'react-native';
import CafeCard from '../CafeCard/CafeCard';
import { isAndroid } from '../../constants/variables';
import { futura } from '../../constants/fonts_exports';

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
export default function SearchModal({ visible, onClose }: Props) {
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
          <View style={styles.topBar}>
            <View style={styles.searchBarOutline}>
              <TouchableOpacity onPress={()=>{
                setSearchQuery('')
                onClose()
              }}>
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
          </View>
        </SafeAreaView>

        <ScrollView>
          {/* Your results/content area */}
         {searchQuery.length > 0 ?
          <View />
          : <View style={styles.recentSearchOutline}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.recentSearchText}>Recent searches</Text>
              <View style={styles.clearAllOutline}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </View>
            </View>
            <View style={styles.searchItems}>
              {searchedItems.map((item, index) => {
                return (
                  <View style={styles.searchedTextOutline} key={index}>
                    <Image
                      source={require('../../assets/images/search.png')}
                      style={styles.searchIcon}
                    />
                    <Text style={styles.searchedText}> {item}... </Text>
                  </View>
                );
              })}
            </View>
          </View>}

          {/* Results section */}
          {searchQuery.length > 0 ? (
            <View style={[styles.searchResultsOutline]}>
              <Text style={styles.searchResultHeading}>Search results</Text>
              <View style={styles.filteredItemsOutline}>
                {filteredCafes.length === 0 ? (
                  <View style={{width: '100%',}}>
                    <Text style={styles.noCafeText}>No cafes found.</Text>
                  </View>
                ) : (
                  filteredCafes.map((cafe, index) => (
                    <CafeCard
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
          ) : (
            <View></View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
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
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  topBar: {},
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
    backgroundColor: '#221F20CC',
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '93%',
    paddingVertical: 10,
  },
  searchBarOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#221F20CC',
    borderRadius: 40,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: isAndroid ? 0 : 12,
  },
  leftArrowIcon: {
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
});
