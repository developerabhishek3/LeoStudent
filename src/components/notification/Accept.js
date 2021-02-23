import React,{component} from 'react';
import { Component } from 'react';
import {View,Text,Image,Modal,TouchableOpacity} from 'react-native';

class Accept extends Component{
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
        this.props.navigation.navigate("home")
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
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 221,
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
                      source={require("../../assets/icon/9.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 6,
                      marginTop: -10,
                      color: '#000000',
                      textAlign: 'center',                      
                    }}>
                    Demande acceptee
                  </Text>
                </View>  
                  <Text style={{margin:2,fontSize:15,fontWeight:'700',color:"gray",alignSelf:'center'}}>Votre coach va vous  </Text>
                  <Text style={{margin:2,fontSize:15,fontWeight:'700',color:"gray",alignSelf:'center'}}>contacter</Text>
                
                  <Image source={require("../../assets/icon/whatsapp.png")} style={{width:30,height:30,alignSelf:'center',margin:6}} />


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
                    // onPress={() => this.Hide_Custom_Alert()}

                    onPress={() => {
                      let reservation_id = this.state.reservation_id;
                      console.log(
                        'getting inside on Press============',
                        reservation_id,
                      );

                      this.Hide_Custom_Alert();
                    }}
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
          </Modal>






            </View>
        )
    }
}
export default Accept;