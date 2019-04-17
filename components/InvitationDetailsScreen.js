import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from './Header'
import InviteDetail from './InviteDetail'
import MapInvite from './MapInvite'
//import InviteCarousel from './Carousel'
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import EventsList from './EventsList';
//import OldEventsList from './OldEventsList';

export default class InvitationDetailsScreen extends React.Component{
    
    render(){

      const { navigation } = this.props;
      const h = navigation.getParam('host', 'NO HOST');

        return(
        <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        
        <InviteDetail host = {h} navigation={this.props.navigation}/>    
        
        <View style={styles.mapview}>
            <MapInvite host ={h} />  
          </View>
        
      </View>   
        )
    }
    /*
     <View style={styles.mapview}>
            <MapInvite />  
          </View>
          <InviteCarousel/>
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
