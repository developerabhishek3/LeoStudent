import React,{component} from 'react';
import { Component } from 'react';
import {View,Text,Image,Modal,TouchableOpacity} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

class Reject extends Component{
    constructor(props){
        super(props)
        this.state={
            Model_Visibility: false,
      Alert_Visibility: false,

        }
    }

    componentDidMount(){
        this.Show_Custom_Alert()
    }

    Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible, });
        // console.log("getting reservation id here----------",reservation_id)
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false});
        this.props.navigation.navigate("currentreservation")
        // this.Fetchcancel_reservation();
      }
    render(){
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
                // backgroundColor:'#FFF',
                backgroundColor: 'rgba(0,0,230,0.700)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 230,
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
                      source={require("../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                
                </View>  
                  <Text style={{margin:1,fontSize:18,fontWeight:'700',color:"#000000",alignSelf:'center'}}>Oups, votre coach</Text>
                  <Text style={{margin:1,fontSize:18,fontWeight:'700',color:"#000000",alignSelf:'center'}}>n'est plus</Text>
                  <Text style={{margin:1,fontSize:18,fontWeight:'700',color:"#000000",alignSelf:'center'}}>disponible</Text>            
                <View
                 >
                  <TouchableOpacity
                    // onPress={() => this.Hide_Custom_Alert()}
                    style={{                 
                        flexDirection: 'row',                    
                        borderRadius: 6,
                        justifyContent:'center',
                        alignSelf:'center',
                        backgroundColor:"#b41565",                        
                        margin: 5,
                      }}
                    onPress={() => {
                      let reservation_id = this.state.reservation_id;
                      console.log(
                        'getting inside on Press============',
                        reservation_id,
                      );

                      this.Hide_Custom_Alert();
                    }}>
                
                    <Image source={require("../../assets/icon/search.png")} style={{height:30,width:30,margin:7}} />
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 16,
                        marginStart: 10,
                        margin:10,
                        marginEnd: 30,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                        Trouver un autre coach
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert1()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,                   
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                    Retour
                    </Text> 
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </Modal>






            </View>
        )
    }
}
export default Reject;