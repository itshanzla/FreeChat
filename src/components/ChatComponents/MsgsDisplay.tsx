import {
  Animated,
  FlatList,
  FlatListProps,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, forwardRef, useEffect, useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Colors, Tertiary} from '../../colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AppFont} from '../../Text/AppFonts';
import {fontSize} from '../../Text/fontsize';
import moment from 'moment';
import {msg} from '../../ChatScreens/GiftChat';
interface msgsdisplay {
  showsVerticalScrollIndicator?: boolean;
  renderItem?: () => void;
  data?: msg[];
  keyExtractor?: () => void;
  onContentSizeChange?: () => void;
  image?: string;
}
const MsgsDisplay = ({data, onContentSizeChange, image}: msgsdisplay) => {
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
  const flatlistref: any = useRef(null);
  useEffect(() => {
    flatlistref?.current?.scrollToEnd({animated: false});
  }, [data]);

  const RenderItem = ({item}: any) => {
    const isSender = item.sentby == auth()?.currentUser?.uid;
    return isSender ? (
      <View style={styles.myMain}>
        <Text style={styles.mytext}>{item.text}</Text>
        {item?.SendedImage && (
          <Image
            resizeMode="contain"
            style={{
              height: 200,
              width: 200,
              padding: 20,
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 5,
            }}
            source={{uri: item?.SendedImage}}
          />
        )}
        {/* <Text style={styles.mytimestamp}>{item?.FormatCreatedAt ?? ''}</Text> */}
      </View>
    ) : (
      <View style={styles.userMain}>
        <Text style={styles.usertext}>{item.text}</Text>
        {item?.SendedImage && (
          <Image
            style={{height: 200, width: 200}}
            source={{uri: item?.SendedImage}}
          />
        )}
        {/* <Text style={styles.usertimestamp}>{item?.FormatCreatedAt ?? ''}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={RenderItem}
          data={data}
          keyExtractor={(item: any) => item?._id}
          ref={flatlistref}
          onContentSizeChange={() =>
            flatlistref.current.scrollToEnd({animated: false})
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default MsgsDisplay;

const styles = StyleSheet.create({
  myMain: {
    backgroundColor: Colors.Primary,
    flex: 1,
    padding: 15,
    margin: 4,
    alignSelf: 'flex-end',
    marginRight: 14,
    borderRadius: 20,
    maxWidth: '70%',
  },
  mytext: {
    color: 'white',
    fontFamily: AppFont.RobotoMedium,
    fontSize: fontSize.smalltxt,
    lineHeight: 20,
  },
  mytimestamp: {
    alignSelf: 'flex-end',
    fontSize: fontSize.extrasmall,
    fontFamily: AppFont.RobotoRegular,
  },
  userMain: {
    backgroundColor: Tertiary.mildgray,
    flex: 1,
    padding: 15,
    margin: 4,
    alignSelf: 'flex-start',
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 20,
    maxWidth: '70%',
  },
  usertext: {
    color: 'black',
    fontFamily: AppFont.RobotoMedium,
    fontSize: fontSize.smalltxt,
    lineHeight: 20,
  },
  usertimestamp: {
    alignSelf: 'flex-end',
    fontSize: fontSize.extrasmall,
    fontFamily: AppFont.RobotoRegular,
  },
});
// createdAt
// August 2, 2024 at 2:05:54 PM UTC+5
// (timestamp)

// sentTo
// "gzV2Xr5N9zgrXwTClawBbEG8uMI3"
// (string)

// sentby
// "PEyDRl3AGHTmBiGAZU72BfXEOY53"
// (string)

// text
// "Hi"
