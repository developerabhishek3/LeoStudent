import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';
                

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Splash extends Component {
  constructor() {
    super();
    //  this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {

 

    setTimeout(() => {
      this.props.navigation.replace('login');
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
          source={require('../../../assets/Splash1.png')}
          // source={require('../../assets/splash.png')}
        > 
           
        <View style={{justifyContent:'center',marginTop:40}}>  
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
         <View style={{marginTop:150}}>
          <Text
           style= {{
              color:'#000000',
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
                          color:'#000000',
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
                          color:'#000000',
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
                          color:'#000000',
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
