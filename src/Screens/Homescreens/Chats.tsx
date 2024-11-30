import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import {AppIcons} from '../../assets/icons/AppIcons';
import {Images} from '../../assets/images/AppImages';
import ContactBtn from '../../components/Buttons/ContactBtn';
import ChatBtn from '../../components/Buttons/ChatBtn';
import ChatModal from '../../components/Modals/ChatModal';
import { useSelector } from 'react-redux';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Chats = () => {
  const [ModalVisible, setModalVisible] = useState<boolean>(false);
  const userdata = useSelector((state: any) => state.user.userdata);
  
  const toggleModal = () => {
    setModalVisible(!ModalVisible);
  };
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent={false} barStyle={'dark-content'} backgroundColor={'white'} />
      <ChatModal
        isVisible={ModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
      />
      <Header
        onPress={toggleModal}
        Icon0={AppIcons.add}
        Icon1={ userdata?.image ?  {uri: userdata.image} :Images.empty }
        name={'Chats'}
        dot
      />
      <ChatBtn />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
