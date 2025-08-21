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
import React, { useState } from 'react';
import { futura } from '../../constants/fonts_exports';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../Buttons/CustomButtons';
import { appColors } from '../../constants/colors';
import { isAndroid } from '../../constants/variables';
import CustomDropdown from '../DropDown/CustomDropDown';

const height = Dimensions.get('window').height;

interface BottomSheetProps {
  onClose: (event: GestureResponderEvent) => void; // Required prop: onClose event handler
}

// CustomButton component with typed props
const FilterCafeBottomSheet: React.FC<BottomSheetProps> = ({ onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationData = [
    { label: 'Value 1', value: 'Value 1' },
    { label: 'Value 2', value: 'Value 2' },
    { label: 'Value 3', value: 'Value 3' },
    { label: 'Value 4', value: 'Value 4' },
  ];

  const handleDropdownChange = (selectedItem: any) => {
    setSelectedLocation(selectedItem);
  };

  return (
    <View style={styles.outline}>
      <ScrollView scrollEnabled>
        <View style={styles.rowBetweenCenter}>
          <Text style={styles.heading}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require('../../assets/images/close.png')}
              style={{ height: 20, width: 20, resizeMode: 'cover' }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <CustomDropdown
            label={'Location'}
            placeHolder="Select Location"
            data={locationData}
            value={''}
            onChange={() => {}}
          />
          <CustomDropdown
            label={'Date'}
            placeHolder="Select date"
            data={locationData}
            value={''}
            onChange={() => {}}
          />
          <CustomDropdown
            label={'Music category'}
            placeHolder="Select music category"
            data={locationData}
            value={''}
            onChange={() => {}}
          />
          <CustomDropdown
            label={'Slots'}
            placeHolder="Select slots"
            data={locationData}
            value={''}
            onChange={() => {}}
          />
          <CustomDropdown
            label={'Flagship stores'}
            placeHolder="Select flagship store"
            data={locationData}
            value={''}
            onChange={() => {}}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <CustomButton
            height={45}
            width="100%"
            text={'Apply'}
            onPress={() => {}}
          />
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
    // justifyContent: 'space-between',
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
  label: {
    color: '#E4DAD7',
    fontFamily: futura.medium,
    fontSize: 17,
  },
  dropDownOutline: {
    paddingVertical: 8,
  },
  dropDown: {
    backgroundColor: appColors.dropDownColor,
    padding: 12,
    fontFamily: futura.medium,
    borderRadius: 8, // Add border radius for better design
    marginTop: 8, // Space between the label and dropdown
  },
  dropDownPlaceHolder: {
    fontFamily: futura.book,
    color: '#221F20',
  },
  dropDownItemContainerStyle: {
    backgroundColor: appColors.dropDownColor,
    fontFamily: futura.medium,
    borderRadius: 8,
  },
});
