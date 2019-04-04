import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from './Header'
import InviteDetail from './InviteDetail'
import MapInvite from './MapInvite'
import InviteCarousel from './Carousel'
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import EventsList from './EventsList';
//import OldEventsList from './OldEventsList';

export default class InvitationDetailsScreen extends React.Component{
    //constructor(){
      //  super()
        //this.state={
          //  date: new Date(),//include so that we are able to change the month
       // }
    //}

   // componentDidMount(){
        //setInterval(() => {this.setState({date: new Date()})}, 1000);

    //}
    //eventlist: need to pass in what month - default month is month of today
    //event list don't show events in days before today
    //  <EventsList type = {new Date()} navigation = {this.props.navigation} />
    render(){
        return(
        <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        
        <InviteDetail/>    
        <InviteCarousel/>
          
        
      </View>   
        )
    }
    /*
     <View style={styles.mapview}>
            <MapInvite />  
          </View>
     */
}
//<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
// </TouchableOpacity> 
const styles = StyleSheet.create({

  container: {
            flex: 1,
            flexDirection:'column',
            backgroundColor: "white",
            paddingTop: Constants.statusBarHeight,          

        },

        mapview: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingTop: 10,
          //borderColor:'black',
          //borderWidth:10
    
        }

});
