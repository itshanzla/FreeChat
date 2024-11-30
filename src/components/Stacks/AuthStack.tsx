import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/AuthScreens/LoginScreen';
import SignUpscreen from '../../Screens/AuthScreens/SignUpscreen';


const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Signup" >
      <Stack.Screen name="Signup" component={SignUpscreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
