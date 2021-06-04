import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  BackHandler,
  TextInput,
  Modal
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {forgotPasswordReq3Function} from '../../../Api/afterAuth'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      vcode:"",
      password: '',
      confirm_password:'',
      fcm_token: '',
      alertValue:"",
      Model_Visibility: false,
      Alert_Visibility: false,


      token: '',

      userLoggedInData: {},

      username: '',

      userDetais: []
    };
  }



  Show_Custom_Alert(visible,) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false}); 
    // this.props.navigation.navigate("login")    
  }




  userForgotPasswordRe2Function = async () => {
    // console.log("getting inside the function uuid --------",this.state.fcm_token)
    let email =  this.props.navigation.getParam("email");
    const {     
      password,    
    } = this.state;
    const forgotpasswordResponse = await forgotPasswordReq3Function({
      email:email,   
      password,  
    });
    if (forgotpasswordResponse.result === true) {
      console.log("getting result here --------", forgotpasswordResponse.response)


      // if(forgotpasswordResponse.response.status == true){
      //   this.props.navigation.navigate("Home")
      // }
      // else{
      //   Alert.alert("Message",forgotpasswordResponse.response.message)
      // }
      if (forgotpasswordResponse.response.status === true) {           
          console.log("getting response >>>>>>>>>>>>>>>>",forgotpasswordResponse.response)      
          // Alert.alert("Message", forgotpasswordResponse.response.message)
          this.props.navigation.navigate("login")
      }
      else {
        let alertValue = forgotpasswordResponse.response.message;
        console.log("alert value here - - - - - - - - - ",alertValue)
        this.setState({alertValue})
        this.Show_Custom_Alert()

        // Alert.alert("Message", forgotpasswordResponse.response.message)
      }
    } else {
      // this.myAlert('Error', forgotpasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {

    let alertValue;
    const { email,password,confirm_password } = this.state;

    // if (email.length === 0) {
    //   this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
    // }
     if(password.length === 0){
      alertValue = "Veuillez entrer votre mot de passe!"
      this.setState({alertValue})
      this.Show_Custom_Alert()
            // this.myAlert("Message","Veuillez entrer votre mot de passe!")
    }
    else if(confirm_password.length === 0) {
      alertValue = "Veuillez entrer votre mot de passe de confirmation!"
      this.setState({alertValue})
      this.Show_Custom_Alert()
      // this.myAlert("Message","Veuillez entrer votre mot de passe de confirmation !")
    }
    else if( password != confirm_password){
      alertValue = "Le nouveau mot de passe et la confirmation du nouveau mot de passe ne correspondent pas!"
      this.setState({alertValue})
      this.Show_Custom_Alert()
      // this.myAlert("Message","Le nouveau mot de passe et la confirmation du nouveau mot de passe ne correspondent pas !")
    }
    else {
      // const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // if (!email.match(mailformat)) {
      //   this.myAlert('Message', 'Email-Id invalide!');
      //   return false;
      // }
      this.userForgotPasswordRe2Function();
    }
  };




  componentDidMount = async () => {
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
      nav.goBack();
      return true;
    }
  };



  render() {

    let email =  this.props.navigation.getParam("email");

    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
               <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={60} extraScrollHeight={60} showsVerticalScrollIndicator={false}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />

                <View >
                <Text style={Styles.headerTxt}>Mot de passe </Text>
                <Text style={Styles.headerTxt1}>oublié</Text>
                </View>
              </View>

              <View style={Styles.subHeader}>
                <Text style={Styles.txtStyle1}>Entrez votre nouveau mot de passe</Text>              
              </View>

              <View style={Styles.textInputView}>
                {/* <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" Email"
                    value={email}
                    editable={false}
                    // onChangeText={(email) => this.setState({ email })}
                />
                </View> */}

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="Nouveau mot de passe"
                    placeholderTextColor="gray"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
              />
                </View>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    value={this.state.confirm_password}
                    placeholder="Confirmation du nouveau mot de passe"
                    placeholderTextColor="gray"
                    onChangeText={(confirm_password) => this.setState({ confirm_password })}
              />
                </View>
                
              </View>
              <View style={Styles.continueBtn}>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.props.navigation.navigate('home');
                  // }}
                  onPress={()=>{this.validateUser()}}
                  >
                  <Text style={Styles.continueBtnTxt}>Continuer</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{flexDirection: 'row', margin: 3, alignSelf: 'center'}}>
                <Text style={Styles.txtStyle2}>Déjà utilisateur ?</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('login');
                  }}>
                  <Text style={Styles.txtStyle3}>Se connecter </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </ScrollView>
          </KeyboardAwareScrollView>





                
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
                      source={require("../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                     {/* Veuillez entrer votre nouveau mot de passe de confirmation */}
                     {this.state.alertValue}
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
          </Modal>
        </ImageBackground>
      </View>
    );
  }
}
