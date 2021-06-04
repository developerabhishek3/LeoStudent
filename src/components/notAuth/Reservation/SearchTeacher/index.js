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
} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png';

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import Spinner from 'react-native-loading-spinner-overlay';

import {
  search_teacher_booking_later,
  search_teacher_booking_now,
} from '../../../../Api/afterAuth';

import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-community/async-storage';

let reserve_date;
let time_slot;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      teacherDetails: [],
      teacherDetailsBookNow: [],
      teacherDetailsLator: [],

      isBodyLoaded: false,
      isSpinner: true,
      course_date: 0,
      course_time: 0,
      booktype: '',
      coach_type: '',
    };
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('clientinfo');
  }

  fetchsearch_teacher_booking_now = async () => {
    console.log(
      'getting inside the function level_id --------',
      this.state.level_id,
    );
    const search_teacher_booking_nowResponse = await search_teacher_booking_now();
    if (search_teacher_booking_nowResponse.result == true) {
      console.log(
        'getting result here for search book now --------',
        search_teacher_booking_nowResponse.response,
      );
      var teacherDetailsBookNow =
        search_teacher_booking_nowResponse.response.teacher_list;
      this.setState({
        teacherDetailsBookNow,
        isSpinner: false,
        isBodyLoaded: true,
      });
      // console.log("grettinh token value here===============",teacherDetailsBookNow)
      // await AsyncStorage.setItem("token", JSON.stringify(search_teacher_booking_nowResponse.response.token));
    } else {
      this.myAlert('Error', search_teacher_booking_nowResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  fetchsearch_teacher_booking_later = async () => {
    time_slot = this.props.navigation.getParam('time_slot');
    reserve_date = this.props.navigation.getParam('reserve_date');

    var newTime = time_slot.replace(' ', '');

    // console.log("checkig state value hrere============== shatrughna sir",this.state.course_date,      this.state.course_time)

    console.log('gertign first value ============', this.state.course_date);
    console.log('gertign first value m2 ============', this.state.course_time);

    const {course_date, course_time} = this.state;
    const search_teacher_booking_laterResponse = await search_teacher_booking_later(
      {
        course_date,
        course_time: newTime,
      },
    );
    if (search_teacher_booking_laterResponse.result == true) {
      console.log(
        'getting result here on book lator --------',
        search_teacher_booking_laterResponse.response,
      );
      var teacherDetailsLator =
        search_teacher_booking_laterResponse.response.teacher_list;
      this.setState({
        teacherDetailsLator,
        isSpinner: false,
        isBodyLoaded: true,
      });
    } else {
      console.log('getting error here-------------');
    }
    return;
  };

  componentDidMount = async () => {
    console.log(
      'treansion id on the search teacher++++++++++++++',
      this.props.navigation.getParam('transactinId'),
    );

    setInterval(() => {
      let coach_type = this.props.navigation.getParam('coach_type');
      // console.log("getting coach tyupe=============",coach_type)
      this.setState({coach_type});
    }, 1000);

    let time_slot = this.props.navigation.getParam('time_slot');
    let reserve_date = this.props.navigation.getParam('reserve_date');
    let booktype = this.props.navigation.getParam('booktype');

    console.log(
      'checking time slot and date herer----------------',
      time_slot,
      reserve_date,
    );

    setTimeout(() => {
      this.setState({
        course_date: reserve_date,
        course_time: time_slot,
      });
    }, 300);

    setTimeout(() => {
      this.fetchsearch_teacher_booking_later();
      this.fetchsearch_teacher_booking_now();
    }, 1000);

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
      nav.navigate('transaction');
      return true;
    }
  };

  render() {
    let time_slot = this.props.navigation.getParam('time_slot');
    let reserve_date = this.props.navigation.getParam('reserve_date');

    let booktype = this.props.navigation.getParam('booktype');

    console.log('checking book type hrere==================', booktype,this.state.coach_type);

    let transactinId = this.props.navigation.getParam('transactinId');
    //  console.log("transactioj id ------------",transactinId)

    //  console.log("getting book type checking---------------",reserve_date)
    //  console.log("inside render methid +++",booktype)

    // console.log("getting time slot and reserve_date inside render---------------",time_slot,         reserve_date)

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#5541E1"
          translucent={false}
        />
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={back}
              style={{height: 24, width: 24, marginStart: 20}}
            />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}> Choisir mon coach</Text>
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('filter');
            }}>
            <Image source={require("../../../../assets/icon/filter.png")} style={{height:24,width:24,margin:6}} />
          </TouchableOpacity> */}
          <Image source={logo} style={{height: 50, width: 36, marginEnd: 20}} />
        </View>

        <TouchableOpacity
          style={{
            height: 50,
            borderWidth: 0,
            borderColor: 'red',
            width: '100%',
            flexDirection: 'row',
          }}
          onPress={() => {
            this.props.navigation.navigate('filter');
          }}>
          <Image
            source={require('../../../../assets/icon/filter2.png')}
            style={{width: 33, height: 33, margin: 10}}
          />

          <Text
            style={{
              fontWeight: '700',
              fontSize: 20,
              margin: 12,
              color: '#000000',
            }}>
            Filtrer les coach
          </Text>
        </TouchableOpacity>

        <Spinner visible={this.state.isSpinner} />
        <View style={Styles.mainContainer}>
        <ScrollView>
        {booktype == 'later' ? (
          <Fragment>
            {
              this.state.coach_type == undefined || this.state.coach_type == null || this.state.coach_type == "" ?
              <Fragment>
                  {this.state.teacherDetailsLator.map((singleMap, key) => {
                       console.log("checking inside the check condiotn coach tyle value not getting  and book type later- - - - - - - - - -",singleMap)
              var date1 = singleMap.course_date;
              var newdate = date1.split('-').reverse().join('/');
              return (
                <View style={Styles.contentView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('bookreservation', {
                        teacher_id: singleMap.teacher_id,
                        time_slot,
                        reserve_date,
                        transactinId: transactinId,
                      });
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: `https://www.spyk.fr/${singleMap.teacher_profile_url}`,
                        }}
                        style={Styles.peopleStyle}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            margin: 2,
                            marginTop: 10,
                            color: '#000000',
                          }}>
                          {singleMap.teacher_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={watch} style={Styles.bookStyle} />
                          <Text style={Styles.contentTextStyle}>
                            {newdate} - {singleMap.course_time}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{alignItems: 'center'}}>
                            <Stars
                              default={singleMap.teacher_rating}
                              count={5}
                              disabled={true}
                              half={true}
                              starSize={20}
                              fullStar={
                                <Image
                                  source={require('../../../../assets/icon/111.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              emptyStar={
                                <Image
                                  source={require('../../../../assets/icon/112.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              halfStar={
                                <Image
                                  source={require('../../../../assets/icon/113.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                            />
                          </View>
                          {singleMap.teacher_rating == null ||
                          singleMap.teacher_rating == undefined ||
                          singleMap.teacher_rating == '' ||
                          singleMap.teacher_rating == 0 ? (
                            <Text style={Styles.contentTextStyle}>0 avis</Text>
                          ) : (
                            <Text style={Styles.contentTextStyle}>
                              {singleMap.teacher_rating} avis
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}


              </Fragment>
              :

//  for second condition . . . .  . .
              <Fragment>
              {this.state.teacherDetailsLator.map((singleMap, key) => {
              var date1 = singleMap.course_date;
              var newdate = date1.split('-').reverse().join('/');
              if(this.state.coach_type == singleMap.coach_type) {
                console.log("checking inside the check condiotn coach tyle value getting and book type later- - - - - - - - - -",singleMap)
                return (
                  <View style={Styles.contentView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('bookreservation', {
                        teacher_id: singleMap.teacher_id,
                        time_slot,
                        reserve_date,
                        transactinId: transactinId,
                      });
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: `https://www.spyk.fr/${singleMap.teacher_profile_url}`,
                        }}
                        style={Styles.peopleStyle}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            margin: 2,
                            marginTop: 10,
                            color: '#000000',
                          }}>
                          {singleMap.teacher_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={watch} style={Styles.bookStyle} />
                          <Text style={Styles.contentTextStyle}>
                            {newdate} - {singleMap.course_time}
                          </Text>
                        </View>
    
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{alignItems: 'center'}}>
                            <Stars
                              default={singleMap.teacher_rating}
                              count={5}
                              disabled={true}
                              half={true}
                              starSize={20}
                              fullStar={
                                <Image
                                  source={require('../../../../assets/icon/111.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              emptyStar={
                                <Image
                                  source={require('../../../../assets/icon/112.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              halfStar={
                                <Image
                                  source={require('../../../../assets/icon/113.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                            />
                          </View>
                          {singleMap.teacher_rating == null ||
                          singleMap.teacher_rating == undefined ||
                          singleMap.teacher_rating == '' ||
                          singleMap.teacher_rating == 0 ? (
                            <Text style={Styles.contentTextStyle}>0 avis</Text>
                          ) : (
                            <Text style={Styles.contentTextStyle}>
                              {singleMap.teacher_rating} avis
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  </View>
                  );
              }
              
              })}


              </Fragment>








            }
            
          </Fragment>
        ) : (
//  from here to book now-----


          <Fragment>

{
              this.state.coach_type == undefined || this.state.coach_type == null || this.state.coach_type == "" ?
              <Fragment>
                  {this.state.teacherDetailsBookNow.map((singleMap, key) => {
                       console.log("checking inside the check condiotn coach tyle value not getting and book type now - - - - - - - - - -",singleMap)
              var date1 = singleMap.course_date;
              var newdate = date1.split('-').reverse().join('/');
              return (
                <View style={Styles.contentView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('bookreservation', {
                        teacher_id: singleMap.teacher_id,
                        time_slot,
                        reserve_date,
                        transactinId: transactinId,
                      });
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: `https://www.spyk.fr/${singleMap.teacher_profile_url}`,
                        }}
                        style={Styles.peopleStyle}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            margin: 2,
                            marginTop: 10,
                            color: '#000000',
                          }}>
                          {singleMap.teacher_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={watch} style={Styles.bookStyle} />
                          <Text style={Styles.contentTextStyle}>
                            {newdate} - {singleMap.course_time}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{alignItems: 'center'}}>
                            <Stars
                              default={singleMap.teacher_rating}
                              count={5}
                              disabled={true}
                              half={true}
                              starSize={20}
                              fullStar={
                                <Image
                                  source={require('../../../../assets/icon/111.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              emptyStar={
                                <Image
                                  source={require('../../../../assets/icon/112.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              halfStar={
                                <Image
                                  source={require('../../../../assets/icon/113.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                            />
                          </View>
                          {singleMap.teacher_rating == null ||
                          singleMap.teacher_rating == undefined ||
                          singleMap.teacher_rating == '' ||
                          singleMap.teacher_rating == 0 ? (
                            <Text style={Styles.contentTextStyle}>0 avis</Text>
                          ) : (
                            <Text style={Styles.contentTextStyle}>
                              {singleMap.teacher_rating} avis
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}


              </Fragment>
              :

//  for second condition . . . .  . .
              <Fragment>
              {this.state.teacherDetailsBookNow.map((singleMap, key) => {
              var date1 = singleMap.course_date;
              var newdate = date1.split('-').reverse().join('/');
              if(this.state.coach_type == singleMap.coach_type) {
                console.log("checking inside the check condiotn coach tyle value getting and book type now - - - - - - - - - -",singleMap)
                return (
                  <View style={Styles.contentView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('bookreservation', {
                        teacher_id: singleMap.teacher_id,
                        time_slot,
                        reserve_date,
                        transactinId: transactinId,
                      });
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: `https://www.spyk.fr/${singleMap.teacher_profile_url}`,
                        }}
                        style={Styles.peopleStyle}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            margin: 2,
                            marginTop: 10,
                            color: '#000000',
                          }}>
                          {singleMap.teacher_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={watch} style={Styles.bookStyle} />
                          <Text style={Styles.contentTextStyle}>
                            {newdate} - {singleMap.course_time}
                          </Text>
                        </View>
    
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{alignItems: 'center'}}>
                            <Stars
                              default={singleMap.teacher_rating}
                              count={5}
                              disabled={true}
                              half={true}
                              starSize={20}
                              fullStar={
                                <Image
                                  source={require('../../../../assets/icon/111.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              emptyStar={
                                <Image
                                  source={require('../../../../assets/icon/112.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                              halfStar={
                                <Image
                                  source={require('../../../../assets/icon/113.png')}
                                  style={{
                                    height: 15,
                                    width: 15,
                                    margin: 3,
                                  }}
                                />
                              }
                            />
                          </View>
                          {singleMap.teacher_rating == null ||
                          singleMap.teacher_rating == undefined ||
                          singleMap.teacher_rating == '' ||
                          singleMap.teacher_rating == 0 ? (
                            <Text style={Styles.contentTextStyle}>0 avis</Text>
                          ) : (
                            <Text style={Styles.contentTextStyle}>
                              {singleMap.teacher_rating} avis
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  </View>
                  );
              }
              
              })}


              </Fragment>








            }


          </Fragment>
        )}
      </ScrollView>
      </View>
      
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
