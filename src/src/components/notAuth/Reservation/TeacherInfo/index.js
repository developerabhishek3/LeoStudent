import React, {Component} from 'react';
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

import chatImg from '../../../../assets/icon/11.png'

import cross from '../../../../assets/icon/17.png'

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';

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
    // this.props.navigation.navigate('chat')
    
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('clientinfo')
  }





  componentDidMount(){  


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
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Votre enseignant</Text>
          {/* <TouchableOpacity 
            onPress={()=>{this.props.navigation.navigate("chat")}}
          >
                <Image source={chatImg} style={Styles.headertxtInputImg} />
          </TouchableOpacity> */}
          <Image source={logo} style={Styles.headertxtInputImg1} />
          
        </View>

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
            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={People} style={Styles.peopleStyle} />
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginTop: 10,
                    }}>
                    Hardley Smith
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={books} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>Débutant</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image source={watch} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>
                      27.05.2020, 17h00 à 21h00
                    </Text>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Rating
                      type="custom"
                      ratingColor="#b41565"
                      ratingBackgroundColor="#c8c7c8"
                      ratingCount={5}
                      imageSize={15}
                      startingValue={0}
                      fractions={1}
                      // onFinishRating={this.ratingCompleted}
                      style={{paddingVertical: 10}}
                    />
                    <View style={Styles.continueBtn}>
                      <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                      <Text style={Styles.continueBtnTxt}>Annuler</Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}
                </View>
                
              </View>

            </View>








            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                {/* <Image source={People} style={Styles.peopleStyle} /> */}
                <View style={{flexDirection: 'column'}}>                
                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Profil du coach d'anglais : </Text>
                    <Text style={Styles.contentTextStyle}>Débutant</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Compétences : </Text>
                    <Text style={Styles.contentTextStyle}>Débutant</Text>
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Diplôme : </Text>
                    <Text style={Styles.contentTextStyle}>Débutant</Text>
                  </View>               
                </View>                
              </View>
            </View>




            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                {/* <Image source={People} style={Styles.peopleStyle} /> */}
                <View style={{flexDirection: 'column'}}>                
                  <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>À propos de </Text>
                    {/* <Text style={Styles.contentTextStyle}>Débutant</Text> */}
                  </View>

                  <View style={{flexDirection: 'row',margin:4}}>
                  {/* <Text style={Styles.contentTextStyle1}>Compétences : </Text> */}
                    <Text style={Styles.contentTextStyle2}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .
Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .
Envoyez la demande au coach</Text>
                  </View>

                  {/* <View style={{flexDirection: 'row',margin:4}}>
                  <Text style={Styles.contentTextStyle1}>Diplôme : </Text>
                    <Text style={Styles.contentTextStyle}>Débutant</Text>
                  </View>                */}
                </View>                
              </View>
            </View>



            



            
            <View style={Styles.continueBtn}>
                      <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                      <Text style={Styles.continueBtnTxt}>Appeler le client pour démarrer le coaching</Text>
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
                    Démarrer le coaching
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
          currentRoute={'history'}
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