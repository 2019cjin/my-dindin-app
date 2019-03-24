import * as React from 'react';
import { Constants, Svg, MapView, Marker, Location, Permissions } from 'expo'
import { Picker, Text, View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
//import Picker from 'react-native-wheel-picker'
//import {Svg} from 'react-native-svg';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class AddNewEvent extends React.Component{

    constructor(){
        super()
        this.state={
            hour: '',
            hourNum:12,
            minute:'',
            minuteNum:0,
            timeOfDay:'',
            address:'38,-78',
            addressLatitude: 38.0293059,
            addressLongitude: -78.4766781,
            mapRegion: null, 
            hasLocationPermissions: false,
            locationResult: null,
            locationLatitude: 39,
            locationLongitude: -77, 
            locationInfo: null
        }
    }

    updateHour = (h) => {
        this.setState({ hour: h, hourNum: parseInt(h, 10) })
     }
     updateMinute = (m) => {
        this.setState({ minute: m, minuteNum: parseInt(m,10) })
     }

     updateTimeOfDay = (t) => {
        this.setState({ timeOfDay: t })
     }

     getAddress () {
         if (parseInt(this.state.address.substring(0, 2), 10) !== null || parseInt(this.state.address.substring(3, 5), 10) !== null)
         {
            this.setState({
                addressLatitude: parseInt(this.state.address.substring(0, 2), 10), 
                addressLongitude: parseInt(this.state.address.substring(3, 6), 10)
            })
         }
     }

     invitePeopleBtnAction = ()=>{
         this.props.navigation.navigate('AddNewEventNextStep')
     }

     componentDidMount() {
        this.getLocationAsync();
      }
    
      _handleMapRegionChange = mapRegion => {
        console.log(mapRegion);
        this.setState({ mapRegion });
      };
    
      async getLocationAsync (){
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
       if (status !== 'granted') {
         this.setState({
           locationResult: 'Permission to access location was denied',
         });
       } else {
         this.setState({ hasLocationPermissions: true });
       }
    
       let location = await Location.getCurrentPositionAsync({});
       await this.setState({ locationResult: JSON.stringify(location), locationLatitude: location.coords.latitude, locationLongitude: location.coords.longitude});
      
       // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
      }
    

    render(){
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
                    
                    <View style = {{flexDirection:'row', justifyContent: 'center', }}>
                    <View style={{justifyContent:"center"}}>
                        <Text style={{fontSize: 30, color:'white'}}>
                            cc
                        </Text>
                        <Text style={{fontSize: 30, color:'white'}}>
                             cc 
                        </Text>
                    </View>

                    <Picker selectedValue = {this.state.hour} onValueChange = {this.updateHour} style={{height: 100, width: 80, justifyContent: 'center'}} itemStyle={{height: 65, fontSize:44,}}>
                        <Picker.Item label = "12" value = "12" />
                        <Picker.Item label = "01" value = "1" />
                        <Picker.Item label = "02" value = "2" />
                        <Picker.Item label = "03" value = "3" />
                        <Picker.Item label = "04" value = "4" />
                        <Picker.Item label = "05" value = "5" />
                        <Picker.Item label = "06" value = "6" />
                        <Picker.Item label = "07" value = "7" />
                        <Picker.Item label = "08" value = "8" />
                        <Picker.Item label = "09" value = "9" />
                        <Picker.Item label = "10" value = "10" />
                        <Picker.Item label = "11" value = "11" />
                    </Picker>
                    <Text style={{fontSize: 70, justifyContent: 'center',height:100, alignItems:'center'}}>:</Text>

                    <Picker selectedValue = {this.state.minute} onValueChange = {this.updateMinute} style={{height: 100, width:80, justifyContent: 'center'}} itemStyle={{height: 65, fontSize:44}}>
                        <Picker.Item label = "00" value = "0" /><Picker.Item label = "01" value = "1" /><Picker.Item label = "02" value = "2" /><Picker.Item label = "03" value = "3" /><Picker.Item label = "04" value = "4" />
                        <Picker.Item label = "05" value = "5" /><Picker.Item label = "06" value = "6" /><Picker.Item label = "07" value = "7" /><Picker.Item label = "08" value = "8" /><Picker.Item label = "09" value = "9" />
                        <Picker.Item label = "10" value = "10" /><Picker.Item label = "11" value = "11" /><Picker.Item label = "12" value = "12" /><Picker.Item label = "13" value = "13" /><Picker.Item label = "14" value = "14" />
                        <Picker.Item label = "15" value = "15" /><Picker.Item label = "16" value = "16" /><Picker.Item label = "17" value = "17" /><Picker.Item label = "18" value = "18" /><Picker.Item label = "19" value = "19" />
                        <Picker.Item label = "20" value = "20" /><Picker.Item label = "21" value = "21" /><Picker.Item label = "22" value = "22" /><Picker.Item label = "23" value = "23" /><Picker.Item label = "24" value = "24" />
                        <Picker.Item label = "25" value = "25" /><Picker.Item label = "26" value = "26" /><Picker.Item label = "27" value = "27" /><Picker.Item label = "28" value = "28" /><Picker.Item label = "29" value = "29" />
                        <Picker.Item label = "30" value = "30" /><Picker.Item label = "31" value = "31" /><Picker.Item label = "32" value = "32" /><Picker.Item label = "33" value = "33" /><Picker.Item label = "34" value = "34" />
                        <Picker.Item label = "35" value = "35" /><Picker.Item label = "36" value = "36" /><Picker.Item label = "37" value = "37" /><Picker.Item label = "38" value = "38" /><Picker.Item label = "39" value = "39" />
                        <Picker.Item label = "40" value = "40" /><Picker.Item label = "41" value = "41" /><Picker.Item label = "42" value = "42" /><Picker.Item label = "43" value = "43" /><Picker.Item label = "44" value = "44" />
                        <Picker.Item label = "45" value = "45" /><Picker.Item label = "46" value = "46" /><Picker.Item label = "47" value = "47" /><Picker.Item label = "48" value = "48" /><Picker.Item label = "49" value = "49" />
                        <Picker.Item label = "50" value = "50" /><Picker.Item label = "51" value = "51" /><Picker.Item label = "52" value = "52" /><Picker.Item label = "53" value = "53" /><Picker.Item label = "54" value = "54" />
                        <Picker.Item label = "55" value = "55" /><Picker.Item label = "56" value = "56" /><Picker.Item label = "57" value = "57" /><Picker.Item label = "58" value = "58" /><Picker.Item label = "59" value = "59" />
                    </Picker>
                    <Picker selectedValue = {this.state.timeOfDay} onValueChange = {this.updateTimeOfDay} style={{height: 100, width:40, justifyContent: 'center'}} itemStyle={{height: 40, fontSize:20}}>
                        <Picker.Item label = "AM" value = "AM" />
                        <Picker.Item label = "PM" value = "PM" />
                        
                    </Picker>
                    
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Image style={{height:22, width: 15}} source={require('../assets/locationIcon.png')}/>
                        <Text style={{fontSize: 20, color:'white'}}>
                            cc
                        </Text>
                        <TextInput
                            style={{height: 25, width: 250, fontSize: 25, borderBottomColor: 'grey', borderBottomWidth: 1}}
                            onChangeText={(address) => this.setState({address})}
                            value={this.state.address}
                        />
                    </View>
                </View>
                <View style={styles.container}>
        
                {
                this.state.locationResult === null ?
                <Text>Finding your current location...</Text> :
                this.state.hasLocationPermissions === false ?
                    <Text>Location permissions are not granted.</Text> :
                    this.state.mapRegion === null ?
                    <Text>Map region doesn't exist.</Text> :
                    <MapView
                    style={{alignSelf: 'stretch', height: 350}}
                    region={this.state.mapRegion}
                    onRegionChange={this._handleMapRegionChange}>
                    <MapView.Marker
                coordinate={{
                            latitude: this.state.locationLatitude,
                            longitude: this.state.locationLongitude
                            }}
            />
                    </MapView>
                }
                

            </View>
                <TouchableOpacity onPress={this.invitePeopleBtnAction}>
                        <Image style = {styles.invitePeopleButton} source ={require('../assets/invitePeopleBtn.png')}/>
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
            height: 350
          },
    }
)