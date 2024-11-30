import React from 'react';
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../../Screens/AuthScreens/LoginScreen';
import SignUpscreen from '../../Screens/AuthScreens/SignUpscreen';
import Contacts from '../../Screens/Homescreens/Contacts';
import Chats from '../../Screens/Homescreens/Chats';
import {Colors, Tertiary} from '../../colors/Colors';
import {fontSize} from '../../Text/fontsize';
import {AppFont} from '../../Text/AppFonts';
import {AppIcons} from '../../assets/icons/AppIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
// import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ContactList from '../ExtraCode/ContactList';
import CreateGroup from '../../Screens/GroupScreens/CreateGroup';
import Groups from '../../Screens/GroupScreens/Groups';

const HomeStack = () => {
  const BottomStack = createBottomTabNavigator();
  return (
    <BottomStack.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.Primary,
        tabBarInactiveTintColor: Tertiary.black,
        headerShown: false,
        tabBarStyle: {height: hp(8)},
        tabBarLabelStyle: {
          fontSize: fontSize.smalltxt,
          marginBottom: 5,
          fontFamily: AppFont.RobotoMedium,
          backgroundColor: 'white',
        },
      }}>
      <BottomStack.Screen
        options={{
          tabBarIcon: color => {
            return (
              <Feather
                name="user"
                size={24}
                color={color.focused ? Colors.Primary : Tertiary.black}
              />
            );
          },
        }}
        name="Contacts"
        component={Contacts}
      />
      <BottomStack.Screen
        options={{
          tabBarIcon: color => {
            return (
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={color.focused ? Colors.Primary : Tertiary.black}
              />
            );
          },
        }}
        name="Chats"
        component={Chats}
      />
      <BottomStack.Screen
        options={{
          tabBarIcon: color => {
            return (
              <Feather
                name="users"
                size={24}
                color={color.focused ? Colors.Primary : Tertiary.black}
              />
            );
          },
        }}
        name="Groups"
        component={Groups}
      />
    </BottomStack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
