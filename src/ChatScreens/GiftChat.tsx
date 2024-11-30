import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ChatHeader from '../components/Header/ChatHeader';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {AppFont} from '../Text/AppFonts';
import {Colors, Tertiary} from '../colors/Colors';
import moment from 'moment';
import ChatInput from '../components/ChatComponents/ChatInput';
import MsgsDisplay from '../components/ChatComponents/MsgsDisplay';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {adddata} from '../components/Redux/AuthSlice';
export interface msg {
  createdAt?: CreatedAt;
  sentTo?: string;
  sentby?: string;
  text?: string;
  SendedImage?: string;
}
export interface CreatedAt {
  nanoseconds?: number;
  seconds?: number;
}

const GiftChat = () => {
  // const groupItems = useSelector((state: any) => state.user.groupData);
  const [messages, setMessages] = useState<msg[]>([]);
  const [text, setText] = useState<string | null>('');
  const [image, setimage] = useState<string>('');
  const [sortedchat, setsortedchat] = useState<msg[]>([]);
  const [read, isread] = useState<boolean>(false);
  const [SendImage, IsSendImage] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>();
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [loader, setLoader] = useState<boolean>(false);
  const [UsersImage, SetUsersImage] = useState<string>('');
  const users: any = auth().currentUser;
  const dispatch = useDispatch();
  const route: any = useRoute();
  const {user} = route.params;
  const usersref = async () => {
    try {
      const userref = await firestore()
        .collection('Users')
        .doc(users.uid)
        .get()
        .then(res => {
          console.log('userref is =>', res.get);
        });
    } catch (err) {
      console.error('User Ref is not initialize:', err);
    }
  };
  useEffect(() => {
    usersref();
  }, []);
  const chatid =
    user.uid > users.uid
      ? users?.uid + '-' + user?.uid
      : user?.uid + '-' + users?.uid;
  //Image functions
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    })
      .then(Image => {
        setimage(Image.path);
        console.log('Image path set', image);
      })
      .catch(error => {
        console.error('Image Picking error', error);
      });
  };
  const data: any = {
    UsersImage: image,
  };

  const upload = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!image) {
          resolve('');
          return console.log('Image not selected');
        }
        setisLoading(true);
        setLoader(true);
        const user = auth().currentUser;
        const reference = storage().ref(
          `${user?.uid}/ChatDataImages/${new Date().getTime()}`,
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
          IsSendImage(url);
          dispatch(adddata(data));
          setLoader(false);
          resolve(url);
          console.log('Data added');
          console.log('Image Uploaded', url);
        });
        task.catch(error => {
          setLoader(false);
          console.error('Uploading Error', error);
          reject(error);
        });
      } catch (err) {
        setLoader(false);
        console.error('Loading function Error', err);
        reject(err);
      }
    });
  };
  const onSend = async () => {
    let uploadedImageUrl = '';
    try {
      if (image) {
        uploadedImageUrl = await upload();
      }
      const userref = firestore().collection('Users').doc(users.uid);
      const receieveref = firestore().collection('Users').doc(user.uid);

      const usermsg = {
        text,
        SendedImage: uploadedImageUrl,
        sentby: users?.uid,
        sentTo: user?.uid,
        read,
      };
      const chatref = firestore().collection('Chats').doc(chatid);
      const chatdocref = await chatref.get();

      if (chatdocref.exists) {
        firestore()
          .collection('Chats')
          .doc(chatid)
          .collection('messages')
          .add({...usermsg, createdAt: firestore.FieldValue.serverTimestamp()});
      } else {
        firestore()
          .collection('Chats')
          .doc(chatid)
          .collection('messages')
          .add({...usermsg, createdAt: firestore.FieldValue.serverTimestamp()});
        firestore()
          .collection('Chats')
          .doc(chatid)
          .set({
            participants: [userref, receieveref],
          });
      }
      setText(null);
      setimage('');
      IsSendImage('');
    } catch (error) {
      console.error('Document is not added', error);
    }
  };

  const createdAtFormat = (createdAt: any) => {
    const miliseconds =
      createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000;
    const date = new Date(miliseconds);
    const currentTimeStamp = Date.now();
    const DiffInMiliSecs = currentTimeStamp - date.getTime();
    if (DiffInMiliSecs < 60000) {
      //less than a minute
      return 'Just Now';
    } else if (DiffInMiliSecs < 3600000) {
      //less than an hour
      const minutes = Math.floor(DiffInMiliSecs / 60000);
      return `${minutes} mins`;
    } else if (moment(date).isSame(currentTimeStamp, 'day')) {
      //same day
      return moment(date).format('hh:mm');
    } else {
      return moment(date).format('MMM DD'); //older than a day
    }
  };
  const getAllmsgs = async () => {
    const chatid =
      user.uid > users.uid
        ? users.uid + '-' + user.uid
        : user.uid + '-' + users.uid;
    try {
      firestore()
        .collection('Chats')
        .doc(chatid)
        .collection('messages')
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
          if (!snapshot.empty) {
            const allMessages = snapshot.docs.map(docSnap => {
              const data = docSnap.data();
              const FormatCreatedAt = data.createdAt
                ? createdAtFormat(data.createdAt)
                : null;
              return {
                _id: docSnap.id,
                ...data,
                createdAt: data.createdAt?.toDate(),
                FormatCreatedAt,
              };
            });
            const sortedchat = [...allMessages].sort(
              (a: any, b: any) => a.createdAt - b.createdAt,
            );
            setsortedchat(sortedchat);
          } else {
            console.log('No Messages Found');
          }
        });
    } catch (e) {
      console.error('Did not get any document:', e);
    }
  };
  useEffect(() => {
    getAllmsgs();
    console.log('Reciever Uid=>', user.uid);
  }, []);
  useEffect(() => {
    try {
      firestore()
        .collection('Chats')
        .doc(chatid)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
        .then(document => console.log('New Chat is =>', document.docs));
    } catch (err) {
      console.error('error fethching latest messages', err);
    }
  }, [sortedchat]);

  const handleChatData = async () => {
    try {
      const userref = firestore().collection('Users').doc(users.uid);
      firestore()
        .collection('Chats')
        .where('participants', 'array-contains', userref)
        .onSnapshot(async snapShot => {
          const chatData = await Promise.all(
            snapShot?.docs?.map(async chatDoc => {
              const data = chatDoc?.data();
              const chatid =
                user.uid > users.uid
                  ? users?.uid + '-' + user?.uid
                  : user?.uid + '-' + users?.uid;
              const chatref = firestore().collection('Chats').doc(chatid);
              const chatDocRef = chatDoc?.ref;
              const unReadCountDoc = await chatDocRef
                .collection('messages')
                .where('read', '==', false)
                .get();
              unReadCountDoc?.docs
                ?.filter(item => item?.data()?.sentby != users?.uid)
                ?.map(msg => {
                  chatref
                    .collection('messages')
                    .doc(msg.id)
                    .update({read: true});
                });
            }),
          );
        });
    } catch (err) {
      console.error('Error Loading Chat Messages', err);
    }
  };
  useEffect(() => {
    handleChatData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <ChatHeader name={user.name} />
      <MsgsDisplay data={sortedchat} />
      <ChatInput
        onPress={() => {
          if (text || image) {
            onSend();
          }
        }}
        loader={loader}
        image={image}
        onPress1={() => handleImage()}
        value={text}
        onChangeText={(value: string) => setText(value)}
      />
    </View>
  );
};
export default GiftChat;

const styles = StyleSheet.create({});
