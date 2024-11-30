import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contactlist, {contact} from '../FlatlistComp/Contactlist';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
export interface contactbtn {
  email?: string;
  name?:  string;
  uid?:   string;
}

const ContactBtn = () => {

  const [users, SetUsers] = useState<contactbtn[]>([]);
  const user = auth().currentUser;
  const navigation: any = useNavigation();
  const getUsers = async () => {
    const querySnap = await firestore()
      .collection('Users')
      .where('uid', '!=', user?.uid)
      .get();
    const userdata :contactbtn[] = querySnap.docs.map((docsnap) => docsnap.data());
    SetUsers(userdata);
    
  };
  useEffect(() => {
    getUsers();
  }, []);

  const renderItem = ({item}: {item: contact}) => {
    return (
      <Contactlist
        name={item.name}
        email={item.email}
        onPress={() => navigation.navigate('GiftChat', {user: item})}
      />
    );
  };
  return (
    <View>
      <FlatList data={users} renderItem={renderItem} />
    </View>
  );
};

export default ContactBtn;

const styles = StyleSheet.create({});
