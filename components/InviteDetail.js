import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image, TouchableOpacity} from 'react-native'
import MapInvite from './MapInvite'

import {weekDayMonthDate2} from './DateConversion';

export default class InviteDetail extends React.Component{

render(){
  return(
  <View style={styles.container}>

      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
       <ImageBackground style={styles.featuredImage}>

          
             
              <Image style={styles.profilePic} source={{uri: this.props.host.profilePic}} />
           <Text style={styles.author}> {this.props.host.location}
             </Text>

              <Text style={styles.author}> {weekDayMonthDate2(this.props.host.date)} - {this.props.host.time}
             </Text>

             <Text style={styles.author}> Hosted by {this.props.host.hostFName} {this.props.host.hostLName}
             </Text>
             

        </ImageBackground>
      </TouchableOpacity>

           

  </View>
  )
}
}
const styles = StyleSheet.create(
    {
        container:{
            height:158,
            margin: 10,
        },
        featuredImage:{
            height: 148,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'solid',
            borderWidth: 1,
            //backgroundColor: "#e8f4f8",
            backgroundColor: "white",
            //borderColor: "#eef7fa",
            borderColor: "white",
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
        },
       
        author:{
            //fontFamily: "Segoe UI",
            fontSize: 14,
            color: "#000000",
            textAlign: "center",
            //paddingRight: 50,
            //fontStretch: "Medium"
        },

        profilePic:{
            //justifyContent:'left',
            //textAlign: "center",
            //paddingLeft: 100,
            //paddingTop:70,
            //backgroundColor:'blue'
            height: 50,
            width: 50
        },

        setButtons:{
            flexDirection: 'row',
            height: 50,
            //flex: 1,
            justifyContent: 'center'
        },

        acceptInvite:{
          //fontFamily: "Segoe UI",
          fontSize: 14,
          backgroundColor:'#e8f4f8',
          width: 177,
          textAlign: "center",
          color: 'green',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
        },

        declineInvite:{
          //fontFamily: "Segoe UI",
          fontSize: 14,
          backgroundColor:'#e8f4f8',
          width: 177,
          textAlign: "center",
          color: 'red',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
        }

       
    }
)