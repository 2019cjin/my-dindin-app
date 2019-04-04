import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image, TouchableOpacity} from 'react-native'
import {Constants} from 'expo'
import * as firebase from 'firebase';

//import InvitationDetailsScreen from './components/InvitationDetailsScreen'

var GobalSpace = {
    url: "http://people.virginia.edu/~esb5er/EvansAlma.json"
  }


  //import console = require('console');
  
   // Initialize Firebase
   const firebaseConfig = {
     apiKey: "AIzaSyDZpTrKnBHgaQbv_F87VoD5ZOn83Rkqe-w",
     authDomain: "dindin-9954b.firebaseapp.com",
     databaseURL: "https://dindin-9954b.firebaseio.com",
     projectId: "dindin-9954b",
     storageBucket: "dindin-9954b.appspot.com",
     messagingSenderId: "1055947992772"
   };
   
export default class PendingInvite extends React.Component{

    constructor(props){
        super(props)
        this.state= {
          catFact:{firstName: '', lastName: ''}
        }
        //console.log(props.store)
        if (!firebase.apps.length){
          firebase.initializeApp(firebaseConfig)
        }
        path = 'Invitations/Invitation/'
        this.startListener(path)
        this.gotInformation = false;

    }

    
    startListener(path) {
      let context = this
      firebase.database().ref(path).on('value', (snapshot) => {     
        console.log(JSON.stringify(snapshot.val()))
        context.setState({
          data: JSON.parse(JSON.stringify(snapshot.val())), 
          gotInformation: true
        })
      })
    }

      

    timerID = setInterval(() => {this.tick()}, 7000)

    componentDidMount() {
        this.timerID
        //this.startListener(path)
      }

      componentWillUnmount(){
        clearInterval(this.timerID)
    }

      tick() {
        return fetch(GobalSpace.url).then(
          (response) => response.json()).then(
            response =>{
              this.setState({catFact: response}
                )
            }
        )
      }
    

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
    let response = await fetch("https://www.homedir.virginia.edu/myhome/esb5er/myweb/html/dinDinJSON/EvansAlma.json")
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

    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('InviteDetail')}}>


    


            { this.state.gotInformation ? ( 
            <View>
            <Text style={styles.title}> Pending {this.state.data.length}</Text>
       <ImageBackground style={styles.featuredImage}>

             <View> 
                  <Image style={styles.profilePic} source={require('../assets/profpic1.png')} />

              <Text style={styles.author}>  {this.state.data[0]["name"]} 
                </Text>

                  <Text style={styles.author}> {this.state.data[0]["location"]} 
                </Text>           
            </View>

            </ImageBackground>
            </View>

            ):  (<View/>)

        }

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
            //fontFamily: "Helvetica",
            fontSize: 12,
            color: "#000000",
            letterSpacing: 0.38,
            textAlign: "left",
        }, 
        author:{
            //fontFamily: "Segoe UI",
            fontSize: 14,
            color: "#000000",
            textAlign: "right",
            paddingRight: 50,
            //fontStretch: "Medium"
        },

        profilePic:{
       
            //textAlign: "left",
            paddingLeft: 100,
            paddingTop:70,
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
          width: 195,
          textAlign: "center",
          color: 'green',
        },

        declineInvite:{
          //fontFamily: "Segoe UI",
          fontSize: 14,
          backgroundColor:'#e8f4f8',
          width: 195,
          textAlign: "center",
          color: 'red'
        }
}
)