import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatList, {chatlist} from '../FlatlistComp/ChatList';
import {chat} from '../../ArrayData/ChatsData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Images} from '../../assets/images/AppImages';
import { useNavigation } from '@react-navigation/native';
export interface chatData {
  lastMessage?: LastMessage;
  otherUser?: OtherUser;
  unReadCount?: number;
}

export interface LastMessage {
  createdAt?: string[];
  read?: boolean;
  sentTo?: string;
  sentby?: string;
  text?: string;
}

export interface OtherUser {
  email?: string;
  name?: string;
  uid?: string;
}
export interface chatbtn{
  renderItem?:()=>void
}
const ChatBtn = ()  => {
  const [msgsArray, setMsgsArray] = useState<chatData[]>([]);
  const [otherUser,setOtherUser]=useState<chatData[]>([]);
  const users: any = auth().currentUser;
  const navigation : any = useNavigation();

  const handleChatData = async () => {
    const userref = firestore().collection('Users').doc(users.uid);

    // const receieveref=  firestore().collection('Users').doc(user.uid)
    firestore()
      .collection('Chats')
      .where('participants', 'array-contains', userref)
      .onSnapshot(async snapShot => {
        // Alert.alert(snapShot.size.toString());
        console.log('chat snapshot: ', snapShot, '\n\n\n');
        const chatData = await Promise.all(
          snapShot?.docs?.map(async chatDoc => {
            console.log('iteration: ', chatDoc.id, '\n\n\n');
            const data = chatDoc?.data();
            console.log('data is', data);
            const participants = await Promise.all(
              data.participants
                .filter((item: any) => {
                  return item?.uid != `${users?.uid}`;
                })
                .map(async (user: any) => {
                  const userDoc = await user?.get();
                  const userData = await userDoc?.data();
                  const uid = userData?.uid;
                  const name = userData?.name;
                  const email = userData?.email;
                  return {uid, name, email};
                }),
            );
            const chatDocRef = chatDoc?.ref;
            const lastMessageDoc = await chatDocRef
              .collection('messages')
              .orderBy('createdAt', 'desc')
              .limit(1)
              .get();
            const unReadCountDoc = await chatDocRef
              .collection('messages')
              .where('read', '==', false)
              .get();
              console.log(users?.uid);

              const unReadCount = unReadCountDoc?.docs?.length
              ? unReadCountDoc?.docs?.filter(
                  item  => item?.data()?.sentby != users?.uid,
                )?.length
              : 0;
            const lastMessage = lastMessageDoc?.docs?.length
              ? lastMessageDoc?.docs[0]?.data()
              : {};
            console.log('participants are =>', participants);

            return {
              lastMessage,
              otherUser: participants[1],
              unReadCount,
            };
          }),
        );
        console.log('khadsfjak', chatData);
        setMsgsArray(chatData);
      });

    // .onSnapshot(async(chatdoc)=>{?
    //   console.log(chatdoc.docs);
    //   const msgs=await Promise.all(
    //     chatdoc.docs.map((chatmsgs)=>{
    //       console.log("chatmsgs are =>",chatmsgs.data())
    //     })
    //   )
    //   return{
    //   msgs
    //   }
    // })
    // console.log(await data)
  };
  useEffect(() => {
    handleChatData().then(chat => {
      console.log('chats =>', chat);
    });
  }, []);
  
  const renderItem = ({item}: any) => {
    return (
      <ChatList
      name={item?.otherUser?.name}
      image={Images.Image4}
      email={item?.lastMessage?.createdAt}
      message={item?.lastMessage?.text}
      count={item?.unReadCount}
      onpress={()=>handleOnpress(item.otherUser)}
      />
    );
  };
  const handleOnpress=(user:any)=>{
    navigation.navigate('GiftChat',{user:user})
  }
  return (
    <View>
      <FlatList data={msgsArray} renderItem={renderItem} />
    </View>
  );
};

export default ChatBtn;

const styles = StyleSheet.create({});
