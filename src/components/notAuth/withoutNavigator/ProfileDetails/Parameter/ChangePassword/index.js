import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Modal,Dimensions,BackHandler,StatusBar} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../../assets/bgImages/1.png'
import logo from '../../../../../../assets/icon/96.png';
import back from '../../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';


import deleteIcon from '../../../../../../assets/icon/31.png';
import lockIcon from '../../../../../../assets/icon/32.png';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import {ChangePassword} from '../../../../../../Api/afterAuth'

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
      this.myAlert('Message', 'Please enter your old_password');
    } else if (new_password.length === 0) {
      this.myAlert('Message', 'Please enter your new_password');
    }
    else if (confirm_new_password.length === 0) {
      this.myAlert('Message', 'Please enter your confirm_new_password');
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
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
         <View style={Styles.header}>
         <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Changer le mot de passe</Text>
          <Text style={Styles.headerTxt}>     </Text>
          {/* <Image source={logo} style={Styles.headertxtInputImg1} /> */}
        </View>

        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>                 
          <ScrollView>
            <View style={{margin:10}}>


            <TextInput placeholder="  Ancien mot de passe" style={Styles.txtInput}
            
            onChangeText={(old_password) => this.setState({ old_password })}
            />

            <TextInput placeholder="  Nouveau mot de passe" style={Styles.txtInput} 
              onChangeText={(new_password) => this.setState({ new_password })}
            />

            <TextInput placeholder="  Confirmer le mot de passe" style={Styles.txtInput}
            onChangeText={(confirm_new_password) => this.setState({ confirm_new_password })}
            />



            
            <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    onPress={()=>{this.validateUser()}}
                    >
                    <Text style={Styles.continueBtnTxt}>Changer</Text>
                  </TouchableOpacity>
                </View>



           





            </View>
          </ScrollView>   




        </ImageBackground>
          
      </View>
    )
  }
}
