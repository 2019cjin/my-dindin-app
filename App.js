import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Constants } from 'expo';

// You can import from local files
import ScreenRotation from './components/ScreenRotation';
import HomeScreen from './components/HomeScreen';
import SplashScreen from './components/SplashScreen';
import AddNewEvent from './components/AddNewEvent';
import AddNewEventNextStep from './components/AddNewEventNextStep';
import EventsList from './components/EventsList';
import LogInScreen from './components/LogInScreen';
//import InvitationDetailsScreen from './components/InvitationDetailsScreen'
import PendingInvite from './components/PendingInvite'
import InviteDetail from './components/InviteDetail'
//import LogInScreen from './components/LogInScreen';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

const rootStack = createStackNavigator({
  Home:HomeScreen,
  Splash:SplashScreen,
  AddNewEvent:AddNewEvent,
  AddNewEventNextStep:AddNewEventNextStep,
  EventsList:EventsList,
  LogIn: LogInScreen,
  PendingInvite:PendingInvite,
  InviteDetail:InviteDetail,
  //InvitationDetailsScreen:InvitationDetailsScreen,
},
{
  initialRouteName: 'Splash'
}
)

const AppContainer = createAppContainer(rootStack)



function mapStateToProps(state){
  return{
    database: state.database
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  
   

  //dispatch functions


  render() {
    
    return ( 
        <AppContainer persistenceKey="TopNav"/>
    );
  }
}