import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AppFont} from '../../Text/AppFonts';
import {fontSize} from '../../Text/fontsize';
import {Colors, Tertiary} from '../../colors/Colors';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {Images} from '../../assets/images/AppImages';
interface groupcontact {
  name?: string;
  email?: string;
  Desc?: string;
  message?: string;
  onPress?: () => void;
  stylesbtn?: ViewStyle
  
}

const GroupContact = ({name, email, message, onPress,stylesbtn}: groupcontact) => {

   

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>onPress && onPress()} activeOpacity={0.7} style={[styles.btn,stylesbtn]}>
        <View style={[{flexDirection: 'row'}]}>
          <Image source={Images.Image4} style={styles.img} />
          <View style={{marginTop: 5}}>
            <Text style={styles.txt}>{name}</Text>
            <Text style={styles.txt2}>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GroupContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  img: {
    width: 42,
    height: 42,
    borderRadius: 100,
  },
  txt: {
    marginLeft: 10,
    fontFamily: AppFont.RobotoMedium,
    color: Tertiary.black,
    fontSize: fontSize.mediumtxt,
  },
  txt2: {
    marginLeft: 10,
    fontFamily: AppFont.RobotoRegular,
    color: Tertiary.lightgray,
    fontSize: fontSize.extrasmall,
  },
  txt3: {
    fontFamily: AppFont.RobotoRegular,
    fontSize: fontSize.extrasmall,
    marginRight: 10,
    color: Colors.Primary,
    marginTop: 10,
  },
  btn:{
    width:300
  }
});
