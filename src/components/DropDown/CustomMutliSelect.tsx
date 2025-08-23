import React from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { futura } from '../../constants/fonts_exports';
import { appColors } from '../../constants/colors';
import { isAndroid } from '../../constants/variables'; 

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
  searchPlaceholder = "Search...",
  enableSearch = true,
}) => {
  return (
    <View style={styles.multiSelectOutline}>
      <Text style={styles.label}>{label}</Text>
      <MultiSelect
        data={data}
        value={value}
        onChange={onChange}
        labelField="label"
        valueField="value"
        placeholder={placeHolder}
        searchPlaceholder={searchPlaceholder}
        maxSelect={maxSelect}
        search={enableSearch}
        keyboardAvoiding
        style={styles.multiSelect}
        activeColor='#ada493'
        containerStyle={styles.containerStyle}
        selectedTextStyle={styles.selectedText}
        itemTextStyle={styles.itemText}
        placeholderStyle={styles.multiSelectPlaceHolder}
        itemContainerStyle={styles.multiSelectItemContainerStyle}
        selectedStyle={styles.selectedStyle}
        inputSearchStyle={styles.inputSearchStyle}
        // Custom rendering for selected items
        renderSelectedItem={(item, unSelect) => (
          <View style={styles.selectedItemContainer}>
            <Text style={styles.selectedItemText}>{item.label}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => unSelect && unSelect(item)}>
              <Image
                source={require('../../assets/images/close.png')}
                style={{ height: 12, width: 12, resizeMode: 'contain', tintColor: appColors.primary }}
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
});

export default CustomMultiSelect;