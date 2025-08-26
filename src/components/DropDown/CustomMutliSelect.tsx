import React from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { futura } from '../../constants/fonts_exports';
import { appColors } from '../../constants/colors';
import { isAndroid } from '../../constants/variables';
import {MaterialDesignIcons as MDIcon} from '@react-native-vector-icons/material-design-icons';

// Reusable MultiSelect Component
interface MultiSelectProps {
  label: string;
  placeHolder: string;
  value: string[];
  data: { label: string; value: string }[];
  onChange: (selectedItems: string[]) => void;
  maxSelect?: number; // Optional: Limit maximum selections
  searchPlaceholder?: string; // Optional: Search placeholder text
  enableSearch?: boolean; // Optional: Enable/disable search functionality
}

const CustomMultiSelect: React.FC<MultiSelectProps> = ({
  label,
  placeHolder,
  value,
  data,
  onChange,
  maxSelect,
  searchPlaceholder = 'Search...',
  enableSearch = true,
}) => {
  // Check if an item is selected
  const isSelected = (itemValue: string) => {
    return value.includes(itemValue);
  };

  return (
    <View style={styles.multiSelectOutline}>
      <Text style={styles.label}>{label}</Text>
      <MultiSelect
        data={data}
        value={value}
        keyboardAvoiding
        valueField="value"
        labelField="label"
        onChange={onChange}
        maxSelect={maxSelect}
        search={enableSearch}
        placeholder={placeHolder}
        style={styles.multiSelect}
        itemTextStyle={styles.itemText}
        selectedStyle={styles.selectedStyle}
        searchPlaceholder={searchPlaceholder}
        containerStyle={styles.containerStyle}
        selectedTextStyle={styles.selectedText}
        inputSearchStyle={styles.inputSearchStyle}
        activeColor={appColors.dropDownItemActiveColor}
        placeholderStyle={styles.multiSelectPlaceHolder}
        itemContainerStyle={styles.multiSelectItemContainerStyle}
        // Custom rendering for dropdown items
        renderItem={(item) => (
          <View style={styles.itemContainer}>
            <MDIcon
              name={
                isSelected(item.value)
                  ? 'check-circle'
                  : 'checkbox-blank-circle-outline'
              }
              size={24}
              color={appColors.primary}
            />
            <Text style={styles.itemTextWithIcon}>{item.label}</Text>
          </View>
        )}
        // Custom rendering for selected items
        renderSelectedItem={(item, unSelect) => (
          <View style={styles.selectedItemContainer}>
            <Text style={styles.selectedItemText}>{item.label}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => unSelect && unSelect(item)}
            >
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  multiSelectOutline: {
    paddingVertical: 8,
  },
  label: {
    color: '#E4DAD7',
    fontFamily: futura.medium,
    fontSize: 17,
  },
  multiSelect: {
    backgroundColor: appColors.dropDownColor,
    padding: 12,
    fontFamily: futura.medium,
    borderRadius: 8,
    marginTop: 8,
  },
  selectedText: {
    fontFamily: futura.medium,
    color: '#221F20',
  },
  itemText: {
    fontFamily: futura.book,
    color: '#221F20',
    fontSize: 13,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemTextWithIcon: {
    fontFamily: futura.medium,
    color: '#221F20',
    fontSize: 13,
    marginLeft: 12,
    flex: 1,
  },
  multiSelectPlaceHolder: {
    fontFamily: futura.book,
    color: '#221F20',
  },
  multiSelectItemContainerStyle: {
    backgroundColor: appColors.dropDownColor,
    fontFamily: futura.medium,
    borderRadius: 8,
  },
  containerStyle: {
    marginTop: isAndroid ? -20 : 0,
    borderRadius: 8,
    backgroundColor: appColors.dropDownColor,
    maxHeight: 200, // Limit dropdown height
  },
  selectedStyle: {
    backgroundColor: '#ada493',
    borderRadius: 15,
    marginRight: 8,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ada493',
    borderRadius: 15,
    marginRight: 8,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedItemText: {
    fontFamily: futura.medium,
    color: '#221F20',
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 8,
    fontSize: 18,
    color: '#221F20',
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    backgroundColor: appColors.dropDownColor,
    borderRadius: 8,
    fontFamily: futura.medium,
    color: '#221F20',
    fontSize: 16,
  },
  closeIcon: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    tintColor: appColors.primary,
  },
});

export default CustomMultiSelect;
