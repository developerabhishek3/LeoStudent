import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Modal,Dimensions,BackHandler,StatusBar,Alert} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../../assets/bgImages/1.png'
import logo from '../../../../../../assets/icon/96.png';
import back from '../../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';


import deleteIcon from '../../../../../../assets/icon/31.png';
import lockIcon from '../../../../../../assets/icon/32.png';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import {ChangePassword,LogoutFunction} from '../../../../../../Api/afterAuth';
import AsyncStorage from '@react-native-community/async-storage';

export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      old_password:"",
      new_password:"",
      confirm_new_password:"",
      Model_Visibility1: false,
      Alert_Visibility1: false,

    }    
  }
      



  componentDidMount = async () => {
  
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





  userLogoutFunction = async () => {
    const LogoutResponse = await LogoutFunction();
    
    if(LogoutResponse.result === true) {
        // console.log("getting logout response---------------",LogoutResponse.response)
        await AsyncStorage.setItem('userLoggedIn','false')
        let keys = ['token'];
        AsyncStorage.multiRemove(keys)
        this.Show_Custom_Alert1()
        // this.props.navigation.navigate("login")            
        // Alert.alert("Message","Déconnexion réussie!")
    }
    else{
        // console.log("getting error on logout -------------",LogoutResponse.error)
    }        
    // console.log("getting country response----------------",countryData.country_list)
  };






  Show_Custom_Alert1(visible) {
    this.setState({Alert_Visibility1: visible});
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility1: false}); 
    this.props.navigation.navigate("login")    
  }




  // Show_Custom_Alert2(visible) {
  //   this.setState({Alert_Visibility2: visible});
  //   console.log("checking did mont 1 -----------")
  // }
  // Hide_Custom_Alert2() {
  //   this.setState({Alert_Visibility2: false}); 
  //   // this.props.navigation.navigate("login")    
  // }


  // Show_Custom_Alert3(visible) {
  //   this.setState({Alert_Visibility3: visible});
  //   console.log("checking did mont 2 -----------")
  // }
  // Hide_Custom_Alert3() {
  //   this.setState({Alert_Visibility3: false}); 
  //   console.log("checking did mont 3 -----------")
  //   // this.props.navigation.navigate("login")    
  // }


  // Show_Custom_Alert4(visible) {
  //   this.setState({Alert_Visibility4: visible});
  // }
  // Hide_Custom_Alert4() {
  //   this.setState({Alert_Visibility4: false}); 
  //   // this.props.navigation.navigate("login")    
  // }






  ChangePasswordFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.fcm_token)
    const {
      old_password,
      new_password,
      confirm_new_password
    } = this.state;
    const ChangePasswordResponse = await ChangePassword({
      old_password,
      new_password,
      confirm_new_password
    });
    if (ChangePasswordResponse.result === true) {
      console.log("getting result here --------", ChangePasswordResponse.response)


      // if(ChangePasswordResponse.response.status == true){
      //   this.props.navigation.navigate("Home")
      // }
      // else{
      //   Alert.alert("Message",ChangePasswordResponse.response.message)
      // }
      if (ChangePasswordResponse.response.status === true) {
          // this.props.navigation.navigate("home")
          console.log("getting response >>>>>>>>>>>>>>>>",ChangePasswordResponse.response)
        // await AsyncStorage.setItem("userLoggedIn", "true");
        // await AsyncStorage.setItem("userLoggedInData", JSON.stringify(ChangePasswordResponse.response));

        // await AsyncStorage.setItem("token", JSON.stringify(ChangePasswordResponse.response.token));
        // await AsyncStorage.setItem("user_id", JSON.stringify(ChangePasswordResponse.response.user_id));

        // this.props.navigation.navigate("Home")
        this.userLogoutFunction()
          
      }
      else {
        Alert.alert("Message", ChangePasswordResponse.response.message)
      }
    } else {
      this.myAlert('Error', ChangePasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const { old_password,new_password, confirm_new_password } = this.state;
    if (old_password.length === 0) {
      // this.myAlert('Message', 'Veuillez entrer votre ancien_mot de passe');
      this.props.navigation.navigate("firstcheck")
    } else if (new_password.length === 0) {
      this.props.navigation.navigate("secondcheck")
      // this.myAlert('Message', 'Veuillez entrer votre nouveau mot de passe');   
    }
    else if (confirm_new_password.length === 0) {
      this.props.navigation.navigate("thirdcheck")     
      // this.myAlert('Message', 'Veuillez entrer votre nouveau mot de passe de confirmation');
    } 
    else if (new_password != confirm_new_password) {
      this.props.navigation.navigate("fourthcheck")     
    }
    else {     
      this.ChangePasswordFunction();
    }
  };






  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});        
  }
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
         <View style={Styles.header}>
         <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Réinitialiser le mot de passe</Text>
          <Text style={Styles.headerTxt}>     </Text>
          {/* <Image source={logo} style={Styles.headertxtInputImg1} /> */}
        </View>

        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>                 
          <ScrollView>
            <View style={{margin:10}}>


            <TextInput placeholder="  Ancien mot de passe" style={Styles.txtInput}
            value={this.state.old_password}
            onChangeText={(old_password) => this.setState({ old_password })}
            />

            <TextInput placeholder="  Nouveau mot de passe" style={Styles.txtInput} 
            value={this.state.new_password}
              onChangeText={(new_password) => this.setState({ new_password })}
            />

            <TextInput placeholder="  Confirmer le mot de passe" style={Styles.txtInput}
            value={this.state.confirm_new_password}
            onChangeText={(confirm_new_password) => this.setState({ confirm_new_password })}
            />
            
            <View style={Styles.continueBtn}>
                  <TouchableOpacity                  
                    onPress={()=>{this.validateUser()}}
                    >
                    <Text style={Styles.continueBtnTxt}>Valider</Text>
                  </TouchableOpacity>
                </View>
      
            </View>
          </ScrollView>   





          <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert1(!this.state.Alert_Visibility1);
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
                      source={require("../../../../../../assets/icon/9.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 6,
                      marginTop: -10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                    Nouveau mot de passe enregistré
                  </Text>
                </View>  
                  {/* <Text style={{margin:2,fontSize:15,fontWeight:'700',color:"gray",alignSelf:'center'}}>Votre coach va vous  </Text>
                  <Text style={{margin:2,fontSize:15,fontWeight:'700',color:"gray",alignSelf:'center'}}>contacter</Text>
                
                  <Image source={require("../../assets/icon/whatsapp.png")} style={{width:30,height:30,alignSelf:'center',margin:6}} /> */}


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

                      this.Hide_Custom_Alert1();
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




















          {/* for 1st validation condition............ */}


{/* 
          <Modal
            visible={this.state.Alert_Visibility2}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert2(!this.state.Alert_Visibility2);
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
                      source={require("../../../../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                  Veuillez entrer votre ancien mot de passe
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
                      this.Hide_Custom_Alert2();
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
          </Modal> */}





          {/* FOR THE 2ND VALIDATION CONDITION......... */}




{/*           
          <Modal
            visible={this.state.Alert_Visibility3}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert3(!this.state.Alert_Visibility3);
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
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                 Veuillez entrer votre nouveau mot de passe
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
                      this.Hide_Custom_Alert3();
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
          </Modal> */}




{/* 

   
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
                      fontSize: 20,
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
          </Modal> */}








        </ImageBackground>
          
      </View>
    )
  }
}
