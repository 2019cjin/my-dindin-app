import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image, TouchableOpacity} from 'react-native'
import MapInvite from './MapInvite'

export default class InviteDetail extends React.Component{

render(){
  return(
  <View style={styles.container}>

      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
       <ImageBackground style={styles.featuredImage}>

          
             
              <Image style={styles.profilePic} source={require('../assets/profpic1.png')} />
           <Text style={styles.author}> Location
             </Text>

              <Text style={styles.author}> Wednesday 4 Nov - 8 pm 
             </Text>

             <Text style={styles.author}> Hosted by Jill Smith
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
            backgroundColor: "#e8f4f8",
            borderColor: "#eef7fa",
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
            paddingRight: 50,
            //fontStretch: "Medium"
        },

        profilePic:{
            //justifyContent:'left',
            //textAlign: "center",
            //paddingLeft: 100,
            //paddingTop:70,
            //backgroundColor:'blue'
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