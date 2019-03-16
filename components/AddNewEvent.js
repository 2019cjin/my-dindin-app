import * as React from 'react';
import { Constants } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class AddNewEvent extends React.Component{
    render(){
        return(
            <View style = {{ justifyContent: 'space-between', flex: 1}}>
                <View style = {{ justifyContent: 'space-between', flex: 1}}>
                    <View style = {styles.header}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                            <Image style={styles.back} source={require('../assets/sidemenubtn.png')}/>
                        </TouchableOpacity>
                        <Text style = {styles.title}>DinDin</Text>
                        <Text style = {styles.title}>            </Text>
                    </View>

                    <View>
                        <Text style = {styles.subtitle}>What time is dinner?</Text>
                    </View>
                    <View>
                        <Text style = {styles.subtitle}>What time is dinner?</Text>
                    </View>
                </View>

                <View>
                    <Image source={require('../assets/map.png')}/>
                </View>
            </View>
        )
       
    }
}

const styles = StyleSheet.create(
    {
        header:{
            height: 48,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 30, 

        },

      title:{

        textAlign: "center",
          //verticalAlignment:"Center",
          lineHeight:23,
          //textWrapping:"Wrap",
          //Text="DinDin",
          //fontFamily:"Segoe UI",
          fontSize:20,
          //fontStretch:"Medium",
          //foreground:"#353535",

      },
      subtitle:{
        textAlign: "center",
        //fontFamily:"Segoe UI",
        //textWrapping:"Wrap",
        alignItems: 'center',
        fontSize:13,
        borderWidth: 10,
        borderColor:"black"
      },
        back:{
            width: 22,
            height: 22,
            margin: 20, 
        },
        
    }
)