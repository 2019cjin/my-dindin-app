import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EventsList from './EventsList';
import OldEventsList from './OldEventsList';
import Header from './Header'
import PendingInvite from './PendingInvite'

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            date: new Date(),//include so that we are able to change the month
        }
    }
    
    getDate = setInterval(() => {this.setState({date: new Date()})}, 1000)

    componentDidMount(){
        
        this.getDate;

    }
    //eventlist: need to pass in what month - default month is month of today
    //event list don't show events in days before today
    //  <EventsList type = {new Date()} navigation = {this.props.navigation} />

    componentWillUnmount(){
        clearInterval(this.getDate)
    }

    render(){
        return(
          
        
        <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <TouchableOpacity onPress={()=>{this.props.navigation}}>
          <PendingInvite/>    
          </TouchableOpacity>  
      
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