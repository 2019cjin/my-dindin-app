import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ImageBackground, Animated, Button} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import { Constants } from 'expo';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: getRandomInt(1000, 3000),              // Make it take a while
      }
    ).start();                        // Starts the animation
  }
  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class SplashScreen extends React.Component{

    constructor(){
        super()
        this.state ={
            orientation: '',
            slogan: 'Connecting Food Lovers'
        }
    }

    changeLanguage = () =>
    {
        if (this.state.slogan === 'Connecting Food Lovers')
        {
            this.setState({ slogan:'توصيل عشاق الطعام'});
        }
        else
        {
            this.setState({ slogan: 'Connecting Food Lovers'});
        }
    }

    getOrientation = () =>
    {
        if( this.refs.rootView )
        {
            if( Dimensions.get('window').width < Dimensions.get('window').height )
            {
                this.setState({ orientation: 'portrait' });
            }
            else
            {
                this.setState({ orientation: 'landscape' });
            }
           console.log(this.state.orientation.toString())
        }
    }

    componentDidMount()
    {
        this.changeLanguage();
        this.getOrientation();
        
        Dimensions.addEventListener( 'change', () =>
        {
            this.getOrientation();
        });
    }

    componentWillUnMount() 
    {
        Dimensions.removeEventListener( 'change');
    }

    render(){
        if (this.state.orientation === 'portrait')
        {
            return(
                <View ref = "rootView" style={styles.container}>
                    <View style={styles.whiteBox}/> 
                        
                    <ImageBackground style = {styles.icon} source ={require('../assets/backgroundSplash.png')}>
                    
                        <FadeInView>
                            <Image style = {styles.avatar1} source ={require('../assets/greenGirl.png')}>
                            </Image>
                        </FadeInView>

                         <FadeInView>
                            <Image style = {styles.avatar2} source ={require('../assets/purpleGuy.png')}>
                            </Image>
                        </FadeInView>

                        <FadeInView>
                            <Image style = {styles.avatar3} source ={require('../assets/redHairGirl.png')}>
                            </Image>
                        </FadeInView>
                    </ImageBackground>

                    <View style={styles.textBox}>        
                        <Text style={styles.paragraph}>
                            DinDin
                        </Text>
                        
                        <Text style = {styles.slogan} id="sloganText">{this.state.slogan}</Text>
                        <Button onPress={this.changeLanguage} title="English/عربى" color="#841584"/>
                        
                    </View>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}} activeOpacity={0.5}>

                        <Image style = {styles.startButton} source ={require('../assets/getStarted.png')}/>
                    </TouchableOpacity>
                  
                </View>
                
                
            )
        }
        else
        {
            return(
                 <View ref = "rootView" style={styles.container}>
                    <View style={styles.whiteBox}/> 
                        
                    <ImageBackground style = {styles.icon} source ={require('../assets/backgroundSplash.png')}>
                        <FadeInView>
                            <Image style = {styles.avatar1} source ={require('../assets/greenGirl.png')}>
                            </Image>
                        </FadeInView>

                         <FadeInView>
                            <Image style = {styles.avatar2} source ={require('../assets/purpleGuy.png')}>
                            </Image>
                        </FadeInView>

                        <FadeInView>
                            <Image style = {styles.avatar3} source ={require('../assets/redHairGirl.png')}>
                            </Image>
                        </FadeInView>
                    </ImageBackground>

                    <View style={styles.textBox}>        
                        <Text style={styles.paragraph}>
                            DinDin.
                        </Text>
                        
                        <Text style = {styles.slogan} id="sloganText">{this.state.slogan}</Text>
                        <Button onPress={this.changeLanguage} title="English/عربى" color="#841584"/>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                        <Image style = {styles.startButton} source ={require('../assets/getStarted.png')}/>
                    </TouchableOpacity>
                  
                </View>
               
                
            )
        }
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
    //fontWeight: 0,
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
    },

    landscape:
    {
        transform: [{ rotate: '270deg'}]
    },

    avatar1:{
        width: 53,
        height: 53,
        position: 'absolute',
        bottom: 50,
        left:40,
      },
    
      avatar2:{
        width: 53,
        height: 53,
        position: 'absolute',
        bottom: 50,
        right: 50,
      },
    
        avatar3:{
        width: 53,
        height: 53,
        position: 'absolute',
        top: 50,
        right: 10,
      },
      
  });

  //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  