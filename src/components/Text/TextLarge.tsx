import { StyleSheet, Text, TextProps, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { fontSize } from '../../Text/fontsize'
import { AppFont } from '../../Text/AppFonts'
import { Colors } from '../../colors/Colors'
export interface textlarge{
  Title?:string,
  ellipsizeMode?:TextProps['ellipsizeMode'],
  styletxt?:TextStyle,
  stylemain?:ViewStyle,
  numberOfLines?:TextProps['numberOfLines']
}

const TextLarge: React.FC<textlarge> = ({Title,ellipsizeMode,styletxt,stylemain,numberOfLines}) => {
  return (
    <View style={[styles.container,stylemain]}>
      <Text numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}  style={[styles.txt,styletxt]}>{Title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    alignSelf:'center',
    marginTop:20
  },
  txt:{
    fontSize:fontSize.largeTxt,
    fontFamily:AppFont.RobotoBold,
    color:Colors.Primary
  }
})
export default TextLarge

