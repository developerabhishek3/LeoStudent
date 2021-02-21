import React, { Component } from 'react'
import { View,Text, ImageBackground,Image,TouchableOpacity,ScrollView, StatusBar,Alert,BackHandler } from 'react-native'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/3.png'
import logo from '../../../assets/icon/96.png'
import facebook from '../../../assets/icon/fb.png'
import { TextInput } from 'react-native-gesture-handler'
import { loginUser } from '../../../Api/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';



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






      userLoginFunction = async () => {
        console.log("getting inside the function uuid --------",this.state.fcm_token)
        const {
          email,
          password,
          fcm_token
        } = this.state;
        const loginUserResponse = await loginUser({ 
          email,
          password,
          fcm_token
        });
        if (loginUserResponse.result == true) {
          console.log("getting result here --------", loginUserResponse.response)

          // console.log("getting result here --------", loginUserResponse.response.user_info.level_id)
    

            
            // this.props.navigation.navigate("home") // after imlementing API need to follow bottom login................
    

     
          if (loginUserResponse.response.status == true) {   
            
            await AsyncStorage.setItem("userLoggedIn", "true");
            await AsyncStorage.setItem("userLoggedInData", JSON.stringify(loginUserResponse.response));
    
            await AsyncStorage.setItem("token", JSON.stringify(loginUserResponse.response.token));
            await AsyncStorage.setItem("user_id", JSON.stringify(loginUserResponse.response.user_id));

            await AsyncStorage.setItem("level_id", JSON.stringify(loginUserResponse.response.user_info.level_id));

    
            // Alert.alert("Message",loginUserResponse.response.message)

            if(loginUserResponse.response.is_academic_info == false){
              // await AsyncStorage.setItem("is_academic_info", "true");
              this.props.navigation.navigate("question")
              
            }         
            else if(loginUserResponse.response.is_level_info == false){
              // await AsyncStorage.setItem("is_level_info", "true");
              this.props.navigation.navigate("levelchoice")
              
            }
            else{
              this.props.navigation.navigate("home")
              // Alert.alert("Message",loginUserResponse.response.is_academic_info == true)
            }


          //     console.log("getting response >>>>>>>>>>>>>>>>",loginUserResponse.response)
          //   await AsyncStorage.setItem("userLoggedIn", "true");
          //   await AsyncStorage.setItem("userLoggedInData", JSON.stringify(loginUserResponse.response));
    
          //   await AsyncStorage.setItem("token", JSON.stringify(loginUserResponse.response.token));
          //   await AsyncStorage.setItem("user_id", JSON.stringify(loginUserResponse.response.user_id));
    
          //   this.props.navigation.navigate("home")
          }
          else {
            Alert.alert("Message", loginUserResponse.response.message)
          }
        } else {
          this.myAlert('Error', loginUserResponse.error);
          console.log('getting error here-------------');
        }
        return;
      };
    
      myAlert = (title = '', message = '') => {
        Alert.alert(title, message);
      };
    
      validateUser = () => {
        const { email, password } = this.state;
    
        if (email.length === 0) {
          this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
        } else if (password.length === 0) {
          this.myAlert('Message', 'veuillez entrer votre mot de passe!');
        } else {
          const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!email.match(mailformat)) {
            this.myAlert('Message', 'Email-Id invalide!');
            return false;
          }
          this.userLoginFunction();
        }
      };
    

      componentDidMount = async () => {

        const FCMtoken = await AsyncStorage.getItem('fcmToken');
        console.log("getting token --------", FCMtoken)
        this.setState({ fcm_token: FCMtoken })
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
          nav.navigate("welcome");
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
                    style={Styles.bgImgStyle}                    
                >
                   <ScrollView>
                    <View style={{borderWidth:0,marginBottom:20,marginTop:20}}>

                      <View style={Styles.headerView}>
                      <Image source={logo} style={Styles.headerLogo} />
                      <Text style={Styles.headerTxt}>Se connecter</Text>
                      </View>


                    <View style={Styles.subHeader}>
                    <Text style={Styles.txtStyle1}>Entrez vos données de connexion </Text>
                    <Text style={Styles.txtStyle1}>pour continuer.</Text>
                    </View>

                    <View style={Styles.textInputView}>  


                    <View>
                        <TextInput    
                                               
                          style={Styles.textInputField}
                          onChangeText={(email) => this.setState({ email })}
                          placeholder="Adresse email"
                        />
                    </View>

                    

                    <View>
                        <TextInput 
                           style={Styles.textInputField}
                           secureTextEntry={true}
                           onChangeText={(password) => this.setState({ password })}
                          placeholder="Mot de passe"
                        />
                    </View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("forgotpassword")}}>
                    <Text style={Styles.forgotPwd}>Mot de passe oublié?</Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate("questionresult")}}>
                    <Text style={Styles.forgotPwd}>question result</Text>
                    </TouchableOpacity> */}


                    </View> 

                    <View style={Styles.continueBtn}>
                        <TouchableOpacity
                           onPress={() => this.validateUser()}
                        // onPress={()=>{this.props.navigation.navigate('login')}}
                        >
                        <Text style={Styles.continueBtnTxt}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>  

                  {/* <View style={{flexDirection:'row',margin:0,alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("bankdetails")}}>
                    <Image source={facebook} style={Styles.socialLogo} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("googlelogin")}}>
                    <Image source={require("../../../assets/icon/google.png")} style={Styles.socialLogo} />
                    </TouchableOpacity>
                  </View> */}

                    <View  style={{flexDirection:'row',margin:3,alignSelf:'center',marginTop:30}}>
                    <Text style={Styles.txtStyle2}>Nouvel utilisateur ?</Text>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("singup")}}>
                      <Text style={Styles.txtStyle3}> S'inscrire</Text>
                      </TouchableOpacity>
                    </View>




                    </View>
                    </ScrollView>                
                    </ImageBackground>

            </View>
        )
    }
}