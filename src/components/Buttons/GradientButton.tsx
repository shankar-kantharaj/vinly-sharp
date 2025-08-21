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
      // colors={['#DE5461', '#581415']}
      start={{ x: 0, y: 0 }} // Starting point (left)
      end={{ x: 1, y: 0 }}
      style={{ borderRadius: 6, borderColor: '#707070', borderWidth: 1.5, }}
    >
      <Text style={{color: 'white',fontFamily: bauhaus.bold, fontSize: 13,paddingHorizontal: 20, paddingVertical: 5}}>{text}</Text>
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
