import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


interface ButtonProps{
    text: string
}
const GradientButton = (props:ButtonProps) => {
    const {text} = props;
  return (
    <LinearGradient 
      colors={['#DE5461', '#581415']}
      start={{ x: 0, y: 0 }} // Starting point (left)
      end={{ x: 1, y: 0 }}
      style={{ borderRadius: 6, borderColor: '#DF5461', borderWidth: 1.5, paddingHorizontal: 20, paddingVertical: 4}}
    >
      <Text style={{color: 'white',fontFamily: 'Bh-Bold', fontSize: 13}}>{text}</Text>
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
