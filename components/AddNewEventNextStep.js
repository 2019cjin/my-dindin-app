import * as React from 'react';
import { Constants, Svg } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
//import Checkbox from 'react-native-modest-checkbox';
import { CheckBox } from 'react-native-elements';
import {getWeekDayMonthDate, convertDateToDBString} from './DateConversion';
import {getAddressString} from './MapHelperFunction';

import * as firebase from 'firebase';//for connecting to firebase
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

export default class AddNewEventNextStep extends React.Component{
    constructor(){
        super()
        this.state={
            time: null,
            date: null,
            locLatitude: 39,
            locLongitude: -77, 
            inviteeList:[],
            contactsList:null,
            //gotList: false,
            eventDetails: null,
            numInvitee: 0
        }
    }


    async startListener(path) {
        let context = this;
        firebase.database().ref(path).on('value', async (snapshot) => {     
          //console.log(JSON.stringify(snapshot.val()))
          await context.setState({
            contactsList: JSON.parse(JSON.stringify(snapshot.val())), 
            gotInformation: true
          })
          for (let i = 0; i < context.state.contactsList.length; i ++)
            {
                await (context.state.contactsList[i].selected = false)
            }
        })
      }

      updateEventOnDB(path) {
           let context = this
          /*firebase.database().ref(path).push(
              context.state.eventDetails
          )*/

          firebase.database().ref('jdoe/eventsList/'+ this.state.eventDetails["id"] + '/').set(
            context.state.eventDetails
          )
      }

      async updateInviteeListOnDB(path) {
        let context = this
       /*firebase.database().ref(path).push(
           context.state.eventDetails
       )*/

       for (let i = 0; i < this.state.inviteeList.length; i ++)
       {
          await firebase.database().ref('jdoe/yourEventsList/'+ this.state.eventDetails["id"] + '/' + i + '/').set(
            context.state.inviteeList[i]
          )
          await firebase.database().ref('jdoe/yourEventsList/' + this.state.eventDetails["id"] + '/' + i + '/accepted/').set(
            "false"
          )
    
          //update DB for invitee
          let pendingInviteID = 0
          
          var pendingIDRef = await firebase.database().ref(this.state.inviteeList[i]['Username'] + '/numPendingInvite/');
            pendingIDRef.on('value', function(snapshot) {
            pendingInviteID =  JSON.stringify(snapshot.val());
          });
          
          await firebase.database().ref(this.state.inviteeList[i]['Username'] + '/pendingInvite/' + pendingInviteID.toString() + '/').set(
              context.state.eventDetails
          )
          await firebase.database().ref(this.state.inviteeList[i]['Username'] + '/numPendingInvite/').set(
              (parseInt(pendingInviteID, 10) + 1)
          );

       }
   }

    //https://api.myjson.com/bins/1583d2
    //https://api.myjson.com/bins/crkna
    sendInvitesBtnAction = async ()=>{

        //need to create event and add to eventList
        await this.getEventDetails()
        await this.getInviteeList()
        //console.log(this.state.inviteeList)
        //console.log(this.state.eventDetails)

        await this.updateEventOnDB('jdoe/eventsList/')
        await this.updateInviteeListOnDB('jdoe/eventsList/')

        //for one second: display success message

        this.props.navigation.navigate('Home')
            
        //need to send invitations
        
        
    }

    goBack = ()=>{
        this.props.navigation.navigate('AddNewEvent')
    }

    //https://api.myjson.com/bins/crkna
    //https://api.myjson.com/bins/aig76
    async getContactsList(){
        let response = await fetch("https://api.myjson.com/bins/pikn6")
        let extractedJson = await response.json()
        let list = extractedJson.contactsList
        for (let i = 0; i < list.length; i ++)
        {
            await (list[i].selected = false)
        }
        await this.setState({
            contactsList: list
        })
        //this.setState({gotList:true})
        //await console.log("got contact list")
        //console.log(this.state.contactsList)
    }

    getEventDetails(){
        const { navigation } = this.props;
        const date = navigation.getParam('date', 'NO DATE');
        const time = navigation.getParam('time', 'NO TIME');
        const location = navigation.getParam('address', 'NO ADDRESS')
        const latitude = navigation.getParam('addressLat', 'NO LATITUDE')
        const longitude = navigation.getParam('addressLong', 'NO LONGITUDE')
        const eID = navigation.getParam('eventID', 'NO ID')

        this.setState({eventDetails: {'date': convertDateToDBString(date), 
                                      'time': time, 
                                      'location': location,
                                      'latitude': latitude,
                                      'longitude': longitude,
                                      'hostFName': 'John',
                                      'hostLName': 'Doe',
                                      'hostUserName': 'jdoe',
                                      'phoneNum': "987-654-3210",
                                      'profilePic': "https://a.icons8.com/0dnMfkZQ/2Z8Mj0/oval-1-copy.png",
                                      'id': eID}})

    }

    getInviteeList(){
        for (let i = 0; i < this.state.contactsList.length; i ++)
        {
            if (this.state.contactsList[i]["selected"] === true)
            {
                this.state.inviteeList.push(this.state.contactsList[i])
            }
        }
    }

    async componentWillMount(){
        //if (this.state.contactsList === null)
        //{
            //await this.getContactsList()
       // }
        //if (this.state.eventDetails === null)
        //{
            /*await this.getEventDetails()
            this.getInviteeList()
            console.log(this.state.inviteeList)
            console.log(this.state.inviteeList)*/
        //}
        //connect to firebase
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
          }
          path = 'jdoe/contactsList/'
          this.startListener(path)
          this.gotInformation = false;
        
    }
    

    keyExtractor(item){
        return item.id.toString()
    }

    renderRow({item}){
        return(
            <View style={styles.contactRowContainer}>
                    <Image style={{width: 50, height: 50}} source ={{uri: item.profilePic}}/>
                    <View style={styles.personContactInfo}>
                        <Text style={styles.person}>{item.FName} {item.LName}</Text>
                        <Text style={styles.phone}>{item.phoneNum}</Text>
                    </View> 
                    <View style={styles.checkBox}>
                        <CheckBox
                            checkedIcon={<Image source={require('../assets/selectedInvitee.png')} />}
                            uncheckedIcon={<Image source={require('../assets/unselectedInvitee.png')} />}
                            onPress={() => {
                                item["selected"] = !item["selected"]
                                if (item["selected"])
                                {
                                    this.setState({numInvitee: this.state.numInvitee + 1})
                                }
                                else
                                {
                                    this.setState({numInvitee: this.state.numInvitee - 1})
                                }
                            }}
                            checked={item["selected"]}
                            />
                    </View>
            </View> 
        )
    }

    render(){
        //console.log(this.state.contactsList)

    const { navigation } = this.props;
    const date = navigation.getParam('date', 'NO DATE');
    const time = navigation.getParam('time', 'NO TIME');
    const location = navigation.getParam('address', 'NO ADDRESS')

        return(
            <View style = {{ justifyContent: 'space-between', flex: 1}}>
                <View style = {styles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Svg height={50} width={50}>

                        <Svg.Line
                                x1="10"
                                y1="10"
                                x2="20"
                                y2="20"
                                stroke="#0F8CFF"
                                strokeWidth="2"
                            />

                        <Svg.Line
                                x1="10"
                                y1="10"
                                x2="20"
                                y2="0"
                                stroke="#0F8CFF"
                                strokeWidth="2"
                            />

                            <Svg.Line
                                x1="10"
                                y1="10"
                                x2="35"
                                y2="10"
                                stroke="#0F8CFF"
                                strokeWidth="2"
                            />
                        </Svg>
                        
                    </TouchableOpacity>

                    <Text style = {styles.title}>DinDin</Text>
                    <TouchableOpacity>
                        <Svg height={50} width={50} >

                        <Svg.Circle 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="#0F8CFF"
                                strokeWidth="2"
                                fill="#ffffff" />

                            <Svg.Line
                                x1="20"
                                y1="18"
                                x2="30"
                                y2="25"
                                stroke="#0F8CFF"
                                strokeWidth="2"
                            />
                        </Svg>
                        
                    </TouchableOpacity>
                </View>

                <View style={[styles.iconStyle, {paddingLeft: 30, paddingRight:30}]}>
                    <View style = {{flex:0.5}}/>
                    <View style={{flex:4, alignItems:'center'}}>
                        <Image style={{height:22, width: 25}} source ={require('../assets/yourEventIcon.png')}/>
                        <Text numberOfLines={1} style={{fontSize:28}}>{location}</Text>
                        <Text style = {{fontSize: 14, color:'grey'}}> {getWeekDayMonthDate(date)} - {time}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:'row', justifyContent:'space-between', width:350}}>
                        <Text style={{color:'grey'}}>Who do you want to invite?</Text>
                        <Text style={{color: "#0F8CFF"}}>{this.state.numInvitee} selected</Text>
                    </View>
                </View>

                <View style={{flex: 16, paddingLeft:20, paddingRight:20}}>
                    {
                    this.state.contactsList === null ?
                    <Text>contacts list loading...</Text> :
                    <FlatList
                        data={this.state.contactsList}
                        renderItem={this.renderRow.bind(this)}
                        keyExtractor={this.keyExtractor}
                        extraData={this.state}
                    />
                    }
                </View>
                

                <TouchableOpacity onPress={this.sendInvitesBtnAction} style={{flex: 2}}>
                    <Image style = {styles.sendInvitesButton} source ={require('../assets/SendInvitesBtn.png')}/>
                </TouchableOpacity>
            </View>
        )
       
    }
}

const styles = StyleSheet.create(
    {
        header:{
            flex: 1,
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

        iconStyle:{
            flex: 6,
            justifyContent:'space-evenly',
            alignItems: 'center',
        },
        numPeopleSelected:{
           // textAlign:'right',
            color: "#0F8CFF",
            //width:350,
            //flex:1
        },
        contactRowContainer:{
            flexDirection:'row', 
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingTop: 10,
            // borderBottom: 4,
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
        },
        personContactInfo:{
            flexDirection:'column', 
            justifyContent: 'space-evenly',
            flex: 5,
            paddingLeft: 20,
            alignItems:'stretch'
        },
        person:{
            height: 19,
            //fontFamily: "SFUIText-Regular",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 19,
        },
        phone:{
            height: 19,
            opacity: 0.5,
            //fontFamily: "SFUIText-Regular",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 19,
            color: 'black',
        },
        checkBox:{
            flexDirection:'row', 
            justifyContent: 'space-between',
            flex: 2,
        },
        timeLabel:{
            
            flexDirection: 'row',
            //alignItems: 'center',
            justifyContent: 'space-evenly',
            //borderWidth: 10,
            //borderColor:"black"
            
        },
        location:{
            textAlign: "center",
            //fontFamily:"Segoe UI",
            //textWrapping:"Wrap",
            fontSize:13,
            //borderWidth: 10,
            //borderColor:"black"
        },
        back:{
            width: 22,
            height: 22,
            margin: 20, 
        },
        sendInvitesButton:{
            width: 375,
            height: 48,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'white',
          },
          timePicker:{
            position: 'absolute',
            marginTop: 35,
            marginLeft: 25,
            zIndex: 5
          },
          container: {
            //flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            //paddingTop: Constants.statusBarHeight,
            backgroundColor: '#ecf0f1',
            height: 350
          },
    }
)