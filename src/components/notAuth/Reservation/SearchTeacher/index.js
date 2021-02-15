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
  StatusBar
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
      console.log("getting result here for search book now --------", search_teacher_booking_nowResponse.response)
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

     var newTime =    time_slot.replace(" ", "");

  
    // console.log("checkig state value hrere============== shatrughna sir",this.state.course_date,      this.state.course_time)

    console.log("gertign first value ============",this.state.course_date)
    console.log("gertign first value m2 ============",this.state.course_time)

    const {course_date,course_time} = this.state;
    const search_teacher_booking_laterResponse = await search_teacher_booking_later(
      {
        course_date,
        course_time:newTime,
      }
    )   
    if (search_teacher_booking_laterResponse.result == true) {
      console.log("getting result here on book lator --------", search_teacher_booking_laterResponse.response)
      var teacherDetailsLator =  search_teacher_booking_laterResponse.response.teacher_list;
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

    console.log("treansion id on the search teacher++++++++++++++",this.props.navigation.getParam("transactinId"))


    setInterval(() => {
      let coach_type = this.props.navigation.getParam('coach_type');
      // console.log("getting coach tyupe=============",coach_type)
      this.setState({coach_type});
    }, 900);

    let time_slot = this.props.navigation.getParam('time_slot');
    let reserve_date = this.props.navigation.getParam('reserve_date');
    let booktype = this.props.navigation.getParam('booktype');

    console.log("checking time slot and date herer----------------",time_slot,          reserve_date)

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
      nav.navigate("transaction");
      return true;
    }
  };

  render() {
    let time_slot = this.props.navigation.getParam('time_slot');
    let reserve_date = this.props.navigation.getParam('reserve_date');

    let booktype = this.props.navigation.getParam('booktype');

    // console.log("checking book type hrere==================",booktype)


     let transactinId = this.props.navigation.getParam("transactinId")
    //  console.log("transactioj id ------------",transactinId)

    //  console.log("getting book type checking---------------",reserve_date)
      //  console.log("inside render methid +++",booktype)


    // console.log("getting time slot and reserve_date inside render---------------",time_slot,         reserve_date)

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={{height:24,width:24,marginStart:20}} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>  Choisir mon coach</Text>
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('filter');
            }}>
            <Image source={require("../../../../assets/icon/filter.png")} style={{height:24,width:24,margin:6}} />
          </TouchableOpacity> */}
          <Image source={logo}  style={{height:50,width:36,marginEnd:20}} />
        </View>
 
        <TouchableOpacity
             style={{height:50,borderWidth:0,borderColor:"red",width:"100%",flexDirection:'row'}}
            onPress={() => {
              this.props.navigation.navigate('filter');
            }}>
          <Image source={require("../../../../assets/icon/filter2.png")} style={{width:33,height:33,margin:10}} />
         
            <Text style={{fontWeight:'700',fontSize:20,margin:12}}>Filtrer les coach</Text>
            </TouchableOpacity>
      
        <Spinner visible={this.state.isSpinner} />
        <View style={Styles.mainContainer}>
          {
            this.state.isBodyLoaded == true ?        
          <ScrollView>
            {/* {
              this.state.isBodyLoaded == true ? */}
            {/* code here for book lator */}
            {booktype != 'now' ? (              
              <Fragment>                
                {this.state.teacherDetailsLator.length > 0 ? (
                  
                  <Fragment>
                    {this.state.coach_type == `coach natif` ? (
                      <Fragment>
                        {this.state.teacherDetailsLator.map((singleMap) => {                        
                            return (
                              singleMap.coach_type == `coach natif` ?
                              <View style={Styles.contentView}>
                                <TouchableOpacity
                                  onPress={() => {
                                   
                                    this.props.navigation.navigate(
                                      'bookreservation',
                                      {
                                        teacher_id: singleMap.teacher_id,
                                        time_slot,
                                        reserve_date,
                                        transactinId:transactinId
                                      },
                                    );
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
                                        }}>
                                        {singleMap.teacher_name}
                                      </Text>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={books}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          Numbre de evaluations :{' '}
                                          {
                                            singleMap.teacher_course_session_done
                                          }
                                        </Text>
                                      </View>

                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={watch}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          {singleMap.course_date} -{' '}
                                          {singleMap.course_time}
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
                                        {/* <View style={Styles.continueBtn}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              this.Show_Custom_Alert();
                                            }}>
                                            <Text style={Styles.continueBtnTxt}>
                                              Annuler
                                            </Text>
                                          </TouchableOpacity>
                                        </View> */}
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              :
                             null
                            );
                      
                        })}
                      </Fragment>
                    ) : this.state.coach_type == `coach bilingue` ? (
                      <Fragment>
                        {this.state.teacherDetailsLator.map((singleMap) => {
                         
                            return (
                              singleMap.coach_type == `coach bilingue` ?
                              <View style={Styles.contentView}>
                                <TouchableOpacity
                                  onPress={() => {
                                    
                                    this.props.navigation.navigate(
                                      'bookreservation',
                                      {
                                        teacher_id: singleMap.teacher_id,
                                        time_slot,
                                        reserve_date,
                                        transactinId:transactinId
                                      },
                                    );
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
                                        }}>
                                        {singleMap.teacher_name}
                                      </Text>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={books}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          Numbre de evaluations :{' '}
                                          {
                                            singleMap.teacher_course_session_done
                                          }
                                        </Text>
                                      </View>

                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={watch}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          {singleMap.course_date} -{' '}
                                          {singleMap.course_time}
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
                                            half={true}
                                            starSize={15}
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
                                        {/* <View style={Styles.continueBtn}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              this.Show_Custom_Alert();
                                            }}>
                                            <Text style={Styles.continueBtnTxt}>
                                              Annuler
                                            </Text>
                                          </TouchableOpacity>
                                        </View> */}
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              :null
                            );
                          
                        })}
                      </Fragment>
                    ) : this.state.coach_type == `lex deux me vont` ? (
                      <Fragment>
                        {this.state.teacherDetailsLator.map((singleMap) => {
                          if(singleMap.coach_type == `lex deux me vont`){
                            return (
                              singleMap.coach_type == `lex deux me vont` ?
                              <View style={Styles.contentView}>
                                <TouchableOpacity
                                  onPress={() => {
                                    
                                    this.props.navigation.navigate(
                                      'bookreservation',
                                      {
                                        teacher_id: singleMap.teacher_id,
                                        time_slot,
                                        reserve_date,
                                        transactinId:transactinId
                                      },
                                    );
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
                                        }}>
                                        {singleMap.teacher_name}
                                      </Text>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={books}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          Numbre de evaluations :{' '}
                                          {
                                            singleMap.teacher_course_session_done
                                          }
                                        </Text>
                                      </View>

                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={watch}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          {singleMap.course_date} -{' '}
                                          {singleMap.course_time}
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
                                            half={true}
                                            starSize={20}
                                            fullStar={
                                              <Image
                                                source={require('../../../../assets/icon/111.png')}
                                                style={{
                                                  height: 20,
                                                  width: 20,
                                                  margin: 3,
                                                }}
                                              />
                                            }
                                            emptyStar={
                                              <Image
                                                source={require('../../../../assets/icon/112.png')}
                                                style={{
                                                  height: 20,
                                                  width: 20,
                                                  margin: 3,
                                                }}
                                              />
                                            }
                                            halfStar={
                                              <Image
                                                source={require('../../../../assets/icon/113.png')}
                                                style={{
                                                  height: 23,
                                                  width: 20,
                                                  margin: 3,
                                                }}
                                              />
                                            }
                                          />
                                        </View>
                                        {/* <View style={Styles.continueBtn}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              this.Show_Custom_Alert();
                                            }}>
                                            <Text style={Styles.continueBtnTxt}>
                                              Annuler
                                            </Text>
                                          </TouchableOpacity>
                                        </View> */}
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              :
                             null
                            );
                          }
                        })}
                      </Fragment>
                    ) : 
                    
                    

<Fragment>
                        {this.state.teacherDetailsLator.map((singleMap) => {
                          return (
                            <View style={Styles.contentView}>
                              <TouchableOpacity
                                onPress={() => {
                                  
                                  this.props.navigation.navigate(
                                    'bookreservation',
                                    {
                                      teacher_id: singleMap.teacher_id,
                                      time_slot,
                                      reserve_date,
                                    },
                                  );
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
                                      }}>
                                      {singleMap.teacher_name}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                      <Image
                                        source={books}
                                        style={Styles.bookStyle}
                                      />
                                      <Text style={Styles.contentTextStyle}>
                                        Numbre de evaluations :{' '}
                                        {singleMap.teacher_course_session_done}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                      <Image
                                        source={watch}
                                        style={Styles.bookStyle}
                                      />
                                      <Text style={Styles.contentTextStyle}>
                                        {singleMap.course_date} -{' '}
                                        {singleMap.course_time}
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
                                          half={true}
                                          starSize={20}
                                          fullStar={
                                            <Image
                                              source={require('../../../../assets/icon/111.png')}
                                              style={{
                                                height: 20,
                                                width: 20,
                                                margin: 3,
                                              }}
                                            />
                                          }
                                          emptyStar={
                                            <Image
                                              source={require('../../../../assets/icon/112.png')}
                                              style={{
                                                height: 20,
                                                width: 20,
                                                margin: 3,
                                              }}
                                            />
                                          }
                                          halfStar={
                                            <Image
                                              source={require('../../../../assets/icon/113.png')}
                                              style={{
                                                height: 23,
                                                width: 20,
                                                margin: 3,
                                              }}
                                            />
                                          }
                                        />
                                      </View>
                                      {/* <View style={Styles.continueBtn}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.Show_Custom_Alert();
                                          }}>
                                          <Text style={Styles.continueBtnTxt}>
                                            Annuler
                                          </Text>
                                        </TouchableOpacity>
                                      </View> */}
                                    </View>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </Fragment>

                    }
                  </Fragment>
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: SCREEN_HEIGHT / 3,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        margin: 10,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      No record found!
                    </Text>
                  </View>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {this.state.teacherDetailsBookNow.length > 0 ? (
                  <Fragment>
                    <Fragment>
                      {this.state.coach_type == `coach natif` ? (
                        <Fragment>
                          {this.state.teacherDetailsBookNow.map((singleMap) => {
                            // console.log("getting type  1============",singleMap.coach_type)
                            if(singleMap.coach_type == `coach natif`) {
                              return (
                                singleMap.coach_type == `coach natif` ?
                                <View style={Styles.contentView}>
                                  <TouchableOpacity
                                    onPress={() => {
                                     
                                      this.props.navigation.navigate(
                                        'bookreservation',
                                        {
                                          teacher_id: singleMap.teacher_id,
                                          time_slot,
                                          reserve_date,
                                        },
                                      );
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
                                          }}>
                                          {singleMap.teacher_name}
                                        </Text>
                                        <View style={{flexDirection: 'row'}}>
                                          <Image
                                            source={books}
                                            style={Styles.bookStyle}
                                          />
                                          <Text style={Styles.contentTextStyle}>
                                            Numbre de evaluations :{' '}
                                            {
                                              singleMap.teacher_course_session_done
                                            }
                                          </Text>
                                        </View>

                                        <View style={{flexDirection: 'row'}}>
                                          <Image
                                            source={watch}
                                            style={Styles.bookStyle}
                                          />
                                          <Text style={Styles.contentTextStyle}>
                                            {singleMap.course_date} -{' '}
                                            {singleMap.course_time}
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
                                              half={true}
                                              starSize={20}
                                              fullStar={
                                                <Image
                                                  source={require('../../../../assets/icon/111.png')}
                                                  style={{
                                                    height: 20,
                                                    width: 20,
                                                    margin: 3,
                                                  }}
                                                />
                                              }
                                              emptyStar={
                                                <Image
                                                  source={require('../../../../assets/icon/112.png')}
                                                  style={{
                                                    height: 20,
                                                    width: 20,
                                                    margin: 3,
                                                  }}
                                                />
                                              }
                                              halfStar={
                                                <Image
                                                  source={require('../../../../assets/icon/113.png')}
                                                  style={{
                                                    height: 23,
                                                    width: 20,
                                                    margin: 3,
                                                  }}
                                                />
                                              }
                                            />
                                          </View>
                                          {/* <View style={Styles.continueBtn}>
                                            <TouchableOpacity
                                              onPress={() => {
                                                this.Show_Custom_Alert();
                                              }}>
                                              <Text
                                                style={Styles.continueBtnTxt}>
                                                Annuler
                                              </Text>
                                            </TouchableOpacity>
                                          </View> */}
                                        </View>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                :
                               null
                              );
                            }
                          })}
                        </Fragment>
                      ) : this.state.coach_type == `coach bilingue` ? (
                        <Fragment>
                          {this.state.teacherDetailsBookNow.map((singleMap) => {
                              // console.log("getting type 2============",singleMap.coach_type)
                           
                              return (
                                singleMap.coach_type == `coach bilingue` ?                                
                                <View style={Styles.contentView}>
                                  <TouchableOpacity
                                    onPress={() => {
                                     
                                      this.props.navigation.navigate(
                                        'bookreservation',
                                        {
                                          teacher_id: singleMap.teacher_id,
                                          time_slot,
                                          reserve_date,
                                        },
                                      );
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
                                          }}>
                                          {singleMap.teacher_name}
                                        </Text>
                                        <View style={{flexDirection: 'row'}}>
                                          <Image
                                            source={books}
                                            style={Styles.bookStyle}
                                          />
                                          <Text style={Styles.contentTextStyle}>
                                            Numbre de evaluations :{' '}
                                            {
                                              singleMap.teacher_course_session_done
                                            }
                                          </Text>
                                        </View>

                                        <View style={{flexDirection: 'row'}}>
                                          <Image
                                            source={watch}
                                            style={Styles.bookStyle}
                                          />
                                          <Text style={Styles.contentTextStyle}>
                                            {singleMap.course_date} -{' '}
                                            {singleMap.course_time}
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
                                              half={true}
                                              starSize={20}
                                              fullStar={
                                                <Image
                                                  source={require('../../../../assets/icon/111.png')}
                                                  style={{
                                                    height: 20,
                                                    width: 20,
                                                    margin: 3,
                                                  }}
                                                />
                                              }
                                              emptyStar={
                                                <Image
                                                  source={require('../../../../assets/icon/112.png')}
                                                  style={{
                                                    height: 20,
                                                    width: 20,
                                                    margin: 3,
                                                  }}
                                                />
                                              }
                                              halfStar={
                                                <Image
                                                  source={require('../../../../assets/icon/113.png')}
                                                  style={{
                                                    height: 23,
                                                    width: 20,
                                                    margin: 3,
                                                  }}
                                                />
                                              }
                                            />
                                          </View>
                                          {/* <View style={Styles.continueBtn}>
                                            <TouchableOpacity
                                              onPress={() => {
                                                this.Show_Custom_Alert();
                                              }}>
                                              <Text
                                                style={Styles.continueBtnTxt}>
                                                Annuler
                                              </Text>
                                            </TouchableOpacity>
                                          </View> */}
                                        </View>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                :null
                              );                            
                          })}
                        </Fragment>
                      ) : this.state.coach_type == `lex deux me vont` ? (
                        <Fragment>
                          {this.state.teacherDetailsBookNow.map((singleMap) => {
                              // console.log("getting type 3============",singleMap.coach_type)
                              {                                
                                return (
                                  singleMap.coach_type == `lex deux me vont` ?

                                  <View style={Styles.contentView}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        
                                        this.props.navigation.navigate(
                                          'bookreservation',
                                          {
                                            teacher_id: singleMap.teacher_id,
                                            time_slot,
                                            reserve_date,
                                          },
                                        );
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
                                            }}>
                                            {singleMap.teacher_name}
                                          </Text>
                                          <View style={{flexDirection: 'row'}}>
                                            <Image
                                              source={books}
                                              style={Styles.bookStyle}
                                            />
                                            <Text style={Styles.contentTextStyle}>
                                              Numbre de evaluations :{' '}
                                              {
                                                singleMap.teacher_course_session_done
                                              }
                                            </Text>
                                          </View>
  
                                          <View style={{flexDirection: 'row'}}>
                                            <Image
                                              source={watch}
                                              style={Styles.bookStyle}
                                            />
                                            <Text style={Styles.contentTextStyle}>
                                              {singleMap.course_date} -{' '}
                                              {singleMap.course_time}
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
                                                half={true}
                                                starSize={20}
                                                fullStar={
                                                  <Image
                                                    source={require('../../../../assets/icon/111.png')}
                                                    style={{
                                                      height: 20,
                                                      width: 20,
                                                      margin: 3,
                                                    }}
                                                  />
                                                }
                                                emptyStar={
                                                  <Image
                                                    source={require('../../../../assets/icon/112.png')}
                                                    style={{
                                                      height: 20,
                                                      width: 20,
                                                      margin: 3,
                                                    }}
                                                  />
                                                }
                                                halfStar={
                                                  <Image
                                                    source={require('../../../../assets/icon/113.png')}
                                                    style={{
                                                      height: 23,
                                                      width: 20,
                                                      margin: 3,
                                                    }}
                                                  />
                                                }
                                              />
                                            </View>
                                            {/* <View style={Styles.continueBtn}>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  this.Show_Custom_Alert();
                                                }}>
                                                <Text
                                                  style={Styles.continueBtnTxt}>
                                                  Annuler
                                                </Text>
                                              </TouchableOpacity>
                                            </View> */}
                                          </View>
                                        </View>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                   :
                                  null
                                );
                              }                          
                          })}
                        </Fragment>
                      ) :                     
                        <Fragment>
                          {this.state.teacherDetailsBookNow.map((singleMap) => {
                              // console.log("getting type ============",singleMap.coach_type)
                            return (
                              <View style={Styles.contentView}>
                                <TouchableOpacity
                                  onPress={() => {
                                   
                                    this.props.navigation.navigate(
                                      'bookreservation',
                                      {
                                        teacher_id: singleMap.teacher_id,
                                        time_slot,
                                        reserve_date,
                                        transactinId:transactinId
                                      },
                                    );
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
                                        }}>
                                        {singleMap.teacher_name}
                                      </Text>
                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={books}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          Numbre de evaluations :{' '}
                                          {
                                            singleMap.teacher_course_session_done
                                          }
                                        </Text>
                                      </View>

                                      <View style={{flexDirection: 'row'}}>
                                        <Image
                                          source={watch}
                                          style={Styles.bookStyle}
                                        />
                                        <Text style={Styles.contentTextStyle}>
                                          {singleMap.course_date} -{' '}
                                          {singleMap.course_time}
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
                                            half={true}
                                            starSize={20}
                                            fullStar={
                                              <Image
                                                source={require('../../../../assets/icon/111.png')}
                                                style={{
                                                  height: 20,
                                                  width: 20,
                                                  margin: 3,
                                                }}
                                              />
                                            }
                                            emptyStar={
                                              <Image
                                                source={require('../../../../assets/icon/112.png')}
                                                style={{
                                                  height: 20,
                                                  width: 20,
                                                  margin: 3,
                                                }}
                                              />
                                            }
                                            halfStar={
                                              <Image
                                                source={require('../../../../assets/icon/113.png')}
                                                style={{
                                                  height: 23,
                                                  width: 20,
                                                  margin: 3,
                                                }}
                                              />
                                            }
                                          />
                                        </View>
                                        {/* <View style={Styles.continueBtn}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              this.Show_Custom_Alert();
                                            }}>
                                            <Text style={Styles.continueBtnTxt}>
                                              Annuler
                                            </Text>
                                          </TouchableOpacity>
                                        </View> */}
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </Fragment>
                      
                      
                      
                      }
                    </Fragment>
                  </Fragment>
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: SCREEN_HEIGHT / 3,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        margin: 10,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      No record found!
                    </Text>
                  </View>
                )}
              </Fragment>
            )}

            {/* :null
            } */}
          </ScrollView>
          :null}
















































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
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  Etes-vous sûr de vouloir annuler le cours
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  prévu avec votre étudiant?
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  Des pénalités peuvent s'appliquer.
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  {' '}
                  Voir CGV.
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#b41565',
                    alignSelf: 'center',
                  }}>
                  Termes et conditions
                </Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderRadius: 6,
                    justifyContent: 'space-around',
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
