import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                <Image style={styles.menuIcon} source={require('./assets/sidemenubtn.png')}/>
            </TouchableOpacity>
                <Text style = {styles.title}> DinDin </Text>
                <Image style={styles.searchIcon} source={require('./assets/searchbtn.png')} />
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
          fontSize:19,
          fontStretch:"Medium",
          foreground:"#353535",

      },
        searchIcon:{
            margin:10
        },
        menuIcon:{
            width: 30,
            height: 30,
        }
        
    }
)