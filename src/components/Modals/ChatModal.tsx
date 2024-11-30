import {
  Image,
  ScrollView,
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
import {Colors, Tertiary} from '../../colors/Colors';
import {AppFont} from '../../Text/AppFonts';
import {fontSize} from '../../Text/fontsize';
import {AppIcons} from '../../assets/icons/AppIcons';
import Modal, {ModalProps} from 'react-native-modal';
import TextField from '../TextInput/TextField';
import {LoginBtn} from '../Buttons/LoginBtn';
interface chatmodal {
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  onPress?: () => void;
  onSwipeComplete?: () => void;
  isVisible?: boolean;
}

const ChatModal = ({
  onBackButtonPress,
  onBackdropPress,
  onPress,
  onSwipeComplete,
  isVisible,
}: chatmodal) => {
  return (
    <Modal
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      swipeDirection="down"
      onSwipeComplete={onSwipeComplete}
      isVisible={isVisible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}>
      <View style={[styles.modalContent]}>
        <Text style={styles.txt}>Start New Chat</Text>
        <ScrollView style={{marginTop: 20}}>
          <TextField
            stylesmain={{backgroundColor: Tertiary.darkGray}}
            icon={AppIcons.mail}
            title={'Enter Email'}
            Pcolor={'black'}
          />
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={styles.txt5}>Message</Text>
            <Image
              resizeMode="contain"
              style={{width: 17, height: 15}}
              source={AppIcons.Send}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  txt: {
    color: Colors.Primary,
    fontFamily: AppFont.RobotoBold,
    fontSize: fontSize.extraMedium,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: Tertiary.offwhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: -15,
    width: wp(100),
    height: hp(31),
  },
  txt1: {
    fontFamily: AppFont.SansBold,
    fontSize: fontSize.largemedium,
    color: 'black',
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
    marginTop: 14,
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
  txt5: {
    fontFamily: AppFont.RobotoMedium,
    marginHorizontal: 10,
    fontSize: fontSize.smallmedium,
  },
});
