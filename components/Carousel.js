import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const firebaseConfig = {
    apiKey: "AIzaSyDZpTrKnBHgaQbv_F87VoD5ZOn83Rkqe-w",
    authDomain: "dindin-9954b.firebaseapp.com",
    databaseURL: "https://dindin-9954b.firebaseio.com",
    projectId: "dindin-9954b",
    storageBucket: "dindin-9954b.appspot.com",
    messagingSenderId: "1055947992772"
  };
  



export class InviteCarousel extends Component {

    constructor(props){
        super(props)
    }

    startListener(path) {
        let context = this
        firebase.database().ref(path).on('value', (snapshot) => {     
          console.log(JSON.stringify(snapshot.val()))
          context.setState({
            data: JSON.parse(JSON.stringify(snapshot.val())), 
            gotInformation: true
          })
        })
      }

    _renderItem ({item, index}) {
        return (
            <View>
                <Text> Testing </Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel 
              layout={'default'}            
              ref={(c) => { this._carousel = c; }}
              data={this.state.data[0]["name"]}
              renderItem={this._renderItem}
            />
        );
    }
}



/*
 layout={'default'}            
              ref={(c) => { this._carousel = c; }}
              data={this.state.data[0]["name"]}
              renderItem={this._renderItem}
              sliderWidth= '100'
              itemWidth='10'
*/







/*<Carousel>
    <View>
      <Image source={{uri: "http://lorempixel.com/output/cats-q-c-640-480-1.jpg"}} />
      <Text className="legend">Legend 1</Text>
    </View>
    <View>
      <Image source={{uri: "http://lorempixel.com/output/cats-q-c-640-480-2.jpg"}} />
      <Text className="legend">Legend 2</Text>
    </View>
    <View>
      <Image source={{uri: "http://lorempixel.com/output/cats-q-c-640-480-3.jpg"}} />
      <Text className="legend">Legend 3</Text>
    </View>
  </Carousel>*/
