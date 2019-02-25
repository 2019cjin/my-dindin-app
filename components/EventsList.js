import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SectionList } from 'react-native';

import {weekDayMonthDate} from './DateConversion';

export default class EventsList extends React.Component{

    constructor(){
        super()
        this.state ={
            eventsList: null,
            finalEvents: [],
            exampleeventsList: [
                {
                    "date": "02/25/2019",
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
                    "date": "02/26/2019",
                    "data": []
                },
                {
                    "date": "02/27/2019",
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


    async getEventsData(){
        let response = await fetch("http://people.virginia.edu/~csj3sd/eventsList.json")
        let extractedJson = await response.json()
        this.setState({
            eventsList: extractedJson.eventsList
        })
        if (eventsList !== null)
        {
            newList = []
            d = eventsList[0]["date"]
            while (eventsList.length > 0)
            {
                
            }
        }
    }

    componentDidMount(){
        this.getEventsData()
    }

    haveEvents = ({ item, index, section: { date, data } }) =>
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

    dateHeader = ({section: {date}}) => (
        <Text style={styles.date}>{weekDayMonthDate(date)}</Text>
    )


    renderNoContent = (section) => {
        if(section.data.length == 0){
        return <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={styles.addEventButton}> 
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddNewEvent')}}>
                        <Image source={require('../assets/addNewEvent.png')}/>
                    </TouchableOpacity>
                </View>
                </View>
        }
        return null
    }
    //perhaps need dynamically changing list

    render(){
        if(this.state.eventsList !== null){
            return(
                <View style = {{height: 400}}>
                    <View  style = {styles.eventContainer}>
                        <Text>Here is the current time: {this.props.type.toLocaleTimeString()}</Text>
                    </View>
                    
                    <SectionList
                    renderSectionFooter={({section}) => this.renderNoContent(section)}
                    renderSectionHeader={this.dateHeader}
                    renderItem = {this.haveEvents}
                    sections={this.state.exampleeventsList}
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
        fontFamily: "SFUIText-Medium",
        fontSize: 13,
        fontWeight: 0,
        lineHeight: 17,
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    person:{
        height: 19,
        fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: 0,
        lineHeight: 19,
    },
    time:{
        height: 19,
        opacity: 0.5,
        fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: 0,
        lineHeight: 19,
        color: 'black',
    }

})