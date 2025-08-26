import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { bauhaus, futura } from '../../constants/fonts_exports';


interface ButtonProps{
    text: string
}
const GradientButton = (props:ButtonProps) => {
    const {text} = props;
  return (
    <LinearGradient 
      colors={['#656263','#242021']} 
      start={{ x: 0, y: 0 }} // Starting point (left)
      end={{ x: 1, y: 0 }}
      style={styles.buttonStyle}
    >
      <Text style={styles.buttonTextStyle}>{text}</Text>
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 6,
    borderColor: '#707070',
    borderWidth: 1.5,
  },
  buttonTextStyle: {
    color: 'white',
    fontFamily: bauhaus.bold,
    fontSize: 13,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
