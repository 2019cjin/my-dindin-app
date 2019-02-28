import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EventsList from './EventsList';
import OldEventsList from './OldEventsList';
import LogInAccount from './LogInAccountV2';

export default class LogInScreen extends React.Component{
   

    render(){
        return(
            
        
           <View style={styles.container}>
             <Text>Facebook Login</Text>

             <LogInAccount/>

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