import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
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
export interface contact {
  name?: string;
  email?: string;
  Desc?: string;
  message?: string;
  onPress?:()=>void;
}

const Contactlist = ({
  name,
  email,
  Desc,
  message,
  onPress,
} : contact)  => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={Images.Image4} style={styles.img} />
        <View style={{marginTop: 5}}>
          <Text style={styles.txt}>{name}</Text>
          <Text style={styles.txt2}>{email}</Text>
        </View>
      </View>

      <Text onPress={onPress} style={styles.txt3}>
        Message
      </Text>
    </View>
  );
};

export default Contactlist;

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
});
