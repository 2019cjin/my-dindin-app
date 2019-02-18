import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.whiteBox}>     
      </View> 
        <Image style = {styles.icon} source ={require('./assets/Illustration.png')}>
        </Image>
        
        <View style={styles.textBox}>        
          <Text style={styles.paragraph}>
            DinDin.
           </Text>
            <Text style={styles.slogan}>
            Connecting Food Lovers
           </Text>
        </View>
        <Image style = {styles.startButton} source ={require('./assets/getStarted.png')}></Image>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  whiteBox:{
    width: 10,
    height:10,
    flex:1
  },
 container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  paragraph: {
   width: 82.02,
  height: 39,
  color: '#353535',
  fontFamily: 'SFUIText',
  fontSize: 29,
  fontStyle: 'normal',
  fontStretch: 'normal',
  fontWeight: 0,
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
  height: 20,
  color: '#000000',
  fontFamily: 'SFUIText',
  fontSize: 14,
  fontStyle: 'normal',
  fontStretch: 'normal',
  fontWeight: 0,
  lineHeight: 19,
  textAlign: 'center',
  textTransform: 'none',
  textDecoration: 'none',
  letterSpacing: 0,
  },

  textBox:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  startButton:{
    width: 375,
    height: 48,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
