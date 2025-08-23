import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent, Text, ViewStyle, TextStyle, DimensionValue } from 'react-native';
import { futura } from '../../constants/fonts_exports';
import { appColors } from '../../constants/colors';

// Define types for the props
interface CustomButtonProps {
  text: string; // Required prop: Text displayed on the button
  onPress: (event: GestureResponderEvent) => void; // Required prop: onPress event handler
  backgroundColor?: string; // Optional: Background color of the button
  textColor?: string; // Optional: Text color
  width?: DimensionValue; // Optional: Width of the button (can be percentage or number)
  height?: number; // Optional: Height of the button
  borderRadius?: number; // Optional: Border radius of the button
  disabled?: boolean; // Optional: Disabled state
}

// CustomButton component with typed props
const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  backgroundColor = appColors.primaryButton, // Default background color
  textColor = '#fff', // Default text color
  width = '100%', // Default width
  height = 50, // Default height
  borderRadius = 8, // Default border radius
  disabled = false, // Default disabled state
}) => {
  // Memoize styles to prevent unnecessary re-renders
  const buttonStyle: ViewStyle = useMemo(() => ({
    ...styles.button,
    backgroundColor: disabled ? '#cccccc' : backgroundColor,
    width,
    height,
    borderRadius,
    opacity: disabled ? 0.6 : 1,
  }), [backgroundColor, width, height, borderRadius, disabled]);

  const textStyle: TextStyle = useMemo(() => ({
    ...styles.text,
    color: disabled ? '#666666' : textColor,
  }), [textColor, disabled]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: futura.medium,
    fontWeight: '500',
  },
});

export default CustomButton;
