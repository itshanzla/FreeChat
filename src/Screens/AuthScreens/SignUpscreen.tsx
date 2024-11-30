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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {setUser} from '../../components/Redux/AuthSlice';
import firestore from '@react-native-firebase/firestore';
const SignUpscreen = () => {
  const navigation: any = useNavigation();
  const [secureTextEntry, setsecureentry] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const [Message, setMessage] = useState<string>('');
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setloading(true),
  //       setTimeout(() => {
  //         setloading(false);
  //       }, 600);
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={Colors.Primary} size="large" />
      </View>
    );
  }
  const handleRegister = async () => {
    try {
      if(email && password ){
        setloading(true);
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        firestore().collection('Users').doc(isUserCreated.user.uid).set({
          email: isUserCreated.user.email,
          uid: isUserCreated.user.uid,
          name: name,
        });
        navigation.navigate('login');
        setloading(false);
      }else{
        Alert.alert('Fields are Empty')
      }
        
    } catch (err: any) {
      setloading(false)
      console.log(err);
      setMessage(err.Message);
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
        <TextLarge Title={'Sign Up'} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
          style={styles.ViewInput}>
          <TextField
            value={name}
            onChangeText={value => setName(value)}
            icon={AppIcons.mail}
            title={'Enter Your Name'}
            Pcolor={'black'}
          />
          <TextField
            value={email}
            onChangeText={value => setEmail(value)}
            icon={AppIcons.mail}
            title={'Enter Your Email'}
            Pcolor={'black'}
          />
          <TextField
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={secureTextEntry}
            icon={AppIcons.lock}
            title={'Enter Your Password'}
            ispassword
            onhide={() => {
              setsecureentry(!secureTextEntry);
            }}
            Pcolor={'black'}
          />
          <LoginBtn
            onPress={() => handleRegister()}
            styleview={{marginTop: 20}}
            title={'Sign up'}
          />
          <SmallText
            onPress={() => navigation.navigate('login')}
            styletxt={{color: Tertiary.black}}
            Title={'Do you have an account?\t'}
            Title2={'Login here'}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpscreen;

const styles = StyleSheet.create({
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
