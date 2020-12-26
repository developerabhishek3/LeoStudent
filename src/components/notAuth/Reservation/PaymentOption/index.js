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
  BackHandler,
  Alert
} from 'react-native';
import {CheckBox, Overlay, Button} from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';
import rightIcon from '../../../../assets/icon/33.png';
import calenderIcon from '../../../../assets/icon/10.png';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {WebView} from 'react-native-webview';
import Styles from './indexCss';


import {check_reservation_by_datetime_slot} from '../../../../Api/afterAuth'
let today = '';

//  https://www.spyk.fr/payment/transaction?user_id=4&course_date=2020-11-24&course_time=05:00-05:30&course_duration=30minutes&course_amount=40&promocode_id=4&type=paypal

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      checked1: false,
      checked2: false,

      date_slot:"",
      time_slot:"",
      paypalCheck:false
    };
  }





  check_reservation_by_datetime_slotFunction = async () => {
    console.log("getting inside the function level_id --------",this.state.level_id)     
    const {
      date_slot,
      time_slot
    } = this.state;
    const check_reservation_by_datetime_slotResponse = await check_reservation_by_datetime_slot({
      date_slot,
      time_slot
    });
    if (check_reservation_by_datetime_slotResponse.result == true) {
      if(check_reservation_by_datetime_slotResponse.response.status == true){
        this.paypalFunction()
      }
    else {
            Alert.alert("Message", check_reservation_by_datetime_slotResponse.response.message)
    }
      console.log("getting result here --------", )     
        // await AsyncStorage.setItem("token", JSON.stringify(check_reservation_by_datetime_slotResponse.response.token));            
    } else {
      this.myAlert('Error', check_reservation_by_datetime_slotResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };












  componentDidMount = async () => {



  
    let reserve_time = this.props.navigation.getParam('reserve_time');
  
    let reserve_date = this.props.navigation.getParam('reserve_date')

    let exacttime = this.props.navigation.getParam('exacttime');


    let time_slot = `${reserve_time}-${exacttime} `

    console.log("timeslot ===========",time_slot)

    this.setState({date_slot:reserve_date,time_slot})

    console.log("getting firts ---------",exacttime,reserve_time)
    console.log("getting 2 ------",reserve_date)

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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

  paypalFunction() {
    let amount_en = this.props.navigation.getParam('amount_en');
    let reserve_time = this.props.navigation.getParam('reserve_time');
    let timeDuration = this.props.navigation.getParam('timeDuration');
    let reserve_date = this.props.navigation.getParam('reserve_date');
    let promocodeId = this.props.navigation.getParam('promocodeId');

    let amount = this.props.navigation.getParam('amount');
    let exacttime = this.props.navigation.getParam('exacttime');

    this.setState({paypalCheck:true})

    console.log("i am abhishek ------",timeDuration)

    this.setState({checked2: !this.state.checked2});

    // this.props.navigation.navigate('paypal', {
    //   amount_en: amount_en,
    //   reserve_time: reserve_time,
    //   timeDuration: timeDuration,
    //   reserve_date: reserve_date,
    //   promocodeId: promocodeId,
    //   amount:amount,
    //   exacttime:exacttime,
    //   time_slot:this.state.time_slot

    // });
  }

  render() {
    let amount_en = this.props.navigation.getParam('amount_en');
    let reserve_time = this.props.navigation.getParam('reserve_time');
    let timeDuration = this.props.navigation.getParam('timeDuration');
    let reserve_date = this.props.navigation.getParam('reserve_date');
    let promocodeId = this.props.navigation.getParam('promocodeId');

    let amount = this.props.navigation.getParam('amount');
    let exacttime = this.props.navigation.getParam('exacttime');

    let booktype = this.props.navigation.getParam("booktype")

    console.log("inside did mount found time slot --------",this.state.time_slot)

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Gestion des codes promo</Text>
          <View style={{flexDirection: 'row'}}>
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>

        <View style={Styles.mainContentView}>
          <ScrollView>
            <View
              style={{
                width: '94%',
                borderWidth: 1,
                borderColor:"#DDDDDD",
                borderRadius: 10,
                elevation: 0,
                shadowColor: '#FFFFFFF',
                shadowOffset: 3,
                shadowOpacity: 1,
                alignSelf: 'center',
                margin: 20,
                height: 40,
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', margin: 3, marginStart: 10,alignItems:'center',justifyContent:'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 20,
                  }}>
                  <Image
                    style={{height: 26, width: 26, margin: 3}}
                    source={require('../../../../assets/icon/card.png')}
                  />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 7,
                      marginStart: 10,
                      marginEnd: 4,
                    }}>
                    Carte de paiement
                  </Text>
                </View>
                <View style={{margin: 10}}>
                  <CheckBox
                    checked={this.state.checked1}
                    onPress={() =>
                      this.setState({checked1: !this.state.checked1})
                    }
                    checkedIcon={
                      <Image
                        source={require('../../../../assets/icon/9.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../../assets/icon/4.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: '94%',
                borderWidth: 1,
                borderColor:"#DDDDDD",
                borderRadius: 10,
                elevation: 0,
                shadowColor: '#FFFFFFF',
                shadowOffset: 3,
                shadowOpacity: 1,
                alignSelf: 'center',
                margin: 20,
                height: 40,
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', margin: 3, marginStart: 10,alignItems:'center',justifyContent:'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{height: 16, width: 16, margin: 3}}
                    source={require('../../../../assets/icon/card-2.png')}
                  />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginStart: 10,
                      marginEnd: 4,
                    }}>
                    Paypal
                  </Text>
                </View>
                <View style={{margin: 10,alignSelf:'flex-end'}}>
                  <CheckBox
                    checked={this.state.checked2}
                    onPress={() =>
                      // this.setState({checked2: !this.state.checked2})
                      this.paypalFunction()
                    }
                    checkedIcon={
                      <Image
                        source={require('../../../../assets/icon/9.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../../assets/icon/4.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                  />
                </View>
              </View>
            </View>

            <View style={Styles.continueBtn}>
              <TouchableOpacity
                onPress={() => {
                  {
                    this.state.paypalCheck == true ?
                    this.props.navigation.navigate('paypal', {
                      amount_en: amount_en,
                      reserve_time: reserve_time,
                      timeDuration: timeDuration,
                      reserve_date: reserve_date,
                      promocodeId: promocodeId,
                      amount:amount,
                      exacttime:exacttime,
                      time_slot:this.state.time_slot,
                      booktype:booktype              
                    })
                    :
                    this.props.navigation.navigate("searchteacher")

                  }
                  
                }}
                // onPress={()=>{this.props.navigation.navigate("paypal",{
                //   amount_en:amount_en,
                //   reserve_time:reserve_time,
                //   timeDuration:timeDuration,
                //   reserve_date:reserve_date
                // })}}
              >
                <Text style={Styles.continueBtnTxt}>Continuer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
