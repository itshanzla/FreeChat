import {
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../../components/Stacks/AuthStack';
import HomeStack from '../../components/Stacks/HomeStack';
import GiftChat from '../../ChatScreens/GiftChat';
import {useSelector} from 'react-redux';
import Settings from '../Settings/Settings';
import CreateGroup from '../GroupScreens/CreateGroup';
import GroupChatScreen from '../GroupScreens/GroupChatScreen';

const Main = () => {
  const Stack: any = createNativeStackNavigator();
  const User = useSelector((state: any) => state.user.user);
  console.log("User created is=>",User);

  const [users, setuser] = useState<boolean>(User?.email  ? true : false);
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={!users ? 'AuthStack' : 'HomeStack'}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="GiftChat" component={GiftChat} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default Main;
