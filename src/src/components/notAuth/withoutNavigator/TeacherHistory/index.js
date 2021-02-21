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
import {teacher_history} from '../../../../Api/afterAuth'

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import chatImg from '../../../../assets/icon/11.png'

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
      course_date:"",
      course_time:"",
      teacher_profile_url:"",
      teacher_name:"",
    };
  }

  teacher_historyFunction = async () => {
    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)
    const {teacher_id,course_date,course_time} = this.state;
    const teacher_historyResponse = await teacher_history({
        teacher_id,
        course_date,
        course_time,
      });
    if (teacher_historyResponse.result == true) {
      var TeacherDetails =
        teacher_historyResponse.response.teacher_data;
      // console.log("getting TeacherDetails data----------",TeacherDetails)
    }
    this.setState({TeacherDetails,isBodyLoaded:true,isSpinner:false});
    // console.log("getting country response----------------",countryData.country_list)
  };



  componentDidMount = async () => {

      // let teacher_id = this.props.navigation.getParam("teacher_id")

      
    let teacher_id = this.props.navigation.getParam("teacher_id")
    let course_date = this.props.navigation.getParam("course_date")
    let course_time = this.props.navigation.getParam("course_time")

    // console.log("getting inside the function date_slot time_slot " ,time_slot,                reserve_date)

    
      setTimeout(() => {
        this.setState({teacher_id,course_date,course_time})
        console.log("geting teacher id ----------",teacher_id)
      }, 100);



          setTimeout(() => {
            this.teacher_historyFunction()
          }, 600);      



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
    let teacher_id = this.props.navigation.getParam("teacher_id")
    let teacher_name = this.props.navigation.getParam("teacher_name")
    let teacher_profile_url = this.props.navigation.getParam("teacher_profile_url")
    let course_time = this.props.navigation.getParam("course_time")
    let course_date = this.props.navigation.getParam("course_date")  
    
    console.log("getting all param --------------",teacher_id,teacher_name,teacher_profile_url)

    this.props.navigation.navigate('profile',{
      teacher_id:teacher_id,
      teacher_name:teacher_name,
      teacher_profile_url:teacher_profile_url,
      course_time:course_time,
      course_date:course_date
    })
    
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate("profile",{
        teacher_id:this.state.teacher_id,
        teacher_profile_url:this.state.teacher_profile_url,
        course_date:this.state.course_date,
        course_time:this.state.course_time,
        teacher_name:this.state.teach
    }
    )
  }
  render() {

const {TeacherDetails} = this.state;



let teacher_name = this.props.navigation.getParam("teacher_name")
let teacher_profile_url = this.props.navigation.getParam("teacher_profile_url")
let course_time = this.props.navigation.getParam("course_time")

let course_date = this.props.navigation.getParam("course_date")



let ratingflag = this.props.navigation.getParam("ratingflag")

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
          <Text style={Styles.headerTxt}>Votre enseignment</Text>

             
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />
      

        <View style={Styles.mainContainer}>
          <ScrollView>
            {
              this.state.isBodyLoaded == true ?
              <Fragment>
                {
                  this.state.TeacherDetails .length > 0  ?

                  
              TeacherDetails.map((singleTeacherDetails)=>{

               
                // teacher_profile_url = singleTeacherDetails.teacher_profile_url,
                //   course_date=singleTeacherDetails.course_date,
                //   course_time=singleTeacherDetails.course_time,
                //   teacher_name=singleTeacherDetails.teacher_name,
                
                //   this.setState({teacher_profile_url,course_date,course_time,teacher_name,})
           
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
                    <Text style={Styles.contentTextStyle}>Nombre d'évaluations  : {singleTeacherDetails.teacher_course_session_done}</Text>
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
                {/* <Image source={People} style={Styles.peopleStyle} /> */}
                <View style={{flexDirection: 'column'}}>                
                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Expererience en annies: </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.Experience}</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Compétences : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_language_skill}</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Education : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.teacher_skill}</Text>
                  </View>  



                    <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Age : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.age}</Text>
                  </View>               
                </View>   
                
                             
              </View>
            </View>




            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                {/* <Image source={People} style={Styles.peopleStyle} /> */}
                <View style={{flexDirection: 'column'}}>                
                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Paiement par: </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.payment_by}</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Charge : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.charge_amount}</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Deduction de maintenant : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.promo_amount}</Text>
                  </View>  



                    <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>maintenant total payer : </Text>
                <Text style={Styles.contentTextStyle}>{singleTeacherDetails.total_amount}</Text>
                  </View>               
                </View>   
                
                             
              </View>
            </View>
            
                 
                    {/* <View style={Styles.continueBtn}>
                        <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                        <Text style={Styles.continueBtnTxt}>Appeler le client pour démarrer le coaching</Text>
                        </TouchableOpacity>
                    </View> */}

                    { 
                        ratingflag == true ?
                        <View style={Styles.continueBtn}>
                        <TouchableOpacity 
                        style={{flexDirection:'row',margin:3}}
                        onPress={()=>{Linking.openURL(`tel:${9999999999}`)}}
                        >
                        <Image source={require("../../../../assets/icon/call.png")} style={{height:20,width:20,margin:7}} />
                        <Text style={Styles.continueBtnTxt}>
                        Appeler le client pour démarrer le coaching
                        </Text>
                        </TouchableOpacity>
                      </View>
                        :
                        <View style={Styles.continueBtn}>
                      <TouchableOpacity 
                      // onPress={()=>{this.props.navigation.navigate("profile",{
                      //   teacher_id:singleTeacherDetails.teacher_id,
                      //   teacher_profile_url:singleTeacherDetails.teacher_profile_url,
                      //   course_date:singleTeacherDetails.course_date,
                      //   course_time:singleTeacherDetails.course_time,
                      //   teacher_name:singleTeacherDetails.teacher_name
                      // })}}
                      onPress={                                                  
                        ()=>{this.Show_Custom_Alert()}}
                      >
                      <Text style={Styles.continueBtnTxt}>
                        Evalour le coach
                      </Text>
                      </TouchableOpacity>
                  </View>


                    }

                  
                
               

                    </Fragment>
                )
              })

                  :<View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:16,textAlign:'center',fontWeight:'700'}}></Text>
                  </View>
                }
              </Fragment>
              
              :<View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:16,textAlign:'center',fontWeight:'700'}}>chargement...</Text>
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
                      source={require("../../../../assets/icon/1616567.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: '600',
                      margin: 10,
                      marginTop: -10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                    Well done!
                  </Text>
                </View>  
                  <Text style={{margin:2,fontSize:14,fontWeight:'700',color:"gray",alignSelf:'center'}}>Votre session est terminate</Text>
                  <Text style={{margin:2,fontSize:14,fontWeight:'700',color:"gray",alignSelf:'center'}}>Hope you had fun See you seen !</Text>
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
                    onPress={() => this.Hide_Custom_Alert()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                     flexDirection:"row",
                      height: 35,
                      borderRadius: 6,
                    }}>
                      <Image source={require("../../../../assets/icon/like.png")} style={{height:20,width:20,margin:4}} />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 7,
                        marginEnd: 7,
                        margin:7,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                  Evaluer mon coach
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