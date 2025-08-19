import React, { useEffect } from 'react';
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
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { futura } from '../../constants/fonts_exports';

type Props = { visible: boolean; onClose: () => void };

export default function SearchModal({ visible, onClose }: Props) {
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

  const searchedItems = ['New Cafe', 'Brew & Chew', 'Vinyl', 'The cozy corner'];
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
              <TouchableOpacity
                onPress={() => {
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
              />
            </View>
          </View>
        </SafeAreaView>

        {/* Your results/content area */}
        <View style={styles.results}>
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
                <View style={styles.searchedTextOutline}>
                  <Image
                    source={require('../../assets/images/search.png')}
                    style={styles.searchIcon}
                  />
                  <Text key={index} style={styles.searchedText}>
                    {item}...
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  topArea: {
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  topBar: {},
  results: {
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
    color: 'white',
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
    paddingTop: 10,
  },

  searchedTextOutline: {
    borderRadius: 3,
    borderColor: '#55504b',
    borderWidth: 1,
    marginRight: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  searchedText: {
    color: 'lightgray',
    fontFamily: futura.medium,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
});
