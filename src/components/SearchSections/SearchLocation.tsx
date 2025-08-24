import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
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
  Modal,
  Pressable,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CafeCardWithLocation from '../CafeCard/CafeCardWithLocation';
import CustomButton from '../Buttons/CustomButtons';
import { futura } from '../../constants/fonts_exports';
import { isAndroid } from '../../constants/variables';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../../redux/reducers/userReducer';
import { getCafeListByLocation } from '../../api/auth/main/cafesApi';
import { RootState } from '../../redux/store';
import { CafeListByLocationType, CafeDataType } from '../../api/auth/main/safety-types';
import CafeCard from '../CafeCard/CafeCard';

interface Props {
  navigation: any; // You can use proper navigation type from @react-navigation/native
}

export default function SearchLocation({ navigation }: Props) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const { userLocation } = useSelector((state: RootState) => state.userDetails);
  const { cafeList,cafeListByLocation } = useSelector((state: RootState) => state.cafes);
  const [showEnableLocationModal, setShowEnableLocationModal] = useState(false);
  const [filteredCafes, setFilteredCafes] =
    useState<CafeListByLocationType[]>(cafeListByLocation);

  useEffect(() => {
    const apiCallToGetLocationBasedCafes = async () => {
      await getCafeListByLocation(userLocation, dispatch);
    };

    apiCallToGetLocationBasedCafes();
  }, []);

  // Handle back button press for navigation
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => sub.remove();
  }, [navigation]);

  // Update the filtered cafes based on search query
  useEffect(() => {
    const result = cafeListByLocation.filter(
      (cafe: CafeListByLocationType) =>
        cafe.cafe_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCafes(result);
  }, [searchQuery]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(59, 22, 22, 0.64)"
      />

      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header Section */}
        <SafeAreaView style={styles.topArea}>
          <View style={styles.rowBetweenCenter}>
            <Text style={styles.heading}>Select a location</Text>
            <TouchableOpacity onPress={handleGoBack}>
              <Image
                source={require('../../assets/images/close.png')}
                style={{ height: 20, width: 20, resizeMode: 'cover' }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.topBar}>
            <View style={styles.searchBarOutline}>
              <TouchableOpacity onPress={handleClearSearch}>
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
              onPress={() => setShowEnableLocationModal(true)}
              style={styles.useLocationOutline}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/images/location-white.png')}
                  style={styles.leftArrowIcon}
                />
                {userLocation.latitude == 0 && userLocation.longitude == 0 ? (
                  <Text style={styles.useLocationText}>
                    Use current location
                  </Text>
                ) : (
                  <View>
                    <Text style={styles.useLocationText}>
                      Using your current location
                    </Text>
                    <Text
                      style={styles.yourLocationText}
                      numberOfLines={2}
                      lineBreakMode="tail"
                    >
                      Palm Medows, Phase 2, Whitefield, Bengaluru
                    </Text>
                  </View>
                )}
              </View>
              <Image
                source={require('../../assets/images/right-chevron.png')}
                style={styles.chevronRightIcon}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Scrollable Content */}
        {/* <ScrollView style={styles.scrollContent}>
          <View style={styles.searchResultsOutline}>
            <Text style={styles.searchResultHeading}>Suggestions</Text>
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
                    distance={ite}
                    isFavorite={cafe.isFavorite}
                  />
                ))
              )}
            </View>
          </View>
        </ScrollView> */}

        <Text style={styles.searchResultHeading}>Suggestions</Text>
        {userLocation.latitude !== 0 && userLocation.longitude !== 0 ? (
          <FlatList
            data={filteredCafes}
            renderItem={({ item }: { item: CafeListByLocationType }) => (
              <CafeCardWithLocation
                cafeName={item.cafe_name}
                cafeAddress={item.address}
                cafeImage={require('../../assets/images/cafe-image-rec.png')}
                isFavorite={false}
                distance={item.distance}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            scrollEnabled
            data={cafeList}
            renderItem={({ item }: { item: CafeDataType }) => {
              return (
                <CafeCard
                  cafeName={item?.cafe_name}
                  cafeAddress={item?.address}
                  cafeImage={require('../../assets/images/cafe-image-rec.png')}
                  isFavorite={true}
                />
              );
            }}
            ListEmptyComponent={<Text>No cafes found</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </KeyboardAvoidingView>

      {/* Enable Location Modal */}
      <Modal
        visible={showEnableLocationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEnableLocationModal(false)}
        statusBarTranslucent
      >
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={styles.secModalFill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable
            style={styles.secModalBackdrop}
            onPress={() => setShowEnableLocationModal(false)}
          />

          <LinearGradient
            colors={['#141414', '#303030']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 8 }}
          >
            <View style={styles.modalContent}>
              <View style={[styles.rowBetweenCenter, { paddingBottom: 0 }]}>
                <Text style={styles.enableLocationHeading}>
                  Enable location service
                </Text>
                <TouchableOpacity
                  onPress={() => setShowEnableLocationModal(false)}
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

              <View style={styles.buttonContainer}>
                <CustomButton
                  width={150}
                  height={40}
                  text={'Cancel'}
                  onPress={() => setShowEnableLocationModal(false)}
                  backgroundColor="#ECEBDB"
                  textColor="#561314"
                />
                <View style={{ width: 10 }} />
                <CustomButton
                  width={150}
                  height={40}
                  text={'Enable location'}
                  onPress={() => {
                    dispatch(
                      setUserLocation({
                        latitude: 12.9661,
                        longitude: 77.5846,
                      }),
                    );
                    setShowEnableLocationModal(false);
                  }}
                />
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#121111',
  },
  fill: {
    flex: 1,
  },
  topArea: {
    paddingTop: 30,
  },
  topBar: {},
  scrollContent: {
    flex: 1,
  },
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
    flex: 1,
    marginLeft: 8,
    fontFamily: futura.medium,
    marginTop: 5,
    color: 'white',
    fontSize: 15,
  },
  filteredItemsOutline: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  searchResultHeading: {
    color: '#e4dad7b5',
    fontFamily: futura.medium,
    fontSize: 17,
    paddingTop: 15,
    paddingLeft: 5,
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
  yourLocationText: {
    width: 300,
    marginTop: 3,
    color: 'white',
    fontFamily: futura.light,
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
  modalContent: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 25,
  },
});
