import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {adddata, groupData, removeuser} from '../../components/Redux/AuthSlice';
import auth from '@react-native-firebase/auth';
import TextLarge from '../../components/Text/TextLarge';
import firestore from '@react-native-firebase/firestore';
import AddGroupModal from '../../components/Modals/AddGroupModal';
export interface getUsersProps {
  email?: string;
  name?: string;
  uid?: string;
}
export interface Selectedusers {
  email?: string;
  name?: string;
  uid?: string;
  createdAt?:any
}
const CreateGroup = () => {
  const groupItems = useSelector((state: any) => state.user.groupData);
  const [image, setimage] = useState<string>(groupItems?.image ?? '');
  const [Gname, setGName] = useState<string>('');
  const [Desc, setDesc] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>();
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [loading, setloading] = useState<boolean>(false);
  const [groupUsers, setGroupUsers] = useState<getUsersProps[]>([]);
  const [ModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedGroupUsers, SetSelectedGroupUsers] = useState<any[]>([]);
  const [text, setText] = useState<any>();
  const [read, setread] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const user = auth().currentUser;
  const selectedUsersID: any[] = selectedGroupUsers.map(
    (users: Selectedusers) => users?.uid,
  );

  const getUsers = async () => {
    const querySnap = await firestore()
      .collection('Users')
      .where('uid', '!=', user?.uid)
      .get();
    const userdata: getUsersProps[] = querySnap.docs.map(docsnap =>
      docsnap?.data(),
    );
    setGroupUsers(userdata);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    }).then(Image => {
      setimage(Image.path)
    }).catch(error=>{
      console.error('Image Picking error',error);
    });
  };
  const GData: any = {
    Gname: Gname,
    Desc: Desc,
    image: image,
  };
  const upload = async () : Promise<string> => {
    return new Promise(async(resolve,reject)=>{
      try{
        if(!image){
          resolve('')
          return;
        }
        setisLoading(true);
        setLoader(true);
        const user = auth().currentUser;
        const reference = storage().ref(
          `${user?.uid}/GroupImages/${new Date().getTime()}`,
        );
        const task = reference.putFile(image);
        task.on('state_changed', snapshot => {
          const progress: number =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
        task.then(async () => {
          setisLoading(false);
          const url = (await reference.getDownloadURL());
          console.log("Image Url is this=>",url)
          setImageURL(url);
          dispatch(groupData(GData));
          setLoader(false);
          resolve(url)
          console.log('Data added');
        });
        task.catch(error=>{
          setLoader(false)
          console.error('Uploading Error',error);
          reject(error)
        });
      }
      catch(err){
        setLoader(false)
        console.error('Loading function Error',err);
        reject(err)
      }
    })
  };

  const HandleOnContinue = (selectedUsers: Selectedusers[]) => {
    //Setting data in SelectedGroupUsers
    SetSelectedGroupUsers(selectedUsers);
  };
  const generateRandomKey = (length: number) => {
    //Generating Random Key
    const characters = 'sldhfjeihfiflu472923894sdkjfh';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const SetGDataIntoFireStore = async () => {
    if(!Gname.trim()){
      Alert.alert('Validation Error','Please Enter Group name.');
      return;
    }
    setloading(true);
    //Creating FireStore for chats
    try{
      const uploadedImageUrl=await upload();
      const myref: any = firestore().collection('Users').doc(user?.uid);
      const otherUsersRef = selectedUsersID.map((id: any) =>
        firestore().collection('Users').doc(id),
      );
      const chatref = await firestore()
        .collection('GroupChats')
        .doc(generateRandomKey(10))
        .set({
          // GroupId:,
          Gname: Gname,
          Desc: Desc,
          image: uploadedImageUrl,
          Groupparticipants: [myref].concat(otherUsersRef),
          createdAt:firestore.FieldValue.serverTimestamp(),
          createdBy:myref
        });
        setloading(false)
        Alert.alert('Success','Group Created Successfully!')
      navigation.navigate('Groups',{chatref:chatref});
    }catch(err){
      setloading(false)
      console.error('Error creating group:',err)
      Alert.alert('Error','There was an issue creating this group.Please try again.')
    }
   
  };

  // if (loading) {//No need for this for now
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <ActivityIndicator color={Colors.Primary} size="large" />
  //     </View>
  //   );
  // }
  const toggleModal = () => {
    setModalVisible(!ModalVisible);
  };

  return (
    <View style={styles.container}>
      <AddGroupModal
        isVisible={ModalVisible}
        toggleModal={toggleModal}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onPress={toggleModal}
        list={groupUsers}
        oncontinue={HandleOnContinue}
      />
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
      <TouchableOpacity
        onPress={() => handleImage()}
        style={{alignSelf: 'center', marginBottom: 20}}>
        {!loader ? (
          <Image
            style={{height: 150, width: 150, borderRadius: 100}}
            source={image ? {uri: image} : Images.groupimg}
          />
        ) : (
          <ActivityIndicator size={'small'} color={Colors.Primary} />
        )}
      </TouchableOpacity>
      <View style={styles.main}>
        {/* <Image source={Images.group} style={{}}/> */}
        <TextLarge Title={'Create Group'} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, height: hp(60)}}
          style={styles.ViewInput}>
          <TextField
            value={Gname}
            onChangeText={value => setGName(value)}
            icon={AppIcons.mail}
            title={'Enter Group Name'}
            Pcolor={'black'}
          />
          <TextField
            value={Desc}
            onChangeText={value => setDesc(value)}
            icon={AppIcons.menu}
            tintColor={Tertiary.lessgray}
            title={'Description(optional) '}
            Pcolor={'black'}
          />
          <View style={{marginTop: 20}}>
            <LoginBtn
              onPress={() => toggleModal()}
              stylebtn={{backgroundColor: Tertiary.lightgray, width: 150}}
              title={'Add Contacts'}
            />
            <LoginBtn
              onPress={() => SetGDataIntoFireStore()}
              styleview={{marginTop: 20}}
              title={'Create'}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateGroup;

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
    marginTop: 20,
  },
});
// function generateRandomKey(length) {
//   // Define the characters you want to include in the key
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';

//   // Loop to generate the key with the specified length
//   for (let i = 0; i < length; i++) {
//       // Get a random index from the characters string
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       // Append the character at the random index to the result
//       result += characters[randomIndex];
//   }

//   return result; // Return the generated key
// }

// // Example usage:
// const keyLength = 16; // You can set this to any number
// const randomKey = generateRandomKey(keyLength);
// console.log(randomKey);
