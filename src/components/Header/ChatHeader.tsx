import {Image, ImageProps, StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import React from 'react';
import {AppIcons} from '../../assets/icons/AppIcons';
import {Colors, Tertiary} from '../../colors/Colors';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Images} from '../../assets/images/AppImages';
import {fontSize} from '../../Text/fontsize';
import {AppFont} from '../../Text/AppFonts';
import {useNavigation} from '@react-navigation/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
interface chatheader{
  name?:string
  source?:any
  activeOpacity?:TouchableOpacityProps
  ellipsizeMode?:TextProps
  numberOfLines?:TextProps
  styleimg?:ImageProps

}
const ChatHeader = ({name,source,styleimg} : chatheader) => {
  const navigation: any = useNavigation();
  // const UserData : string = auth().currentUser;

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Tertiary.offwhite,
        justifyContent:"space-between"
      }}>
        <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn1}>
        <Image style={[styles.img1,styleimg]} source={AppIcons.Back} />
      </TouchableOpacity>
      <View style={styles.main1}>
        <Image style={styles.img2} source={source ? source : Images.Image7} />
        <View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.txt}>
            {name}
          </Text>
          <Text style={styles.txt1}>Online now</Text>
        </View>
      </View>
        </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn2}>
          <Image style={styles.img3} source={AppIcons.Video} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn2}>
          <Image style={styles.img4} source={AppIcons.Call} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  btn1: {
    width: 38,
    height: 38,
    backgroundColor: Tertiary.offwhite,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  img1: {
    width: 10,
    height: 16,
  },
  img2: {
    width: 38,
    height: 38,
    borderRadius:100
  },
  main1: {
    flexDirection: 'row',
    padding: 10,
  },
  txt: {
    marginLeft: 20,
    fontSize: fontSize.mediumtxt,
    fontFamily: AppFont.RobotoMedium,
    color: 'black',
    width: 110,
  },
  txt1: {
    marginLeft: 20,
    fontSize: fontSize.smalltxt,
    fontFamily: AppFont.RobotoRegular,
    color: Colors.Primary,
  },
  img3: {
    width: 38,
    height: 38,
  },
  img4: {
    width: 38,
    height: 38,
  },
  btn2: {
    width: 38,
    height: 38,
    backgroundColor: Colors.Primary,
    borderRadius: 6,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
