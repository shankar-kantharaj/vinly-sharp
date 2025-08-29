import React, { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { futura } from '../../constants/fonts_exports';
import { appColors } from '../../constants/colors';
import { isAndroid } from '../../constants/variables';
import { MaterialDesignIcons as MDIcon } from '@react-native-vector-icons/material-design-icons';

// Reusable MultiSelect Component
interface MultiSelectProps {
  label: string;
  value: string[];
  maxSelect?: number;
  dropDownPosition?: 'top' | 'bottom';
  placeHolder: string;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  data: { label: string; value: string }[];
  onChange: (selectedItems: string[]) => void;
}

const CustomMultiSelect: React.FC<MultiSelectProps> = ({
  data,
  value,
  label,
  onChange,
  dropDownPosition = 'bottom',
  maxSelect,
  placeHolder,
  enableSearch = true,
  searchPlaceholder = 'Search...',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if an item is selected
  const isSelected = (itemValue: string) => {
    return value.includes(itemValue);
  };

  // Get selected items data
  const getSelectedItemsData = () => {
    return data.filter(item => value.includes(item.value));
  };

  // Remove item from selection
  const removeItem = (itemValue: string) => {
    const newValue = value.filter(val => val !== itemValue);
    onChange(newValue);
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Custom rendering for selected items with limit of 3
  const renderSelectedItems = () => {
    const selectedItems = getSelectedItemsData();
    const displayItems = isExpanded ? selectedItems : selectedItems.slice(0, 3);
    const remainingCount = selectedItems.length - 3;

    return (
      <View style={styles.selectedItemsContainer}>
        {displayItems.map((item, index) => (
          <TouchableOpacity 
            key={`${item.value}-${index}`} 
            style={styles.selectedItemContainer}
            onPress={() => removeItem(item.value)}
          >
            <Text style={styles.selectedItemText}>{item.label}</Text>
            <View style={styles.removeButton}>
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.closeIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
        
        {!isExpanded && remainingCount > 0 && (
          <TouchableOpacity 
            style={[styles.selectedItemContainer, styles.remainingCountContainer]}
            onPress={toggleExpanded}
          >
            <Text style={[styles.selectedItemText, styles.remainingCountText]}>
              +{remainingCount} more
            </Text>
          </TouchableOpacity>
        )}

        {isExpanded && selectedItems.length > 3 && (
          <TouchableOpacity 
            style={[styles.selectedItemContainer, styles.remainingCountContainer]}
            onPress={toggleExpanded}
          >
            <Text style={[styles.selectedItemText, styles.remainingCountText]}>
              Show less
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
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
        dropdownPosition={dropDownPosition}
        maxSelect={maxSelect}
        search={enableSearch}
        placeholder={placeHolder}
        style={styles.multiSelect}
        itemTextStyle={styles.itemText}
        selectedStyle={styles.hiddenSelectedStyle}
        searchPlaceholder={searchPlaceholder}
        containerStyle={styles.containerStyle}
        selectedTextStyle={styles.selectedText}
        inputSearchStyle={styles.inputSearchStyle}
        activeColor={appColors.dropDownItemActiveColor}
        placeholderStyle={styles.multiSelectPlaceHolder}
        itemContainerStyle={styles.multiSelectItemContainerStyle}
        // Custom rendering for dropdown items
        renderItem={item => (
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
        // Hide the default selected items rendering with empty view
        renderSelectedItem={() => <View />}
      />
      
      {/* Custom selected items display */}
      {value.length > 0 && renderSelectedItems()}
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
    maxHeight: 250, // Limit dropdown height
  },
  hiddenSelectedStyle: {
    height: 0,
    width: 0,
    opacity: 0,
    position: 'absolute',
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
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
  remainingCountContainer: {
    backgroundColor: appColors.primary,
  },
  selectedItemText: {
    fontFamily: futura.medium,
    color: '#221F20',
    fontSize: 14,
  },
  remainingCountText: {
    color: '#FFFFFF', // White text for primary background
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
