import React,{Fragment,Component} from 'react'
import {View,Text,TouchableOpacity,Image,Modal} from 'react-native';

class FirstCheck extends Component {


    constructor(props){
        super(props)
        this.state={
          value: 'first',
          Model_Visibility: false,
          Alert_Visibility: false,
          old_password:"",
          new_password:"",
          confirm_new_password:"",
          Model_Visibility5: false,
          Alert_Visibility5: false,
    
        }    
      }
          

    componentDidMount(){
        this.Show_Custom_Alert5()
    }


    Show_Custom_Alert5(visible) {
        this.setState({Alert_Visibility5: visible});
        console.log("checking did mont 1 -----------")
      }
      Hide_Custom_Alert5() {
        this.setState({Alert_Visibility5: false}); 
        this.props.navigation.navigate("changepassword")    
      }
    


    render(){
        return(
            <View>
     <Modal
            visible={this.state.Alert_Visibility5}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert45(!this.state.Alert_Visibility5);
            }}>
            <View
              style={{
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
                      source={require("../../../../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                 Le nouveau mot de passe et la confirmation du nouveau mot de passe ne correspondent pas !
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
                      this.Hide_Custom_Alert5();
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
          </Modal> 
            </View>
        )
    }
}

export default FirstCheck;