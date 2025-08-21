import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View } from 'react-native';
import { futura } from '../../constants/fonts_exports';
import { appColors } from '../../constants/colors';
import { isAndroid } from '../../constants/variables';

// Reusable Dropdown Component
interface DropdownProps {
  label: string;
  placeHolder: string;
  value: string | null;
  data: { label: string; value: string }[];
  onChange: (selectedItem: any) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  placeHolder,
  value,
  data,
  onChange,
}) => {
  return (
    <View style={styles.dropDownOutline}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        data={data}
        keyboardAvoiding
        value={value}
        labelField="label" 
        valueField="value" 
        onChange={onChange}
        style={styles.dropDown}
        placeholder={placeHolder}
        activeColor='#ada493'
        containerStyle={styles.containerStyle}
        selectedTextStyle={styles.selectedText}  
        itemTextStyle={{ fontFamily: futura.book }}
        placeholderStyle={styles.dropDownPlaceHolder}
        itemContainerStyle={styles.dropDownItemContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownOutline: {
    paddingVertical: 8,
  },
  selectedText: {
    fontFamily: futura.medium,
  },
  label: {
    color: '#E4DAD7',
    fontFamily: futura.medium,
    fontSize: 17,
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
  containerStyle: {
    marginTop: isAndroid ? -20 : 0,
    borderRadius: 8,
    backgroundColor: appColors.dropDownColor,
  },
});

export default CustomDropdown;
