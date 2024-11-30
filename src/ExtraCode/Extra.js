<GiftedChat
textInputStyle={{fontFamily: AppFont.RobotoBold, color: Tertiary.black}}
messages={messages}
createdAtFormat
onSend={text => onSend(text)}
placeholder="Type a Message"
renderAvatar={null}
inverted={false}
RenderTime={RenderTime}
user={{
  _id: users.uid,
}}
renderInputToolbar={props=>CustomToolbar(props)}

/>