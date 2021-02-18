import React, {Component,Fragment} from 'react';
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
import Styles from './indexCss'
import logo from '../../../../assets/icon/96.png';

import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png'

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Stars from 'react-native-stars';
import Spinner from 'react-native-loading-spinner-overlay';

import { history_reservation } from '../../../../Api/afterAuth'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,

      Alert_Visibility1:false,
      Model_Visibility1:false,
      historyData:[],
      isBodyLoaded:false,
      isSpinner:true,
      isCurrenetComponentRefreshing:false
    };
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate("choosetime")
    
  }




  Show_Custom_Alert2(visible) {
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
    // this.props.navigation.navigate('clientinfo')
  }

















  history_reservationFunction = async () => {
    const history_reservationResponse = await history_reservation();
    if (history_reservationResponse.result == true) {   
        
     var historyData = history_reservationResponse.response.history_transaction
      console.log("getting history Data = = =  = = =  =  =",historyData) 
      
    }
    this.setState({historyData,isBodyLoaded:true,isSpinner:false,isCurrenetComponentRefreshing:false});
  };



  // count_dataFunction = async () => {
  //   const count_dataResponse = await count_data();
  //   if (count_dataResponse.result == true) {       
  //     countData = count_dataResponse.response.count_data
  //   }
  //   this.setState({countData,isBodyLoaded:true,isSpinner:false});
  //   // console.log("getting country response----------------",countryData.country_list)
  // };









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





  async componentDidMount() {

    this.history_reservationFunction()

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }



  
  render() {


console.log("insiderender =",this.state.historyData)

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
          <Text style={Styles.headerTxt}>Réservations</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />

        <View style={Styles.subhaderView}>
         


          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("transaction")}}>
            <Text style={Styles.subheadingTxt}>incomplet</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}}/>
            </TouchableOpacity>
          </View>


          <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("currentreservation")}}>
            <Text style={Styles.subheadingTxt}>Actuel</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity >
            <Text style={Styles.subheadingTxt1}>Historique</Text>
            <View style={{borderColor: '#b41565', borderWidth: 1, width: 100}} />
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
                        this.history_reservationFunction();
                      },100)  }} />
                    }>
        


        {
          

          this.state.historyData.length > 0 ?

  <View style={Styles.contentView}>
            <Fragment>
           {


            this.state.historyData.map((singleHistoryMap)=>{
              // console.log("kkkkkkkkkkkkkkkkkkkkkkkk",singleHistoryMap)
              return(
                <Fragment>
   <TouchableOpacity onPress={()=>{this.props.navigation.navigate("teacherhistory",{
  teacher_id:singleHistoryMap.teacher_id,
  course_date:singleHistoryMap.course_date,
  course_time:singleHistoryMap.course_time,
  teacher_name:singleHistoryMap.teacher_name,
  teacher_profile_url:singleHistoryMap.teacher_profile_url
   })}}>
            <View style={{flexDirection: 'row',borderWidth:1,margin:4,borderColor:"#DDDDDD",borderRadius:7}}>
           
              <Image 
              
              source={{
                uri: `https://www.spyk.fr/${singleHistoryMap.teacher_profile_url}`,
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
                {singleHistoryMap.teacher_name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image source={books} style={Styles.bookStyle} />
                <Text style={Styles.contentTextStyle}>Nimber de coaching faits: {singleHistoryMap.teacher_course_session_done}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Image source={watch} style={Styles.bookStyle} />
                  <Text style={Styles.contentTextStyle}>
                    {singleHistoryMap.course_date} - { singleHistoryMap.course_time}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                   <View style={{alignItems:'center'}}>
                                    <Stars
                                      default={singleHistoryMap.teacher_rating}
                                      count={5}
                                      half={true}
                                      starSize={20}
                                      fullStar={<Image source={require("../../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                                      emptyStar={<Image source={require("../../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                                      halfStar={<Image source={require("../../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
                                    />
                                  </View>
                  {/* <View style={Styles.continueBtn}>
                    <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                    <Text style={Styles.continueBtnTxt}>Annuler main coaching</Text>
                    </TouchableOpacity>
                  </View> */}
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

         

          <View style={{position:"absolute",alignSelf:"flex-end",right:20,bottom:20}}>
            <TouchableOpacity onPress={()=>{this.Show_Custom_Alert2()}} style={{backgroundColor:"#b41565",borderRadius:10,justifyContent:"center",flexDirection:"row"}}>
            <Image source={require("../../../../assets/icon/calendar3.jpg")} style={{height:27,width:27,margin:10}} />
            <Text style={{fontSize:14,fontWeight:'700',color:"#FFFFFF",margin:10,marginStart:0,marginEnd:20,alignSelf:'center'}}>Réserver mon coaching</Text>
            </TouchableOpacity>
          </View>
          




          {/* <Modal
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
                    onPress={() => this.Hide_Custom_Alert()}
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
          </Modal> */}






























          <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility1);
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
                      source={require("../../../../assets/icon/mobile.png")}
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
                    Reservation de man coaching d'anglais
                  </Text>
                </View>                  

                <View
                  style={{                                        
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert3()}
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
                        fontSize: 12,
                        marginStart: 7,
                        marginEnd: 7,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                     fair man coaching maintenant
                    </Text>
                  </TouchableOpacity>
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
                        fontSize: 12,
                        marginStart: 10,
                        marginEnd: 10,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Programmer man coaching pour plus tord
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