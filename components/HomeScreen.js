import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class HomeScreen extends React.Component{
    render(){
        return(
           <View style={styles.container}>
           <View style={styles.header}>
           <Image style = {styles.sideBtn} source ={require   ('../assets/sidemenu btn.png')}>
            </Image>

            <Text style = {styles.title}> DinDin </Text>


             <Image style = {styles.searchBtn} source ={require   ('../assets/search btn.png')}>
            </Image>

           </View>

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