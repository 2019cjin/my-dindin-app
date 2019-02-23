import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default class EventsList extends React.Component{

    constructor(){
        super()
        this.state ={
            eventsList: null
        }
    }

    async getEventsData(){
        let response = await fetch("https://www.cs.virginia.edu/~dgg6b/Mobile/PodCast/podCastList.json")
        let extractedJson = await response.json()
        this.setState({
            eventsList: extractedJson.podCastList
        })
    }

    componentWillMount(){
        this.getEventsData()
    }
    
    keyExtractor(item){
        return item.id.toString()
    }

    renderRow(){
        console.log()
        return(
            <View style={styles.eventContainer}>
                <Text style={styles.date}>The Date</Text>
                <View style={styles.eventRowContainer}>
                    <Image source={require('../assets/greenGirl.png')}/>
                    <View style={styles.personContactInfo}>
                        <Text style={styles.person}>The person</Text>
                        <Text>The time</Text>
                    </View>
                    <View style={styles.contactButtons}>
                        <Image source={require('../assets/call.png')}/>
                        <Image source={require('../assets/email.png')}/>
                    </View>   
                </View> 
            </View>
        )
    }

    render(){
        renderRow()
    }
}

const styles = StyleSheet.create({
    eventContainer:{
        flexDirection:'column',
    },
    eventRowContainer:{
        flexDirection:'row', 
        justifyContent: 'space-between',
    },
    contactButtons:{
        flexDirection:'row', 
        justifyContent: 'space-between',
    },
    personContactInfo:{
        flexDirection:'column', 
        justifyContent: 'space-between',
    },
    date:{
        width: 94,
        height: 17,
        fontFamily: "SFUIText-Medium",
        fontSize: 13,
        fontWeight: 400,
        lineHeight: 17,
    },
    person:{
        width: 98,
        height: 19,
        fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 19,
    },
    time:{
        width: 46,
        height: 19,
        opacity: 0.5,
        fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 19,
    }

})