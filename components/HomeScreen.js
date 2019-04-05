import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import EventsList from './EventsList';
import OldEventsList from './OldEventsList';
import Header from './Header'
import PendingInvite from './PendingInvite'
//import InviteDetailScreen from './InvitationDetailsScreen'

import * as firebase from 'firebase';//for connecting to firebase

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZpTrKnBHgaQbv_F87VoD5ZOn83Rkqe-w",
    authDomain: "dindin-9954b.firebaseapp.com",
    databaseURL: "https://dindin-9954b.firebaseio.com",
    projectId: "dindin-9954b",
    storageBucket: "dindin-9954b.appspot.com",
    messagingSenderId: "1055947992772"
  };

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            date: new Date(),//include so that we are able to change the month
            noPendingInvites: true
        }
    }

    async startListener(path) {
        let context = this
        firebase.database().ref(path).on('value', async (snapshot) => {     
          let numInvites = parseInt(JSON.stringify(snapshot.val()), 10)
          if (numInvites > 0)
          {
              context.setState({noPendingInvites: false})
          }
        })
        
      }
    
    getDate = setInterval(() => {this.setState({date: new Date()})}, 1000)

    componentDidMount(){
        
        this.getDate;

        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
          }
        path = 'gsamson/numPendingInvite/'
        
        this.startListener(path)

    }
    //eventlist: need to pass in what month - default month is month of today
    //event list don't show events in days before today
    //  <EventsList type = {new Date()} navigation = {this.props.navigation} />

    componentWillUnmount(){
        clearInterval(this.getDate)
    }


    //navigation = {this.props.navigation}

    render(){
        return(
          
        
        <View style={styles.container}>
        <Header navigation = {this.props.navigation}/>
        { this.state.noPendingInvites === false? 
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('InviteDetailScreen')}}>
          <PendingInvite navigation = {this.props.navigation}/>    
          </TouchableOpacity>  :
          <View/>
        }
      
          <EventsList today = {this.state.date} navigation = {this.props.navigation} />
        
      </View>

       
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight,          

    },
});