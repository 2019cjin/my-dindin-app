import * as React from 'react';
import { Constants, Svg } from 'expo'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
//import Checkbox from 'react-native-modest-checkbox';
import { CheckBox } from 'react-native-elements';
//import {Svg} from 'react-native-svg';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//checkBox
/*<View style={styles.checkBox}>
                    <CheckBox
                    checked={item.selected}
                    checkedIcon={<Image source={require('../assets/selectedInvitee.png')} />}
                    uncheckedIcon='circle-o'
                    onPress={() => {
                        item["selected"] = !item["selected"]
                    }}
                    />
                </View>
                
                <CheckBox
                        checkedIcon={<Image source={require('../assets/selectedInvitee.png')} />}
                        uncheckedIcon={<Image source={require('../assets/unselectedInvitee.png')} />}
                        onPress={() => {
                            item["selected"] = !item["selected"]
                            console.log(item["selected"].toString())
                            image = !image
                        }}
                        checked={item["selected"]}
                        />
                        
                        <CheckBox
                            style={{flex: 1, padding: 10}}
                            onClick={()=>{
                                item["selected"] = !item["selected"]
                                console.log(item["selected"].toString())
                            }}
                            isChecked={item["selected"]}
                            leftText={"CheckBox"}
                        />*/

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
            gotList: false
        }
    }


    //https://api.myjson.com/bins/1583d2
    //https://api.myjson.com/bins/crkna
    sendInvitesBtnAction = ()=>{
        this.props.navigation.navigate('Home')
        //need to send invitations
        //need to create event and add to eventList
    }

    goBack = ()=>{
        this.props.navigation.navigate('AddNewEvent')
    }

    getInviteesList(i){
        this.state.contactsList[i]["selected"] = true
        this.state.inviteeList.push(contactsList[i])
    }

    async getContactsList(){
        let response = await fetch("https://api.myjson.com/bins/crkna")
        let extractedJson = await response.json()
        let list = extractedJson.contactsList
        for (let i = 0; i < list.length; i ++)
        {
            await (list[i].selected = false)
        }
        await this.setState({
            contactsList: list
        })
        this.setState({gotList:true})
        //await console.log("got contact list")
        //console.log(this.state.contactsList)
    }

    componentWillMount(){
        if (!this.state.gotList)
        {
            this.getContactsList()
        }
        
    }
    

    keyExtractor(item){
        return item.id.toString()
    }

    renderRow({item}){
        image = false
        return(
            <View style={styles.contactRowContainer}>
                    <Image style={{width: 50, height: 50}} source ={{uri: item.image}}/>
                    <View style={styles.personContactInfo}>
                        <Text style={styles.person}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.phone}>{item.phoneNumber}</Text>
                    </View> 
                    <View style={styles.checkBox}>
                        <CheckBox
                            checkedIcon={<Image source={require('../assets/selectedInvitee.png')} />}
                            uncheckedIcon={<Image source={require('../assets/unselectedInvitee.png')} />}
                            onPress={() => {
                                item["selected"] = !item["selected"]
                                console.log(item["selected"].toString())
                                image = !image
                            }}
                            checked={item["selected"]}
                            />
                    </View>
            </View> 
        )
    }

    render(){
        //console.log(this.state.contactsList)
        var payments = [];

        if (this.state.contactsList !== null){
        for (let i = 0; i < this.state.contactsList.length; i ++)
        {
            payments.push(
            <View key = {i}>
                <CheckBox
                checkedIcon={<Image source={require('../assets/unselectedInvitee.png')} />}
                uncheckedIcon={<Image source={require('../assets/selectedInvitee.png')} />}
                onPress={() => {
                    this.state.contactsList[i]["selected"] = !this.state.contactsList[i]["selected"]
                    console.log(this.state.contactsList[i]["selected"].toString())
                }}
                checked={this.state.contactsList[i]["selected"]}
                />
                
            </View>
            )
        }
    }

    const { navigation } = this.props;
    const date = navigation.getParam('eventDate', 'NO DATE');
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

                <View style={[styles.iconStyle]}>
                    <View style={{flex:1}}/>
                    <View style={{flex:4}}>
                        <Image style={{height:35, width: 40}} source ={require('../assets/yourEventIcon.png')}/>
                    </View>
                    <Text style={styles.numPeopleSelected}>{this.state.inviteeList.length} selected</Text>
                    <Text style={styles.numPeopleSelected}>Date: {JSON.stringify(date)}</Text>
                    <Text style={styles.numPeopleSelected}>Time: {JSON.stringify(time)}</Text>
                    <Text style={styles.numPeopleSelected}>Location: {JSON.stringify(location)}</Text>
                    <View style={{flex:1}}/>
                </View>

                <View style={{flex: 16, paddingLeft:20, paddingRight:20}}>
                    {
                    this.state.contactsList === null ?
                    <Text>contacts list loading...</Text> :
                    <FlatList
                        data={this.state.contactsList}
                        renderItem={this.renderRow}
                        keyExtractor={this.keyExtractor}
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
            alignItems: 'center'
        },
        numPeopleSelected:{
            textAlign:'right',
            color: "#0F8CFF",
            width:350,
            flex:1
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