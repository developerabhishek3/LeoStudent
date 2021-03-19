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
  TextInput
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


      token: '',

      userLoggedInData: {},

      username: '',

      userDetais: []
    };
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
        Alert.alert("Message", forgotpasswordResponse.response.message)
      }
    } else {
      this.myAlert('Error', forgotpasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const { email,password,confirm_password } = this.state;

    // if (email.length === 0) {
    //   this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
    // }
     if(password.length === 0){
            this.myAlert("Message","Veuillez entrer votre mot de passe!")
    }
    else if(confirm_password.length === 0) {
      this.myAlert("Message","Veuillez entrer votre mot de passe de confirmation !")
    }
    else if( password != confirm_password){
      this.myAlert("Message","Le nouveau mot de passe et la confirmation du nouveau mot de passe ne correspondent pas !")
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
                <Text style={Styles.txtStyle1}>Entrez votre nouveau mot de passe, nous</Text>
                <Text style={Styles.txtStyle1}>vous enverrons un lien pour réinitialiser</Text>
                <Text style={Styles.txtStyle1}>votre mot de passe.</Text>
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
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
              />
                </View>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    value={this.state.confirm_password}
                    placeholder="Mot de passe de confirmation !"
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
        </ImageBackground>
      </View>
    );
  }
}
