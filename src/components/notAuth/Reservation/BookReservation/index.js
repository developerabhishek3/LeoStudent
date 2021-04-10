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
  Alert,
  StatusBar,
  Linking
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

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {teacher_info_for_reservation,get_waiting_time,reservation_request} from '../../../../Api/afterAuth'

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import chatImg from '../../../../assets/icon/11.png'

import CountDown from 'react-native-countdown-component';

import moment from 'moment';

import Stars from 'react-native-stars';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,

      isSpinner: true,  
      isBodyLoaded: true,  
      TeacherDetails:[],
      teacher_id:0,
      date_slot:'',
      time_slot:'',

      totalDuration:0,
      waiting_time:0,

      waiting_time_key:false,
      isButtonEnable:true
    };
  }




  fetchget_waiting_time = async () => {
    // console.log(
    //   'getting inside the function level_id --------',
    //   this.state.level_id,
    // );
    const get_waiting_timeResponse = await get_waiting_time(
      {},
    );
    if (get_waiting_timeResponse.result === true) {
      // console.log("getting result here --------", get_waiting_timeResponse.response)
      var waiting_time = get_waiting_timeResponse.response.waiting_time
      this.setState({waiting_time})
  
    } else {
      this.myAlert('Error', get_waiting_timeResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };












  teacher_info_for_reservationFunction = async () => {
    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)
    const {teacher_id,date_slot,time_slot} = this.state;
    const teacher_info_for_reservationResponse = await teacher_info_for_reservation({
      teacher_id,
      date_slot,
      time_slot
    });
    if (teacher_info_for_reservationResponse.result == true) {
      if(teacher_info_for_reservationResponse.response.status == true){
        // console.log("getting response here================",teacher_info_for_reservationResponse.response)
        var TeacherDetails =
          teacher_info_for_reservationResponse.response.teacher_data;
        // console.log("getting TeacherDetails data----------",TeacherDetails)
        this.setState({TeacherDetails,isBodyLoaded:true,isSpinner:false});
      }
      else{
        this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
          Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
              this.props.navigation.goBack();
          }}]);
      })
      }
     
    }
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }
 
  };



















  reservation_requestFunction = async () => {

    console.log("treansion id on the Bookreservation++++++++++++++",this.props.navigation.getParam("transactinId"))
    let transactinId = this.props.navigation.getParam("transactinId")



    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)
    const {teacher_id,} = this.state;
    const reservation_requestResponse = await reservation_request({
      teacher_id,
      transaction_id:transactinId
    });
    if (reservation_requestResponse.result == true) {
      if(reservation_requestResponse.response.status == true){
        console.log("getting response here after posting ================",reservation_requestResponse.response)
        // Alert.alert("Message",reservation_requestResponse.response.message)
        var waiting_time = reservation_requestResponse.response.waiting_time

        this.setState({waiting_time,waiting_time_key:true,isButtonEnable:false})

        this.teacher_info_for_reservationFunction()
        
        
      }
      else{
        this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
          Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
              this.props.navigation.goBack();
          }}]);
      })
      }
     
    }
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }
 
  };













  componentDidMount = async () => {

    let transactinId = this.props.navigation.getParam("transactinId")
    console.log("getting transaction id on the did mount---------",transactinId)

    // console.log("treansion id on the Bookreservation++++++++++++++",this.props.navigation.getParam("transactinId"))
      // let teacher_id = this.props.navigation.getParam("teacher_id")
      // this.fetchget_waiting_time()
      
      // console.log("i am on the book reservation ===============>>>>>>>>>>>>>>>>>>")

    let time_slot = this.props.navigation.getParam("time_slot")
    let reserve_date = this.props.navigation.getParam("reserve_date")

    // console.log("getting inside the function date_slot time_slot " ,time_slot,                reserve_date)

      // let teacherId =  await AsyncStorage.getItem("teacher_id")
       let  teacher_id = this.props.navigation.getParam("teacher_id")
    
      setTimeout(() => {
        this.setState({teacher_id,date_slot:reserve_date,time_slot:time_slot})
        // console.log("geting teacher id ----------",teacher_id)
      }, 100);


          // setTimeout(() => {
          
          // }, 700);      
          setInterval(() => {
            this.teacher_info_for_reservationFunction()
          }, 1000);
          // setInterval(() => {
           

          //   console.log("getting waiting time--------",this.state.waiting_time)
          // }, 4000);
            
    // this.fetchLevelData()
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
    

















getTimeDurationFunction(){
  let date = 
      moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD hh:mm:ss');
    
    // Getting the current date-time
    // You can set your own date-time
    let expirydate = '2020-12-30 04:00:45';
    
    let diffr = 
      moment
        .duration(moment(expirydate)
        .diff(moment(date)));
    // Difference of the expiry date-time
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());

    // Converting in seconds
    var d = hours * 60 * 60 + minutes * 60 + seconds;

    // Settign up the duration of countdown
    // setTotalDuration(d);
    this.setState({d})
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




  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('teacherinfo')
    
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('clientinfo')
  }
  render() {

const {TeacherDetails} = this.state;

// console.log("getting result -             -  - -  -",TeacherDetails)




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
          <Text style={Styles.headerTxt}>Voir le profil du coach d'anglais</Text>

                  {/* {
                    TeacherDetails.length > 0 ?
                    <Fragment>

                  {
                            TeacherDetails.map((sinledetailsMap)=>{                              
                              return(
                                <Fragment>
                                  {
                                    sinledetailsMap.reservation_status == `Accepted` ?
                                    <TouchableOpacity 
                                    onPress={()=>{this.props.navigation.navigate("chat",{teacher_id:sinledetailsMap.teacher_id})}}
                                  >
                                        <Image source={chatImg} style={Styles.headertxtInputImg} />
                                  </TouchableOpacity>
                                    :null
                                  }                                  
                                </Fragment>
                              )
                            })
                          }
                          

                    </Fragment>

                    :null
                  }
                         */}
                        




          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />
        {/* <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt1}>Historique</Text>
            <View style={{borderColor: '#b41565', borderWidth: 1, width: 100}} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("currentreservation")}}>
            <Text style={Styles.subheadingTxt}>Actual</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}}/>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={Styles.mainContainer}>
          <ScrollView>
            {
              this.state.isBodyLoaded == true ?
              <Fragment>
                {
                  this.state.TeacherDetails .length > 0  ?
                                     
              TeacherDetails.map((singleTeacherDetails)=>{
                return(
                    <Fragment>
<View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={{
                              uri: `https://www.spyk.fr/${singleTeacherDetails.teacher_profile_url}`,
                            }}  style={Styles.peopleStyle} />
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection:'row'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginTop: 10,
                    }}>
                      
                   {singleTeacherDetails.teacher_name}
                  </Text>
                    {
                      singleTeacherDetails.online_offline == `online` ?
                      <View style={{backgroundColor:"green",width:15,height:15,borderRadius:10,borderWidth:0,margin:13}} />
                      :null
                    }                 
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={books} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>Nombre d'évaluations  : {singleTeacherDetails.teacher_course_session_done} </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image source={watch} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>
                    {singleTeacherDetails.course_date}  - {singleTeacherDetails.course_time}
                    </Text>
                  </View>

                  <View style={{alignItems:'flex-start',margin:3,marginStart:7}}>
                      <Stars
                        default={singleTeacherDetails.teacher_rating}
                        count={5}
                        half={true}
                        starSize={16}
                        fullStar={<Image source={require("../../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                        emptyStar={<Image source={require("../../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                        halfStar={<Image source={require("../../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
                      />
                    </View>
                </View>                
              </View>
            </View>




            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
     
                <View style={{flexDirection: 'column'}}>                
                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Profil du coach d'anglais : </Text>
                <Text style={Styles.contentTextStyle}>coach natif</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Compétences : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_language_skill}</Text>
                  </View>

                  {/* <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Diplôme : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_diploma}</Text>
                  </View>                */}
                </View>                
              </View>
            </View>




            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
              
                <View style={{flexDirection: 'column'}}>                
                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>À propos de </Text>               
                  </View>
                  <View style={{flexDirection: 'row',margin:4}}>                  
                <Text style={Styles.contentTextStyle2}>{singleTeacherDetails.about_us}</Text>
                  </View>
                </View>                
              </View>
            </View>




                    {
                      this.state.waiting_time_key == true ?

                      <View style={{marginTop:30}}>
                         {
                           this.state.waiting_time != `0` ?

                           <View>
                             {
                               singleTeacherDetails.reservation_status != `Accepted` ?
                                <CountDown
                                size={18}
                                until={this.state.waiting_time}
                                onFinish={() => this.setState({waiting_time:0,isButtonEnable:true})}
                                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#b41565',}}
                                digitTxtStyle={{color: '#b41565'}}
                                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                                separatorStyle={{color: '#b41565'}}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{m: null, s: null}}
                                showSeparator
                              />
                              :null
                             }
                            </View>

                         
                           :null
                         }

                      </View>



                      : null
                    }

           
            



{/* <CountDown
          until={this.state.totalDuration}
          //duration of countdown in seconds
          timetoShow={('H', 'M', 'S')}
          //formate to show
          onFinish={() => alert('finished')}
          //on Finish call
          onPress={() => alert('hello')}
          //on Press call
          size={20}
        /> */}
                  {
                    singleTeacherDetails.reservation_status == `Accepted` ?

                    <View style={Styles.continueBtn}>
                        <TouchableOpacity 
                        onPress={()=>{this.Show_Custom_Alert()}}
                        // onPress={()=>{
                        //   Linking.openURL(`tel:${9999999999}`)
                        // }}

                        >
                        <View style={{flexDirection:'row'}}>
                          <Image source={require('../../../../assets/icon/call.png')}  style={{height:20,width:20,margin:10}} />
                        <Text style={Styles.continueBtnTxt}>Appeler le client pour démarrer le coaching</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                      {
                        this.state.isButtonEnable  == true ?

                        <View style={Styles.continueBtn}>
                        
                        <TouchableOpacity 
                        // onPress={()=>{this.props.navigation.navigate("chat2")}}
                            onPress={()=>{this.reservation_requestFunction()}}
                        >
                        <Text style={Styles.continueBtnTxt}>Envoyer la demande au coach</Text>
                        </TouchableOpacity>
                        </View>
                        :null
                      }                    
                      </View>                
                  }
                    </Fragment>
                )
              })

                  :<View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                    <Text style={{fontSize:18,textAlign:'center',fontWeight:'700'}}>chargement...</Text>
                  </View>
                }
              </Fragment>
              
              :<View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
              <Text style={{fontSize:18,textAlign:'center',fontWeight:'700'}}></Text>
            </View>
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
              backgroundColor: 'rgba(85,65,225,0.900)',
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
                      source={require("../../../../assets/icon/9.png")}
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
                    Demande acceptée
                  </Text>
                </View>  
                  <Text style={{margin:4,fontSize:16,fontWeight:'700',color:"gray",alignSelf:'center'}}>Votre session est terminée</Text>
                  <Text style={{margin:4,fontSize:16,fontWeight:'700',color:"gray",alignSelf:'center'}}>contacter</Text>
                  {/* <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}> d'anglais, vous pouvez maintenant profiter de</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>coaching d'anglais! Vous allez être</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>contacté(e) par votre coach.</Text>                   */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                    marginTop:20,
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
                        marginStart: 60,
                        marginEnd: 60,
                        margin:15,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                   OK
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

        {/* <BottomNavigator
          currentRoute={'transaction'}
          navigation={this.props.navigation}
        /> */}
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