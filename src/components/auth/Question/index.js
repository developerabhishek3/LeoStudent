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

import {add_update_academic_info} from '../../../Api/afterAuth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      value: 'second',
      value: 'third',
      value: 'fourth',
      value: 'fifth',
      value: 'angleG',
      value: 'angleP',
      value: 'lesD',
      Model_Visibility: false,
      Alert_Visibility: false,

      alertValue:"",

      value:"Oui",       
      value:"Non",
      value:"Oui1",       
      value:"Non1" ,
      data1:[
        {"id": "1",
        "value":"BAC"
          },
          {"id": "2",
          "value":"Bac + 2"
          },
          {"id": "3",
          "value":"Bachelor"
          },
          {"id": "4",
          "value":"Master"
          },
          {"id": "5",
          "value":"Doctorat"
          }, 
          {"id": "6",
          "value":"Sans diplôme"
          }, 
          {"id": "5",
          "value":"Autre"
          },      
      ],


      data2:[
        {"id": "1",
        "value":"Voyage"
          },
          {"id": "2",
          "value":"Besoin professionnel"
          },
          {"id": "3",
          "value":"Les deux"
          },              
      ],

      // data3:[
      //   {"id": "1",
      //   "value":"Qui"
      //     },
      //     {"id": "2",
      //     "value":"Non"
      //     },            
      // ],


      // data4:[
      //   {"id": "1",
      //   "value":"Qui"
      //     },
      //     {"id": "2",
      //     "value":"Non"
      //     },            
      // ],





      q_1_ans:"",
      q_2_ans:"",
      q_3_ans:"",
      q_4_ans:"",
      q_5_ans:"",
      q_6_ans:"",
    };
  }


  componentDidMount = async () => {

    let email =  this.props.navigation.getParam("email")
    let password = this.props.navigation.getParam("password")

    console.log("getting on the qustion screens - --- - - -  -,",email,password)



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


  add_update_academic_infoFunction = async () => {

    let email =  this.props.navigation.getParam("email")
    let password = this.props.navigation.getParam("password")
    console.log("getting inside the function uuid --------",this.state.fcm_token)
    const {
      q_1_ans,
      q_2_ans,
      q_3_ans,
      q_4_ans,
      q_5_ans,
      q_6_ans,
    } = this.state;
    const add_update_academic_infoResponse = await add_update_academic_info({
      q_1_ans,
      q_2_ans,
      q_3_ans,
      q_4_ans,
      q_5_ans,
      q_6_ans, 
    });
    if (add_update_academic_infoResponse.result == true) {
      console.log("getting result here --------", add_update_academic_infoResponse.response)
     
      if (add_update_academic_infoResponse.response.status === true) {           
          console.log("getting response >>>>>>>>>>>>>>>>",add_update_academic_infoResponse.response)      
          this.props.navigation.navigate('levelchoice',{
            email:email,
            password: password
          })
          // Alert.alert("Message", add_update_academic_infoResponse.response.message)
      }
      else {
        Alert.alert("Message", add_update_academic_infoResponse.response.message)
      }
    } else {
      this.myAlert('Error', add_update_academic_infoResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    let alertValue;
    const {  q_1_ans,
      q_2_ans,
      q_3_ans,
      q_4_ans,
      q_5_ans,
       } = this.state;

    if (q_1_ans.length === 0) {
      alertValue = "Veuillez choisir une réponse!"
      this.setState({alertValue})
      this.Show_Custom_Alert()


      // this.myAlert('Message', 'Veuillez choisir une réponse!');
    } 
    else if (q_2_ans.length === 0) {
      alertValue = "Veuillez saisir la réponse!"
      this.setState({alertValue})
      this.Show_Custom_Alert()

        // this.myAlert('Message', 'Veuillez saisir la réponse!');
    }
    // else if (q_3_ans.length === 0) {
    //     this.myAlert('Message', 'Veuillez saisir la réponse!');
    // } 
    else if (q_4_ans.length === 0) {
      alertValue = "Veuillez saisir la réponse!"
      this.setState({alertValue})
      this.Show_Custom_Alert()
      // this.myAlert('Message', 'Veuillez saisir la réponse!');
  } 
  else if (q_5_ans.length === 0) {
    alertValue = "Veuillez choisir une réponse!"
    this.setState({alertValue})
    this.Show_Custom_Alert()
    // this.myAlert('Message', 'Veuillez choisir une réponse!');
  } 
  // else if (q_6_ans.length === 0) {
  //   this.myAlert('Message', 'Veuillez choisir une réponse! 6!');
  // } 
    else {  
      this.add_update_academic_infoFunction();
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
          style={Styles.bgImgStyle}>
              <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={60} extraScrollHeight={60} showsVerticalScrollIndicator={false}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />
                <View style={{marginEnd: 50, marginTop: -10}}>
                  <Text style={Styles.headerTxt}>A propos</Text>
                  <Text style={Styles.headerTxt1}>      de vous</Text>
                </View>
              </View>

              <View style={{marginTop: 30}}>
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>Niveau d'études</Text>
                </View>

                <View style={Styles.radiobtnMainView}>
                  {
                    this.state.data1.map((singleMAp,key)=>{
                      return(
                        <View style={{borderWidth:0,width:"25%",margin:2,marginStart:10}}>                           
                                  {
                                      this.state.q_1_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_1_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"lightgreen",fontWeight:'700'}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_1_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }
                                 
                        </View>
                      )
                    })
                  }
                </View>


                <View style={{borderWidth:1,borderColor:"#DDDDDD",width:"90%",height:40,alignSelf:'center',margin:7,borderRadius:10}}>
                  <TextInput 
                      placeholder="Profession"
                      placeholderTextColor="gray"
                      style={{paddingStart:15}}
                      onChangeText={(q_2_ans)=>this.setState({q_2_ans })}
                  />
                </View>





            <View style={{borderWidth:1,borderColor:'#DDDDDD',flexWrap:'wrap',width:'90%',borderRadius:10,alignSelf:'center',margin:10,flexDirection:'column'}}>                
                <View style={{flexDirection:'column',}}>
                  <Text style={{flexDirection:'column',flexWrap:'wrap',alignSelf:'flex-start',margin:10,color:"gray"}}>Vos centres d'intérêts (voyages, cinéma, lecture, cuisine, etc.)</Text>
                <TextInput 
                numberOfLines={3}
                onChangeText={(q_4_ans)=>this.setState({q_4_ans })}
                style={Styles.textInputField}
                />
                </View>
            </View>

                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>
                  Votre besoin en anglais :
                  </Text>
                </View>

                <View style={Styles.radiobtnMainView}>
                  {
                    this.state.data2.map((singleMAp,key)=>{
                      return(
                        <View style={{borderWidth:0,width:"40%",margin:2,marginStart:10}}> 
                           
                                  {
                                      this.state.q_5_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_5_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"lightgreen",fontWeight:'700'}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_5_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }                                 
                        </View>
                      )
                    })
                  }
                </View>
{/* 
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>
                    Devenez coach d'anglais LEO aujourd'hui et gagnez un revenu
                    depuis chez vous avec des horaires que vous choisissez !
                  </Text>
                </View> */}


                {/* <View style={{borderWidth:1,borderColor:'#DDDDDD',flexWrap:'wrap',width:'90%',borderRadius:10,alignSelf:'center',margin:10,flexDirection:'column'}}>
                
                    <View style={{flexDirection:'column',}}>
                      <Text style={{flexDirection:'column',flexWrap:'wrap',alignSelf:'flex-start',margin:10,color:"gray"}}>Pourquoi voulez-vous devenir un coach d'anglais sur l'application LEO ?</Text>
                     <TextInput 
                     style={Styles.textInputField}
                     numberOfLines={3}
                     onChangeText={(q_3_ans)=>this.setState({q_3_ans })}
                     />
                    </View>

                </View> */}



                {/* <View style={{borderWidth:1,borderColor:'#DDDDDD',flexWrap:'wrap',width:'90%',borderRadius:10,alignSelf:'center',margin:10,flexDirection:'column'}}>
                
                    <View style={{flexDirection:'column',}}>
                      <Text style={{flexDirection:'column',flexWrap:'wrap',alignSelf:'flex-start',margin:10,color:"gray"}}>Qu'est-ce qui fait de vous un bon candidat au poste de coach d'anglais ?</Text>
                    <TextInput 
                    numberOfLines={3}
                    onChangeText={(q_4_ans)=>this.setState({q_4_ans })}
                    style={Styles.textInputField}
                    />
                    </View>


                </View> */}







                {/* <View style={Styles.radiobtnMainView}>
                {
                    this.state.data3.map((singleMAp,key)=>{
                      return(
                        <View style={{borderWidth:0,width:"25%",margin:2,marginStart:10}}> 
                           
                                  {
                                      this.state.q_5_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_5_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"lightgreen"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_5_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }
                                 
                        </View>
                      )
                    })
                  }
                </View> */}

              


                <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   this.props.navigation.navigate('levelchoice');
                    // }}
                    onPress={()=>{this.validateUser()}}
                    >
                    <Text style={Styles.continueBtnTxt}>Valider</Text>
                  </TouchableOpacity>
                </View>
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
    );
  }
}
