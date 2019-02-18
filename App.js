import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import SplashScreen from './components/SplashScreen';
//import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';
import ScreenRotation from './components/ScreenRotation';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

export default class App extends React.Component {
  render() {
    return ( 
      //<ScreenRotation/>
      <SplashScreen/>
    );
  }
}