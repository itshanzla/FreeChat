import {
  ActivityIndicator,
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets/images/AppImages';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fontSize} from '../../Text/fontsize';
import {AppFont} from '../../Text/AppFonts';
import {useDispatch, useSelector} from 'react-redux';
import TextLarge from '../../components/Text/TextLarge';
import TextField from '../../components/TextInput/TextField';
import {AppIcons} from '../../assets/icons/AppIcons';
import {LoginBtn} from '../../components/Buttons/LoginBtn';
import SmallText from '../../components/Text/SmallText';
import {Colors, Tertiary} from '../../colors/Colors';
import {CommonActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {adddata, setUser} from '../../components/Redux/AuthSlice';
interface firebaselogin{
  email:string,
  password:string
}
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [secureTextEntry, setsecureentry] = useState<boolean>(true);
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const handleLogin = async () => {
    try {
      if(Email != '' && Password != '')
      {
      const isUserSignin = await auth().signInWithEmailAndPassword(
        Email,
        Password,
      );
      const data : firebaselogin = {

        email: Email,
        password: Password,
      };
      dispatch(setUser(data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeStack'}],
          }),
        )
      }else{
        Alert.alert('Fields are empty')
      }

      setPassword('');
      setEmail('');
    } catch (err: any) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      <ImageBackground
        resizeMode="cover"
        style={styles.Image}
        source={Images.backgroundImage}
      />
      <View style={styles.main}>
        <TextLarge Title={'Log In'} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 25}}
          style={styles.ViewInput}>
          <TextField
            value={Email}
            onChangeText={value => setEmail(value)}
            icon={AppIcons.mail}
            title={'Enter Your Email'}
            Pcolor={'black'}
          />
          <TextField
            value={Password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={secureTextEntry}
            icon={AppIcons.lock}
            title={'Enter Your Password'}
            ispassword
            Pcolor={'black'}
            onhide={() => {
              setsecureentry(!secureTextEntry);
            }}
          />
          <View>
            <SmallText
              stylemain={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 5,
                marginRight: 20,
              }}
              Title={'Forgot Password?'}
            />
          </View>
          <LoginBtn
            onPress={() => handleLogin()}
            styleview={{marginTop: hp(10)}}
            title={'Login'}
          />
          <SmallText
            onPress={() => navigation.navigate('Signup')}
            styletxt={{color: Tertiary.black}}
            Title={"Don't have an account?\t"}
            Title2={'Sign up here'}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    flex: 1,
    height: hp(100),
  },
  main: {
    backgroundColor: 'white',
    height: hp(65),
    borderTopLeftRadius: 60,
  },
  txt: {
    fontSize: fontSize.largeTxt,
    fontFamily: AppFont.RobotoBold,
  },
  ViewInput: {
    marginTop: hp(6),
  },
});
