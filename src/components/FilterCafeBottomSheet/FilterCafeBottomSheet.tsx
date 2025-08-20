import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { futura } from '../../constants/fonts_exports';
import { Dropdown } from 'react-native-element-dropdown';

const FilterCafeBottomSheet = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationData = [
    { label: 'Location 1', value: 'Location 1' },
    { label: 'Location 2', value: 'Location 2' },
    { label: 'Location 3', value: 'Location 3' },
    { label: 'Location 4', value: 'Location 4' },
  ];

  const handleDropdownChange = (selectedItem: any) => {
    setSelectedLocation(selectedItem);
  };

  return (
    <View style={styles.outline}>
      <View style={styles.rowBetweenCenter}>
        <Text style={styles.heading}>Filters</Text>
        <Text style={{ color: 'white', fontWeight: '900' }}>X</Text>
      </View>
      <View>
        <View style={styles.dropDownOutline}>
          <Text style={styles.label}>Location</Text>
          <Dropdown
            value={selectedLocation}
            placeholder="Select Location"
            placeholderStyle={styles.dropDownPlaceHolder}
            style={styles.dropDown}
            data={locationData}
            labelField="label" // Field for displaying items in dropdown
            valueField="value" // Field for selected item value
            onChange={handleDropdownChange} // Handle value change
          />
        </View>
        <View style={styles.dropDownOutline}>
          <Text style={styles.label}>Date</Text>
          <Dropdown
            value={selectedLocation}
            placeholder="Select Location"
            placeholderStyle={styles.dropDownPlaceHolder}
            style={styles.dropDown}
            data={locationData}
            labelField="label" // Field for displaying items in dropdown
            valueField="value" // Field for selected item value
            onChange={handleDropdownChange} // Handle value change
          />
        </View>
        <View style={styles.dropDownOutline}>
          <Text style={styles.label}>Music category</Text>
          <Dropdown
            value={selectedLocation}
            placeholder="Select Location"
            placeholderStyle={styles.dropDownPlaceHolder}
            style={styles.dropDown}
            data={locationData}
            labelField="label" // Field for displaying items in dropdown
            valueField="value" // Field for selected item value
            onChange={handleDropdownChange} // Handle value change
          />
        </View>
        <View style={styles.dropDownOutline}>
          <Text style={styles.label}>Slots</Text>
          <Dropdown
            value={selectedLocation}
            placeholder="Select Location"
            placeholderStyle={styles.dropDownPlaceHolder}
            style={styles.dropDown}
            data={locationData}
            labelField="label" // Field for displaying items in dropdown
            valueField="value" // Field for selected item value
            onChange={handleDropdownChange} // Handle value change
          />
        </View>
        <View style={styles.dropDownOutline}>
          <Text style={styles.label}>Flagship shores</Text>
          <Dropdown
            value={selectedLocation}
            placeholder="Select Location"
            placeholderStyle={styles.dropDownPlaceHolder}
            style={styles.dropDown}
            data={locationData}
            labelField="label" // Field for displaying items in dropdown
            valueField="value" // Field for selected item value
            onChange={handleDropdownChange} // Handle value change
          />
        </View>
      </View>
    </View>
  );
};

export default FilterCafeBottomSheet;

const styles = StyleSheet.create({
  outline: {
    padding: 20,
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
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
  dropDownOutline:{
    paddingVertical: 8,
  },
  dropDown: {
    backgroundColor: '#C9BDAA',
    padding: 12,
    fontFamily: futura.medium,
    borderRadius: 8, // Add border radius for better design
    marginTop: 10, // Space between the label and dropdown
  },
  dropDownPlaceHolder: {
    fontFamily: futura.book,
    color: '#221F20',
  },
});
