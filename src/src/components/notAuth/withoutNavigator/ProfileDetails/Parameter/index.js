import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Modal,Dimensions,BackHandler, Alert,Switch,StatusBar} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/1.png'
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';


import deleteIcon from '../../../../../assets/icon/31.png';
import lockIcon from '../../../../../assets/icon/32.png';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import AsyncStorage from '@react-native-community/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

import {LogoutFunction,delete_account,setting_notification_status,setting_notification_update} from '../.../../../../../../Api/afterAuth'

let email_global
let switch_global
let push_global
let switch_global2
export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      Model_Visibility1: false,
      Alert_Visibility1: false,

      isBodyLoaded: false,
      isSpinner: true,

      //check switch value

      switchValue:false,
      isBodyLoaded: false,
      isSpinner: true,
      isSwitchOn: false,
      MySettingDate:[],
      SwitchOnValueHolder: false,
      SwitchOnValueHolder2:false,

      
      email_notification:1,
      setting_notification:1,
    }    
  }
      
  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false}); 
    this.userLogoutFunction()      
  }
  Hide_Custom_Alert2() {
    this.setState({Alert_Visibility: false});      
  }


  
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   



  componentDidMount = async () => {
    this.GetSettings() 
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


// Notification APi....



FetchupdateSettings = async (value,email_global) => {   
  
  const {           
      // email_notification:email_global,     
      setting_notification,
 } = this.state;
 console.log("email confiramtion  and push confirmation -------------------",email_global,value,push_global)
  const updateSettingsResponse = await setting_notification_update({               
    setting_notification:email_global
  });
  if (updateSettingsResponse.result === true) {
    console.log("getting result here ----------------->>>>>>>>>>>>>>>>>>>-",updateSettingsResponse.response)

    this.GetSettings();        
  } else {
    this.myAlert('Error', updateSettingsResponse.error);
    console.log('getting error here-------------');
  }
  return;
};




GetSettings =  () => {
  this.setState({ isSpinner: true }, async () => {
  const mysettingsResponse = await setting_notification_status();
  if (mysettingsResponse.result === true) {        
  // console.log("getting date here>>>>>>>>>>>>>>>>>>>>",mysettingsResponse.response.my_setting)
  // var setting_notification = parseInt(mysettingsResponse.response.setting_notification)  

  var setting_notification = mysettingsResponse.response.setting_notification
  console.log("I am here-------------------",setting_notification)

    if (setting_notification == 0) {
    this.setState({      
    setting_notification: 0,  SwitchOnValueHolder:false }); }
    else if(setting_notification == 1){
      this.setState({ setting_notification: 1, SwitchOnValueHolder:true })
    }

    if(setting_notification == 0) {
      this.setState({setting_notification : 0,SwitchOnValueHolder2:false})
    }
    else if(setting_notification == 1){
      this.setState({ setting_notification: 1, SwitchOnValueHolder2:true })
    }
    this.setState({
      isBodyLoaded: true,
      isSpinner: false,
      isCurrenetComponentRefreshing:false,
      setting_notification: mysettingsResponse.response.setting_notification,      
      // email_notification:email_notification,
      // setting_notification:setting_notification,        
    });
  
  } else {
    this.setState({isBodyLoaded: false, isSpinner: false}, () => {
      Alert.alert('Message', 'Quelque chose a mal tourné, essayez encore!', [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ]);
    });
  }
})     
};



checkSwitch  = (value) => {
  console.log("getting value inside the function--1111111111-------------",value)  // this.setState({email_notification:!this.state.email_notification})

    if (value == true) { 
      console.log("inside true  11111>>>>>", value)
      this.setState({
      setting_notification:1,   
      SwitchOnValueHolder: value
      
      })
      email_global = 1,switch_global = value
      }
    
      else if (value == false) {
        console.log("inside false111111111 >>>>>", value)         
          this.setState({
            setting_notification:0, SwitchOnValueHolder: value
            }) 
            email_global = 0,switch_global = value     
      console.log("getting finally here---111111111111--------",switch_global,email_global)
      }
     

    this.FetchupdateSettings(value,email_global)    
  };
























  userLogoutFunction = async () => {
    const LogoutResponse = await LogoutFunction();
    
    if(LogoutResponse.result === true) {
        // console.log("getting logout response---------------",LogoutResponse.response)
        await AsyncStorage.setItem('userLoggedIn','false')
        // let keys = ['token'];
        // AsyncStorage.multiRemove(keys)
        this.userdelete_accountFunction() 
        this.props.navigation.navigate("login")   
                
        // Alert.alert("Message","Logout Sucessfully !")
    }
    else{
        // console.log("getting error on logout -------------",LogoutResponse.error)
    }        
    // console.log("getting country response----------------",countryData.country_list)
  };



  userdelete_accountFunction = async () => {
    const delete_accountResponse = await delete_account();
    
    if(delete_accountResponse.result == true) {
      if(delete_accountResponse.response.status == true){
        Alert.alert("Message",delete_accountResponse.response.message)
        console.log("getting response hrere=============",delete_accountResponse.response)
      }
      else{
        Alert.alert("Message",delete_accountResponse.response.message)
        console.log("getting Error hrere=============",delete_accountResponse.response)
      }
        // console.log("getting delete_account response---------------",delete_accountResponse.response)     
        // this.props.navigation.navigate("login")                 
        // Alert.alert("Message","Account delete Sucessfully !")
    }
    else{
      Alert.alert("Message","Erreur : réessayer!")
    }        
    // console.log("getting country response----------------",countryData.country_list)
  };








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
          <Text style={Styles.headerTxt}>Paramètres</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} />
        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>                 
          <ScrollView>
            {
              this.state.isBodyLoaded ==  true ?

          
            <View style={{margin:20}}>

{/* 

              <View style={Styles.containerView}>

                  <Text style={Styles.txtView}>Notifications</Text>

               
                        <Switch

                        trackColor={{ true: '#b41565', false: 'grey' }}
                        // thumbColor='#6FB8EF'

                        onTintColor="#b41565"
                        thumbColor="#fff"
                        onValueChange={(value) => this.checkSwitch(value)}                      
                        value={this.state.SwitchOnValueHolder}
                        ></Switch>

                    
              </View> */}



             <View style={Styles.containerView}>


             <Text style={Styles.txtView}>Changer de mot de passe</Text>

             <TouchableOpacity
              onPress={()=>{this.props.navigation.navigate('changepassword')}}
              // onPress={()=>{this.Show_Custom_Alert1()}}
              >
             <Image source={lockIcon} style={{margin:10,height:27,width:27}} />
              </TouchableOpacity>

              </View>

             <View style={Styles.containerView}>

             <Text style={Styles.txtView}>Supprimer votre compte</Text>
             <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
             
             <Image source={deleteIcon} style={{margin:10,height:27,width:27}} />
            </TouchableOpacity>
              </View>


              <View style={Styles.bottomContentView}>

                  <Text style={Styles.bottomTxtView}>CGV</Text>

                  <Text style={Styles.bottomTxtView}>Mentions légales</Text>

                  <Text style={Styles.bottomTxtView}>Politique de confidentialité</Text>



              </View>



            </View>
                : null
              }
          </ScrollView>   


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
                width: '90%',
                height: 240,
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
                 <Image source={deleteIcon} style={{height:70,width:70,margin:15}} />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:10,
                    marginTop:-10,
                    color: '#000000',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                Supprimer un compte
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:10,
                    color: 'gray',
                    textAlign: 'center',                   
                  }}>
                   Êtes-vous sûr de vouloir supprimer votre
                </Text>


                <Text
                  style={{
                    fontSize: 13,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:-10,
                    color: 'gray',
                    textAlign: 'center',
                   
                  }}>
                 compte ? Si vous supprimez votre compte, vous
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:-10,
                    color: 'gray',
                    textAlign: 'center',
                   
                  }}>
                 ne pourrez pas le réactiver ultérieurement
                </Text>
            
              </View>                        
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf:'center',
                  borderRadius:6,
                  textAlign: 'center',
                  margin: 5,                
                }}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}                 

                  style={{
                   
                    backgroundColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 13,
                      marginStart: 30,
                      marginEnd: 30,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Oui
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert2()}                 
                  style={{
                   
                    backgroundColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
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
                   Non
                  </Text>
                </TouchableOpacity>

             
              </View>
            </View>
          </View>
        </Modal>






      




        </ImageBackground>
          
      </View>
    )
  }
}
