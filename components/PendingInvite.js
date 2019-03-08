import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image} from 'react-native'
import {Constants} from 'expo'

export default class PendingInvite extends React.Component{
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

       <ImageBackground style={styles.featuredImage}>

          <Text style={styles.title}> Pending
             </Text>
             
              <Image style={styles.profilePic} source={require('../assets/profpic1.png')} />

           <Text style={styles.author}> Jill Smith
             </Text>

              <Text style={styles.author}> Wednesday 4 Nov - 8 pm 
             </Text>


        </ImageBackground>


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
            justifyContent: 'flex-start',
            borderStyle: 'solid',
            borderWidth: 1,
            backgroundColor: "#e8f4f8",
            borderColor: "#eef7fa",
            borderRadius: 5
        },
        title:{
            fontFamily: "Helvetica",
            fontSize: 12,
            color: "#00000",
            letterSpacing: 0.38,
            textAlign: "left",
        }, 
        author:{
            fontFamily: "Segoe UI",
            fontSize: 14,
            color: "#00000",
            textAlign: "right",
            paddingRight: 50,
            fontStretch: "Medium"
        },

        profilePic:{
       
            textAlign: "left",
            paddingLeft: 100,
            paddingTop:70,
            //backgroundColor:'blue'
        }
}
)