import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

//source ={{uri: item.profilePic}}

export default class InvitesCarousel extends React.Component
{
  render(){
    return(
      <View style={{height:300, width: 300}}>
      <Text>Carousel</Text>
      <Carousel>

        <View><Text>Text 1</Text></View>
        <View><Text>Text 2</Text></View>
        <View><Text>Text 3</Text></View>
      </Carousel>
      </View>
    )
  }
}


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
