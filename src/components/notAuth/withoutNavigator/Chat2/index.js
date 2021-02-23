import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity,Modal,Dimensions, Alert,BackHandler,StatusBar,RefreshControl} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import AsyncStorage from '@react-native-community/async-storage';


import Styles from './indexCss';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';

import People from '../../../../assets/icon/25.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import {chat_usersFunction} from '../../../../Api/afterAuth'

import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      user_id:0,
      Model_Visibility: false,
      Alert_Visibility: false,

      Alert_Visibility2:false,
      chatUserData:[],

      isBodyLoaded: false,
      isSpinner: true,  
      isCurrenetComponentRefreshing:false
    };
  }


  componentDidMount = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    this.setState({user_id})
    // setInterval(() => {
    //   this.chat_usersFunction()
    // }, 100);    
    setTimeout(() => {
        this.chat_usersFunction()
    }, 700);
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );

  }



  
  chat_usersFunction = async () => {

    const chat_usersFunctionResponse = await chat_usersFunction();
    if (chat_usersFunctionResponse.result == true) {
      // console.log("getting result here --------", chat_usersFunctionResponse.response)
      if (chat_usersFunctionResponse.response.status == true) {           
          console.log("getting response >>>>>>>>>>>>>>>>",chat_usersFunctionResponse.response.user_list) 
          var chatUserData =       chat_usersFunctionResponse.response.user_list;

          this.setState({chatUserData,isSpinner:false,isBodyLoaded:true,isCurrenetComponentRefreshing:false})
      }
      else {
        Alert.alert("Message", chat_usersFunctionResponse.response.message)
      }
    } else {
      Alert.alert('Error', chat_usersFunctionResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };
  

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate('chat')
    
  }

  Show_Custom_Alert2(visible) {
    this.setState({Alert_Visibility2: visible});
    
  }
  Hide_Custom_Alert2() {
    this.setState({Alert_Visibility2: false,Alert_Visibility:false});

    this.props.navigation.navigate('teacherhistory')
    
  }
  Hide_Custom_Alert1(visible) {
    this.setState({Alert_Visibility2: visible});
    this.Show_Custom_Alert2()
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

    const newArray = [];
    this.state.chatUserData.forEach(obj => {
      if (!newArray.some(o => o.user_id === obj.user_id)) {
        newArray.push({ ...obj })
      }
 
    });

    console.log("getting chat user herer===========",newArray)




    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <View style={{flexDirection: 'column', alignSelf: 'center'}}>
            <Text style={Styles.headerTxt}>Chat</Text>
            <Text style={Styles.headerSubTxt}>
              Chat pendant la durée du coaching uniquement
            </Text>
          </View>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />

        <View style={Styles.mainContainer}>{
          this.state.isBodyLoaded == true ?


          <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.chat_usersFunction();
                      },100)  }} />
                    }>
          {
            newArray.length > 0 ?
            <Fragment>

        {
            newArray.map((singleChatData)=>{
              // console.log("geting teacher id here---------",singleChatData)
              return(
                <View>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("chat",{teacher_id:singleChatData.id})}}>
          <View style={Styles.mainContentContainer}>              
            <View style={{flexDirection: 'row', margin: 3}}>
              <Image
              
              source={{
                uri: `https://www.spyk.fr/${singleChatData.profile_url}`,
              }} 
              style={Styles.peopleStyle} />

              <View style={Styles.contentView}>
            <Text style={Styles.contentHeaderTxt}>{singleChatData.user_name}</Text>
                <Text style={Styles.contentsubHeaderTxt}>
                  {singleChatData.chat_date}
                </Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
                </View>
              )
            })
          }



            </Fragment>
            :
            <View style={{justifyContent:'center',alignItems:'center',}}>
              <Text style={{textAlign:'center',marginTop:200,fontSize:18,fontWeight:'700'}}>Record non trouvé!</Text>
            </View>
          }
         
        
        </ScrollView>




          :
          <View style={{justifyContent:'center',alignItems:'center',}}>
          <Text style={{textAlign:'center',marginTop:200,fontSize:18,fontWeight:'700'}}>chargement...</Text>
        </View>
        }
         








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
                backgroundColor: '#5541E1',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: SCREEN_HEIGHT / 2.7,
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
                      source={require("../../../../assets/icon/22.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: -10,
                      color: '#000000',
                      textAlign: 'center',                      
                    }}>
                 Fin de la session
                  </Text>
                </View>  
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Votre session est terminée.</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Hope you had fun  See you soon !</Text>
                  {/* <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>coaching d'anglais! Vous allez être</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>contacté(e) par votre coach.</Text>                   */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert1()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                   
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 7,
                        marginEnd: 7,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                    Augmenter le temps
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert1()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                   
                      height: 35,
                      borderRadius: 6,
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
                    Retour
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </Modal>









                  

          <Modal
            visible={this.state.Alert_Visibility2}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility2);
            }}>
            <View
              style={{
                // backgroundColor:'#FFF',
                backgroundColor: '#5541E1',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: SCREEN_HEIGHT / 2.7,
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
                      source={require("../../../../assets/icon/22.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: -10,
                      color: '#000000',
                      textAlign: 'center',                      
                    }}>
                 Augmenter le temps
                  </Text>
                </View>  
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:3,width:"90%",alignSelf:'center'}}>
                  
                  <TouchableOpacity style={{width:'40%',}}>
                    <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Tiré de.</Text>
                    <View style={{borderRadius:6,borderWidth:1,borderColor:"#DDDDDD",elevation:0,margin:4}}>
                      <Text style={{marginStart:20,marginEnd:20,fontSize:12,fontWeight:'700',color:"gray",margin:7,alignSelf:'center'}}> 14 H 30</Text>
                    </View>
                    </TouchableOpacity>

                    
                    <TouchableOpacity style={{width:"40%"}}>
                    <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>à</Text>
                    <View style={{borderRadius:6,borderWidth:1,borderColor:"#DDDDDD",elevation:0,margin:4}}>
                      <Text style={{marginStart:20,marginEnd:20,fontSize:12,fontWeight:'700',color:"gray",margin:7,alignSelf:'center'}}> 15 H 00</Text>
                    </View>
                    </TouchableOpacity>
                  
                  </View>
                  {/* <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Hope you had fun  See you soon !</Text> */}
                  
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert2()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                   
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 7,
                        marginEnd: 7,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                    Augmenter le temps
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert1()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                   
                      height: 35,
                      borderRadius: 6,
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
                    Retour
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </Modal>






        </View>
        <BottomNavigator
          currentRoute={'chat2'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

// 18.2.Chat
// Chat pendant la durée du coaching uniquement
// Hardley Smith
//
// John Smith
// Bonjour, Quand viendras-tu ?
