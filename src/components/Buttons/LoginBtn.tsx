import {
  Dimensions,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors, Tertiary} from '../../colors/Colors';
const {height, width} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../assets/images/AppImages';
import {fontSize} from '../../Text/fontsize';
import {AppFont} from '../../Text/AppFonts';
interface loginbtn {
  styletxt?:TextStyle;
  title?:string;
  stylebtn?:ViewStyle;
  onPress?:()=>void;
  icon?:ImageProps;
  styleicon?:ImageProps;
  styleview?:ViewStyle;
}

const LoginBtn = ({
  styletxt,
  title,
  stylebtn,
  onPress,
  icon,
  styleicon,
  styleview,
}:loginbtn) => {
  return (
    <View style={[{alignItems: 'center'}, styleview]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.btn2, stylebtn]}>
        {icon && (
          <Image
            style={[styles.icon, styleicon]}
            resizeMode="contain"
            source={icon}
          />
        )}
        <Text style={[styles.text5, styletxt]}>{title}</Text>
        {/* <Image source={props.slide} /> */}
      </TouchableOpacity>
    </View>
  );
};

export {LoginBtn};

const styles = StyleSheet.create({
  btn2: {
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    width: 317,
    height: 57,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text5: {
    fontSize: fontSize.largemedium,
    fontFamily: AppFont.RobotoMedium,
    color: 'white',
    padding: 12,
    alignSelf: 'center',
  },
  icon: {
    width: 16,
    height: 20,
  },
});
