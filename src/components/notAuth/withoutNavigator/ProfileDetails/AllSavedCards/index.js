
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

import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';

import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {WebView} from 'react-native-webview';
import Styles from './indexCss';
import Spinner from 'react-native-loading-spinner-overlay';

import {saved_cards,delete_saved_card} from '../../../../../Api/afterAuth'
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
      SavedCardCheck:false,
      cardCheck:false,
      isButtonEnable:false,
      isBodyLoaded:false,
      isSpinner:true,
      SavedCardData:[],
      card_id:0,
    };
  }






  saved_cardsData = async () => {
    const saved_cardsResponse = await saved_cards();
    if (saved_cardsResponse.result == true) {
      // console.log("getting herer---------------",saved_cardsResponse.response)
      if(saved_cardsResponse.response.status == true){
        // console.log("gettig beffore stare==========",saved_cardsResponse.response)
        var SavedCardData = saved_cardsResponse.response.cards;
        // console.log("getting SavedCardData data----------",SavedCardData)
        this.setState({SavedCardData,isBodyLoaded:true,isSpinner:false,isCurrenetComponentRefreshing:false});
      }
      else{
        this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
          Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
              this.props.navigation.goBack();
          }}]);
      })
      }
    }
    // else{
    //   this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
    //     Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
    //         this.props.navigation.goBack();
    //     }}]);
    // })
    // }  
    // console.log("getting country response----------------",countryData.country_list)
  };








  componentDidMount = async () => {


    let timeDuration =  this.props.navigation.getParam('timeDuration')
    console.log("getting timeDuration slot here -  - - - - --",timeDuration)
  
    let reserve_time = this.props.navigation.getParam('reserve_time');
  
    let reserve_date = this.props.navigation.getParam('reserve_date')

    let exacttime = this.props.navigation.getParam('exacttime');


    let time_slot = `${reserve_time}-${exacttime} `



    this.setState({date_slot:reserve_date,time_slot})

    // console.log("getting firts ---------",exacttime,reserve_time)
    // console.log("getting 2 ------",reserve_date)



    setInterval(() => {
      this.saved_cardsData()
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
      nav.goBack();
      return true;
    }
  };

  // paypalFunction() {
  //   let amount_en = this.props.navigation.getParam('amount_en');
  //   let reserve_time = this.props.navigation.getParam('reserve_time');
  //   let timeDuration = this.props.navigation.getParam('timeDuration');
  //   let reserve_date = this.props.navigation.getParam('reserve_date');
  //   let promocodeId = this.props.navigation.getParam('promocodeId');

  //   let amount = this.props.navigation.getParam('amount');
  //   let exacttime = this.props.navigation.getParam('exacttime');

  //   this.setState({paypalCheck:true})

  //   console.log("i am abhishek ------",timeDuration)

  //   this.setState({checked2: !this.state.checked2});
  // }


  Fetchdelete_saved_card = async (card_id) => {    
    // console.log("inside the deltet card API Funciton - -  - - - -  - -",card_id)
        
    const delete_saved_cardResponse = await delete_saved_card({
      card_id,
    });
    if (delete_saved_cardResponse.result === true) {
      this.saved_cardsData();
      console.log(
        'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
        delete_saved_cardResponse.response,
      );
    } else {
      this.myAlert('Error', delete_saved_cardResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };







  cardFunction(){
 



    this.setState({checked2:false,paypalCheck:false,SavedCardCheck:true})
    this.setState({checked1: !this.state.checked1});


  }
  render() {
    // let amount_en = this.props.navigation.getParam('amount_en');
    // let reserve_time = this.props.navigation.getParam('reserve_time');  
    // let reserve_date = this.props.navigation.getParam('reserve_date');
    // let promocodeId = this.props.navigation.getParam('promocodeId');
    // let amount = this.props.navigation.getParam('amount');
    // let exacttime = this.props.navigation.getParam('exacttime');      
    // let time_slot =  this.props.navigation.getParam('time_slot')
    // let timeDuration =  this.props.navigation.getParam('timeDuration')      
    // let booktype = this.props.navigation.getParam("booktype")
    // let user_id = this.props.navigation.getParam("user_id")


    // console.log("inside did mount found time slot --------",this.state.time_slot)
    // console.log("inside did mount found time slot --------","amount_en :" + amount_en,"reserve_time : "+reserve_time,"reserve_date"+reserve_date,"time_slot"+time_slot,"promocodeId"+promocodeId)
    // console.log("inside did mount found time slot --------","amount :" + amount,"exacttime : "+exacttime,  "booktype"+booktype,"user_id"+user_id)
    let email = this.props.navigation.getParam("email")
    console.log("getting inisde the render method ???????????????",email)
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
          <Text style={Styles.headerTxt}>Carte sauvegardée</Text>
          <View style={{flexDirection: 'row'}}>
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>

        <Spinner visible={this.state.isSpinner} />    
        <View style={Styles.mainContentView}>
            {
              this.state.isBodyLoaded == true ?
              <ScrollView>        
              {
                this.state.SavedCardData.length > 0 ?
  
                
                <View style={{marginTop:10,marginBottom:10,margin:7}}>
  
                  {
                    this.state.SavedCardData.map((singleMap,key)=>{
                      // console.log("getting cart id here - -  - - - - - ",singleMap.id)
                      let card_id = singleMap.id
                      return(
                        <View  style={{width:"90%", flexDirection:"row",justifyContent:"center",alignItems:"center",borderColor:"#DDDDDD",borderWidth:1,borderRadius:7,margin:10,}}>
                          
                              {/* <TouchableOpacity 
                                    onPress={()=>{this.setState({checked:key,level_id:singleMap.id})}}
                              style={{flexDirection:"row",justifyContent:"space-between",borderColor:"#DDDDDD",borderWidth:1,borderRadius:7,margin:10}}  
                              >      
                               */}
                                <View style={{flexDirection:"row",width:"80%",alignItems:"center"}}>
                                 <Image
                                         source={require('../../../../../assets/icon/card.png')}
                                          style={{
                                            width: 24,
                                            height: 24,
                                            borderWidth: 1,
                                            margin:9
                                          }} 
                                        />   
                                    <Text style={{textAlign:"center",margin:9,fontWeight:"600",paddingStart:0,fontSize:13,color:"#000000"}}>xxxx xxxx xxxx {singleMap.last4}</Text>
                                    </View>
                                  
                                    <TouchableOpacity 
                                      onPress={()=>{                                      
                                      this.Fetchdelete_saved_card(card_id)    }}
                                    style={{width:"20%",alignSelf:"flex-end",justifyContent:"flex-end",}}>
                                    <Image
                                          source={require('../../../../../assets/icon/31.png')}
                                          style={{
                                            width: 27,
                                            height: 27,
                                            borderWidth: 1,
                                            margin:9,
                                            alignSelf:"flex-end"
                                          }}
                                        />                              
                                          </TouchableOpacity>  
                                          </View>                      
                                    
                                    )
                                  })
  
                          }
  
  
                </View>
  
  
  
                :
                <View>
                  <Text></Text>
                </View>
  
  
  
              }
  
  
  
  
  
  
              {/* <View style={Styles.continueBtn}>
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
                      this.props.navigation.navigate("stripe",{
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
  
                    }
                    
                  }}               
                >
                  <Text style={Styles.continueBtnTxt}>Continuer</Text>
                </TouchableOpacity>
              </View> */}
  
              
            <View style={Styles.continueBtn}>     
  
                  <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate("addcarddetails",{email:email})}}            
                >
                  <Text style={Styles.continueBtnTxt}> + Ajouter une carte</Text>
                </TouchableOpacity>              
              </View>
            </ScrollView>
  
  



              :

              <View>
                <Text></Text>
              </View>



            }


        



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
