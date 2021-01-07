import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  Modal,
  BackHandler
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import DatePicker from 'react-native-datepicker';
import facebook from '../../../assets/icon/fb.png';
import {TextInput} from 'react-native-gesture-handler';
import downArrow from '../../../assets/icon/downArrow.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {createUser,getCountryList} from '../../../Api/auth'; 

const SCREEN_HEIGHT = Dimensions.get('window').height; 
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';


export default class index extends Component {


  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      instagram_username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      telephone_no: '',
      birth_date:  new Date(),
      address: '',
      postcode: '',
      city: '',
      country: '',
      confirm_password:"",
      device_token:'',
      countryData: [],
      Model_Visibility: false,
      Alert_Visibility: false,  
      checked1:false,      
    };
  }




componentDidMount = async () => {
  this.fetchCountryData()
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

  fetchCountryData = async () => {
    const GetCountryListResponse = await getCountryList();
    if (GetCountryListResponse.result == true) {
      var countryData = GetCountryListResponse.response.country_list;
      // console.log("getting country data----------",countryData)
    }
    this.setState({countryData});
    // console.log("getting country response----------------",countryData.country_list)
  };

  
  UserRegistrationFunction = async () => {
    this.setState({spinner: true});
    const {      
      first_name,
      last_name,
      email,
      password,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,      
    } = this.state;
    const createUserResponse = await createUser({      
      first_name,
      last_name,
      email,
      password,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,      
    });
    if (createUserResponse.result == true) {
      console.log('getting resu333333333lt here --------', createUserResponse.response);
      console.log(
        'getting result222222 here --------',
        createUserResponse.response.message,
      );    
      if(createUserResponse.response.status == true){
        console.log("getting inide5555555 response ---",createUserResponse.response.message)

        await AsyncStorage.setItem("user_id", JSON.stringify(createUserResponse.response.user_id));
        Alert.alert("Message",createUserResponse.response.message)
        this.props.navigation.navigate('question')
      }
      else{
        Alert.alert("Message",createUserResponse.response.message)
      }
    } else {
      this.myAlert('Error', createUserResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };






  validateUser = () => {
    const {      
      first_name,
      last_name,
      email,
      birth_date,
      telephone_no,
      address,
      postcode,
      password, 
      confirm_password,  
      city,
      country,        
    } = this.state;
     if (first_name.length === 0) {
      this.myAlert('Message', 'Veuillez saisir votre prénom!');
    } else if (last_name.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre nom de famille!');
    }
    else if (birth_date.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre date de naissance!');
    }
    else if (address.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre adresse!');
    }
    else if (postcode.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre code postal!');
    }
    else if (city.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre ville!');
    } else if (country.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre pays!');
    } 
     else if (telephone_no.length === 0) {
      this.myAlert('Message', 'Veuillez saisir votre numéro de téléphone!');
    } 
    else if (email.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
    }   
    else if (password.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre mot de passe!');
    }
    else if (confirm_password.length === 0 ) {
      this.myAlert('Message', 'Veuillez entrer votre mot de passe de confirmation!');
    }
    else if( password != confirm_password){
      this.myAlert("Message","Le mot de passe et le mot de passe de confirmation ne correspondent pas!")
    }
  
    else {
      // if(password != confirm_password){
      //   this.myAlert("Message","Password and Confirm Password are not matched")
      // }
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Courriel non valide!');
        return false;
      }  

      this.UserRegistrationFunction();
    }
  };






  Show_Custom_AlertForTime(visible) {
    this.setState({Model_Visibility: visible});
  }

  Hide_Custom_AlertForTime() {
    this.setState({Model_Visibility: false});
  }

  Show_Custom_Alert(visible) {
    if (this.state.country != 'Country') {
      this.setState({Alert_Visibility: visible});
    } else {
      Alert.alert('Warning', 'Veuillez sélectionner votre pays!');
    }
  }

  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
  }







  render() {
    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
             <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />
                <Text style={Styles.headerTxt}>S'inscrire</Text>
              </View>

              <View style={Styles.subHeader}>
                <Text style={Styles.txtStyle1}>Vous devez créer un compte</Text>
                <Text style={Styles.txtStyle1}>pour continuer.</Text>
              </View>

              <View style={Styles.textInputView}>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Nom"
                    onChangeText={(first_name) => this.setState({first_name})}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Prénom"
                    onChangeText={(last_name) => this.setState({last_name})}
                  />
                </View>

                <View   style={Styles.textInputField}>
                  {/* <TextInput
                    style={Styles.textInputField}
                    placeholder="  Date de naissance"
                    onChangeText={(birth_date) => this.setState({birth_date})}
                  /> */}
                  
                      <DatePicker
                        style={{width: SCREEN_WIDTH*0.70,}}
                        date={this.state.birth_date}
                        placeholder="Date of Birth"                    
                        format="DD-MM-YYYY"                   
                        maxDate={this.state.date}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          // iconSource={calenderIcon}
                          
                          customStyles={{
                            dateIcon: {
                              left: -25,
                              height:24,width:24
                            },
                            dateInput: {
                              marginLeft: -60,
                              borderColor: 'red',
                              borderWidth: 0,
                              marginRight: 90,
                            },          
                          }}
                          onDateChange={(birth_date) => {
                            this.setState({birth_date});
                          }}
                        />
                </View>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Adresse postale"
                    onChangeText={(address) => this.setState({address})}
                  />
                </View>
                <View>
                  <TextInput
                    keyboardType="number-pad"
                    style={Styles.textInputField}
                    placeholder="  Code postal"
                    onChangeText={(postcode) => this.setState({postcode})}
                  />
                </View>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Ville"
                    onChangeText={(city) => this.setState({city})}  
                  />
                </View>





{/* code for implementing country */}



                <View>
                  {/* <TextInput
                    style={Styles.textInputField}
                    placeholder="  Pays"
                    onChangeText={(country) => this.setState({country})}
                  /> */}



                  <TouchableOpacity
                    onPress={() => this.Show_Custom_AlertForTime()}>
                    <View
                      style={{
                        borderRadius: 10,
                        marginTop: 13,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                        width: '95%',
                        alignSelf:'center',
                        height: 45,
                      }}>
                          {
                            this.state.country == '' ?
                            <Text
                              style={{
                                color: 'gray',
                                paddingStart: 20,
                                padding:5,
                                fontWeight:'600',
                                fontSize: 15,
                                marginTop:6
                                                              

                              }}>                        
                            Pays
                            </Text>
                              :  <Text
                              style={{
                                color: 'gray',
                                paddingStart: 10,
                                fontWeight:'600',
                                fontSize: 16,
                                padding:5,
                                marginTop:6
                               
                               
      
                              }}>                            
                                {this.state.country}
                            </Text>
                          }
                      <Image
                        source={downArrow}
                        style={{
                          width: 18,
                          height: 18,
                          margin: 3,
                          marginEnd:5,
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    keyboardType="phone-pad"
                    placeholder="  Numéro de téléphone"
                    onChangeText={(telephone_no) => this.setState({telephone_no})}
                  />
                </View>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Email"
                    onChangeText={(email) => this.setState({email})}
                  />
                </View>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Mot de passe fort"
                    onChangeText={(password) => this.setState({password})}
                  />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" confirme Mot de passe fort"
                    onChangeText={(confirm_password) => this.setState({confirm_password})}
                  />
                </View>

                {/* <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="  Confirmation de mot de passe"
                  />
                </View> */}
              </View>
              <View style={Styles.continueBtn}>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.props.navigation.navigate('question');
                  // }}
                  onPress={()=>{this.validateUser()}}
                  >
                  <Text style={Styles.continueBtnTxt}>S'inscrire</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{flexDirection: 'row', margin: 3, alignSelf: 'center'}}>
                <Text style={Styles.txtStyle2}>Déjà utilisateur ?</Text>
                <TouchableOpacity                  
                  onPress={() => {
                    this.props.navigation.navigate('login');
                  }}
                  >
                  <Text style={Styles.txtStyle3}>Se connecter </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          </KeyboardAwareScrollView>






          <Modal
              visible={this.state.Model_Visibility}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => {
                this.Show_Custom_AlertForTime(!this.state.Model_Visibility);
              }}>
              <View
                style={{
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  backfaceVisibility: 'hidden',
                  flex: 1,
                  right: 20,
                  left: 10,

                  // left: Dimensions.get('window').width*1.60,
                  top: 350,
                  bottom: 20,
                }}>
                <View
                  style={{
                    width: '80%',
                    height: SCREEN_HEIGHT /2.6,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf:'center',
                    margin: 10,

                  }}>
                  <ScrollView
                    style={{
                      flex: 2,
                      width: '100%',
                      borderColor: 'red',
                      borderWidth: 0,
                    }}
                    showsVerticalScrollIndicator={false}>
                    {this.state.countryData.map((singleCountry, index) => {
                      return (
                        <View key={index} style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                {country: `${singleCountry.country_name}`},
                                () => this.Hide_Custom_AlertForTime(),
                              );
                            }}>
                            <View
                              style={{
                                height: 30,

                                // borderColor: '#b48484',
                                // borderWidth: 0,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                elevation: 1,
                                margin: 5,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: '#000000',
                                  fontSize: 14,                                  
                                  textAlign: 'center',
                                }}>{`${singleCountry.country_name}`}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Modal>








        </ImageBackground>
      </View>
    );
  }
}
