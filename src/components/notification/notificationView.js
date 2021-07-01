import React, { Component } from 'react'
import {View,Text,Modal,ScrollView,Image,TouchableOpacity,ImageBackground,BackHandler} from 'react-native'

export default class notificationView extends Component {


    constructor() {
        super();
        this.state = {
          push_val: '',
          title:"",
          body:"",     
          Alert_Visibility: false,
        };
      }
    
      Show_Custom_Alert(visible,) {
        this.setState({Alert_Visibility: visible});
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false}); 
        this.props.navigation.navigate("home")    
      }
    


      componentDidMount = async () => {

        this.Show_Custom_Alert()
        // this.fetchLevelData()
        BackHandler.addEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
            
      );
      }
        
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () =>
          this.handleBackButton(this.props.navigation),
        );
      }
    
      handleBackButton = (nav) => {
        if (!nav.isFocused()) {
          BackHandler.removeEventListener('hardwareBackPress', () =>
            this.handleBackButton(this.props.navigation),
          );
          return false;
        } else {
          nav.navigate("home");
          return true;
        }
      };
    






    render() {

        let title = this.props.navigation.getParam("title")
        let body = this.props.navigation.getParam("body")



        return(
        <View>   
        <Modal
            visible={this.state.Alert_Visibility}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility);
            }}>
            <View
              style={{
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
            
              }}>


                <TouchableOpacity onPress={() =>{this.props.navigation.navigate("home")}} >
                        <Image                
                            source={require("../../assets/icon/20.png")}
                            style={{height: 24, width: 24, margin: 20,borderWidth:0}}
                            />
                </TouchableOpacity>

                <View
              style={{
                // backgroundColor:'#FFF',
                // backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 245,
                  backgroundColor: '#ffffff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 10,
                  borderRadius: 10,
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      borderWidth: 0,
                      marginTop: -50,
                    }}>
                    <Image                                        
                      source={require("../../assets/icon/check21.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 21,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 1,           
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>                     
                     {title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',                    
                      marginTop: 7,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>                     
                     {body}
                  </Text>
                </View>                 
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'center',
                    alignSelf:'center',
                    margin: 5,
                  }}>
                  <TouchableOpacity                 
                    onPress={() => {                      
                      this.Hide_Custom_Alert();
                    }}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 20,
                   
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 50,
                        marginEnd: 50,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                          OK
                    </Text>
                  </TouchableOpacity>                
                </View>
              </View>
            </View>
            </View>
          </Modal> 
          </View>
        )
    }
}
