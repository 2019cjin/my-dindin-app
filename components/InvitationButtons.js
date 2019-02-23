//when button clicked:
// 1. entire card flashes green
// 2. need to get next invitation in json file (focus on later)

import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

export default class InvitationButton extends React.Component{

    constructor(){
        super()
        this.state ={
            accepted: ''
        }
    }

    accept = () =>
    {
        this.setState({ accepted: 'true'});
    }

    render(){
        return(
            <View>
                <Text>Invitation</Text>
                
            </View>
        )
        
    }
}