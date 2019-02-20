import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
//import { listenOrientationChange, removeOrientationListener, widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SplashScreen extends React.Component{

    constructor(){
        super()
        this.state ={
            orientation: ''
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
        if (this.state.orientation == 'portrait')
        {
            return(
                <View ref = "rootView" style={[styles.container]}>
                    <View style={styles.whiteBox}/>     
                    <Image style = {styles.icon} source ={require('../assets/Illustration.png')}/>

                    <View style={styles.textBox}>        
                        <Text style={styles.paragraph} type={"Arabic"}>
                            DinDin
                        </Text>
                        <Text style={styles.slogan}>
                            Connecting Food Lovers!
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                        <Image style = {styles.startButton} source ={require('../assets/getStarted.png')}/>
                    </TouchableOpacity>
                  
                </View>
                
            )
        }
        else
        {
            return(
                <View ref = "rootView" style={[styles.container, styles.landscape]}>
                    <View style={styles.whiteBox}/>     
                    <Image style = {styles.icon} source ={require('../assets/Illustration.png')}/>
                    
                    <View style={styles.textBox} type={"Arabic"}>        
                        <Text style={styles.paragraph}>
                            DinDin
                        </Text>
                        <Text style={styles.slogan}>
                            Connecting Food Lovers
                        </Text>
                    </View>
                    <Image style = {styles.startButton} source ={require('../assets/getStarted.png')}/>
                    
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
  });