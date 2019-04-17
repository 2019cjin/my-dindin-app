import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground, Image, TouchableOpacity, FlatList} from 'react-native'
import {Constants} from 'expo'
import * as firebase from 'firebase';
import {weekDayMonthDate2, convertDateToDBString} from './DateConversion';

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
   

   function compare(a,b) {
    if (a.date < b.date)
        return -1;
    if (a.date > b.date)
        return 1;
    return 0;
    }

export default class PendingInvite extends React.Component{

    constructor(props){
        super(props)
        this.state= {
          catFact:{firstName: '', lastName: ''},
          isFlashing:false, isFlashing2:false,
          data:[],
          finalList: [],
          firstIndex: 0
        }

    }

    
    async startListener(path) {
      let context = this
      await firebase.database().ref(path).on('value', (snapshot) => {     
        console.log(JSON.stringify(snapshot.val()))
        context.setState({
          data: JSON.parse(JSON.stringify(snapshot.val())), 
          gotInformation: true
        })
        context.getFinalList()
      })
      
    }

    getFinalList(){
        if (this.state.data.length > 0){
          this.setState({finalList:[]})
          let initialList = this.state.data
          let firstIndex = this.state.data.length
          let todayString = convertDateToDBString(new Date())
          for (let i = 0; i < this.state.data.length; i ++)
          {
            currentDate = initialList[i]["date"]
            if (currentDate >= todayString){
              firstIndex = i
              this.setState({firstIndex: firstIndex})
              break
            }
          }
          for (let i = firstIndex; i < this.state.data.length; i ++){
              if (this.state.data[i].isPending === true)
              {
                this.state.finalList.push(initialList[i])
                this.state.finalList[this.state.finalList.length - 1].index = i
              }
          }
          this.state.finalList.sort(compare)
        }
    }

    timerID = setInterval(() => {this.tick()}, 7000)

    componentDidMount() {
        this.timerID
        //this.startListener(path)
        //console.log(props.store)
        if (!firebase.apps.length){
          firebase.initializeApp(firebaseConfig)
        }
        path = 'gsamson/pendingInvite'
        this.startListener(path)
        this.gotInformation = false;
      }

      componentWillUnmount(){
        clearInterval(this.timerID)
        if (!firebase.apps.length){
          firebase.initializeApp(firebaseConfig)
        }
        path = 'gsamson/pendingInvite'
        this.startListener(path)
        this.gotInformation = false;
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
    
      tick3() {
        this.setState({isFlashing: true})  
        this.interval = setTimeout(()=> this.setState({isFlashing: false}), 1000)   
     }
     
   
      tick2() {
       this.setState({isFlashing2: true})  
      this.interval = setTimeout(()=> this.setState({isFlashing2: false}), 1000)
      //clearInterval(this.interval)
     }

     keyExtractor(item){
      return item.id.toString()
  }

  async accepted(item, index){ 

    await this.tick3()
    await (newIndex = item.index)
    await( guestIndex = 0)

    //finish updating host's guest list
    await firebase.database().ref(item.hostUserName.toString() + '/yourEventsList/' + item.id.toString() ).on('value', async function(snapshot) {
      await (guests =  snapshot.val())
      //await console.log(guests)
      for (let i = 0; i < guests.length; i ++)
      {
        if (guests[i].Username === item.Username)
        {
          await (guestIndex = i)
        }
      }
      //console.log("guest index is " + guestIndex)

      firebase.database().ref(item.hostUserName.toString() +'/yourEventsList/' + item.id.toString() + '/' + guestIndex.toString() + '/accepted').set(
        "true"
      )

    })

    //add new event to guest's event list

    await( eventID = 0 )
    await(eventIDRef = await firebase.database().ref('gsamson/numEvents/'))
    await eventIDRef.on('value', function(snapshot) {
      eventID =  snapshot.val();
    })
    firebase.database().ref('gsamson/eventsList/' + eventID.toString() + '/').set(
      item
    )
    firebase.database().ref('gsamson/numEvents/').set(
      eventID + 1
    )
    
  

    //adjust pendingInvite list
    await console.log(newIndex)
    firebase.database().ref('gsamson/pendingInvite/' + newIndex.toString() + '/isPending').set(
      false
    )

  }
  async declined (item, index){ 

    await this.tick2()
    //adjust pendingInvite list
    await (newIndex = item.index)
    firebase.database().ref('gsamson/pendingInvite/' + newIndex.toString() + '/isPending').set(
      false
    )


  }

renderRow({item, index}){
  return(
  <View style={styles.container}>
    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('InvitationDetailsScreen', {host: item})}}>
      { this.state.gotInformation ? ( 
        <View>
            <ImageBackground style={styles.featuredImage}>

                <View> 
                      <Image style={styles.profilePic} source={{uri: item.profilePic}} />

                      <Text style={styles.author}>  {item["hostFName"]} {item["hostLName"]} </Text>
                      <Text style={styles.author}> {weekDayMonthDate2(item["date"])} - {item["time"]} </Text>         
                </View>

            </ImageBackground>
        </View>

            ):  (<View><Text>Loading pending invites</Text></View>)

        }

        </TouchableOpacity>
        
        
        <View style ={styles.setButtons}>
        <TouchableOpacity onPress={() => this.accepted(item, index)}>      
        { 
          this.state.isFlashing === false ?
          <Text style={styles.acceptInvite}>
            Accept
          </Text> :
          this.state.isFlashing === true ?
           
          <Text style={styles.accept}>
            Accept
          </Text>:        
          
          <Text/>
         }
          </TouchableOpacity>
         
          <TouchableOpacity onPress={() => this.declined(item, index)}>  
          { 
          this.state.isFlashing2 === false ?
          <Text style={styles.declineInvite}>
            Decline
          </Text> :
          this.state.isFlashing2 === true ?
           
          <Text style={styles.decline}>
            Decline
          </Text>:        
          
          <Text/>
         }
          </TouchableOpacity>     

        </View>
  </View>
  )
}

render(){
  return(
    <View>
      {this.state.gotInformation ? ( 
      <View><Text style={styles.title}> Pending {this.state.data.length - this.state.firstIndex}</Text>
      <FlatList
          data={this.state.finalList}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          horizontal={true}
      /></View> ):  (<View><Text>Loading pending invites</Text></View>)
      }
    </View>  
  )
}

/*render(){
  return(
    <View>
      <Text>Pending Invite here</Text>
    </View>  
  )
}*/

}

const styles = StyleSheet.create(
    {
        container:{
            height:158,
            margin: 10,
        },
        featuredImage:{
            height: 148,
            width: 350,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderStyle: 'solid',
            borderWidth: 1,
           // backgroundColor: "#e8f4f8",
            backgroundColor: "#D2EFFF",
            borderColor: "#D2EFFF",
            //borderColor: "#eef7fa",
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
            padding: 40,
            paddingRight: 40,
            paddingTop: 20,
            paddingBottom: 20
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
            //paddingRight: 50,
            //fontStretch: "Medium"
        },

        profilePic:{
       
            //textAlign: "left",
            //paddingLeft: 100,
           // paddingTop:70,
            width: 70, 
            height: 70
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
          //backgroundColor:'#e8f4f8', backgroundColor: "#eef7fa",
          backgroundColor: "#D2EFFF",
          width: 175,
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
          //backgroundColor:'#e8f4f8',  backgroundColor: "#eef7fa",
          backgroundColor: "#D2EFFF",
          width: 175,
          textAlign: "center",
          color: 'red',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
        },

        accept:{
          backgroundColor: 'green',
          width:175,
          textAlign: 'center',
          color: 'black',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
        },

         decline:{
          backgroundColor: 'red',
          width:175,
          textAlign: 'center',
          color: 'black',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
        }
}
)