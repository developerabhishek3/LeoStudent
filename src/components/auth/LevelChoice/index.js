import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  BackHandler
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import {get_all_levelsFunction} from '../../../Api/afterAuth'
import {loginUser} from '../../../Api/auth'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      value: 'second',
      value: 'third', 
      levelData:[],   
    };
  }




  userLoginFunction = async () => {
    const FCMtoken = await AsyncStorage.getItem('fcmToken');
    let email =  this.props.navigation.getParam("email")
    let password = this.props.navigation.getParam("password")
    console.log("getting inside the function uuid --------",FCMtoken,email,password)

    const loginUserResponse = await loginUser({ 
      email:email,
      password:password,
      fcm_token:FCMtoken
    });
    if (loginUserResponse.result == true) {
      console.log("getting result here --------", loginUserResponse.response)

      // console.log("getting result here --------", loginUserResponse.response.user_info.level_id)
        
        // this.props.navigation.navigate("home") // after imlementing API need to follow bottom login................

      if (loginUserResponse.response.status == true) {   
        
        await AsyncStorage.setItem("userLoggedIn", "true");
        await AsyncStorage.setItem("userLoggedInData", JSON.stringify(loginUserResponse.response));

        await AsyncStorage.setItem("token", JSON.stringify(loginUserResponse.response.token));
        // await AsyncStorage.setItem("user_id", JSON.stringify(loginUserResponse.response.user_id));

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


  componentDidMount = async () => {
    this.fetchLevelData()

    setTimeout(() => {
      this.userLoginFunction()
    }, 3000);
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchLevelData = async () => {
      const GetSupportResponse = await get_all_levelsFunction();
      if (GetSupportResponse.result == true) {
        var levelData = GetSupportResponse.response.contact_info;
        console.log("getting levelData data----------",levelData)
      }
      this.setState({levelData});
      
      // console.log("getting country response----------------",countryData.country_list)
    };
  
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
                <View style={{marginEnd: 50, marginTop: -10}}>
                  {/* <Text style={Styles.headerTxt}>Votre niveau</Text> */}
                  <Text style={Styles.headerTxt1}>Votre niveau</Text>
                </View>
              </View>

              <View style={{marginTop: 30}}>
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>Choisissez votre niveau ou faites le test</Text>
                </View>

                <View style={Styles.radiobtnMainView}>
                
                </View>          
              <View style={{marginTop:60}}>
                <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('afterlevelchoice');
                    }}>
                    <Text style={Styles.continueBtnTxt}>Choisir un niveau</Text>
                  </TouchableOpacity>
                </View>

                  <Text style={{fontSize:14,fontWeight:'700',color:"gray",alignSelf:'center',margin:20}}>ou</Text>

                <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('studentstest');
                    }}>
                    <Text style={Styles.continueBtnTxt}>Faire le test</Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
