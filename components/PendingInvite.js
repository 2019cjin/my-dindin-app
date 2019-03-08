import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image} from 'react-native'

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
             
              <Image style={styles.profilePic} source={require('./assets/profpic.png')} />

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
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight,          

    }
}
)