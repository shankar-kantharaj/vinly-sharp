import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import GradientButton from '../Buttons/GradientButton';
import { styles } from './HeaderStyles';
import { TextInput } from 'react-native-gesture-handler';
import SearchModal from '../SearchModal/SearchModal';

const Header = () => {
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
          <GradientButton text="Monthly" />
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
        <TouchableOpacity activeOpacity={0.8}  onPress={()=>{setShowSearchModal(!showSearchModal)}} style={styles.searchBarOutline}>
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchIcon}
          />
          <Text style={styles.searchInput}>Cafe, mood, location..</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/filter.png')}
          style={styles.filterIcon}
        />
      </View>

      <SearchModal
        visible={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
        }}
      />
    </View>
  );
};

export default Header;
