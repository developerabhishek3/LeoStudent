import React, {Component,Fragment} from 'react';
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
  RefreshControl
} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss'
import logo from '../../../../assets/icon/96.png';

import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png'

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Stars from 'react-native-stars';
import Spinner from 'react-native-loading-spinner-overlay';

import { history_reservation } from '../../../../Api/afterAuth'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,

      Alert_Visibility1:false,
      Model_Visibility1:false,
      historyData:[],
      isBodyLoaded:false,
      isSpinner:true,
      isCurrenetComponentRefreshing:false
    };
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate("choosetime")
    
  }




  Show_Custom_Alert2(visible) {
    this.setState({Alert_Visibility1: visible});
  }
  Hide_Custom_Alert3() {
    this.setState({Alert_Visibility1: false});
    this.props.navigation.navigate("booknowchoosetime")  
  
  }

  Hide_Custom_Alert2() {
    this.setState({Alert_Visibility1: false}); 
    this.props.navigation.navigate("choosetime")  
  }



  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});

  }




  Hide_Custom_Alert4() {
    this.setState({Alert_Visibility1: false}); 
    this.props.navigation.navigate("history")  
  }





  async componentDidMount() {
    this.history_reservationFunction()      

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }








  history_reservationFunction = async () => {
    const history_reservationResponse = await history_reservation();
    if (history_reservationResponse.result == true) {   
        console.log("getting response result true - -  - - - - - - - - - - -",history_reservationResponse.response)
     var historyData = history_reservationResponse.response.history_transaction
      console.log("getting history Data = = =  = = =  =  =",historyData) 
      
    }
    this.setState({historyData})
    this.setState({isBodyLoaded:true,isSpinner:false,isCurrenetComponentRefreshing:false});
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








  
  render() {


console.log("insiderender =",this.state.historyData)

    return (
      <View style={Styles.container}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Réservations</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner} 
        />

        <View style={Styles.subhaderView}>
         
        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity >
            <Text style={Styles.subheadingTxt1}>Historique</Text>
            <View style={{borderColor: '#b41565', borderWidth: 1, width: 100}} />
            </TouchableOpacity>
          </View>

        


          <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("currentreservation")}}>
            <Text style={Styles.subheadingTxt}>Réservations en cours</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 146,marginStart:4}}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("transaction")}}>
            <Text style={Styles.subheadingTxt}>En attente</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}}/>
            </TouchableOpacity>
          </View>
         
        </View>

        <View style={Styles.mainContainer}>

      {

        this.state.isBodyLoaded == true ?


        <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.history_reservationFunction();
                      },100)  }} />
                    }>
        


        {
          

          this.state.historyData.length > 0 ?

  <View style={Styles.contentView}>
            <Fragment>
           {


            this.state.historyData.map((singleHistoryMap)=>{
              console.log("kkkkkkkkkkkkkkkkkkkkkkkk",singleHistoryMap.teacher_rating)

              let date1   = singleHistoryMap.course_date
              var newdate = date1.split("-").reverse().join("/");
              console.log("getting new date here - -  - - - - -",newdate)

              return(
                <Fragment>
            <View style={{flexDirection: 'row',borderWidth:1,margin:4,borderColor:"#DDDDDD",borderRadius:7}}>
           
              <Image 
              
              source={{
                uri: `https://www.spyk.fr/${singleHistoryMap.teacher_profile_url}`,
              }} 
              style={Styles.peopleStyle} />
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    margin: 2,
                    marginTop: 10,
                  }}>
                {singleHistoryMap.teacher_name}
                </Text>
               

                <View style={{flexDirection: 'row'}}>
                  <Image source={watch} style={Styles.bookStyle} />
                  <Text style={Styles.contentTextStyle}>
                    {newdate} - { singleHistoryMap.course_time}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                   <View style={{alignItems:'center'}}>
                                    <Stars
                                      default={singleHistoryMap.teacher_rating}
                                      count={5}
                                      disabled={true}
                                      half={true}
                                      starSize={20}
                                      fullStar={<Image source={require("../../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                                      emptyStar={<Image source={require("../../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                                      halfStar={<Image source={require("../../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
                                    />
                                  </View>
                                 {/* {
                                   singleHistoryMap.teacher_rating == null || singleHistoryMap.teacher_rating == undefined || singleHistoryMap.teacher_rating == ""  ?
                                   <Text style={Styles.contentTextStyle}>
                                  0 avis
                                  </Text>
                                  : <Text style={Styles.contentTextStyle}>
                                  { singleHistoryMap.teacher_rating} avis
                                  </Text>
                                 }  */}
                </View>
                {
                  singleHistoryMap.teacher_rating == null || singleHistoryMap.teacher_rating == undefined || singleHistoryMap.teacher_rating == "" || singleHistoryMap.teacher_rating == 0 ?

                  <View style={Styles.continueBtn}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("profile",{
                        teacher_id:singleHistoryMap.teacher_id,
                        course_date:singleHistoryMap.course_date,
                        course_time:singleHistoryMap.course_time,
                        teacher_name:singleHistoryMap.teacher_name,
                        teacher_profile_url:singleHistoryMap.teacher_profile_url
                        })}}>
                    <Text style={Styles.continueBtnTxt}>Evaluer mon coach</Text>
                    </TouchableOpacity>
                  </View>
                  :null
                }
                
              </View>
              
            
            </View>
            {/* </TouchableOpacity> */}
              </Fragment>
              )
            })

            }





            </Fragment>
  </View>


          :
        
          <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
          <Text style={{textAlign:'center',fontWeight:'700',fontSize:18}}>Aucun coaching fait</Text>
        </View>


        }

      
      </ScrollView>

        :

        <View style={{justifyContent:'center',alignItems:'center',marginTop:200}}>
        <Text style={{textAlign:'center',fontWeight:'700',fontSize:18}}></Text>
      </View>
      }

         

          <View style={{position:"absolute",alignSelf:"flex-end",right:20,bottom:20}}>
            <TouchableOpacity onPress={()=>{this.Show_Custom_Alert2()}} style={{backgroundColor:"#b41565",borderRadius:10,justifyContent:"center",flexDirection:"row"}}>
            <Image source={require("../../../../assets/icon/calendar3.png")} style={{height:27,width:27,margin:10}} />
            <Text style={{fontSize:14,fontWeight:'700',color:"#FFFFFF",margin:10,marginStart:0,marginEnd:20,alignSelf:'center'}}>Réserver mon coaching</Text>
            </TouchableOpacity>
          </View>
          




          <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility1);
            }}>
           <View
              style={{
                // backgroundColor:'#FFF',
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
              
              }}>

                <TouchableOpacity onPress={() =>{this.Hide_Custom_Alert4()}} >
                <Image
                      source={require("../../../../assets/icon/20.png")}
                      style={{height: 24, width: 24, margin: 20,borderWidth:0}}
                    />

                </TouchableOpacity>

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
                      source={require("../../../../assets/icon/mobile.png")}
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
                   Réservation de mon coaching d'anglais
                  </Text>
                </View>                  

                <View
                  style={{                                        
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert3()}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                      width:'90%',
                      alignSelf:'center',
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 12,
                        marginStart: 15,
                        marginEnd: 15,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                    Faire mon coaching maintenant
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert2()}
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
                        fontSize: 12,
                        marginStart: 15,
                        marginEnd: 15,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                     Programmer mon coaching pour plus tard
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            </View>
          </Modal>










        </View>

        <BottomNavigator
          currentRoute={'currentreservation'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

