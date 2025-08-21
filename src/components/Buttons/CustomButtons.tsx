import React from 'react';
import { TouchableOpacity, Image, StyleSheet, GestureResponderEvent, Text } from 'react-native';
import { futura } from '../../constants/fonts_exports';
import { appColors } from '../../constants/colors';

// Define types for the props
interface CustomButtonProps {
  text: string; // Required prop: Text displayed on the button
  onPress: (event: GestureResponderEvent) => void; // Required prop: onPress event handler
  backgroundColor?: string; // Optional: Background color of the button
  textColor?: string; // Optional: Text color
  width?: string; // Optional: Width of the button
  height?: number; // Optional: Height of the button
  borderRadius?: number; // Optional: Border radius of the button
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
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width, height, borderRadius } as object]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
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
    fontFamily: futura.medium
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
    resizeMode: 'contain',
  },
});

export default CustomButton;
