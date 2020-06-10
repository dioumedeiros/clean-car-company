import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import Routes from './routes';

import Camera from './components/Camera';

class App extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('ddf38d93-194b-43e5-b0ca-a8edc677ff72');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (data) => {
    console.log('data ', data);
  };

  onOpened = (notification) => {
    console.log('notification ', notification);
  };

  onIds = (id) => {
    console.log('notification ', id);
  };

  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#08A4BD" />
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Routes />
        </View>
      </NavigationContainer>
    );
  }
}

export default App;
