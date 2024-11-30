import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
  ImageProps,
  TouchableOpacityProps,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {AppFont} from '../../Text/AppFonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, Tertiary} from '../../colors/Colors';
import {AppIcons} from '../../assets/icons/AppIcons';
interface textfield {
  title?: string;
  Pcolor?: TextInputProps['placeholderTextColor'];
  icon?: ImageProps['source'];
  resizeMode?: ImageProps['resizeMode'];
  Image1?: ImageStyle;
  icon2?: ImageProps['source'];
  resizeMode1?: ImageProps['resizeMode'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  ispassword?: boolean;
  onhide?: TouchableOpacityProps['onPress'];
  value?: TextInputProps['value'];
  onChangeText?: TextInputProps['onChangeText'];
  stylesmain?: ViewStyle;
  tintColor?: ImageProps['tintColor'];
}

const TextField: React.FC<textfield> = ({
  title,
  Pcolor,
  icon,
  resizeMode,
  Image1,
  icon2,
  resizeMode1,
  secureTextEntry,
  ispassword,
  onhide,
  value,
  onChangeText,
  stylesmain,
  tintColor,
}) => {
  const [isfocus, setfocus] = useState(false);
  return (
    <View
      style={[
        styles.main,
        stylesmain,
        {borderColor: isfocus ? Colors.Primary : Tertiary.gray},
      ]}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>  
      {icon && (
        <TouchableOpacity style={styles.btn1}>
          <Image
            tintColor={tintColor}
            style={[styles.img1, Image1]}
            source={icon}
            resizeMode={resizeMode}
            />
        </TouchableOpacity>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholder={title}
        placeholderTextColor={Pcolor}
        onFocus={() => {
          setfocus(true);
        }}
        onBlur={() => {
          setfocus(false);
        }}
        />
        </View>
      {ispassword && (
        <TouchableOpacity activeOpacity={0.8} onPress={onhide}>
          <Image
            style={styles.img2}
            resizeMode="contain"
            tintColor={secureTextEntry ? 'gray' : 'gray'}
            source={secureTextEntry ? AppIcons.closeeye : AppIcons.openeye}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles: any = StyleSheet.create({
  main: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Tertiary.gray,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent:'space-between'
  },
  img1: {
    width: 24,
    height: 24,
  },
  img2: {
    width: 24,
    height: 24,
  },
  input: {
    paddingHorizontal: 10,
    fontFamily: AppFont.RobotoMedium,
    color: 'black',
    width:250
  },
});

export default TextField;

// import {Image, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import {Colors, Tertiary} from '../../colors/Colors';
// import Vectoricons from '../../assets/icons/Vectoricons';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import {AppFont} from '../../Text/AppFonts';

// const TextInput = ({
//   title,
//   color,
//   style,
//   name,
//   secureTextEntry,
//   onChangeText,
//   styletxt,
//   icons,
//   image,
//   ispassword,
//   onhide,
//   keyboardType,
//   styleinput,
//   stylefield,
//   tintColor,
//   styleimg,
//   value,
// }) => {
//   const [isfocus, setfocus] = useState(false);
//   return (
//     <View
//       style={[
//         styles.input,
//         {borderColor: isfocus ? Colors.Primary : Tertiary.gray},
//         stylefield,
//       ]}>
//       {icons && (
//         <TouchableOpacity onPress={onhide}>
//           <Image
//             style={[{width: 20, height: 20}, styleimg]}
//             resizeMode="contain"
//             source={icons}
//           />
//         </TouchableOpacity>
//       )}
//       <TextInput
//         value={value}
//         style={[styles.textinput, styleinput]}
//         placeholder={title}
//         placeholderTextColor={color}
//         fontFamily={AppFont.RobotoBold}
//         secureTextEntry={secureTextEntry}
//         onChangeText={onChangeText}
// onFocus={() => {
//   setfocus(true);
// }}
// onBlur={() => {
//   setfocus(false);
// }}
//         keyboardType={keyboardType}
//       />
// {ispassword && (
//   <TouchableOpacity onPress={onhide}>
//     <Image
//       style={{width: 20, height: 20}}
//       resizeMode="contain"
//       tintColor={secureTextEntry ? 'gray' : 'black'}
//       source={
//         secureTextEntry ? (
//           <Vectoricons name={'eye'} size={24} />
//         ) : (
//           <Vectoricons

//             size={24}
//             name={'eye-slash'}
//           />
//         )
//       }
//     />
//   </TouchableOpacity>
// )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: '#FAFAFA',
//     width: wp('90'),
//     flexDirection: 'row',
//     height: hp('6.8'),
//     borderRadius: 8,
//     // marginLeft: wp('5'),
//     marginBottom: hp('1'),
//     // alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // borderBlockColor:'#FAFAFA',
//     borderWidth: 1,
//   },
//   text3: {
//     // backgroundColor:'pink',
//     color: 'black',
//     marginLeft: wp('1'),
//     fontFamily: 'Roboto-Regular',
//     marginBottom: hp('0.8'),
//   },
//   textinput: {
//     width: wp('82'),
//     // paddingLeft:10,
//     fontFamily: AppFont.RobotoBold,
//   },
// });

// export default TextInput;
