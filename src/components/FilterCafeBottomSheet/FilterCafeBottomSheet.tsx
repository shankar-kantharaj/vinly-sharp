import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { futura } from '../../constants/fonts_exports';
import CustomButton from '../Buttons/CustomButtons'; 
import CustomDropdown from '../DropDown/CustomDropDown';
import CustomMultiSelect from '../DropDown/CustomMutliSelect';
import {
  FilterDataTypeFromApi,
  FilterValuesForApiReqBody,
} from '../../api/auth/main/safety-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFilterDataByUser } from '../../redux/reducers/filterReducer';

const height = Dimensions.get('window').height;

interface BottomSheetProps {
  onClose: (event: GestureResponderEvent) => void;
  onApplyFilters?: (filters: FilterValuesForApiReqBody) => void;
  filterData?: FilterDataTypeFromApi;
  userLocation?: { latitude: number; longitude: number }; // Add user location prop
}

const FilterCafeBottomSheet: React.FC<BottomSheetProps> = ({
  onClose,
  onApplyFilters,
  filterData,
  userLocation = { latitude: 12.9661, longitude: 77.5846 }, // Default location
}) => {
  const { filterDataByUser } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  // Define initial filter state
  const initialFilters: FilterValuesForApiReqBody = {
    availability: 'Available',
    amenities: [],
    music_genre: [],
    category: '',
    location_id: '',
    timings: {
      day: '',
      start_time: '',
      end_time: '',
    },
    sortby: '',
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
  };

  const [filters, setFilters] =
    useState<FilterValuesForApiReqBody>(initialFilters);

  // Initialize filters with existing filterDataByUser values on component mount
  useEffect(() => {
    setFilters({
      availability: 'Available',
      amenities: filterDataByUser.amenities || [],
      music_genre: filterDataByUser.music_genre || [],
      category: filterDataByUser.category || '',
      location_id: filterDataByUser.location_id || '',
      timings: {
        day: filterDataByUser.timings?.day || '',
        start_time: filterDataByUser.timings?.start_time || '',
        end_time: filterDataByUser.timings?.end_time || '',
      },
      sortby: filterDataByUser.sortby || '',
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  }, [filterDataByUser]);

  // Convert data for dropdown format
  const locationOptions = filterData?.servicable_locations.map(loc => ({
    label: loc.location_name,
    value: loc.location_id,
  }));

  const amenityOptions = filterData?.amenities.map(item => ({
    label: item,
    value: item,
  }));

  const musicGenreOptions = filterData?.music_genre.map(item => ({
    label: item,
    value: item,
  }));

  // Map sortby values to match API expectations
  const sortByOptions = filterData?.sortby.map(item => {
    let apiValue = item.toLowerCase();
    if (item.includes('Distance')) apiValue = 'distance';
    else if (item.includes('Rating')) apiValue = 'rating';
    else if (item.includes('Price')) apiValue = 'price';

    return {
      label: item,
      value: apiValue,
    };
  });

  const categoryOptions = filterData?.category.map(item => ({
    label: item,
    value: item,
  }));

  const dayOptions = filterData?.timings.days.map(day => ({
    label: day,
    value: day,
  }));

  const startTimeOptions = filterData?.timings.start_times.map(time => ({
    label: time,
    value: time,
  }));

  const endTimeOptions = filterData?.timings.end_times.map(time => ({
    label: time,
    value: time,
  }));

  // Update filter change handlers to match new structure
  const handleFilterChange = (key: string, value: any) => {
    if (key.startsWith('timings.')) {
      const timingKey = key.split('.')[1];
      setFilters(prev => ({
        ...prev,
        timings: {
          ...prev.timings,
          [timingKey]: value,
        },
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleApplyFilters = () => {
    // Create clean filter object for API
    const apiFilters = {
      ...filters,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    };

    if (onApplyFilters) {
      onApplyFilters(apiFilters);
    }
    onClose({} as GestureResponderEvent);
  };

  const handleClearFilters = () => {
    dispatch(setFilterDataByUser(initialFilters)); 
  };

  console.log(filterDataByUser, 'filterDataByUserfilterDataByUser');
  return (
    <View style={styles.outline}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.rowBetweenCenter}>
          <Text style={styles.heading}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require('../../assets/images/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Location Filter */}
        <CustomDropdown
          label={'Location'}
          placeHolder="Select Location"
          data={locationOptions || []}
          value={filters.location_id}
          onChange={selectedItem =>
            handleFilterChange('location_id', selectedItem.value)
          }
        />

        {/* Category Filter */}
        <CustomDropdown
          label={'Category'}
          placeHolder="Select category"
          data={categoryOptions || []}
          value={filters.category}
          onChange={selectedItem =>
            handleFilterChange('category', selectedItem.value)
          }
        />

        {/* Music Genre Filter */}
        <CustomMultiSelect
          label={'Music Genre'}
          placeHolder="Select music genres"
          data={musicGenreOptions || []}
          value={filters.music_genre}
          onChange={selected => handleFilterChange('music_genre', selected)}
        />

        {/* Amenities Filter */}
        <CustomMultiSelect
          label={'Amenities'}
          placeHolder="Select amenities"
          data={amenityOptions || []}
          value={filters.amenities}
          onChange={selected => handleFilterChange('amenities', selected)}
        />

        {/* Timing Filters */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Timing Preferences</Text>

          <CustomDropdown
            label={'Day'}
            placeHolder="Select day"
            data={dayOptions || []}
            value={filters.timings.day}
            onChange={selectedItem =>
              handleFilterChange('timings.day', selectedItem.value)
            }
          />

          <View style={styles.timeRow}>
            <View style={styles.timeColumn}>
              <CustomDropdown
                label={'Start Time'}
                placeHolder="Start"
                data={startTimeOptions || []}
                value={filters.timings.start_time}
                onChange={selectedItem =>
                  handleFilterChange('timings.start_time', selectedItem.value)
                }
              />
            </View>
            <View style={styles.timeColumn}>
              <CustomDropdown
                label={'End Time'}
                placeHolder="End"
                data={endTimeOptions || []}
                value={filters.timings.end_time}
                onChange={selectedItem =>
                  handleFilterChange('timings.end_time', selectedItem.value)
                }
              />
            </View>
          </View>
        </View>

        {/* Sort By Filter */}
        <CustomDropdown
          label={'Sort By'}
          placeHolder="Select sorting option"
          data={sortByOptions || []}
          value={filters.sortby}
          onChange={selectedItem =>
            handleFilterChange('sortby', selectedItem.value)
          }
        />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <CustomButton
              height={45}
              width="48%"
              text={'Clear'}
              onPress={handleClearFilters}
              backgroundColor="#ECEBDB"
              textColor="#561314"
            />
            <CustomButton
              height={45}
              width="48%"
              text={'Apply'}
              onPress={handleApplyFilters}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterCafeBottomSheet;

const styles = StyleSheet.create({
  outline: {
    height: height * 0.7,
    padding: 20,
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  heading: {
    color: '#E4DAD7',
    fontFamily: futura.bold,
    fontSize: 18,
  },
  closeIcon: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
  label: {
    color: '#E4DAD7',
    fontFamily: futura.medium,
    fontSize: 16,
    marginBottom: 8,
  },
  sectionContainer: {
    marginVertical: 8,
  },
  sectionHeading: {
    color: '#E4DAD7',
    fontFamily: futura.bold,
    fontSize: 16,
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeColumn: {
    flex: 0.48,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
