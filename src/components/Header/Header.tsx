import {Image, StyleSheet, Text, TouchableOpacity, View,ViewStyle,TextProps, ViewProps, TouchableOpacityProps, TextStyle, ImageSourcePropType, ImageProps} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import {AppFont} from '../../Text/AppFonts';
import {fontSize} from '../../Text/fontsize';
import {Tertiary} from '../../colors/Colors';
import ContactAdd from '../Modals/ContactModal';
interface header{
  Icon0?:ImageSourcePropType
  name?:string
  dot?:boolean,
  style?:ViewProps,
  onPress?:()=>void,
  styletxt?:TextStyle,
  tintColor?:ImageProps,
  onPress1?:()=>void,
  tintColor1?:ImageProps,
  Icon1?:ImageSourcePropType

}
const Header= ({
  Icon1,
  Icon0,
  name,
  dot,
  style,
  onPress,
  styletxt,
  tintColor,
  onPress1,
  tintColor1,
}:header) => {
  
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={onPress}>
        <Image resizeMode="contain" style={styles.Icon1} source={Icon0} />
      </TouchableOpacity>

      <Text style={[styles.text, styletxt]}>{name}</Text>
      <View>
      {Icon1 && (
        <TouchableOpacity onPress={onPress1}>
          <Image resizeMode="contain" style={styles.Icon2} source={Icon1} />
          {dot && <View style={styles.dot} />}
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal:10,
    marginBottom:20,
    marginTop:5
  },
  Icon1: {
    width: 24,
    height: 24,
  },
  btn: {
    width: 38,
    height: 38,
    borderRadius: 6,
    backgroundColor: Tertiary.offwhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: AppFont.RobotoBold,
    fontSize: fontSize.largemedium,
    color: 'black',
  },
  Icon2: {
    width: 38,
    height: 38,
    borderRadius:100,
  },
  dot: {
    backgroundColor: Tertiary.green,
    width: 8,
    height: 8,
    borderRadius: 8,
    alignSelf:'flex-end',
    top:2,
    right:2,
    position:'absolute',

    
  },
});
