import {StyleSheet, Text, TextProps, TextStyle, TouchableOpacityProps, View, ViewStyle} from 'react-native';
import React from 'react';
import {fontSize} from '../../Text/fontsize';
import {AppFont} from '../../Text/AppFonts';
import {Colors} from '../../colors/Colors';
interface smalltext {
  Title?:string;
  ellipsizeMode?:TextProps['ellipsizeMode'];
  styletxt?:TextStyle;
  stylemain?:ViewStyle;
  numberOfLines?:TextProps['numberOfLines'];
  Title2?:string;
  onPress?:TouchableOpacityProps['onPress'];
}
const SmallText:React.FC<smalltext> = ({
  Title,
  ellipsizeMode,
  styletxt,
  stylemain,
  numberOfLines,
  Title2,
  onPress,
}) => {
  return (
    <View style={[styles.container, stylemain]}>
      <Text
        onPress={onPress}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={[styles.txt, styletxt]}>
        {Title}
        <Text style={styles.txt2}>{Title2}</Text>
      </Text>
    </View>
  );
};

export default SmallText;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txt: {
    fontSize: fontSize.smalltxt,
    fontFamily: AppFont.RobotoBold,
    color: Colors.Primary,
  },
  txt2: {
    fontSize: fontSize.smalltxt,
    fontFamily: AppFont.RobotoBold,
    color: Colors.Primary,
  },
});
