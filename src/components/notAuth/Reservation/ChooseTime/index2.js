import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Alert,
  BackHandler
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';
import rightIcon from '../../../../assets/icon/33.png';
import calenderIcon from '../../../../assets/icon/10.png';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {duration_amount_by_level} from '../../../../Api/afterAuth';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from './indexCss';

import {RadioButton} from 'react-native-paper';

let today = '';



let newDaysObject4 = [];
import {check_reservation_by_datetime_slot} from '../../../../Api/afterAuth'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      amount_en: 0,
      durationAmount: [],
      time_duration: '',
      level_id: 0,


      isSpinner: true,  
      isBodyLoaded: true,  


      dateArray: [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
      ],
      reserve_time:'',
      markedDates:'',
      markedDates_blue:'',
      day:'',
      reserve_date:'',
      selectedStartDate: null,
      selectedEndDate: null,
      timeDuration:'',
      exacttime:'',
      date_slot:"",
      time_slot:"",
      exacttime_new:""
    };
    today = moment().format('YYYY-MM-DD');
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate('Search');
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('reservation');
  }

  // showTimeSlot = () => {
  //   let date = new Date();
  //   let dateArray = [
  //     '12:00','12:30',''
  //   ];

  //   let i = 1;
  //   dateArray.push(new Date());
  //   while (i < 48) {
  //     date.setMinutes(date.getMinutes() + 30);
  //     dateArray.push(new Date(date));
  //     i++;
  //   }
  //   this.setState({ dateArray });
  // };





  async componentDidMount() {

    setInterval(() => {
      this.checkTimeDuration()  
    }, 300);
    

    const levelId = await AsyncStorage.getItem('level_id');
    const level_id = JSON.parse(levelId);
    this.setState({level_id});
    


   

    let time_slot = `${this.state.reserve_time}-${this.state.exacttime} `

    // console.log("timeslot ===========",time_slot)

    let newDate = this.state.reserve_date


    this.setState({date_slot:newDate,time_slot})

   


    // var new_time= moment(this.state.reserve_time, 'HH:mm A')       
    // .add(60, 'minutes')
    // .format("HH:mm")

   
    this.duration_amount_by_levelData();


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


  checkTimeDuration () {   
    let new_time = this.state.reserve_time  
    // console.log("getting reserve time ===========",new_time) 

    // console.log("geting inside check time duration =========",this.state.timeDuration,           this.state.reserve_time)

    if(this.state.timeDuration == `30 minutes`) {

      var exacttime = moment(new_time, 'HH:mm A')       
      .add(30, 'minutes')
      .format("HH:mm")
      setTimeout(() => {
        this.setState({exacttime})
      }, 10);
     

      // console.log("gett   1111111---------",exacttime)
     } 
     else{
      var exacttime = moment(new_time, 'HH:mm A')       
      .add(60, 'minutes')
      .format("HH:mm")
      setTimeout(() => {
        this.setState({exacttime})
      }, 10);
  
      // console.log("gett   22222222---------",exacttime)
     }
  }





  check_reservation_by_datetime_slotFunction = async () => {
    // console.log("gettin after contnue funtion =====================",this.state.reserve_date,          this.state.exacttime)
   
    let time_slot_new = `${this.state.reserve_time}-${this.state.exacttime} `

    // console.log("timeslot ===========",time_slot_new)
    const {
      date_slot,
      time_slot
    } = this.state;
    const check_reservation_by_datetime_slotResponse = await check_reservation_by_datetime_slot({
      date_slot:this.state.reserve_date,
      time_slot:time_slot_new
    });
    if (check_reservation_by_datetime_slotResponse.result === true) {
      if(check_reservation_by_datetime_slotResponse.response.status === true){
        // console.log("getting response ------------------------",check_reservation_by_datetime_slotResponse.response)
        // this.paypalFunction()
        this.props.navigation.navigate('summary', {
          amount_en: this.state.amount_en,
          reserve_time:this.state.reserve_time,
          timeDuration: this.state.timeDuration,
          reserve_date: this.state.reserve_date,
        });
      }
    else {
            Alert.alert("Message", check_reservation_by_datetime_slotResponse.response.message)
    }
      // console.log("getting result here --------", )     
        // await AsyncStorage.setItem("token", JSON.stringify(check_reservation_by_datetime_slotResponse.response.token));            
    } else {
      this.myAlert('Error', check_reservation_by_datetime_slotResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };




validateFunction() {
  const { amount_en,reserve_date,reserve_time,timeDuration } = this.state;
  if(!timeDuration){
    Alert.alert("Message","veuillez choisir la durée!")
  }
  else if(!reserve_date){
    Alert.alert("Message","veuillez choisir la date!")
  }
  else if(!reserve_time){
    Alert.alert("Message","veuillez choisir l'heure!")
  }
  else {   
    this.check_reservation_by_datetime_slotFunction()

  }
}


duration_amount_by_levelData = async () => {
  // console.log("getting inside the function level id " + this.state.level_id)
  const {level_id} = this.state;
  const duration_amount_by_levelResponse = await duration_amount_by_level({
    level_id,
  });
  if (duration_amount_by_levelResponse.result == true) {
    var durationAmount =
      duration_amount_by_levelResponse.response.duration_and_rate;
    // console.log("getting durationAmount data----------",durationAmount)
  }
  this.setState({durationAmount,isBodyLoaded:true,isSpinner:false});
  // console.log("getting country response----------------",countryData.country_list)
};


set_date = (day) => {

  const d = moment(day.dateString).format("YYYY-MM-DD")
this.setState({reserve_date: d});
  // let color = 'rgba(255,100,120,10)'

  let color = "#b41565"


  if (this.state.markedDates[d]) {
    Alert.alert('Message', 'Veuillez choisir les dates!');
  } else{

    const markedDates_blue = {

      ...this.state.markedDates_blue,
      
      [d]: {
      ...this.state.markedDates_blue[d],
      selected:true,
      selectedColor: color,
      marked: true
      }
      }
      this.setState({ markedDates: markedDates_blue })
  }



  // console.log("selected marked date --------",markedDates_blue)
};










// set_date = (day) => {


// const d = moment(day.dateString).format('YYYY-MM-DD');
// // this.setState({reserve_date: d});



// if (this.state.markedDates_blue[d]) {


//   let color = 'rgba(255,170,0,1)'


//   const markedDates_blue = {

//   ...this.state.markedDates_blue,
  
//   [d]: {
//   ...this.state.markedDates_blue[d],
//   selected:true,
//   selectedColor: color
//   }
//   }
//   this.setState({ markedDates: markedDates_blue })  
//   }
//   // console.log("select markd date here ---------",this.state.markedDates)   

// };









  render() {
    const {durationAmount, dateArray} = this.state;

    // console.log('getting day -- -', this.state.day);

    // console.log("getting exact time ==============",this.state.exacttime_new)
    

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="#5541E1"
          hidden={false}
        />
          <Spinner visible={this.state.isSpinner} 
        />
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Réservations</Text>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity
              onPress={() => {
                this.Show_Custom_Alert();
              }}>
              <Image source={rightIcon} style={Styles.headertxtInputImg2} />
            </TouchableOpacity> */}
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>


        <View style={Styles.mainContentView}>          
          {
            this.state.isBodyLoaded  == true ?

            
            <ScrollView>
            <View>
              {durationAmount.map((singleMAp, key) => {
                // console.log("getting id here--",singleMAp.id)

                return (
                  <View>
                    {this.state.time_duration == singleMAp.time_duration ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            // let amount_en = singleMAp.amount_en;
                            // let   timeDuration = singleMAp.time_duration;
                            this.setState({
                              // time_duration: key,
                              time_duration: singleMAp.time_duration,
                              amount_en: singleMAp.amount_en,
                              timeDuration: singleMAp.time_duration,
                            });
                          }}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={require('../../../../assets/icon/9.png')}
                            style={{height: 20, width: 20, margin: 3}}
                          />
                          <Text style={{color: '#b41565'}}>
                            {' '}
                            {singleMAp.time_duration}
                          </Text>
                        </TouchableOpacity>
                        <View  style={{flexDirection:'row',borderWidth:0}}>
                        <Text style={{color: '#b41565'}}>
                          {singleMAp.amount_en}
                        </Text>
                        <Image
                            source={require('../../../../assets/icon/euro-currency-symbol-1.png')}
                            style={{height: 16, width: 16, margin: 1}}
                          />
                          </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                            // time_duration: key,
                            time_duration: singleMAp.time_duration,
                              amount_en: singleMAp.amount_en,
                              timeDuration: singleMAp.time_duration,
                            });
                          }}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={require('../../../../assets/icon/4.png')}
                            style={{height: 20, width: 20, margin: 3}}
                          />
                          <Text style={{color: 'gray'}}>
                            {' '}
                            {singleMAp.time_duration}
                          </Text>
                        </TouchableOpacity>
                        <View  style={{flexDirection:'row',borderWidth:0}}>
                        <Text style={{color: 'gray'}}>
                          {singleMAp.amount_en}
                        </Text>
                        <Image
                            source={require('../../../../assets/icon/currency.png')}
                            style={{height: 16, width: 16, margin: 1}}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <View style={Styles.subheaderView}>
              <Text style={Styles.subheaderTxt}>Choisissez une date</Text>
              <Image source={calenderIcon} style={Styles.headertxtInputImg1} />
            </View>

            <View
              style={{
                height: 380,
                borderWidth: 0,
                backgroundColor: '#5495ED',
                borderRadius: 10,
              }}>
              {/* <Calendar
                // style={Styles.calenderStyle}
                minDate={today}
                onDayPress={(day) => this.set_date(day)}
                markedDates={this.state.markedDates}


              


                onDayPress={(day) => {console.log('selected day', day)}}
                theme={{
                  backgroundColor: '#5495ED',
                  calendarBackground: '#5495ED',
                  textSectionTitleColor: '#000000',
                  textSectionTitleDisabledColor: '#000000',
                  dayTextColor: '#000000',
                  dotColor: 'red',
                  selectedDotColor: 'red',
                  // todayTextColor: '#000000',
                  todayTextColor: 'red',
                  arrowColor: '#000000',
                  indicatorColor: 'blue',
                }}
              /> */}





                  <Calendar

                     style={Styles.calenderStyle}
                  minDate={today}

                  onDayPress={(day) => this.set_date(day)}
                  onDateSelect={(date) => { console.log('selected Date', date) }}


                  markedDates={this.state.markedDates}

                   theme={{
                  backgroundColor: '#5495ED',
                  calendarBackground: '#5495ED',
                  textSectionTitleColor: '#000000',
                  textSectionTitleDisabledColor: '#000000',
                  dayTextColor: '#000000',
                  dotColor: 'red',
                  selectedDotColor: 'red',
                  // todayTextColor: '#000000',
                  todayTextColor: 'red',
                  arrowColor: '#000000',
                  indicatorColor: 'blue',
                }}

                  />





              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#5495ED',
                  marginTop: 10,
                  width: '96%',
                  alignSelf: 'center',
                }}>
                <ScrollView horizontal={true}>
                  {dateArray.map((singleTime, Index) => {
                    // console.log("getting time here--------------",singleTime)
                    return (
                      <View
                        style={{flexDirection: 'row', margin: 3, height: 30}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({reserve_time: singleTime});
                          }}>
                          {this.state.reserve_time == singleTime ? (
                            <View
                              style={{
                                borderWidth: 0,
                                backgroundColor: '#b41565',
                                flexDirection: 'row',
                                margin: 1,
                                borderRadius: 7,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  margin: 4,
                                  color: '#FFFFFF',
                                  fontSize: 12,
                                  fontFamily: 'OpenSans-Bold',
                                  textAlign: 'center',
                                }}>{singleTime}</Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: '#b41565',
                                flexDirection: 'row',
                                margin: 1,
                                borderRadius: 7,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  margin: 4,
                                  color: '#FFFFFF',
                                  fontSize: 12,
                                  fontFamily: 'OpenSans-Bold',
                                  textAlign: 'center',
                                }}>{singleTime}</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            <View>
              <Text style={Styles.subheaderTxt}>
                Choisissez l'horaire du coaching
              </Text>
            </View>

            <View style={Styles.continueBtn}>
              <TouchableOpacity
                onPress={() => {                  
                  // this.props.navigation.navigate('summary', {
                  //   amount_en: this.state.amount_en,
                  //   reserve_time: this.state.reserve_time,
                  //   timeDuration: this.state.timeDuration,
                  //   reserve_date: this.state.reserve_date,
                  // });
                  this.validateFunction()
                }}>
                <Text style={Styles.continueBtnTxt}>+ Ajouter un créneau</Text>
              </TouchableOpacity>
            </View>
          </ScrollView> 
            : null
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
                  backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  width: '99%',
                    backgroundColor: 'rgba(85,65,225,0.900)',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: 18,
                    alignSelf: 'center',
                    marginTop: 30,
                    margin: 10,
                  }}>
                  Demande de coaching (request)
                </Text>

                <View
                  style={{
                    marginTop: 27,
                    marginStart: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}>
                    Informations sur le coaching d'anglais
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    30 minutes, 27.05.2020, 17h00 à 21h00
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 27,
                    marginStart: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}>
                    Info Client
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    Hardley Smith, Beginner
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 30,
                    marginTop: 40,
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.Hide_Custom_Alert1();
                    }}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                      marginStart: 25,
                      marginEnd: 25,
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 18,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Accepter
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.Hide_Custom_Alert();
                    }}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                      marginStart: 25,
                      marginEnd: 25,
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 18,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Décliner
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

// 13.Demande de coaching (request)
// Informations sur le coaching d'anglais
// 30 minutes, 27.05.2020, 17h00 à 21h00
//
//
// 00:37
//
// Décliner
