import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import GradientButton from '../Buttons/GradientButton';
import { styles } from './HeaderStyles';
import SearchModal from '../SearchModal/SearchModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import FilterCafeBottomSheet from '../FilterCafeBottomSheet/FilterCafeBottomSheet';

const Header = () => {
  const height = Dimensions.get('window').height;
  const refRBSheet = useRef(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  return (
    <View style={{ paddingVertical: 15 }}>
      <View style={styles.addressBarOutline}>
        <View style={styles.rowBetweenStart}>
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.locationIcon}
          />
          <View>
            <Text style={styles.locationName}> Palm Medows</Text>
            <Text style={styles.locationAddress}> Whitefield, Bengaluru</Text>
          </View>
        </View>
        <View style={styles.rowBetweenCenter}>
          {/* <GradientButton text="Monthly" /> */}
          <GradientButton text="Guest user" />
          <View style={styles.trailIcon}>
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
          </View>
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
            refRBSheet.current.open();
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
      <RBSheet
        ref={refRBSheet} 
        height={height * 0.65}
        customStyles={{
          container:{backgroundColor: '#211f20', borderTopRightRadius: 20, borderTopLeftRadius: 20},
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
       <FilterCafeBottomSheet />
      </RBSheet>
    </View>
  );
};

export default Header;
