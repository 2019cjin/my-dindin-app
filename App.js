import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Constants } from 'expo';

// You can import from local files
import ScreenRotation from './components/ScreenRotation';
import HomeScreen from './components/HomeScreen';
import SplashScreen from './components/SplashScreen';
import AddNewEvent from './components/AddNewEvent';
import EventsList from './components/EventsList';
import LogInScreen from './components/LogInScreen';
//import LogInScreen from './components/LogInScreen';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

const rootStack = createStackNavigator({
  Home:HomeScreen,
  Splash:SplashScreen,
  AddNewEvent:AddNewEvent,
  EventsList:EventsList,
  LogIn: LogInScreen,
},
{
  initialRouteName: 'Splash'
}
)

const AppContainer = createAppContainer(rootStack)

export default class App extends React.Component {
  render() {
    return ( 
      <AppContainer/>
    );
  }
}