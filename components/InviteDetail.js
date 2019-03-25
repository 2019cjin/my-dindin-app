import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image, TouchableOpacity} from 'react-native'
import MapInvite from './MapInvite'

export default class InviteDetail extends React.Component{
/*
 constructor(props){
     super(props)
     this.state={
         pendinginvite: null
     }
 }   

componentDidMount(){
    this.getData()
}

async getData(){
    let response = await fetch("https://www.cs.virginia.edu/~dgg6b/Mobile/Featured/featured.json")
    let parsedResponse = await response.json()
    this.setState({
        pendinginvite : parsedResponse
    })
}

render(){
    if(this.state.pendinginvite === null){
        return(<View/>)
    }
    return(
        
        <View style={styles.container}>

        <ImageBackground style={styles.featuredImage}
        source={{uri: this.state.pendinginvite.image}}>
            <Text style={styles.title}> {this.state.pendinginvite.title}
             </Text>
            <Text style={styles.author}> {this.state.pendinginvite.author} 
            </Text>
        </ImageBackground>
        </View>
        )
    }
}*/

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

        <View style ={styles.setButtons}>
        <TouchableOpacity>
          <Text style= {styles.acceptInvite}>
            Accept
          </Text>
          </TouchableOpacity>
         
          <TouchableOpacity>
          <Text style= {styles.declineInvite}>
            Decline
          </Text>
          </TouchableOpacity>
        </View>
        <MapInvite />

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
            borderRadius: 5
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
        },

        declineInvite:{
          //fontFamily: "Segoe UI",
          fontSize: 14,
          backgroundColor:'#e8f4f8',
          width: 177,
          textAlign: "center",
          color: 'red'
        }

       
    }
)