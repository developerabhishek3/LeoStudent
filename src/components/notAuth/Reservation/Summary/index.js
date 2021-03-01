import React, {Component,Fragment} from 'react';
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

import NumberFormat from 'react-number-format';

import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';
import rightIcon from '../../../../assets/icon/33.png';
import calenderIcon from '../../../../assets/icon/10.png';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import AsyncStorage from '@react-native-community/async-storage'

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
      promocodeId:0,
      amount:0,
      exacttime:'',
      promocode:"",
      time_slot:"",
      user_id:0,
    };
    today = moment().format('YYYY-MM-DD');
  } 














  async componentDidMount(){


    let UserId = await AsyncStorage.getItem('user_id');
        
    let user_id = JSON.parse(UserId)
    setTimeout(() => {
        this.setState({user_id})
    }, 100);



    let time_slot;
    let timeDuration = this.props.navigation.getParam("timeDuration")
    let reserve_time = this.props.navigation.getParam("reserve_time")
    // console.log("getting timeuration inisde valida ===",reserve_time)
    if(timeDuration == `30 minutes`) {

      var exacttime = moment(reserve_time, 'HH:mm A')       
      .add(30, 'minutes')
      .format("HH:mm")
      setTimeout(() => {
        this.setState({exacttime})
      }, 10);

      // console.log("gett   1111111---------",exacttime)
     } 
     else{
      var exacttime = moment(reserve_time, 'HH:mm A')       
      .add(60, 'minutes')
      .format("HH:mm")
      setTimeout(() => {
        this.setState({exacttime})
      }, 10);
  
      // console.log("gett   22222222---------",exacttime)
     }

      time_slot = `${reserve_time}-${exacttime}`
     this.setState({time_slot})

     console.log("gettint time slot----------",time_slot)


  

    setInterval(() => {
      this.getPromocodeId()
    }, 100);
    

    
    
    // this.checkTimeDuration()

    let amount_en = this.props.navigation.getParam("amount_en")
    // let reserve_time = this.props.navigation.getParam("reserve_time")
    // let timeDuration = this.props.navigation.getParam("timeDuration")

    let reserve_date = this.props.navigation.getParam("reserve_date")

  //  console.log("getting  reserve_date and amount --4 ----------",reserve_date,)

  
 

   BackHandler.addEventListener('hardwareBackPress', () =>
   this.handleBackButton(this.props.navigation),
 );
  }




  getExactTime(){
    let reserve_time = this.props.navigation.getParam('reserve_time');
  
    let reserve_date = this.props.navigation.getParam('reserve_date')

    let exacttime = this.state.exacttime


    let time_slot = `${reserve_time}-${exacttime}`

    console.log("timeslot ===========",time_slot)

    this.setState({date_slot:reserve_date,time_slot})
  }

  getPromocodeId(){  
      let promocodeData = this.props.navigation.getParam("singleMap")      
      // console.log("getting promocode value -        ======== = =  = =  = =",promocodeData)
      if(promocodeData != null || promocodeData != undefined ){
        let promocodeId = promocodeData.id
        let amount = promocodeData.amount
        let promocode =promocodeData.code
        setTimeout(() => {
          this.setState({ promocodeId,amount,promocode})
        }, 300);
      
      }    
  } 


    checkTimeDuration () {      
      let timeDuration = this.props.navigation.getParam("timeDuration")
      let reserve_time = this.props.navigation.getParam("reserve_time")
      // console.log("getting timeuration inisde valida ===",reserve_time)
      if(timeDuration == `30 minutes`) {

        var exacttime = moment(reserve_time, 'HH:mm A')       
        .add(30, 'minutes')
        .format("HH:mm")
        setTimeout(() => {
          this.setState({exacttime})
        }, 10);

        // console.log("gett   1111111---------",exacttime)
       } 
       else{
        var exacttime = moment(reserve_time, 'HH:mm A')       
        .add(60, 'minutes')
        .format("HH:mm")
        setTimeout(() => {
          this.setState({exacttime})
        }, 10);
    
        // console.log("gett   22222222---------",exacttime)
       }
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
    // console.log("iniside the render finding id ---------",this.state.promocodeId,this.state.amount)

    // console.log("gettintg user id here----------------",this.state.user_id)
 
    let amount_en = this.props.navigation.getParam("amount_en")

    let realamout = amount_en

    let afterAmount = amount_en - this.state.amount;

    // console.log("getting after adding promocode amount-------------",this.sta)


    // console.log("gettigittiti----------",afterAmount)

    // console.log("gettig real ampunt ============",realamout)
    

    let reserve_time = this.props.navigation.getParam("reserve_time")
    let timeDuration = this.props.navigation.getParam("timeDuration")


    let booktype = this.props.navigation.getParam("booktype")
    let reserve_date = this.props.navigation.getParam("reserve_date")

    // console.log("getting course reservationp +++++++++++++++++++++++",this.state.time_slot)


    // console.log("getting promocode  -",typeof this.state.promocode)

  
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="#5541E1"
          hidden={false}
        />
        <View style={Styles.header}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Confirmation</Text>
          <View style={{flexDirection: 'row'}}>            
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>

        <View style={Styles.mainContentView}>
          <ScrollView>  

            <View style={{width:'94%',borderWidth:1,borderColor:"#DDDDDD",borderRadius:10,elevation:0,shadowColor:"#FFFFFFF",shadowOffset:3,shadowOpacity:1,alignSelf:'center'}}> 
                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                        <Image style={{height:16,width:16,margin:3}} source={require("../../../../assets/icon/currency.png")} />
                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Prix</Text>
                        <Image style={{height:12,width:12,marginTop:6,marginRight:-10}} source={require("../../../../assets/icon/euro-currency-symbol-1.png")} />
    <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{amount_en} </Text>
    
                    </View>
                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                    <Image style={{height:16,width:16,margin:3}} source={require("../../../../assets/icon/date.png")} />
                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Date</Text>
              <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{reserve_date}</Text>
                    </View>
                    <View style={{flexDirection:'row',margin:3,marginStart:10}}>
                    <Image style={{height:16,width:16,margin:3}} source={require("../../../../assets/icon/watch.png")} />
                        <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Heure</Text>
                        <View style={{flexDirection:'row',}}> 
    <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{reserve_time}-{this.state.exacttime}</Text>
                            {/* {                              
                                  timeDuration == `30 minutes` ?
                                <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}> {}</Text>
                                  :
                                  <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>{reserve_time + 60} </Text>
                                } */}
                      </View>
                    </View>
            </View>

            {
              this.state.promocode != "" ?

               <View style={{flexDirection:'row',justifyContent:"space-between",margin:10,marginStart:15,marginEnd:15}}>
               <Text style={{margin:10,fontSize:15}}>J'ai un bon cadeau !</Text>

               <TouchableOpacity style={{margin:10,borderColor:"#b41565",borderWidth:1,}}>
            <Text style={{margin:10,color:"#b41565",borderWidth:0,}}>{this.state.promocode}</Text>
               </TouchableOpacity>
            </View>  
            :null
            }
            


            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("promocode")}} style={{backgroundColor:"#b41565",alignSelf:"flex-end",margin:10,borderRadius:10}}>
            <Text style={{alignSelf:'flex-end',margin:3,color:"#ffffff",marginStart:20,marginEnd:20,margin:10}}>Utillser</Text>
            </TouchableOpacity>


              {
                   this.state.amount != "" ?
                   <Fragment>
                     {
                       afterAmount  > 0 ?

                        <View style={{flexDirection:'row',justifyContent:"space-between",margin:10,marginStart:15,marginEnd:15}}>
                        <Text style={{margin:10,fontSize:15}}>Votre derniere accusation</Text>

                        <TouchableOpacity style={{margin:10,borderColor:"#b41565",borderWidth:1,flexDirection:'row'}}>
                        <Image style={{height:12,width:12,marginTop:13,marginRight:-10}} source={require("../../../../assets/icon/euro-currency-symbol-1.png")} />
                          {/* <Text style={{margin:10,color:"#b41565",borderWidth:0,}}>{realamout}</Text> */}
                            

                          <Text style={{margin:10,color:"#b41565",borderWidth:0,}}>{afterAmount}</Text>
                          {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
                        </TouchableOpacity>
                        </View>                         
                        :

                        
                        <View style={{flexDirection:'row',justifyContent:"space-between",margin:10,marginStart:15,marginEnd:15}}>
                        <Text style={{margin:10,fontSize:15}}>Votre derniere accusation</Text>

                        <TouchableOpacity style={{margin:10,borderColor:"#b41565",borderWidth:1,flexDirection:'row'}}>
                        <Image style={{height:12,width:12,marginTop:13,marginRight:-10}} source={require("../../../../assets/icon/euro-currency-symbol-1.png")} />
                          {/* <Text style={{margin:10,color:"#b41565",borderWidth:0,}}>{realamout}</Text> */}
                            

                          <Text style={{margin:10,color:"#b41565",borderWidth:0,}}>{  0  }</Text>
                          {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
                        </TouchableOpacity>
                        </View>     
                     }            
            </Fragment>
            :null
              }
 
                
                 <View style={Styles.continueBtn}>
                 <TouchableOpacity onPress={()=> { 
                    afterAmount > 0 ?
                    this.props.navigation.navigate("paymentoption",{
                        amount_en:realamout,
                        reserve_time:reserve_time,
                        timeDuration:timeDuration,
                        reserve_date:reserve_date,
                        promocodeId:this.state.promocodeId,
                        amount:this.state.amount,
                        exacttime:this.state.exacttime,
                        booktype:booktype,
                        time_slot:this.state.time_slot,
                        user_id:this.state.user_id
                        

                 })
                : 
                this.props.navigation.navigate("stripe",{
                  amount_en:realamout,
                  reserve_time:reserve_time,
                  timeDuration:timeDuration,
                  reserve_date:reserve_date,
                  promocodeId:this.state.promocodeId,
                  amount:this.state.amount,
                  exacttime:this.state.exacttime,
                  booktype:booktype,
                  time_slot:this.state.time_slot,
                  user_id:this.state.user_id
                        
           })
                }}>
                   <Text style={Styles.continueBtnTxt}>Réserver et payer</Text>
                 </TouchableOpacity>
               </View>
               
           
          </ScrollView>         
        </View>
      </View>
    );
  }
}

