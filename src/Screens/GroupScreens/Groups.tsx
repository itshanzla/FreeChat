import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {AppIcons} from '../../assets/icons/AppIcons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import GroupDataScreen from './GroupDataScreen';

export interface GroupData {
  Desc?: string;
  Groupname?: string;
  Groupparticipants?: {id?: string; name?: string; email?: string}[];
  image?: string;
  createdBy?: any;
  id?: string; 
}

const Groups = () => {
  const navigation: any = useNavigation();
  const [GroupData, setGroupData] = useState<GroupData[]>([]);
  const user = auth().currentUser;

  const getChatList = () => {
    const myref = firestore().collection('Users').doc(user?.uid);

    firestore()
      .collection('GroupChats')
      .where('Groupparticipants', 'array-contains', myref)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async snapshot => {
        try {
          const groupDataArray: GroupData[] = await Promise.all(
            snapshot.docs.map(async chatDoc => {
              // console.log('chatdoc id is =>',chatDoc.id)
              const data = chatDoc.data();
              // console.log('The data we are getting is=>', data);

              const Groupparticipants = await Promise.all(
                data?.Groupparticipants.map(async (userRef: any) => {
                  const userDoc = await userRef.get();
                  const userData = userDoc.data();
                  return {
                    id: userRef.id,
                    name: userData?.name,
                    email: userData?.email,
                  };
                }),
              );
              return {
                id: chatDoc?.id, 
                Desc: data?.Desc,
                Groupname: data?.Gname,
                Groupparticipants,
                image: data?.image,
                createdBy: data?.createdBy,
              };
            }),
          );

          setGroupData(groupDataArray);
        } catch (error) {
          console.error('Error fetching group data: ', error);
          Alert.alert('Error', 'Failed to load group data.');
        }
      });
  };

  useEffect(() => {
    getChatList();
  }, []);

  const deleteFirestoreGroup = async (documentId: string) => {
    try {
      await firestore()
        .collection('GroupChats')
        .doc(documentId)
        .delete();
      console.log('Document deleted with ID:', documentId);
    } catch (error) {
      console.error('Error deleting document: ', error);
      Alert.alert('Error', 'Failed to delete the group.');
    }
  };

  const RenderItem = ({item}: {item: GroupData}) => {
    const CreatedById = item?.createdBy?._documentPath?._parts?.[1];
    console.log("Item of group chat screen is=>",item?.image)
    return (
      <GroupDataScreen
        name={item?.Groupname}
        Desc={item?.Desc}
        source={{uri: item?.image}}
        onPress={() => navigation.navigate('GroupChatScreen', {item: item})}
        message={CreatedById === user?.uid ? 'delete' : ''}
        onPress1={() => deleteFirestoreGroup(item?.id!)} 
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <Header
        onPress1={() => navigation.navigate('CreateGroup')}
        name="Groups"
        Icon0={AppIcons.search}
        Icon1={AppIcons.add}
      />
      <FlatList
        data={GroupData}
        renderItem={RenderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  groupDesc: {
    fontSize: 14,
    color: '#888',
  },
});



































// import {
//   Alert,
//   FlatList,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Header from '../../components/Header/Header';
// import {AppIcons} from '../../assets/icons/AppIcons';
// import {useNavigation} from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import GroupDataScreen from './GroupDataScreen';

// export interface GroupData {
//   Desc?: string;
//   Groupname?: string;
//   Groupparticipants?: {id?: string; name?: string; email?: string}[];
//   image?: string;
//   createdBy?: any;
// }

// const Groups = () => {
//   const navigation: any = useNavigation();
//   const [GroupData, setGroupData] = useState<GroupData[]>([]);
//   const user = auth().currentUser;

//   const getChatList = () => {
//     const myref = firestore().collection('Users').doc(user?.uid);

//     firestore()
//       .collection('GroupChats')
//       .where('Groupparticipants', 'array-contains', myref)
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(async snapshot => {
//         try {
//           const groupDataArray: GroupData[] = await Promise.all(
//             snapshot.docs.map(async chatDoc => {
//               const data = chatDoc.data();
//               console.log('The data we are getting is=>', data);

//               const Groupparticipants = await Promise.all(
//                 data?.Groupparticipants.map(async (userRef: any) => {
//                   const userDoc = await userRef.get();
//                   const userData = userDoc.data();
//                   return {
//                     id: userRef.id,
//                     name: userData?.name,
//                     email: userData?.email,
//                   };
//                 }),
//               );

//               return {
//                 Desc: data?.Desc,
//                 Groupname: data?.Gname,
//                 Groupparticipants,
//                 image: data?.image,
//                 createdBy: data?.createdBy,
//               };
//             }),
//           );

//           setGroupData(groupDataArray);
//         } catch (error) {
//           console.error('Error fetching group data: ', error);
//           Alert.alert('Error', 'Failed to load group data.');
//         }
//       });
//   };

//   useEffect(() => {
//     getChatList();
//   }, []);
//   const CollectionId = firestore().collection('GroupChats').doc().id;
//   console.log("CollectionId is =>",CollectionId)

//   const deleteFirestoreGroup = async () => {
//     const result = firestore()
//       .collection('GroupChat')
//       .doc(CollectionId)
//       .delete()
//       .then(() => console.log('document deleted'));
//   };

//   const RenderItem = ({item}: {item: GroupData}) => {
//     const CreatedById = item?.createdBy?._documentPath?._parts?.[1];
//     return (
//       <GroupDataScreen
//         name={item?.Groupname}
//         Desc={item?.Desc}
//         source={{uri: item?.image}}
//         onPress={() => navigation.navigate('GroupChatScreen', {item: item})}
//         message={CreatedById === user?.uid ? 'delete' : ''}
//         onPress1={()=>deleteFirestoreGroup()}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent={false}
//         barStyle={'dark-content'}
//         backgroundColor={'white'}
//       />
//       <Header
//         onPress1={() => navigation.navigate('CreateGroup')}
//         name="Groups"
//         Icon0={AppIcons.search}
//         Icon1={AppIcons.add}
//       />
//       <FlatList
//         data={GroupData}
//         renderItem={RenderItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default Groups;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   groupContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   groupImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   groupDetails: {
//     flex: 1,
//   },
//   groupName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   groupDesc: {
//     fontSize: 14,
//     color: '#888',
//   },
// });
