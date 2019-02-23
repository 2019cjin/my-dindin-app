import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EventsList from './EventsList';

export default class HomeScreen extends React.Component{
    constructor(){
        super()
    }
    render(){
        console.log("Home" + this.props.navigation)
        return(
            
        
           <View style={styles.container}>
            <View style={styles.header}>
                <Image style = {styles.sideBtn} source ={require   ('../assets/sidemenubtn.png')}/>
               
                <Text style = {styles.title}> DinDin </Text>

                <Image style = {styles.searchBtn} source ={require   ('../assets/searchbtn.png')}/>
            </View>
           
                <EventsList/>
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