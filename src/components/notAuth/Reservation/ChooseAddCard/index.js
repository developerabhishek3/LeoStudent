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
import { CheckBox, Overlay, Button } from 'react-native-elements';

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
      checked1: false,
    };  
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('searchteacher');
    
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
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Ajouter votre moyen de paiement</Text>
          <View style={{flexDirection: 'row'}}>            
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>

        <View style={Styles.mainContentView}>
          <ScrollView>  


              <View>
                  <TextInput 
                    style={{borderWidth:1,borderColor:"gray",borderRadius:7,width:"94%",alignSelf:'center',height:44,margin:10,color:"gray"}}
                    placeholderTextColor="gray"
                    placeholder="Votre email"
                  />


                <TextInput 
                    style={{borderWidth:1,borderColor:"gray",borderRadius:7,width:"94%",alignSelf:'center',height:44,margin:10,color:"gray"}}
                    placeholderTextColor="gray"
                    placeholder="Nom sur la carte"
                  />

                  
                <TextInput 
                    style={{borderWidth:1,borderColor:"gray",borderRadius:7,width:"94%",alignSelf:'center',height:44,margin:10,color:"gray"}}
                    placeholderTextColor="gray"
                    placeholder="Numéro de la carte bancaire"
                  />
            </View>

            <View style={{flexDirection:"row",margin:3,alignSelf:'center',width:'95%'}}>
                <TextInput 
                    style={{borderColor:"gray",borderWidth:1,height:44,borderRadius:10,width:'32%',margin:2}}
                    placeholder="Mois d'expiration"  
                    placeholderTextColor="gray"                  
                />

                <TextInput 
                    style={{borderColor:"gray",borderWidth:1,height:44,borderRadius:10,width:'32%',margin:2}}
                    placeholder="Année d'expiration"
                    placeholderTextColor="gray"
                />
                <TextInput 
                    style={{borderColor:"gray",borderWidth:1,height:44,borderRadius:10,width:"32%",margin:2}}
                    placeholder="CVV"
                    placeholderTextColor="gray"
                />
            </View>

            <View style={{flexDirection:'row',margin:3}}>
            <CheckBox
                  checked={this.state.checked1}
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
                  checkedIcon={
                    <Image
                      source={require('../../../../assets/icon/4.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                       
                      }}
                    />
                  }
                  uncheckedIcon={
                    <Image
                    source={require('../../../../assets/icon/9.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                     
                      }}
                    />

                  }
                />

                <Text style={{fontSize:14,fontWeight:'600',margin:1,width:'80%',marginTop:10,color:"#000000"}}>Enregistrer cette carte pour mes 
prochains coachings
Régler avec cette carte</Text>
</View>

       

            {/* <View style={{width:'94%',borderWidth:0,borderRadius:10,elevation:3,shadowColor:"#FFFFFFF",shadowOffset:3,shadowOpacity:1,alignSelf:'center',margin:20,height:40,justifyContent:'center',}}> 
                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Image style={{height:16,width:16,margin:3}} source={require("../../../../assets/icon/card-2.png")} />
                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Paypal</Text>
                        </View>
                        <View style={{margin:10}}>
                        <CheckBox
                  checked={this.state.checked1}
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
                  checkedIcon={
                    <Image
                      source={require('../../../../assets/icon/4.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                       
                      }}
                    />
                  }
                  uncheckedIcon={
                    <Image
                    source={require('../../../../assets/icon/9.png')}
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
            </View> */}

           



         
          

            <View style={Styles.continueBtn}>
              <TouchableOpacity 
              
                onPress={()=>{this.Show_Custom_Alert()}}
              >
                <Text style={Styles.continueBtnTxt}>Continuer</Text>
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
                      source={require('../../../../assets/icon/9.png')}
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
                     Commencer votre coaching
                  </Text>
                </View>  
                  <Text style={{margin:2,fontSize:13,fontWeight:'700',color:"gray",alignSelf:'center'}}>Merci. Votre paiement a été effectué</Text>
                  <Text style={{margin:2,fontSize:13,fontWeight:'700',color:"gray",alignSelf:'center'}}>avec succès. Votre coach d'anglais</Text>
                  <Text style={{margin:2,fontSize:13,fontWeight:'700',color:"gray",alignSelf:'center'}}>se prépare à vous contacter.</Text>

                <View
                  style={{                           
                    borderRadius: 6,
                    alignSelf:'center',                    
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
                        fontSize: 14,
                        marginStart: 30,
                        marginEnd:30,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                       Continuer
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
