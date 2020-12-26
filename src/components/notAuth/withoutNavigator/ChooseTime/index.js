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

import Styles from './indexCss';

import {RadioButton} from 'react-native-paper';

let today = '';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
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







  componentDidMount = async () => {
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




  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="blue"
          hidden={false}
        />
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Définir sa disponibilité</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.Show_Custom_Alert();
              }}>
              <Image source={rightIcon} style={Styles.headertxtInputImg2} />
            </TouchableOpacity>
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>

        <View style={Styles.mainContentView}>
          <ScrollView>
            <View style={Styles.subheaderView}>
              <Text style={Styles.subheaderTxt}>Choisissez une date</Text>
              <Image source={calenderIcon} style={Styles.headertxtInputImg1} />
            </View>
            <Calendar
              style={Styles.calenderStyle}
              minDate={today}
              // onDayPress={(day) => this.set_date(day)}
              // markedDates={this.state.markedDates }
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

            <View>
              <Text style={Styles.subheaderTxt}>
                Choisissez l'horaire du coaching
              </Text>

              <View style={Styles.txtMainView}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={Styles.txtHeaderView}>Durée de démarrage</Text>
                  <View style={Styles.SubTxtview}>
                    <Text style={Styles.timeTxtView}>14 H 30</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'column'}}>
                  <Text style={Styles.txtHeaderView}> La fin du temps</Text>
                  <View style={Styles.SubTxtview}>
                    <Text style={Styles.timeTxtView}>15 H 00</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={Styles.continueBtn}>
              <TouchableOpacity>
                <Text style={Styles.continueBtnTxt}>+ Ajouter un créneau</Text>
              </TouchableOpacity>
            </View>
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
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  width: '99%',
                  backgroundColor: 'rgba(0,0,230,0.700)',
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
                    onPress={()=>{this.Hide_Custom_Alert1()}}
                    style={{
                      backgroundColor: '#FF1493',
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
                      backgroundColor: '#FF1493',
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
