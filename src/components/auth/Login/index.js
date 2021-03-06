import React, { Component } from 'react'
import { View,Text, ImageBackground,Image,TouchableOpacity,ScrollView,Modal, StatusBar,Alert,BackHandler } from 'react-native'
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
          showPassword: true,  
          userDetais: [],
          Model_Visibility: false,
          Alert_Visibility: false,
          alertValue:"",
        };
        this.toggleSwitch = this.toggleSwitch.bind(this);
      }


      toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
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
        console.log("inside the validate function - - - -  - -")
        let alertValue;
        const { email, password } = this.state;
    
        if (email.length === 0) {
          // this.myAlert('Message', '');
          alertValue = "Veuillez entrer votre adresse électronique!"
          this.setState({alertValue})
          this.Show_Custom_Alert()
        } else if (password.length === 0) {
          alertValue = "Veuillez entrer votre mot de passe!"
          this.setState({alertValue})
          this.Show_Custom_Alert()
          // this.myAlert('Message', '');
        } else {
          const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!email.match(mailformat)) {
            alertValue = "Email-Id invalide!"
            this.setState({alertValue})
            this.Show_Custom_Alert()
            // this.myAlert('Message', 'Email-Id invalide!');

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
  
        Show_Custom_Alert(visible,) {
          this.setState({Alert_Visibility: visible});
        }
        Hide_Custom_Alert() {
          this.setState({Alert_Visibility: false}); 
          // this.props.navigation.navigate("login")    
        }



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
                      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={60} extraScrollHeight={60} showsVerticalScrollIndicator={false}>
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
                          value={this.state.email}
                          onChangeText={(email) => this.setState({ email })}
                          placeholder="Adresse email"
                          placeholderTextColor="gray"
                          placeholderStyle={{ fontWeight:"700",}}
                        />
                    </View>

                    

                    {/* <TextInput 
                  secureTextEntry={this.state.password.length > 0 ? true : false }
                  style={{fontFamily: this.state.password ? 'OpenSans-Regular' : 'OpenSans-Italic',  borderColor: '#DDDDDD',color:"gray",borderWidth:1,borderRadius:10,margin:10,paddingStart:10}}
                  placeholder="Mot de passe"
                  value={this.state.password}     
                  onChangeText={(password) => this.setState({ password })}           
                /> */}

                  <View style={{flexDirection:'row', borderWidth: 1,
                          borderColor: '#DDDDDD',
                          borderRadius: 10,
                          justifyContent:'space-between',
                          margin: 10,
                }}>
                      <TextInput 
                        // secureTextEntry={this.state.password.length > 0 ? true : false }
                        secureTextEntry={this.state.showPassword && this.state.password.length > 0 ? true:false}
                        // style={{fontFamily: this.state.password ? 'OpenSans-Regular' : 'OpenSans-Italic',  borderColor: '#DDDDDD',color:"gray",borderWidth:1,borderRadius:10,margin:10,paddingStart:10}}
                        placeholder="Mot de passe"
                        placeholderTextColor="gray"
                        placeholderStyle={{ fontWeight:"700", }}
                        style={{paddingStart:10,fontFamily: this.state.password ? 'OpenSans-Regular' : 'OpenSans-Regular', borderWidth:0,width:"85%",color:"gray"}}
                        value={this.state.password}     
                        onChangeText={(password) => this.setState({ password })}           
                      />
                      <TouchableOpacity  
                        onPress={this.toggleSwitch}            
                        value={!this.state.showPassword}>
                          {
                            this.state.showPassword == true ?
                            <Image source={require("../../../assets/icon/invisible-1.png")} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                            :
                            <Image source={require("../../../assets/icon/eyeopen-1.png")} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                          }                      
                      </TouchableOpacity>
                    </View>


                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("forgotpassword")}}>
                    <Text style={Styles.forgotPwd}>Mot de passe oublié?</Text>
                    </TouchableOpacity>
 
                    </View> 

                    <View style={Styles.continueBtn}>
                        <TouchableOpacity
                           onPress={() => this.validateUser()}
                        // onPress={()=>{this.props.navigation.navigate('login')}}
                        >
                        <Text style={Styles.continueBtnTxt}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>  

                    <View  style={{flexDirection:'row',margin:3,alignSelf:'center',marginTop:30}}>
                    <Text style={Styles.txtStyle2}>Nouvel utilisateur ?</Text>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("singup")}}>
                      <Text style={Styles.txtStyle3}> S'inscrire</Text>
                      </TouchableOpacity>
                    </View>




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
                      fontSize: 16,
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
        )
    }
}
