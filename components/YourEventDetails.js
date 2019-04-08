import * as React from 'react';
import { Constants, Svg, MapView, Marker, Location, Permissions } from 'expo'
import { Picker, Text, View, StyleSheet, Image, TouchableOpacity, FlatList, SectionList} from 'react-native';
import {getNextAddr} from './MapHelperFunction';
import {weekDayMonthDate} from './DateConversion';

import * as firebase from 'firebase';//for connecting to firebase
//import console = require('console');
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
    if (a.accepted < b.accepted)
        return -1;
    if (a.accepted > b.accepted)
        return 1;
    return 0;
}

export default class YourEventDetails extends React.Component{


    //38.0293059
    //addressLongitude: -78.4766781,
    constructor(){
        super()
        this.state={
            inviteeList: null,
            finalInviteeList:null,
            examplefinalInviteeList:[
                {
                    "key":"Accepted!", 
                    "data":[          
                            
                    ]
                },
                {
                    "key":"Declined!", 
                    "data":[
                        
                    ]
                }
            ],
        }
    }

    async startListener(path) {
        let context = this;
        await firebase.database().ref(path).on('value', async (snapshot) => {     
         //console.log(JSON.stringify(snapshot.val()))
         await context.setState({
            inviteeList: JSON.parse(JSON.stringify(snapshot.val())), 
            gotInformation: true
          })
         await context.getFinalList()
         // await console.log(context.state.inviteeList)
            //await console.log(context.state.notComing)
        })
      }

      async getFinalList(){
          if (this.state.inviteeList !== null)
          {
              //console.log("here it is")
            await this.setState({inviteeList:this.state.inviteeList.sort(compare)})
            await this.setState({finalInviteeList:[
                                                {"key":"Accepted!", "data":[]},
                                                {"key":"Declined!", "data":[]}
                                            ]})

            for (let i = 0; i < this.state.inviteeList.length; i++)
            {
                if (this.state.inviteeList[i].accepted==="false")
                {
                    await this.state.finalInviteeList[1]["data"].push(this.state.inviteeList[i])
                }
                else
                {
                    await this.state.finalInviteeList[0]["data"].push(this.state.inviteeList[i])
                }
            }
          }
      }


     async componentDidMount() {
        await ( { navigation } = this.props);
        await ( eID = navigation.getParam('id', 'NO ID'));
        if (!firebase.apps.length){
            await firebase.initializeApp(firebaseConfig)
          }
          await (path = 'jdoe/yourEventsList/' + eID.toString() + '/')
          //await console.log(path)
          await this.startListener(path)
          this.gotInformation = false;
      }

    keyExtractor = (item, index) => index.toString()
    
    getHeader = ({section: {key}}) => (
        <Text style={styles.listHeader}>{key}</Text>
    )

    renderNoContent = (section) => {
        if(section.data.length === 0){
        return <View style={{paddingLeft: 20, paddingRight: 20}}>
         
                    <Text>No contacts</Text>
              
                </View>
        }
        return null
    }

    renderRow =  ({ item, index, section: { key, data } }) => {
            <View style={styles.contactRowContainer}>
                    <Image style={{width: 50, height: 50}} source ={{uri: item.profilePic}}/>
                    <View style={styles.personContactInfo}>
                        <Text style={styles.person}>{item.FName} {item.LName}</Text>
                        <Text style={styles.phone}>{item.phoneNum}</Text>
                    </View> 
                    <View style={styles.checkBox}>
                        {
                            item.accepted === "false" ?
                            <Svg height={25} width={25}>
                                <Svg.Line
                                    x1="9"
                                    y1="9"
                                    x2="21"
                                    y2="21"
                                    stroke="red"
                                    strokeWidth="2"
                                />
                                <Svg.Line
                                    x1="21"
                                    y1="9"
                                    x2="9"
                                    y2="21"
                                    stroke="red"
                                    strokeWidth="2"
                                />
                            </Svg>:
                            <Svg height={25} width={25}>
                                <Svg.Line
                                    x1="9"
                                    y1="15"
                                    x2="15"
                                    y2="21"
                                    stroke="green"
                                    strokeWidth="2"
                                />
                                <Svg.Line
                                    x1="14"
                                    y1="21"
                                    x2="32"
                                    y2="4"
                                    stroke="green"
                                    strokeWidth="2"
                                />
                            </Svg>
                        }
                    </View>
            </View> 
    }

    cancelDinnerBtnAction = async ()=>{  
    this.props.navigation.navigate('Home')
        
    //need to send invitations
    
    }

    render(){

        const { navigation } = this.props;
        const eDate = navigation.getParam('date', 'NO DATE');
        const eTime = navigation.getParam('time', 'NO TIME');
        const eLocation = navigation.getParam('location', 'NO LOCATION');

        console.log(this.state.finalInviteeList)
        //this.getFinalList()

        return(
            <View style = {{ justifyContent: 'space-between', flex: 1}}>
                <View style = {{ justifyContent: 'space-between', height: 200}}>
                    <View style = {styles.header}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
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
                        <Text style = {styles.title}>            </Text>
                    </View>
                    <View style={[styles.iconStyle, {paddingLeft: 30, paddingRight:30}]}>
                        <View style = {{flex:0.5}}/>
                        <View style={{flex:4, alignItems:'center'}}>
                            <Image style={{height:22, width: 25}} source ={require('../assets/yourEventIcon.png')}/>
                            <Text numberOfLines={1} style={{fontSize:25}}>{eLocation}</Text>
                            <Text style = {{fontSize: 14, color:'grey'}}> {weekDayMonthDate(eDate)} - {eTime}</Text>
                            <Text style = {{fontSize: 14, color:'grey'}}>Hosted by You</Text>
                        </View>
                    </View>
                </View>

            <View style={{flex: 1, justifyContent:"space-evenly"}}>
    
                <View style={{flex: 16, paddingLeft:20, paddingRight:20}}>
               
                    <View style={{ flexDirection:'row', justifyContent:'space-between', width:350}}>
                        <Text style={{color:'grey'}}>Who you invited:</Text>
                    </View>

                    {
                    this.state.finalInviteeList !== null && (this.state.finalInviteeList[0]["data"].length > 0 || this.state.finalInviteeList[1]["data"].length > 0) ?
                    <View>
                        <SectionList
                        renderSectionFooter={({section}) => this.renderNoContent(section)}
                        renderSectionHeader={this.getHeader}
                        renderItem = {this.renderRow}
                        sections={this.state.examplefinalInviteeList}
                        keyExtractor={this.keyExtractor}
                        />
                    </View> :
                    <View>
                        <Text>Loading lists</Text>
                        <View>
                        <SectionList
                        renderSectionFooter={({section}) => this.renderNoContent(section)}
                        renderSectionHeader={this.getHeader}
                        renderItem = {this.renderRow}
                        sections={this.state.examplefinalInviteeList}
                        keyExtractor={this.keyExtractor}
                        />
                    </View>
                    </View>
                    }

                </View>
            </View>

                
            <TouchableOpacity onPress = {this.cancelDinnerBtnAction}>
                <Image style = {styles.invitePeopleButton} source ={require('../assets/CancelDinner.png')}/>
            </TouchableOpacity>
                
            </View>
        )
       
    }
}

const styles = StyleSheet.create(
    {
        header:{
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
      timeLabel:{
        
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-evenly',
        //borderWidth: 10,
        //borderColor:"black"
        
      },
      time:{
        textAlign: "center",
        //fontFamily:"Segoe UI",
        //textWrapping:"Wrap",
        //alignItems: 'center',
        fontSize:44,
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
        invitePeopleButton:{
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
            height: 340
          },
          iconStyle:{
            flex: 6,
            justifyContent:'space-evenly',
            alignItems: 'center',
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
            flexDirection:'column', 
            justifyContent: 'center',
            flex: 1,
        },
        listHeader:{
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
        emptyList:{
            paddingBottom: 10,
            paddingTop: 10,
            // borderBottom: 4,
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEEE',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
            alignItems:'center'
        },
    }
)