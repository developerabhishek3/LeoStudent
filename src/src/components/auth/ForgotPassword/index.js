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
  BackHandler
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {TextInput} from 'react-native-gesture-handler';


import {forgotPasswordReq1Function} from '../../../Api/afterAuth'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fcm_token: '',


      token: '',

      userLoggedInData: {},

      username: '',

      userDetais: []
    };
  }






  userForgotPasswordRe1Function = async () => {
    // console.log("getting inside the function uuid --------",this.state.fcm_token)
    const {
      email,     
    } = this.state;
    const forgotpasswordResponse = await forgotPasswordReq1Function({
      email,     
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
          this.props.navigation.navigate("forgotpasswordReq2",{email:email})
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
    const { email,  } = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
    }
     else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Email-Id invalide!');
        return false;
      }
      this.userForgotPasswordRe1Function();
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
    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
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
                <Text style={Styles.txtStyle1}>Entrez votre adresse électronique, nous</Text>
                <Text style={Styles.txtStyle1}>vous enverrons un lien pour réinitialiser</Text>
                <Text style={Styles.txtStyle1}>votre mot de passe.</Text>
              </View>

              <View style={Styles.textInputView}>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" Email"

                    onChangeText={(email) => this.setState({ email })}
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
        </ImageBackground>
      </View>
    );
  }
}
