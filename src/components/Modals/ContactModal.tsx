import {Image,ScrollView,StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, Tertiary } from '../../colors/Colors';
import { AppFont } from '../../Text/AppFonts';
import { fontSize } from '../../Text/fontsize';
import { AppIcons } from '../../assets/icons/AppIcons';
import Modal, { ModalProps, OnSwipeCompleteParams } from 'react-native-modal';
import TextField from '../TextInput/TextField';
import { LoginBtn } from '../Buttons/LoginBtn';
interface contactmodal{
  onBackButtonPress:() => void,
  onBackdropPress:()=>void,
  onPress:()=>void,
  toggleModal:()=>void,
  isVisible:boolean,
}

const ContactModal  = ({
  onBackButtonPress,
  onBackdropPress,
  onPress,
  toggleModal,
  isVisible
}:contactmodal) => {
  return (
    <Modal
    onBackButtonPress={onBackButtonPress}
    onBackdropPress={onBackdropPress}
    swipeDirection="down"
    onSwipeComplete={toggleModal}
    isVisible={isVisible}
    animationIn={'flipInX'}
    animationOut={'flipOutX'}
    >
    <View style={[styles.modalContent]}>
      <Text style={styles.txt}>
        Add Contacts
      </Text>
      <ScrollView style={{marginTop:20}}>
        <TextField Pcolor={'black'} title={'Enter Contact name'} />
        <TextField Pcolor={'black'} title={'Enter Contact Picture'} />
        <LoginBtn onPress={onPress} title={'Save Contact'} styleview={{marginTop:hp(20)}} />
      </ScrollView>
      
    </View>
  </Modal>
  );
};

export default ContactModal;

const styles = StyleSheet.create({
  txt: {
    color: Colors.Primary,
    fontFamily: AppFont.RobotoBold,
    fontSize: fontSize.largemedium,
    alignSelf:'center',
    marginTop:10
  },
  modalContent: {
    backgroundColor: Tertiary.offwhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position:'absolute',
    marginLeft: -15,
    bottom:-30,
    width: wp(100),
    height:hp(70)
  },
  txt1: {
    fontFamily: AppFont.SansBold,
    fontSize: fontSize.largemedium,
    color: 'black',
    // margin: 10,
    // paddingLeft: 3,
  },
  txt4: {
    fontFamily: AppFont.SansBold,
    fontSize: fontSize.mediumtxt,
    color: 'black',
    margin: 16,
    paddingLeft: 6,
  },
  main2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:14
  },
  txt2: {
    fontFamily: AppFont.RobotoBold,
    fontSize: fontSize.mediumtxt,
    color: 'black',
    // marginRight:wp(10)
  },
  txt3: {
    fontFamily: AppFont.RobotoRegular,
    fontSize: fontSize.smalltxt,
    color: '#A6A6A6',
  },
  btn1: {
    // backgroundColor:'red',
    borderRadius: 16,
    width: wp(20),
    height: hp(5),
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btntxt: {
    textAlign: 'center',
    fontSize: fontSize.smalltxt,
    fontFamily: AppFont.RobotoMedium,
  },

});
