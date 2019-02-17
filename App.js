/*import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

// source ={require('./assets/Illustration@2x.png')}
//source ={require('./assets/getStarted@2x.png')}


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.whiteBox}>     
      </View> 
        <Image style = {styles.icon}>
        </Image>
        
        <View style={styles.textBox}>        
          <Text style={styles.paragraph}>
            DinDin.
           </Text>
            <Text style={styles.slogan}>
            Connecting Food Lovers
           </Text>
        </View>
        <Image style = {styles.startButton}></Image>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  whiteBox:{
  backgroundColor: 'red',
  flex:1,  
  },
 container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    //margin:40,
  },
  paragraph: {
    //margin: 24,
   width: 82.02,
  height: 39,
  color: '#353535',
  fontFamily: 'SFUIText',
  fontSize: 29,
  fontStyle: 'normal',
  fontStretch: 'normal',
  fontWeight: 300,
  lineHeight: 39,
  textAlign: 'center',
  textTransform: 'none',
  textDecoration: 'none',
  letterSpacing: 0,
  },

  icon:{
    width: 275,
    height: 259,
    justifyContent:'center',
    alignItems: 'center'   
  },

  slogan:{   
  width: 300,
  height: 16,
  color: '#000000',
  fontFamily: 'SFUIText',
  fontSize: 14,
  fontStyle: 'normal',
  fontStretch: 'normal',
  fontWeight: 300,
  lineHeight: 19,
  textAlign: 'center',
  textTransform: 'none',
  textDecoration: 'none',
  letterSpacing: 0,
  },

  textBox:{
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  startButton:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
