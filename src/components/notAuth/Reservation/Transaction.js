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
  Alert,
  RefreshControl
} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './TransactionCss';
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';

import cross from '../../../assets/icon/17.png'

import books from '../../../assets/icon/12.png';
import watch from '../../../assets/icon/14.png';
import People from '../../../assets/icon/25.png';

import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import {incomplete_reservation} from '../../../Api/afterAuth'


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      Alert_Visibility2: false,
      IncompleteReservation:[],
      isBodyLoaded: false,
      isSpinner: true,  
      toal_amount:"",
      isCurrenetComponentRefreshing:false,
      currentDate: new Date().toDateString(),
    };
  }








  incomplete_reservationData = async () => {
    const incomplete_reservationResponse = await incomplete_reservation();
    if (incomplete_reservationResponse.result == true) {
      // console.log("getting herer---------------",incomplete_reservationResponse.response)
      if(incomplete_reservationResponse.response.status == true){
        // console.log("gettig beffore stare==========",incomplete_reservationResponse.response)
        var IncompleteReservation = incomplete_reservationResponse.response.incomplete_transaction;
        // console.log("getting IncompleteReservation data----------",IncompleteReservation)
        this.setState({IncompleteReservation,isBodyLoaded:true,isSpinner:false,isCurrenetComponentRefreshing:false});
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
    // console.log("getting curret date and time - -  - -",(this.state.currentDate).toLocaleDateString())
    setInterval(() => {
      this.incomplete_reservationData()
    }, 600);
      
   
    
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
      nav.navigate('home');
      return true;
    }
  };







  
  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    
  }
  Show_Custom_Alert2(visible) {
    this.setState({Alert_Visibility2: visible});
  }
  Hide_Custom_Alert2() {
    this.setState({Alert_Visibility2: false});
    
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('clientinfo')
  }
  render() {

  let currentDate =   moment(this.state.currentDate).format('DD/MM/YYYY') 
  // console.log("getting current date inside render - - - - - -  -",currentDate)
  let newCurrentDate = new Date(currentDate).getTime()

    // console.log("getting inside render =============",newCurrentDate)



    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
           <Spinner visible={this.state.isSpinner} 
        />
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

        <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
            
            <Text style={Styles.subheadingTxt1}>En attente </Text>
            <View style={{borderColor: '#b41565', borderWidth: 1, width: 100}} />
          </View>


          
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("currentreservation")}}>
            <Text style={Styles.subheadingTxt2}>Réservations en cours</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 146,marginStart:4}}/>
            </TouchableOpacity>
          </View>


          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("history")}}>
            <Text style={Styles.subheadingTxt}> Historique</Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}}/>
            </TouchableOpacity>
          </View>

        </View>

        <View style={Styles.mainContainer}>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.incomplete_reservationData();
                      },100)  }} />
                    }>
            <View style={Styles.contentView}>         
            {
              this.state.isBodyLoaded == true ?
              <Fragment>
                {     
                this.state.IncompleteReservation.length > 0 ?
                <Fragment>
                  {
                        this.state.IncompleteReservation.map((singleIncompleteDate,index)=>{  
                          // console.log("getting all pending details - - - - - - - ",singleIncompleteDate.course_date)               
                          // const yourDate = new Date(singleIncompleteDate.course_date)         
                          // console.log("gettin all respose for checking reservation id - - - - -  - - - --  -",singleIncompleteDate)            
                          let NewDate = moment(singleIncompleteDate.course_date).format('DD/MM/YYYY') 
                          // console.log("new date insdie map function - -  - -",NewDate)
                          let CheckDate = new Date(NewDate).getTime()
                          // console.log("getting check date -  - - for getTiem",CheckDate,"current date for get time= = = = =  == = ",newCurrentDate)                      
                          // console.log("getting all date s  - -  - - - - - - - -",NewDate)
                          // let exactDate = NewDate[index+1]
                          // console.log('getting exact date -  - - - - - - - - - - -',exactDate)
                          // console.log("getting reservation id =============",singleIncompleteDate.id)                         
                          return(
                            <Fragment>
                                  
                        <View style={{width:'98%',borderWidth:1,borderColor:"#DDDDDD",borderRadius:10,elevation:0,shadowColor:"#FFFFFFF",shadowOffset:3,shadowOpacity:1,alignSelf:'center',margin:7}}> 

                                  {
                                     singleIncompleteDate.promocode_amount != 0 && singleIncompleteDate.promocode_amount != null && singleIncompleteDate.promocode_amount != undefined  ?

                                     <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                                     <Image style={{height:16,width:16,margin:3}} source={require("../../../assets/icon/currency.png")} />
                                     <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Bon cadeau</Text>                                     
                                     <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{singleIncompleteDate.promocode_amount} </Text>
                                     <Image style={{height:12,width:12,marginTop:6,marginLeft:-3}} source={require("../../../assets/icon/euro-currency-symbol-1.png")} />
                                     </View>

                                     : null
                                  }                                    
                                  {
                                    singleIncompleteDate.promocode_amount != 0 && singleIncompleteDate.promocode_amount != null && singleIncompleteDate.promocode_amount != undefined  ?
                                    

                                    <View style={{flexDirection:'row',margin:3,marginStart:10,borderWidth:0}}>
                                    <Image style={{height:16,width:16,margin:3}} source={require("../../../assets/icon/currency.png")} />
                                    <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Nom du code promo</Text>                                      
                                   <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{singleIncompleteDate.promocode_name} </Text>
                                   {/* <Image style={{height:12,width:12,marginTop:6,marginLeft:-3}} source={require("../../../assets/icon/euro-currency-symbol-1.png")} /> */}
                                 </View>



                                    :

                                     
                                    <View style={{flexDirection:'row',margin:3,marginStart:10,borderWidth:0}}>
                                    <Image style={{height:16,width:16,margin:3}} source={require("../../../assets/icon/currency.png")} />
                                    <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Prix</Text>
                                    {/* <Image style={{height:12,width:12,marginTop:6,marginRight:-6}} source={require("../../../assets/icon/euro-currency-symbol-1.png")} /> */}
                                    <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{singleIncompleteDate.course_amount} </Text>
                                    <Image style={{height:12,width:12,marginTop:6,marginLeft:-3}} source={require("../../../assets/icon/euro-currency-symbol-1.png")} />
                                  </View>

                                  }
                                   
                                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                                    <Image style={{height:16,width:16,margin:3}} source={require("../../../assets/icon/date.png")} />
                                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Date</Text>
                                  <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}> 
                                  
                                  {NewDate}
                                {/* { singleIncompleteDate.course_date}    */}
                                  </Text>
                                    </View>

                                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                                    <Image style={{height:16,width:16,margin:3}} source={require("../../../assets/icon/watch.png")} />
                                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Heure</Text>
                                        <View style={{flexDirection:'row',}}> 
                                  <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{singleIncompleteDate.course_time}</Text>                                         
                                      </View>                                      
                                    </View>                                       
                                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                                    <Image style={{height:16,width:16,margin:3}} source={require("../../../assets/icon/watch.png")} />
                                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Durée</Text>
                                        <View style={{flexDirection:'row',}}> 
                                  <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{singleIncompleteDate.course_duration}</Text>
                                         
                                      </View>
                                    </View>


                              <View style={{flexDirection:'row',justifyContent:"space-between",margin:1,marginRight:30,width:"90%",}}>
                                    {
                                      CheckDate >= newCurrentDate ?
                                      <View style={Styles.continueBtn}>
                                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("searchteacher",{
                                        time_slot:singleIncompleteDate.course_time,
                                        reserve_date:singleIncompleteDate.course_date,
                                        transactinId:singleIncompleteDate.id,
                                        booktype:singleIncompleteDate.booking_type
                                      })}}>
                                      <Text style={Styles.continueBtnTxt}>Trouver un coach</Text>
                                      </TouchableOpacity>
                                    </View>
                                   : <View style={Styles.continueBtn}>
                                    <TouchableOpacity onPress={()=>{this.Show_Custom_Alert2()}}>
                                    <Text style={Styles.continueBtnTxt}>Trouver un coach</Text>
                                    </TouchableOpacity>
                                  </View> 

                                     } 
                                    

                                    <View style={Styles.continueBtn}>
                                      <TouchableOpacity onPress={                                        
                                        ()=>{this.props.navigation.navigate("modifyreservation",{
                                        changeTimeDate:"changeTimeDate",
                                        reservation_id:singleIncompleteDate.id,
                                        course_duration:singleIncompleteDate.course_duration

                                      })}}>
                                      <Text style={Styles.continueBtnTxt1}>Modifier ma réservation</Text>
                                      </TouchableOpacity>
                                    </View>
                            </View>      
                            </View>                      
                                    </Fragment>
                                  )
                                })
                  }               
                        </Fragment>
                      :<View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
                        <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}></Text>
                      </View>
                      }
              </Fragment>
              :<View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
              <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}></Text>
            </View>
            }
            
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
                backgroundColor: 'rgba(85, 65, 225,50)',
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
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Etes-vous sûr de vouloir annuler le cours</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>prévu avec votre étudiant?</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Des pénalités peuvent s'appliquer.</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}> Voir CGV.</Text>
                  <Text style={{margin:2,fontSize:14,fontWeight:'700',color:"#b41565",alignSelf:'center'}}>Termes et conditions</Text>

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







          <Modal
            visible={this.state.Alert_Visibility2}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert2(!this.state.Alert_Visibility2);
            }}>
            <View
              style={{
                // backgroundColor:'#FFF',
                backgroundColor: 'rgba(85, 65, 225,50)',
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
                      source={cross}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  
                </View>  
                 <View style={{alignSelf:'center',justifyContent:'center',alignItems: 'center'}}>
                  <Text style={{margin:10,fontSize:16,fontWeight:'700',color:"gray",textAlign:'center'}}>Votre date et/ou heure de réservation est antérieure à la date actuelle. Modifiez votre réservation pour trouver un coach !</Text>
                 </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'center',
                    alignItems:'center',
                    alignSelf:'center',
                    margin: 5,
                  }}>
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
                        fontSize: 13,
                        marginStart: 50,
                        marginEnd: 50,
                        fontWeight: '700',
                        textAlign: 'center',                        
                      }}>
                     Ok
                    </Text>
                  </TouchableOpacity>                
                </View>
              </View>
            </View>
          </Modal>




        </View>








        <BottomNavigator
          currentRoute={'transaction'}
          navigation={this.props.navigation}
        />
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