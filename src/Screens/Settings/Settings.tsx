import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Tertiary} from '../../colors/Colors';
import {AppIcons} from '../../assets/icons/AppIcons';
import {fontSize} from '../../Text/fontsize';
import {AppFont} from '../../Text/AppFonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../../assets/images/AppImages';
import TextField from '../../components/TextInput/TextField';
import {LoginBtn} from '../../components/Buttons/LoginBtn';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {useDispatch, useSelector} from 'react-redux';
import {adddata, removeuser} from '../../components/Redux/AuthSlice';
import auth from '@react-native-firebase/auth';

const Settings = () => {
  const userdata = useSelector((state: any) => state.user.userdata);
  const [image, setimage] = useState<string>(userdata?.image ?? '');
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>();
  const [uploadProgress, setUploadProgress] = useState<number>();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    }).then(Image => {
      setimage(Image.path);
    });
  };
  const userData = {
    name: name,
    contact: contact,
    email: email,
    image: image,
  };
  const upload = async () => {
    try {
      setisLoading(true);
      const user = auth().currentUser;
      const reference = storage().ref(
        `${user?.uid}/ProfileImages/${new Date().getTime()}`,
      );
      const task = reference.putFile(image);
      task.on('state_changed', snapshot => {
        const progress: number =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });
      task.then(async () => {
        setisLoading(false);
        const url = await reference.getDownloadURL();
        dispatch(adddata(userData));
        navigation.navigate('HomeStack');
      });
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };
  const handleLogout = () => {
    auth().signOut();
    dispatch(removeuser());
    navigation.navigate('AuthStack');
  };
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.btn}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={AppIcons.Back}
          />
        </TouchableOpacity>
        <Text style={styles.txt}>Profile</Text>
        <TouchableOpacity onPress={() => handleLogout()} style={styles.btn3}>
          <Text style={styles.txt2}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: hp(75),
          flexGrow: 1,
        }}
        style={styles.main2}>
        <TouchableOpacity
          onPress={() => handleImage()}
          activeOpacity={0.7}
          style={styles.btn2}>
          <Image
            source={image ? {uri: image} : Images.empty}
            style={styles.img2}
          />
        </TouchableOpacity>
        <TextField
          value={name}
          onChangeText={value => setName(value)}
          tintColor={Colors.Primary}
          icon={AppIcons.Profile}
          title={'Enter Your name'}
          Pcolor={'black'}
        />
        <TextField
          value={contact}
          onChangeText={value => setContact(value)}
          tintColor={Colors.Primary}
          icon={AppIcons.Phone}
          title={'Enter Your Contact'}
          Pcolor={'black'}
        />
        <TextField
          value={email}
          onChangeText={value => setEmail(value)}
          tintColor={Colors.Primary}
          icon={AppIcons.mail}
          title={'Enter Your Email'}
          Pcolor={'black'}
        />
        <LoginBtn
          onPress={() => upload()}
          stylebtn={{width: wp(80)}}
          styleview={{marginTop: hp(10)}}
          title={'Save Contact Info'}
        />
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Tertiary.white,
  },
  btn: {
    backgroundColor: Tertiary.offwhite,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    borderRadius: 6,
  },
  img: {
    width: 10,
    height: 16,
  },
  txt: {
    fontSize: fontSize.extralargemedium,
    fontFamily: AppFont.RobotoMedium,
    alignSelf: 'center',
    color: Colors.Primary,
    marginLeft: 10,
  },
  img2: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  btn2: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  main2: {
    marginTop: 20,
  },
  txt2: {
    fontSize: fontSize.mediumtxt,
    fontFamily: AppFont.RobotoMedium,
    color: Tertiary.red,
  },
  btn3: {
    backgroundColor: Tertiary.offwhite,
    marginTop: 16,
    height: 30,
    width: 60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});
