import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SectionList } from 'react-native';
import { Constants } from 'expo'

import {getLastDay, getWeekDayMonthDate, convertStringToDate} from './DateConversion';

export default class EventsList extends React.Component{

    constructor(){
        super()
        this.state ={
            eventsList: null,
            finalEvents: [],
            exampleeventsList: [
                {
                    "key": "02/25/2019",
                    "data": [
                        {
                            "image": "https://www.cs.virginia.edu/~dgg6b/Mobile/Images/PodCastImage1.png", 
                            "name": "Jack",
                            "time": "2:00 PM",
                        },
                        {
                            "image": "https://www.cs.virginia.edu/~dgg6b/Mobile/Images/PodCastImage1.png", 
                            "name": "Jill",
                            "time": "5:00 PM",
                        }
                    ]
                },
                {
                    "key": "02/26/2019",
                    "data": []
                },
                {
                    "key": "03/27/2019",
                    "data": [
                        {
                            "image": "https://www.cs.virginia.edu/~dgg6b/Mobile/Images/PodCastImage1.png", 
                            "name": "Humpty Dumpty",
                            "time": "2:00 PM"
                        },
                        {
                            "image": "https://www.cs.virginia.edu/~dgg6b/Mobile/Images/PodCastImage1.png", 
                            "name": "Muffin Man",
                            "time": "5:00 PM"
                        }
                    ]
                }
            ]
        }
    }

    convertList(){
        if (this.state.eventsList !== null)
        {
            console.log("not null eventsList")
            firstDate = new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), this.props.today.getDate().toString())
            console.log("firstDate:" + firstDate.toString())
            this.state.finalEvents.push(
                {
                    "key": new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), this.props.today.getDate().toString()),
                    "data":[]
                }
            )
            lastDate = new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), getLastDay(this.props.today.getMonth()))
            console.log("lastDate:" + lastDate.toString())
            i = 0
            console.log("i:" + i)

            while (firstDate <= lastDate)
            {
                console.log("i:" + i)
                if (i < this.state.eventsList.length)//find events to add to firstDate list of events
                {
                    console.log()
                    currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                    console.log("currentDate:" + currentDate.toString())
                    console.log("i in eventsList:" + i)
                    if (currentDate.getMonth() !== firstDate.getMonth() || currentDate.getFullYear() !== firstDate.getFullYear())
                    {
                        i = this.state.eventsList.length
                    }
                    else if (currentDate.getDate() > firstDate.getDate())
                    {
                    
                    }
                    else
                    {
                        while (currentDate.getDate() <= firstDate.getDate() && i < this.state.eventsList.length )
                        {
                            currentDate = convertStringToDate(this.state.eventsList[i].date.toString())
                            if (currentDate.getDate() === firstDate.getDate())
                            {
                                this.state.finalEvents[this.state.finalEvents.length - 1].data.push(
                                    {
                                        "image": this.state.eventsList[i].image,
                                        "name": this.state.eventsList[i].name,
                                        "time": this.state.eventsList[i].time
                                    }
                                )
                                console.log("added event:")
                            }
                            i ++
                        }
                    }
                }
                //make new list of events for a particular date for each date
                newDate = new Date()
                newDate.setDate(firstDate.getDate() + 1)
                this.state.finalEvents.push(
                    {
                        "key": newDate,
                        "data":[]
                    }
                )
                firstDate.setDate(firstDate.getDate() + 1)
                console.log("newDate added:" + firstDate.toString())
            }
            
        }
        else
        {
            console.log("null eventsList")
        }
    }


    getFinalList2(){
        if (this.state.eventsList !== null)
        {
            sameDate = new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), this.props.today.getDate().toString())
            console.log("sameDate:" + sameDate.toString())
            this.state.finalEvents.push(
                {
                    "key": new Date(this.props.today.getFullYear().toString(), this.props.today.getMonth().toString(), this.props.today.getDate().toString()),
                    "data":[]
                }
            )
            for (let i = 0; i < this.state.eventsList.length; i++)
            {
                currentDate = convertStringToDate(this.state.eventsList[i].date)
                console.log(this.state.eventsList[i])
                console.log("Current Date:" + currentDate.toString())
                if (sameDate < currentDate)
                {
                    console.log("create new cell")
                    newDate = new Date()
                    newDate.setDate(sameDate.getDate() + 1)
                    this.state.finalEvents.push(
                        {
                            "key": newDate,
                            "data":[]
                        }
                    )
                    sameDate.setDate(sameDate.getDate() + 1)
                    i = i - 1
                    console.log(sameDate.toString())
                }
                else if (sameDate === currentDate)
                {
                    this.state.finalEvents[this.state.finalEvents.length - 1].data.push(
                        {
                            "image": this.state.eventsList[i].image,
                            "name": this.state.eventsList[i].name,
                            "time": this.state.eventsList[i].time
                        }
                    )
                    console.log("here")
                } 
                else 
                {
                    console.log("going here")
                    break
                }
            }
        }
    }
    getFinalList(){
        if (this.state.eventsList !== null)
        {
            sameDate = null
            for (let i = 0; i < this.state.eventsList.length; i++)
            {
                if (sameDate < new Date(this.state.eventsList[i].date))
                {
                    this.state.finalEvents.push(
                        {
                            "key": new Date(this.state.eventsList[i].date),
                            "data":[]
                        }
                    )
                    sameDate = new Date(this.state.eventsList[i].date)
                }
                this.state.finalEvents[this.state.finalEvents.length - 1].data.push(
                    {
                        "image": this.state.eventsList[i].image,
                        "name": this.state.eventsList[i].name,
                        "time": this.state.eventsList[i].time
                    }
                )
            }
        }
    }

    /*convertList(){
        if (this.state.eventsList !== null)
        {
            this.state.exampleeventsList[0].data.push({
                "image": this.state.eventsList[0].image,
                "name": this.state.eventsList[0].name,
                "time": this.state.eventsList[0].time
            })
        }
    }*/

    getEventsInMonth(){
        for(let i =0; i < eventsList.length; i++){
            if (this.props.date.getMonth() === new Date(eventsList[i].date).getMonth())
            {
                monthEvents.push(eventsList[i])
                console.log(monthEvents)
            }
        }
        this.setState({monthEvents: this.state.monthEvents})
    }

    async getEventsData(){
        //let response = await fetch("https://api.myjson.com/bins/v8bqq")
        let response = await fetch("http://api.myjson.com/bins/jb4l2")
        let extractedJson = await response.json()
        await this.setState({
            eventsList: extractedJson.eventsList
        })
        //await this.getFinalList()
        await this.convertList()
        //await this.getFinalList2()
    }

    componentDidMount(){
        this.getEventsData()
    }

    keyExtractor = (item, index) => index.toString()

    haveEvents = ({ item, index, section: { key, data } }) =>
    <View>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={styles.eventRowContainer}>
                <Image style={{width: 50, height: 50}} source ={{uri: item.image}}/>
                <View style={styles.personContactInfo}>
                    <Text style={styles.person}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
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
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddNewEvent'); this.setState({currentDate: this.props.today})}}>
                        <Image source={require('../assets/addNewEvent.png')}/>
                    </TouchableOpacity>
                </View>
                </View>
        }
        return null
    }
    //perhaps need dynamically changing list

    /**<Text>Today is: {this.props.today.getFullYear().toString()}</Text>
                    <Text>Today is: {this.props.today.getMonth().toString()}</Text>
                    <Text>Today is: {this.props.today.getDate().toString()}</Text> */

    render(){
        if(this.state.eventsList !== null){
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
                return(   
                <View style={styles.eventContainer}>
                    <Text style={styles.date}>The Date</Text>
                    <View style={styles.addEventButton}> 
                        <TouchableOpacity>
                            <Image source={require('../assets/addNewEvent.png')}/>
                        </TouchableOpacity>
                    </View> 
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