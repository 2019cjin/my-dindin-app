import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EventsList from './EventsList';
import OldEventsList from './OldEventsList';

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            date: new Date(),//include so that we are able to change the month
        }
    }

    componentDidMount(){
        setInterval(() => {this.setState({date: new Date()})}, 1000);

    }
    //eventlist: need to pass in what month - default month is month of today
    //event list don't show events in days before today
    //  <EventsList type = {new Date()} navigation = {this.props.navigation} />
    render(){
        return(
            
        
           <View style={styles.container}>
            <View style={styles.header}>
                <Image style = {styles.sideBtn} source ={require   ('../assets/sidemenubtn.png')}/>
               
                <Text style = {styles.title}> DinDin </Text>

                <Image style = {styles.searchBtn} source ={require   ('../assets/searchbtn.png')}/>
            </View>
           
                <EventsList type = {this.state.date} navigation = {this.props.navigation} />
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
            justifyContent: 'center'

        },

  
 
      header: { 
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      flexDirection:'row',
      },

      sideBtn: { 
      width:32,
      height:30,
   },

   title:{

     textAlignment: "Center",
      verticalAlignment:"Center",
      lineHeight:23,
      textWrapping:"Wrap",
      //Text="DinDin",
      fontFamily:"Segoe UI",
      fontSize:17,
      fontStretch:"Medium",
      foreground:"#353535",

   },

   searchBtn: { 
      width:40,
      height:40,
   },
});