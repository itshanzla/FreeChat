import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppFont} from '../../Text/AppFonts';
import {AppIcons} from '../../assets/icons/AppIcons';
import {Colors, Tertiary} from '../../colors/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
interface chatinput {
  value?: any;
  onChangeText?: any;
  onPress?: () => void;
  onPress1?: () => void;
  image?: any;
  loader?: boolean;
}

const ChatInput = ({
  value,
  onChangeText,
  onPress,
  onPress1,
  image,
  loader,
}: chatinput) => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'black'}
          placeholder="Type Something..."
          style={styles.input}
        />
        <TouchableOpacity onPress={onPress1} style={styles.btn}>
          <Image
            resizeMode="contain"
            style={styles.img1}
            source={AppIcons.link}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Image style={styles.img} source={AppIcons.Vector} />
        </TouchableOpacity>
      </View>
      {image &&
        (loader == true ? (
          <View>
            <ActivityIndicator color={Colors.Primary} size={'small'} />
            <Image
              resizeMode="contain"
              style={{
                width: 150,
                height: 150,
                marginTop: 10,
                marginLeft: 20,
                marginBottom: 20,
                borderRadius: 10,
              }}
              source={{uri: image}}
            />
          </View>
        ) : (
          <Image
            resizeMode="contain"
            style={{
              width: 150,
              height: 150,
              marginTop: 10,
              marginLeft: 20,
              marginBottom: 20,
              borderRadius: 10,
            }}
            source={{uri: image}}
          />
        ))}
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: AppFont.RobotoMedium,
    padding: 20,
    color: 'black',
    width: '70%',
  },
  container: {
    backgroundColor: Tertiary.offwhite,
    alignItems: 'center',
    // paddingHorizontal:14,
    justifyContent: 'space-between',
    bottom: 0,
    flexDirection: 'row',
  },
  img: {
    width: 12,
    height: 19.2,
  },
  img1: {
    width: 22,
    height: 22,
  },
  btn: {
    width: 38,
    height: 38,
    backgroundColor: Tertiary.mildgray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 8,
  },
});
