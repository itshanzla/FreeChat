import {
  ImageBackground,
  ImageStyle,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {persistStore} from 'redux-persist';
import MyStore from './src/components/Redux/MyStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Main from './src/Screens/MainScreen/Main';

const App = () => {
  let persistor = persistStore(MyStore);
  return (
    <Provider store={MyStore}>
    <PersistGate persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
  );
};

const styles = StyleSheet.create({});
export default App;
