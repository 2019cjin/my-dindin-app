import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Constants, Svg } from 'expo'

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
           <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                <Image style={styles.menuIcon} source={require('../assets/sidemenubtn.png')}/>
            </TouchableOpacity>
            <Text style = {styles.title}> DinDin </Text>
            <TouchableOpacity>
                <Svg height={50} width={50} >

                        <Svg.Circle 
                                cx="12" 
                                cy="20" 
                                r="10" 
                                stroke="#0F8CFF"
                                strokeWidth="2"
                                fill="#ffffff" />

                            <Svg.Line
                                x1="20"
                                y1="26"
                                x2="30"
                                y2="33"
                                stroke="#0F8CFF"
                                strokeWidth="2"
                            />
                        </Svg>
            </TouchableOpacity>
            </View>
        )
    }

}



const styles = StyleSheet.create(
    {
        container:{
            height: 48,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'

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
         // foreground:"#353535",

      },
        searchIcon:{
            margin:20,
            width: 25,
            height: 25,
        },
        menuIcon:{
            width: 22,
            height: 22,
            margin: 20, 
        }
        
    }
)