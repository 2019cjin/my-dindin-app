import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EventsList from './EventsList';
import OldEventsList from './OldEventsList';
//import LogInAccount from './components/LogInAccount';

export default class LogInScreen extends React.Component{
   
//<LogInAccount/>
    render(){
        return(
            
        
           <View style={styles.container}>
             <Text>Facebook Login</Text>
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

});