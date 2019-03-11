import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Constants } from 'expo'

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                <Image style={styles.menuIcon} source={require('../assets/sidemenubtn.png')}/>
            </TouchableOpacity>
                <Text style = {styles.title}> DinDin </Text>
            <TouchableOpacity>
                <Image style={styles.searchIcon} source={require('../assets/searchbtn.png')} />
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

        textAlignment: "Center",
          verticalAlignment:"Center",
          lineHeight:23,
          textWrapping:"Wrap",
          //Text="DinDin",
          fontFamily:"Segoe UI",
          fontSize:20,
          fontStretch:"Medium",
          foreground:"#353535",

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