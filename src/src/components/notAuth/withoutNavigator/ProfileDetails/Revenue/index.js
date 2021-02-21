import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  BackHandler
} from 'react-native';

import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import cross from '../../../../../assets/icon/26.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
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
    this.props.navigation.navigate('profile2');
  }









  componentDidMount = async () => {
  
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
        <View style={Styles.header}>
          <Image source={back} style={Styles.headertxtInputImg} />
          <Text style={Styles.headerTxt}>Mes revenus</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>

        <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt}>Tiré De</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt}>Vers</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}} />
          </View>
        </View>

        <View style={Styles.mainContainer}>
          <ScrollView>
            <View style={Styles.contentContainer}>
              <View style={Styles.contentContainerView}>
                <View style={Styles.insidecontentContainer}>
                  <Text style={Styles.mainHeader}>
                    Numéro de réservation : #58965
                  </Text>
                  <Text style={Styles.subHeader}>
                    Nom du client : Hardley Smith
                  </Text>
                  <Text style={Styles.subHeader}>Niveau : Débutant</Text>
                  <Text style={Styles.subHeader}>
                    Date de reservation : 27.05.2020, 17h00 à 21h00
                  </Text>
                </View>
                <View style={Styles.currenyStylesView}>
                  <Text style={Styles.currencyTxtStyle}>60 €</Text>
                </View>
              </View>
            </View>

            <View style={Styles.btnView}>
              <View>
                <TouchableOpacity
                  style={Styles.continueBtn1}
                  onPress={() => {
                    this.Show_Custom_Alert();
                  }}>
                  <Text style={Styles.continueBtnTxt1}>
                    Grin total :190.00 €
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={Styles.continueBtn}
                  onPress={() => {
                    this.Show_Custom_Alert();
                  }}>
                  <Text style={Styles.continueBtnTxt}>Domainder reglement</Text>
                </TouchableOpacity>
              </View>
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
                   Demander le paiement
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
                 Saisissez le montant que vous voulez
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                 demander pour le paiement. Ce montant
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  vous sera payé par virement bancaire à la
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                 fin de chaque mois.
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
                      Demander
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

// 26.
//    
// 90.00 €
// vers mon compte bancaire
// vers mon compte Paypal
// 