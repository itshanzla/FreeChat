import {
  Alert,
  FlatList,
  FlatListProps,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, Tertiary} from '../../colors/Colors';
import {AppFont} from '../../Text/AppFonts';
import {fontSize} from '../../Text/fontsize';
import {AppIcons} from '../../assets/icons/AppIcons';
import Modal, {ModalProps, OnSwipeCompleteParams} from 'react-native-modal';
import TextField from '../TextInput/TextField';
import {LoginBtn} from '../Buttons/LoginBtn';
import GroupContact from '../GroupChatComponents/GroupContact';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
interface groupmodal {
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  onPress?: () => void;
  toggleModal?: () => void;
  isVisible?: boolean;
  list?: any;
  oncontinue?: CallableFunction;
}

const AddGroupModal = ({
  onBackButtonPress,
  onBackdropPress,
  onPress,
  toggleModal,
  isVisible,
  list,
  oncontinue,
}: groupmodal) => {
  const navigation: any = useNavigation();
  const [selectedUsers, setSelectedusers] = useState<any[]>([]);
  const onSelectedUser = async (item: any, index: number) => {
    //filtering and selecting user...it will select and deslect user
    if (selectedUsers.includes(item)) {
      setSelectedusers(selectedUsers.filter(user => user.uid != item.uid));
    } else {
      setSelectedusers([...selectedUsers, item]);
      console.log('item is=>', item);
    }
  };
  useEffect(() => {
    console.log('selected users are:', selectedUsers);
  }, [selectedUsers]); //it will console selected users

  const RenderItem = ({item, index}: any) => {
    //render Item function which is getting and displaying data in flatlist
    // console.log('item is renderitem=>', item);
    return (
      <GroupContact
        name={item.name}
        email={item.email}
        onPress={() => onSelectedUser(item, index)}
        stylesbtn={{
          backgroundColor: selectedUsers.includes(item) ? '#fcebdc' : '#FFFFFF',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      />
    );
  };
  return (
    <Modal
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      isVisible={isVisible}
      animationIn={'bounceIn'}
      animationOut={'bounceOut'}>
      <View style={[styles.modalContent]}>
        <Text style={styles.txt}>Contacts</Text>
        <FlatList
          contentContainerStyle={{marginLeft: 20}}
          renderItem={RenderItem}
          data={list}
        />
        <LoginBtn
          onPress={() => {
            if (oncontinue) {
              oncontinue(selectedUsers);
            }
            toggleModal && toggleModal();
          }}
          title="Add"
          styleview={{marginBottom: 20}}
        />
      </View>
    </Modal>
  );
};

export default AddGroupModal;

const styles = StyleSheet.create({
  txt: {
    color: Colors.Primary,
    fontFamily: AppFont.RobotoBold,
    fontSize: fontSize.largemedium,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: Tertiary.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    marginLeft: -15,
    bottom: -30,
    width: wp(100),
    height: hp(70),
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
});
