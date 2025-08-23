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
import { useDispatch, useSelector } from 'react-redux';
import CafeCard from '../CafeCard/CafeCard';
import { isAndroid } from '../../constants/variables';
import { futura } from '../../constants/fonts_exports';
import { getCafeListBySearch } from '../../api/auth/main/cafesApi';
import { RootState } from '../../redux/store';

type Props = { 
  visible: boolean; 
  onClose: () => void;
};

export default function SearchModal({ visible, onClose }: Props) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false); // Track if user has performed a search
  
  // Get data from Redux store
  const { cafeList, cafeListBySearch } = useSelector((state: RootState) => state.cafes);
  const { userLocation } = useSelector((state: RootState) => state.userDetails);

  // Determine base data source
  const baseData = hasSearched ? cafeListBySearch : cafeList;

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

  // Handle search submission (API call)
  const handleSearchSubmit = async () => {
    // Only make API call if there's text in the search box
    if (searchQuery.trim().length > 0) {
      try {
        await getCafeListBySearch(searchQuery.trim(), userLocation, dispatch);
        setHasSearched(true);
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };

  // Filter data based on search query (local filtering)
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      // If search is empty, show all data from base source
      setFilteredData(baseData);
    } else {
      // Filter the base data locally based on search query
      const filtered = baseData.filter((cafe: any) =>
        cafe?.cafe_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe?.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, baseData, hasSearched]);

  // Clear search and close modal
  const handleClearAndClose = () => {
    setSearchQuery('');
    setHasSearched(false);
    setFilteredData([]);
    onClose();
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setSearchQuery('');
      setHasSearched(false);
      setFilteredData([]);
    }
  }, [visible]);

  // Initialize filtered data when modal opens
  useEffect(() => {
    if (visible && !hasSearched) {
      setFilteredData(cafeList);
    }
  }, [visible, cafeList]);

  // Handle search input change
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    
    // If user clears the search after having searched, reset to original cafeList
    if (text.trim().length === 0 && hasSearched) {
      setHasSearched(false);
    }
  };

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
              <TouchableOpacity onPress={handleClearAndClose}>
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
                returnKeyType='search'
                onSubmitEditing={handleSearchSubmit}
                onChangeText={handleSearchInputChange}
              />
            </View>
          </View>
        </SafeAreaView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Results section */}
          <View style={styles.searchResultsOutline}>
            <Text style={styles.searchResultHeading}>
              {hasSearched ? 'Search results' : 'Recommendations'}
            </Text>
            <View style={styles.filteredItemsOutline}>
              {filteredData.length === 0 ? (
                <View style={{ width: '100%' }}>
                  <Text style={styles.noCafeText}>
                    {hasSearched ? 'No cafes found for your search.' : 'No cafes available.'}
                  </Text>
                </View>
              ) : (
                filteredData.map((cafe: any, index: number) => (
                  <CafeCard
                    key={index}
                    cafeName={cafe?.cafe_name}
                    cafeAddress={cafe?.address}
                    cafeImage={require('../../assets/images/cafe-image-rec.png')}
                    isFavorite={cafe?.isFavorite || false}
                  />
                ))
              )}
            </View>
          </View>
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
  },
  noCafeText: {
    color: 'white',
    fontFamily: futura.bold,
    textAlign: 'center',
    marginVertical: 10,
  },
});
