import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {AppIcons} from '../../assets/icons/AppIcons';
import {Images} from '../../assets/images/AppImages';
import ContactBtn from '../../components/Buttons/ContactBtn';
import ContactModal from '../../components/Modals/ContactModal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Colors} from '../../colors/Colors';

const Contacts = () => {
  const navigation: any = useNavigation();
  const [ModalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const userdata = useSelector((state: any) => state.user.userdata);
  const toggleModal = () => {
    setModalVisible(!ModalVisible);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setloading(true),
        setTimeout(() => {
          setloading(false);
        }, 600);
    });
    return unsubscribe;
  }, [navigation]);
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={Colors.Primary} size="large" />
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <StatusBar translucent={false} barStyle={'dark-content'} backgroundColor={'white'} />
      <ContactModal
        isVisible={ModalVisible}
        toggleModal={toggleModal}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onPress={toggleModal}
      />
      <Header
        onPress1={() => navigation.navigate('Settings')}
        onPress={toggleModal}
        Icon0={AppIcons.add}
        Icon1={userdata.image == null ? Images.empty : {uri: userdata.image}}
        name={'Contacts'}
        dot
      />
      <ContactBtn />
    </View>
  );
};
export default Contacts;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
});
