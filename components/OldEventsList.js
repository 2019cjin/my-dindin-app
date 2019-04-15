import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';


export default class OldEventsList extends React.Component{

    constructor(){
        super()
        this.state ={
            eventsList: null,
        }
    }

    async getEventsData(){
        let response = await fetch("https://api.myjson.com/bins/17c1gu")
        let extractedJson = await response.json()
        this.setState({
            eventsList: extractedJson.eventsList
        })
    }

    componentWillMount(){
        
        this.getEventsData()
    }
    
    keyExtractor(item){
        return item.id.toString()
    }

    renderRow({item}){
        //console.log(item.row[0].image)
        return(
            <View style = {styles.eventsListContainer}>
                <View style={styles.eventContainer}>
                    <Text style={styles.date}>{item.date}</Text>
                    <View style={styles.eventRowContainer}>
                        <Image style={{width: 50, height: 50}} source ={{uri: item.image}}/>
                        <View style={styles.personContactInfo}>
                            <Text style={styles.person}>{item.name}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <View style={styles.contactButtons}>
                            <Image source={require('../assets/call.png')}/>
                            <Image source={require('../assets/email.png')}/>
                        </View>   
                    </View> 
                </View>
            </View>
        )
    }

    render(){
        if(this.state.eventsList !== null){
            return(
                <View>
                    
                     <FlatList
                        data={this.state.eventsList} //database
                        renderItem={this.renderRow} //style
                        keyExtractor={this.keyExtractor}
                    />
                    </View>
            )
            }
            else{
                return(
                    <View>
                <View style={styles.eventContainer}>
                    <Text style={styles.date}>The Date</Text>
                    <View style={styles.eventRowContainer}>
                        <Image source={require('../assets/greenGirl.png')}/>
                        <View style={styles.personContactInfo}>
                            <Text style={styles.person}>The person</Text>
                            <Text style={styles.time}>The time</Text>
                        </View>
                        <View style={styles.contactButtons}>
                            <Image source={require('../assets/call.png')}/>
                            <Image source={require('../assets/email.png')}/>
                        </View>   
                    </View> 
                </View>
                <View style={styles.eventContainer}>
                    <Text style={styles.date}>The Date</Text>
                    <View style={styles.addEventButton}> 
                        <TouchableOpacity>
                            <Image source={require('../assets/addNewEvent.png')}/>
                        </TouchableOpacity>
                    </View> 
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
        fontWeight: "400",
        lineHeight: 17,
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20,
    },
    person:{
        height: 19,
        fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 19,
    },
    time:{
        height: 19,
        opacity: 0.5,
        fontFamily: "SFUIText-Regular",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 19,
        color: 'black',
    }

})