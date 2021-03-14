import React,{Component} from 'react';
import {View,Text,Modal,TouchableOpacity,Image,BackHandler} from 'react-native'

class CancelReservation extends Component{
    constructor(props) {
        super(props);
        this.state = {
          value: 'first',
          Model_Visibility: false,
          Alert_Visibility: false,
    
          Alert_Visibility1:false,
          Model_Visibility1:false,
          CurrrentData:[],
    
          isBodyLoaded:false,
          isSpinner:true,
          reservation_id: 0,
          isCurrenetComponentRefreshing:false
        };
      }
    
      Show_Custom_Alert(reservation_id, visible) {
        this.setState({Alert_Visibility: visible, reservation_id});
        console.log("getting reservation id here----------",reservation_id)
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false});      
      }
    
    
    

      async componentDidMount() {

        this.Show_Custom_Alert2()
    
        BackHandler.addEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      }



    
    
      Show_Custom_Alert2(visible) {
        console.log("geeting here- or not--------")
        this.setState({Alert_Visibility1: visible});
      }
      Hide_Custom_Alert3() {
        this.setState({Alert_Visibility1: false});
        this.props.navigation.navigate("booknowchoosetime")  
        
       
      }
    
      Hide_Custom_Alert2() {
        this.setState({Alert_Visibility1: false}); 
        this.props.navigation.navigate("choosetime")  
      }
    
    
    
      Hide_Custom_Alert1() {
        this.setState({Alert_Visibility: false});
        // this.props.navigation.navigate('choosetime')
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
          nav.goBack();
          return true;
        }
      };
    
    
    
    
    render(){
        return(
            <View>
              
          <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility1);
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
                      source={require("../../../../assets/icon/mobile.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: -10,
                      color: '#000000',
                      textAlign: 'center',                      
                    }}>
                      Réservation de mon coaching d'anglais
                  </Text>
                </View>                  

                <View
                  style={{                                        
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert3()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                     borderWidth:0,
                      height: 35,
                      width:'90%',
                      borderRadius: 6,
                      alignSelf:'center'
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 12,
                        marginStart: 15,
                        marginEnd: 15,
                        fontWeight: '700',
                        textAlign:"center"                              
                      }}>
                    Faire mon coaching maintenant
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert2()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                     borderWidth:0,
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 12,
                        marginStart: 15,
                        marginEnd: 15,
                        fontWeight: '700', 
                        textAlign:'center'               
                      }}>
                     Programmer mon coaching pour plus tard
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

export default CancelReservation;