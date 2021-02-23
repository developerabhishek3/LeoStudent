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
  StatusBar
} from 'react-native';

import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './teacherProfileCss';
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';



import books from '../../../assets/icon/12.png';
import watch from '../../../assets/icon/14.png';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {teacher_info_for_reservation,} from '../../../Api/afterAuth'

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';


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
















  teacher_info_for_reservationFunction = async () => {
  
    const {teacher_id,date_slot,time_slot} = this.state;
    const teacher_info_for_reservationResponse = await teacher_info_for_reservation({
      teacher_id,
      date_slot:"",
      time_slot:""
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
          Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
              this.props.navigation.goBack();
          }}]);
      })
      }
     
    }
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }
 
  };



  componentDidMount = async () => {

    console.log("getting teacher id here========",this.props.navigation.getParam("teacher_id"))

    let teacher_id = this.props.navigation.getParam("teacher_id")
      setTimeout(() => {
        this.setState({teacher_id,})
        // console.log("geting teacher id ----------",teacher_id)
      }, 100);


          setTimeout(() => {
            this.teacher_info_for_reservationFunction()
          }, 700);      
   
            
       
          // setInterval(() => {
           

          //   console.log("getting waiting time--------",this.state.waiting_time)
          // }, 4000);
            
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

          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />
        {/* <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt1}>Historique</Text>
            <View style={{borderColor: '#FF1493', borderWidth: 1, width: 100}} />
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
                    <Text style={Styles.contentTextStyle}>Numbre de evaluations : {singleTeacherDetails.teacher_course_session_done}</Text>
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
                        fullStar={<Image source={require("../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                        emptyStar={<Image source={require("../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                        halfStar={<Image source={require("../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
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
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_course_session_done}</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Compétences : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_language_skill}</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Diplôme : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_diploma}</Text>
                  </View>               
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
                  {/* {
                    singleTeacherDetails.reservation_status == `Accepted` ?

                    <View style={Styles.continueBtn}>
                        <TouchableOpacity 
                        // onPress={()=>{this.Show_Custom_Alert()}}
                        >
                        <Text style={Styles.continueBtnTxt}>Appeler le client pour démarrer le coaching</Text>
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
                        <Text style={Styles.continueBtnTxt}>Envoyez la demande au coach</Text>
                        </TouchableOpacity>
                        </View>
                        :null
                      }                    
                      </View>                
                  } */}
                    </Fragment>
                )
              })

                  :<View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
                    <Text style={{fontSize:18,textAlign:'center',fontWeight:'700'}}>chargement...</Text>
                  </View>
                }
              </Fragment>
              
              :<View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
              <Text style={{fontSize:18,textAlign:'center',fontWeight:'700'}}>Record non trouvé!!</Text>
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
                      source={require("../../../assets/icon/9.png")}
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
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Votre demande a été acceptée par le coach</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}> d'anglais, vous pouvez maintenant profiter de</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>coaching d'anglais! Vous allez être</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>contacté(e) par votre coach.</Text>                  
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
                      backgroundColor: '#FF1493',
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
                    Démarrer le coaching
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert1()}
                    style={{
                      backgroundColor: '#FF1493',
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