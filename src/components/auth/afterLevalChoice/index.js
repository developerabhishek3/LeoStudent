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
  BackHandler,
  Modal
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {RadioButton} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';

import {get_all_levelsFunction,update_levelFunction} from '../../../Api/afterAuth'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      levelData:[],  
      level_id:[],
      
      isBodyLoaded: false,
      isSpinner: true,  
      Model_Visibility: false,
      Alert_Visibility: false,
      alertValue:"",
    };
  }





  userupdateLevel = async () => {
    console.log("getting inside the function level_id --------",this.state.level_id)     
    const {
   level_id
    } = this.state;
    const updateStudentLevelResponse = await update_levelFunction({
   level_id
    });
    if (updateStudentLevelResponse.result === true) {
      // console.log("getting result here --------", updateStudentLevelResponse.response)     
        await AsyncStorage.setItem("level_id", JSON.stringify(level_id)); 
        this.props.navigation.navigate('home')           
    } else {
      this.myAlert('Error', updateStudentLevelResponse.error);    
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };




validateFunction(){
  let alertValue;
  const {checked,level_id} =  this.state;
  console.log("getting checked value -------------", checked)
  if(checked < 0 || checked == undefined || checked == null){
    alertValue = "Veuillez sélectionner votre niveau!"
    this.setState({alertValue})
    this.Show_Custom_Alert()
    // Alert.alert("Message", "Veuillez sélectionner votre niveau!")
  }
  else{
    this.userupdateLevel()
  }
}



  componentDidMount = async () => {

    let levelId = await AsyncStorage.getItem('level_id');
    let level_id = JSON.parse(levelId);

    console.log("getting level id here----------",level_id)
    
 
    this.fetchLevelData()

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchLevelData = async () => {
      const GetSupportResponse = await get_all_levelsFunction();
      if (GetSupportResponse.result == true) {
        var levelData = GetSupportResponse.response.levels;
        console.log("getting levelData data----------",levelData)
      }
      this.setState({levelData,isBodyLoaded:true,isSpinner:false});
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
  

    Show_Custom_Alert(visible,) {
      this.setState({Alert_Visibility: visible});
    }
    Hide_Custom_Alert() {
      this.setState({Alert_Visibility: false}); 
      // this.props.navigation.navigate("login")    
    }

  render() {

const {level_id} = this.state;

    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>

          <Spinner visible={this.state.isSpinner} />
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                
              <Image source={logo} style={Styles.headerLogo} />
                <View style={{marginEnd: 50, marginTop: -10}}>
                  <Text style={Styles.headerTxt}>    Choisir son</Text>
                  <Text style={Styles.headerTxt1}>niveau</Text>
                </View>
              </View>

              <View style={{marginTop: 50}}>
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>Précisez votre niveau d'anglais</Text>
                </View>
                
                              
                <View style={Styles.radiobtnMainView}>
                <View>
                        {
                          this.state.isBodyLoaded == true ?

                            this.state.levelData.map((singleMap,key)=>{
                              
                                return(
                                    <View>
                                        {
                                            this.state.checked == key ? 
                                            <TouchableOpacity onPress={()=>{this.setState({checked:key,level_id:singleMap.id})}} style={{flexDirection:'row',alignItems:'center',margin:10,flexWrap:'wrap'}}>
                                                <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                                <Text style={{color:"lightgreen",fontWeight:"700"}}>{singleMap.level_fr}</Text>
                                                <Text style={{color:"gray",alignSelf:"flex-start",borderWidth:0,borderColor:"red",fontSize:12,marginStart:24}}>{singleMap.description}</Text>
                                            </TouchableOpacity>

                                            :
                                            <TouchableOpacity onPress={()=>{this.setState({checked:key,level_id:singleMap.id})}} style={{flexDirection:'row',alignItems:'center',margin:10,borderWidth:0,flexWrap:"wrap"}}>
                                                <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                                <Text style={{color:"gray"}}>{singleMap.level_fr}</Text>
                                                <Text style={{color:"gray",alignSelf:"flex-start",borderWidth:0,borderColor:"red",fontSize:12,marginStart:24}}>{singleMap.description}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })

                            :null
                        }
                    </View>
                
                </View>


                <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   this.props.navigation.navigate('studentstest');
                    // }}
                    onPress={()=>{this.validateFunction()}}
                    >
                    <Text style={Styles.continueBtnTxt}>continuer</Text>
                  </TouchableOpacity>
                </View>







              
              </View>
            </View>
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
