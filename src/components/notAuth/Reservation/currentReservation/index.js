import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  BackHandler,
  StatusBar,
  RefreshControl
} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png'

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';
import Spinner from 'react-native-loading-spinner-overlay';
import { current_reservation, cancel_reservation } from '../../../../Api/afterAuth'


import Stars from 'react-native-stars';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,

      Alert_Visibility1:false,
      Model_Visibility1:false,
      CurrrentData:[],

      isBodyLoaded:false,
      isSpinner:true,
      reservation_id: 0,
      isCurrenetComponentRefreshing:false
    };
  }

  Show_Custom_Alert(reservation_id, visible) {
    this.setState({Alert_Visibility: visible, reservation_id});
    console.log("getting reservation id here----------",reservation_id)
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.Fetchcancel_reservation();
  }


  Fetchcancel_reservation = async () => {
    const {reservation_id} = this.state;
    console.log(
      'inside the cancel api calling getting reservation -------------------',
      reservation_id,
    );
    const cancel_reservationResponse = await cancel_reservation({
      reservation_id,
    });
    if (cancel_reservationResponse.result === true) {
      this.current_reservationFunction();
      console.log(
        'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
        cancel_reservationResponse.response,
      );
    } else {
      this.myAlert('Error', cancel_reservationResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };




  Show_Custom_Alert2(visible) {
    console.log("geeting here- or not--------")
    this.setState({Alert_Visibility1: visible});
  }
  Hide_Custom_Alert3() {
    this.setState({Alert_Visibility1: false});
    this.props.navigation.navigate("booknowchoosetime")  
    
   
  }

  Hide_Custom_Alert2() {
    this.setState({Alert_Visibility1: false}); 
    this.props.navigation.navigate("choosetime")  
  }



  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate('choosetime')
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









  current_reservationFunction = async () => {
    const current_reservationResponse = await current_reservation();
    if (current_reservationResponse.result == true) {   
        
     var CurrrentData = current_reservationResponse.response.current_transaction
      console.log("getting CurrrentData Data = = =  = = =  =  =",CurrrentData) 
      
    }
    this.setState({CurrrentData,isBodyLoaded:true,isSpinner:false,isCurrenetComponentRefreshing:false});
  };









  


  async componentDidMount() {

    this.current_reservationFunction()

    console.log("i am on the current reservation page ==============")

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }


  checkreservation_id() {
    this.Show_Custom_Alert();
  }
  
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Réservations</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />





     




        <View style={Styles.subhaderView}>


        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("transaction")}}>
            <Text style={Styles.subheadingTxt}>En attente</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}}/>
            </TouchableOpacity>
          </View>


          <View style={{flexDirection: 'column'}}>
          <TouchableOpacity >
            <Text style={Styles.subheadingTxt1}>Réservations en cours</Text>
            <View style={{borderColor: '#b41565', borderWidth: 1, width: 146,marginStart:4}}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("history")}}>
            <Text style={Styles.subheadingTxt}>Historique</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}} />
            </TouchableOpacity>
          </View>         
        </View>
        <View style={Styles.mainContainer}>
          {
            this.state.isBodyLoaded == true ?
            <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.current_reservationFunction();
                      },100)  }} />
                    }>                      
                      {                        
                        this.state.CurrrentData.length  > 0 ?
                        <View style={Styles.contentView}>
                        <Fragment>
                      {
                      this.state.CurrrentData.map((singleCurrrentMap)=>{
                        console.log("checking date on current-------------",singleCurrrentMap)
                        return(
                          <Fragment>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("teacherhistory",{
                                teacher_id:singleCurrrentMap.teacher_id,
                                course_date:singleCurrrentMap.course_date,
                                course_time:singleCurrrentMap.course_time,
                                reservation_id:singleCurrrentMap.reservation_id,
                                ratingflag:true
                            })}}>
                      <View style={{flexDirection: 'row',borderWidth:1,borderColor:"#DDDDDD",margin:4,width:"100%",borderRadius:7}}>
                        <Image                         
                        source={{
                          uri: `https://www.spyk.fr/${singleCurrrentMap.teacher_profile_url}`,
                        }} 
                        style={Styles.peopleStyle} />
                        <View style={{flexDirection: 'column'}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              margin: 2,
                              marginTop: 10,
                            }}>
                          {singleCurrrentMap.teacher_name}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={books} style={Styles.bookStyle} />
                          <Text style={Styles.contentTextStyle}>Nombre de coaching faits: {singleCurrrentMap.teacher_course_session_done}</Text>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <Image source={watch} style={Styles.bookStyle} />
                            <Text style={Styles.contentTextStyle}>
                              {singleCurrrentMap.course_date} - { singleCurrrentMap.course_time}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{alignItems:'center'}}>
                                    <Stars
                                      default={singleCurrrentMap.teacher_rating}
                                      count={5}
                                      half={true}
                                      starSize={20}
                                      fullStar={<Image source={require("../../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                                      emptyStar={<Image source={require("../../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                                      halfStar={<Image source={require("../../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
                                    />
                                  </View>
                            <View style={Styles.continueBtn}>
                              {/* <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}> */}
                              <TouchableOpacity
                                onPress={() => {
                                  let reservation_id =
                                    singleCurrrentMap.reservation_id;
                                  console.log(
                                    'getting inside on Press============',
                                    reservation_id,
                                  );
                                  this.Show_Custom_Alert(reservation_id);
                                }}                               
                                >
                              <Text style={Styles.continueBtnTxt}>Annuler mon coaching</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                      </TouchableOpacity>
                        </Fragment>                        
                        )
                      })

                      }
                      
                        </Fragment>
                        </View>
                        :
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                          <Text style={{textAlign:'center',fontWeight:'700',fontSize:18}}></Text>
                        </View>
                      }



          </ScrollView>


            
            :
            <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
              <Text style={{textAlign:'center',fontWeight:'700',fontSize:18}}>chargement...</Text>
            </View>

          }
         
          {/* <View style={{position:"absolute",left:SCREEN_WIDTH*0.7,right:20,bottom:20}}>
            <TouchableOpacity onPress={()=>{this.Show_Custom_Alert2()}}>
            <Image source={require("../../../../assets/icon/add.png")} style={{height:60,width:60,margin:10}} />
            </TouchableOpacity>
          </View> */}
          
          <View style={{position:"absolute",alignSelf:"flex-end",right:20,bottom:-36}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("cancelreservation")}} style={{backgroundColor:"#b41565",borderRadius:10,justifyContent:"center",flexDirection:"row"}}>
            <Image source={require("../../../../assets/icon/calendar3.png")} style={{height:27,width:27,margin:10}} />
            <Text style={{fontSize:14,fontWeight:'700',color:"#FFFFFF",margin:10,marginStart:0,marginEnd:20,alignSelf:'center'}}>Réserver mon coaching</Text>
            </TouchableOpacity>
          </View>

         








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
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 245,
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
                      source={cross}
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
                    Annuler un coaching accepté
                  </Text>
                </View>  
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Etes-vous sûr de vouloir annuler le cours</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>prévu avec votre étudiant?</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Des pénalités peuvent s'appliquer.</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}> Voir CGV.</Text>
                  <Text style={{margin:2,fontSize:14,fontWeight:'700',color:"#b41565",alignSelf:'center'}}>Termes et conditions</Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    // onPress={() => this.Hide_Custom_Alert()}

                    onPress={() => {
                      let reservation_id = this.state.reservation_id;
                      console.log(
                        'getting inside on Press============',
                        reservation_id,
                      );

                      this.Hide_Custom_Alert();
                    }}
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
                    Annuler mon coaching
                    </Text>
                  </TouchableOpacity>
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
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                    Retour
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>







        </View>

        <BottomNavigator
          currentRoute={'transaction'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}


// Etes-vous sûr de vouloir annuler le cours prévu avec votre étudiant?
// 
//
// Termes et conditions
// 
// Retour