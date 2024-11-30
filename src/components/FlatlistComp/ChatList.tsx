import {Image, ImageProps, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AppFont} from '../../Text/AppFonts';
import {fontSize} from '../../Text/fontsize';
import {Colors, Tertiary} from '../../colors/Colors';
import moment from 'moment';
export interface chatlist {
  image?:ImageProps;
  name?:string;
  email?:string;
  message?:string;
  txt?:string;
  count?: number
  onpress?:()=>void
}

const ChatList = ({image, name, email, message, count,onpress}:chatlist) => {
  const createdAtFormat = (createdAt: any) => {
    const miliseconds =
      createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000;
    const date = new Date(miliseconds);
    const currentTimeStamp = Date.now();
    const DiffInMiliSecs = currentTimeStamp - date.getTime();
    if (DiffInMiliSecs < 60000) {
      //less than a minute
      return 'Just Now';
    } else if (DiffInMiliSecs < 3600000) {
      //less than an hour
      const minutes = Math.floor(DiffInMiliSecs / 60000);
      return `${minutes} mins`;
    } else if (moment(date).isSame(currentTimeStamp, 'day')) {
      //same day
      return moment(date).format('hh:mm');
    } else {
      return moment(date).format('MMM DD'); //older than a day
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={image} style={styles.img} />
        <TouchableOpacity onPress={onpress} style={{width: wp(65)}} activeOpacity={0.7}>
          <View style={{marginTop: 5}}>
            <Text style={styles.txt}>{name}</Text>
            <Text style={styles.txt2}>{message}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.txt3}>{email ? createdAtFormat(email) : ''} </Text>
        {
          count!= 0 &&
          <Text style={styles.txt4}>{count}</Text>
        }
      </View>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: Tertiary.offwhite,
    marginVertical: 4,
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
    color: Colors.Primary,
    fontSize: fontSize.extrasmall,
  },
  txt3: {
    fontFamily: AppFont.RobotoRegular,
    fontSize: fontSize.extrasmall,
    marginRight: 10,
    color: Tertiary.lightgray,
    marginTop: 10,
  },
  txt4: {
    backgroundColor: Colors.Primary,
    height: 16,
    width: 16,
    borderRadius: 100,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: fontSize.extrasmall,
    color: 'white',
    fontFamily: AppFont.RobotoRegular,
    marginLeft: 20,
    marginTop: 5,
  },
});
