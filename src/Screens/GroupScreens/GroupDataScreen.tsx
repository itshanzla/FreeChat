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
    source?:any
    onPress1?:()=>void
  }
  
  const GroupDataScreen = ({
    name,
    email,
    Desc,
    message,
    onPress,
    onPress1,
    source
  } : contact)  => {
    return (
      <View style={styles.container}>
        <TouchableOpacity  onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Image source={source} style={styles.img} />
          <View style={{marginTop: 5}}>
            <Text style={styles.txt}>{name}</Text>
            <Text style={styles.txt2}>{Desc}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <Text onPress={onPress1} style={styles.txt3}>
          {message}
        </Text>
      </View>
    );
  };
  
  export default GroupDataScreen;
  
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
  