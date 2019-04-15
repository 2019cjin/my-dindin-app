import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SectionList } from 'react-native';
import { Constants } from 'expo'
import {getLastDay, getWeekDayMonthDate, convertStringToDate} from './DateConversion';
//Lines 5 -16
import * as firebase from 'firebase';//for connecting to firebase

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

export default class EventsList extends React.Component{

    constructor(){
        super()
        this.state ={
            eventsList: null,
            finalEvents: [],
        }
    }

    //Need this too
    async startListener(path) {
        let context = this
        firebase.database().ref(path).on('value', async (snapshot) => {     
          //console.log(JSON.stringify(snapshot.val()))
          await context.setState({
            eventsList: JSON.parse(JSON.stringify(snapshot.val())), 
            //gotInformation: true
          })
         //await  console.log(context.state.eventsList)
          await context.convertList() //unnessecary for pendingInvite
         // console.log("finalEvents")
          //console.log(context.state.finalEvents)
        })
        
      }

    convertList(){
        if (this.state.eventsList !== null)
        {
            this.setState({eventsList:this.state.eventsList.sort(compare)})
            this.setState({finalEvents:[]})
            //console.log("not null eventsList")
            firstDate = new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), this.props.today.getDate().toString())
            //console.log("firstDate:" + firstDate.toString())
            lastDate = new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), getLastDay(this.props.today.getMonth()))
            //console.log("lastDate:" + lastDate.toString())
            i = 0
            //console.log("i:" + i)

            while (firstDate <= lastDate)
            {
                //make new list of events for a particular date for each date
               // console.log("firstDate:"+firstDate.toString())
                newDate = new Date()
                newDate.setDate(firstDate.getDate())
                this.state.finalEvents.push(
                    {
                        "key": newDate,
                        "data":[]
                    }
                )
                //console.log("i:" + i)
                if (i < this.state.eventsList.length)//find events to add to firstDate list of events
                {
                    currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                    //console.log("currentDate:" + currentDate.toString())
                    //console.log("i in eventsList:" + i)
                    if (currentDate.getMonth() !== firstDate.getMonth() || currentDate.getFullYear() !== firstDate.getFullYear())
                    {
                        i ++
                    }
                    else if (currentDate.getDate() > firstDate.getDate())
                    {
                    
                    }
                    else
                    {
                        while (i < this.state.eventsList.length && currentDate.getDate() <= firstDate.getDate())
                        {
                            //console.log("i of event to add: " + i)
                            //console.log("eventToAdd:"+this.state.eventsList[i].date)
                            currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                            if (currentDate.getDate() === firstDate.getDate())
                            {
                                this.state.finalEvents[this.state.finalEvents.length - 1].data.push(
                                    {
                                        "time": this.state.eventsList[i].time,
                                        "location": this.state.eventsList[i].location,
                                        "latitude": this.state.eventsList[i].latitude,
                                        "longitude": this.state.eventsList[i].longitude,
                                        "hostUserName": this.state.eventsList[i].hostUserName,
                                        "hostFName": this.state.eventsList[i].hostFName,
                                        "hostLName": this.state.eventsList[i].hostLName,
                                        "phoneNum": this.state.eventsList[i].phoneNum,
                                        "profilePic": this.state.eventsList[i].profilePic,
                                        "id": this.state.eventsList[i].id,
                                        "date": this.state.eventsList[i].date
                                    }
                                )
                                //console.log("added event:")
                                i ++
                                if (i < this.state.eventsList.length)
                                {
                                    currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                                }
                                //currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                               // console.log("i after adding event:" + i)
                            }
                            else if (currentDate.getDate() < firstDate.getDate())
                            {
                                i ++
                                if (i < this.state.eventsList.length)
                                {
                                    currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                                }
                                //console.log("skiped")
                            }
                            else{
                                //console.log("is future event")
                                break
                            }
                            
                        }
                    }
                }
    
                firstDate.setDate(firstDate.getDate() + 1)
                //console.log("newDate added:" + firstDate.toString())
            } 
        }
        else
        {
            console.log("null eventsList")
        }
    }

    //do pending invite -- hardcode in pendingInvite List start with 0, update numPending Invite
    componentDidMount(){
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
          }
        path = 'jdoe/eventsList/'
        
        this.startListener(path)
        
    }

    keyExtractor = (item, index) => index.toString()

    haveEvents = ({ item, index, section: { key, data } }) =>
    <View>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={styles.eventRowContainer}>
                <Image style={{width: 50, height: 50}} source ={{uri: item.profilePic}}/>
                <View style={styles.personContactInfo}>

                    {
                        item.hostUserName === 'jdoe' ? 
                        <View> 
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('YourEventDetails', {id: item.id,
                                                                                                                  date: item.date,
                                                                                                                  time: item.time,
                                                                                                                  location: item.location});}}>
                                <Text style={styles.person}>Meal Hosted By You</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </TouchableOpacity>
                        </View>
                         :
                        <View> 
                            <Text style={styles.person}>{item.hostFName} {item.hostLName}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                        
                    }
                    
                </View>
                <View style={styles.contactButtons}>
                    <TouchableOpacity>
                        <Image style={{width: 32, height: 32}} source={require('../assets/call.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={{width: 32, height: 32}} source={require('../assets/email.png')}/>
                    </TouchableOpacity>
                </View>   
            </View> 
        </View>
    </View>

    getDateHeader = ({section: {key}}) => (
        <Text style={styles.date}>{getWeekDayMonthDate(key)}</Text>
    )

    renderNoContent = (section) => {
        if(section.data.length == 0){
        return <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={styles.addEventButton}> 
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddNewEvent', {eventDate: section.key, eventID: this.state.eventsList.length}); this.setState({currentDate: this.props.today}); }}>
                        <Image source={require('../assets/addNewEvent.png')}/>
                    </TouchableOpacity>
                </View>
                </View>
        }
        return null
    }

    render(){
        if(this.state.eventsList !== null && this.state.finalEvents.length > 0){
            return(
                <View>

                    <SectionList
                    renderSectionFooter={({section}) => this.renderNoContent(section)}
                    renderSectionHeader={this.getDateHeader}
                    renderItem = {this.haveEvents}
                    sections={this.state.finalEvents}
                    keyExtractor={this.keyExtractor}
                    />
                     
                </View>
            )
            }
            else{
                //console.log("not getting list")
                //console.log(this.state.eventsList)
                //console.log(this.state.finalEvents)
                return(   
                <View style={styles.eventContainer}>
                    <Text style={styles.date}>Loading your events list</Text>
                </View>
                )
            }
    }
}

const styles = StyleSheet.create({
    eventContainer:{
        flexDirection:'column',
        justifyContent: 'space-evenly',
        paddingLeft: 20,
        paddingRight: 20
        //borderRadius: 4,
        //borderWidth: 0.5,
        //borderColor: '#d6d7da',
    },
    eventRowContainer:{
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
    addEventButton:{
        paddingBottom: 10,
        paddingTop: 10,
        // borderBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        alignItems:'center'
    },
    contactButtons:{
        flexDirection:'row', 
        justifyContent: 'space-between',
        flex: 2,
    },
    personContactInfo:{
        flexDirection:'column', 
        justifyContent: 'space-evenly',
        flex: 5,
        paddingLeft: 20,
        alignItems:'stretch'
    },
    date:{
        height: 17,
        //fontFamily: "SFUIText-Medium",
        fontSize: 13,
        fontWeight: "400",
        lineHeight: 17,
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    person:{
        height: 19,
        //fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 19,
    },
    time:{
        height: 19,
        opacity: 0.5,
        //fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 19,
        color: 'black',
    }

})