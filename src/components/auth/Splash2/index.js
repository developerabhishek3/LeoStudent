import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';
                

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;



import { EventRegister } from 'react-native-event-listeners'

export default class Splash extends Component {
  constructor() {
    super();
    //  this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {  
    
       
    this.listener = EventRegister.addEventListener('myCustomEvent', (data) => { 
      console.log("getting data- on splash screen------------",data)
      if(data != undefined && data != null){
        if(data == `Rejeté !`){
          this.props.navigation.navigate("rejectrequest")
        }
        else{
          this.props.navigation.navigate("acceptrequest")
        }
      }
      
      })


    setTimeout(() => {
      this.props.navigation.replace('welcome');
    }, 3000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',          
        }}>
          <StatusBar hidden={true} />
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../../assets/Splash2.png')}
          // source={require('../../assets/splash.png')}
        >         
           <View style={{justifyContent:'center',marginTop:90}}> 

            <Image
          resizeMode="stretch"
          style={{
            width: 110,
            height: 140,            
            alignSelf:'center',
          }}
          source={require('../../../assets/icon/96.png')}
          // source={require('../../assets/splash.png')}
         /> 
         <View style={{marginTop:SCREEN_HEIGHT/7,}}>  
          <Text
           style= {{
              color:'#FFFFFF',
              textAlign:'center',
                fontSize:28,
                fontWeight:'700',               
                fontFamily:'Montserrat-Regular'
            }}
          >
            Application mobile SPYK
          </Text>
                  <Text
                      style= {{
                          color:'#FFFFFF',
                          textAlign:'center',
                            fontSize:18,
                            fontWeight:'700',
                            margin:3,                                
                            fontFamily:'Montserrat-Regular'
                        }}
                  >
                  Pratiquez votre anglais oral avec                                      
                  </Text>
                  <Text
                      style= {{
                          color:'#FFFFFF',
                          textAlign:'center',
                            fontSize:18,
                            margin:3,
                            fontWeight:'700',                                
                            fontFamily:'Montserrat-Regular'
                        }}
                  >                
                    un coach, où vous voulez,                    
                  </Text>
                  <Text
                      style= {{
                          color:'#FFFFFF',
                          textAlign:'center',
                            fontSize:18,
                            margin:3,
                            fontWeight:'700',                                
                            fontFamily:'Montserrat-Regular'
                        }}
                  >                
                    quand vous voulez !                   
                  </Text>
                  </View>
            </View>

        </ImageBackground>
      </View>
    );
  }
}
