import React,{Fragment,Component} from 'react'
import {View,Text,TouchableOpacity,Image,Modal,BackHandler} from 'react-native';

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
          Model_Visibility4: false,
          Alert_Visibility4: false,
    
        }    
      }
          



    componentDidMount = async () => {
      this.Show_Custom_Alert4()
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
        nav.goBack();
        return true;
      }
    };







    Show_Custom_Alert4(visible) {
        this.setState({Alert_Visibility4: visible});
        console.log("checking did mont 1 -----------")
      }
      Hide_Custom_Alert4() {
        this.setState({Alert_Visibility4: false}); 
        this.props.navigation.navigate("changepassword")    
      }
    


    render(){
        return(
            <View>
     <Modal
            visible={this.state.Alert_Visibility4}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert4(!this.state.Alert_Visibility4);
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
                     Veuillez entrer votre nouveau mot de passe de confirmation
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
                      this.Hide_Custom_Alert4();
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