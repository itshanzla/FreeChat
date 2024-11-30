import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import ChatHeader from '../../components/Header/ChatHeader';
import ChatInput from '../../components/ChatComponents/ChatInput';
import MsgsDisplay from '../../components/ChatComponents/MsgsDisplay';
import {Images} from '../../assets/images/AppImages';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import GroupMsgsDisplay from '../../components/GroupChatComponents/GroupMsgsDisplay';

export interface msg {
  createdAt?: CreatedAt;
  sentTo?: string;
  sentby?: string;
  text?: string;
  image?: string;
}
export interface CreatedAt {
  nanoseconds?: number;
  seconds?: number;
}

const GroupChatScreen = () => {
  const [messages, setMessages] = useState<msg[]>([]);
  const [text, setText] = useState<string | null>('');
  const [sortedchat, setsortedchat] = useState<msg[]>([]);
  const [image, setimage] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>();
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [loader, setLoader] = useState<boolean>(false);
  const [SendImage, IsSendImage] = useState<string>('');

  const users: any = auth().currentUser;
  const route: any = useRoute();
  const {item} = route.params;

  // Create a unique chat ID for the group
  const otherusers = item.Groupparticipants.map((res: any) => res.id).sort();
  const participants = [users.uid, ...otherusers].sort().join('-');
  const chatid = participants;
  //Image Picker function
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
          `${user?.uid}/GroupChatImages/${new Date().getTime()}`,
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
        console.log('Uploaded image url is', uploadedImageUrl);
      }

      const userref = firestore().collection('Users').doc(users.uid);
      const recieveRef = firestore().collection('Users').doc(participants);
      console.log('reciever ref is=>', recieveRef);

      const usermsg = {
        image: uploadedImageUrl,
        text,
        sentby: users?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      const chatref = firestore().collection('GroupMessages').doc(chatid);
      // Check if the chat document exists
      const chatdocref = await chatref.get();
      if (!chatdocref.exists) {
        // Create the chat document if it doesn't exist
        chatref
          .collection('messages')
          .add({...usermsg, createdAt: firestore.FieldValue.serverTimestamp()});
      } else {
        chatref
          .collection('messages')
          .add({...usermsg, createdAt: firestore.FieldValue.serverTimestamp()});
        firestore()
          .collection('GroupMessages')
          .doc(chatid)
          .set({
            participants: [userref, recieveRef],
          });
      }
      setText(null); // Clear the input field after sending
      setimage('');
      IsSendImage('');
    } catch (err) {
      console.error('Error Occur is :', err);
    }
  };

  const createdAtFormat = (createdAt: any) => {
    const miliseconds =
      createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000;
    const date = new Date(miliseconds);
    const currentTimeStamp = Date.now();
    const DiffInMiliSecs = currentTimeStamp - date.getTime();
    if (DiffInMiliSecs < 60000) {
      return 'Just Now';
    } else if (DiffInMiliSecs < 3600000) {
      const minutes = Math.floor(DiffInMiliSecs / 60000);
      return `${minutes} mins`;
    } else if (moment(date).isSame(currentTimeStamp, 'day')) {
      return moment(date).format('hh:mm');
    } else {
      return moment(date).format('MMM DD');
    }
  };

  const getAllmsgs = async () => {
    firestore()
      .collection('GroupMessages')
      .doc(chatid)
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
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
      });
  };

  useEffect(() => {
    getAllmsgs();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <ChatHeader
        name={item.Groupname}
        styleimg={{borderRadius: 100}}
        source={item.image ? {uri: item.image} : Images.Image6}
      />
      <GroupMsgsDisplay data={sortedchat} />
      <ChatInput
        onPress1={() => handleImage()}
        loader={loader}
        image={image}
        onPress={() => {
          if (text || image) {
            onSend();
          }
        }}
        value={text}
        onChangeText={(value: string) => setText(value)}
      />
    </View>
  );
};
export default GroupChatScreen;

const styles = StyleSheet.create({});
