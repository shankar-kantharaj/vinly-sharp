import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import GradientButton from '../Buttons/GradientButton';
import { styles } from './HeaderStyles';
import SearchModal from '../SearchModal/SearchModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import FilterCafeBottomSheet from '../FilterCafeBottomSheet/FilterCafeBottomSheet';
import LocationModal from '../LocationModal/LocationModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Header = () => {
  const refRBSheet = useRef(null);
  const height = Dimensions.get('window').height;
  const userDetails = useSelector((state:RootState) => state.userDetails); // Access user state
  const dispatch = useDispatch();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLocationModal, setshowLocationModal] = useState(false);
  return (
    <View style={{ paddingVertical: 15 }}>
      <View style={styles.addressBarOutline}>
        <TouchableOpacity
          onPress={() => {
            setshowLocationModal(true);
          }}
          style={styles.rowBetweenStart}
        >
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.locationIcon}
          />
          <View>
            <Text style={styles.locationName}> Palm Medows</Text>
            <Text style={styles.locationAddress}> Whitefield, Bengaluru</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rowBetweenCenter}>
          {/* <GradientButton text="Monthly" /> */}
          <GradientButton text={userDetails.userType} />
          {userDetails.userType !== 'Guest User' && <View style={styles.trailIcon}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Bh-Regular',
                padding: 5,
                fontSize: 13,
              }}
            >
              VS
            </Text>
          </View>}
        </View>
      </View>
      <View style={[styles.rowBetweenCenter, { marginTop: 13 }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowSearchModal(!showSearchModal);
          }}
          style={styles.searchBarOutline}
        >
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchIcon}
          />
          <Text style={styles.searchInput}>Cafe, mood, location..</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current?.open();
          }}
        >
          <Image
            source={require('../../assets/images/filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      <SearchModal
        visible={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
        }}
      />
      <LocationModal
        visible={showLocationModal}
        onClose={() => {
          setshowLocationModal(false);
        }}
      />

      <RBSheet
        ref={refRBSheet}
        height={height * 0.7}
        customStyles={{
          container: {
            backgroundColor: '#211f20',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <FilterCafeBottomSheet
          onClose={() => {
            refRBSheet.current?.close();
          }}
        />
      </RBSheet>
    </View>
  );
};

export default Header;
