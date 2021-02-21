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

import NumberFormat from 'react-number-format';

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
      promocodeId:0,
      amount:0,
      exacttime:'',
      promocode:"",
    };
    today = moment().format('YYYY-MM-DD');
  } 














  async componentDidMount(){


    let timeDuration = this.props.navigation.getParam("timeDuration")
    let reserve_time = this.props.navigation.getParam("reserve_time")

    let booktype = this.props.navigation.getParam("booktype")
    // console.log("getting timeuration inisde valida ===",reserve_time,timeDuration)

    
    var new_time= moment(reserve_time, 'HH:mm A')       
    .add(60, 'minutes')
    .format("HH:mm")
// console.log("now getting or not===========",new_time)





    setInterval(() => {
      this.getPromocodeId()
    }, 100);
    

    
    
    this.checkTimeDuration()

    let amount_en = this.props.navigation.getParam("amount_en")
    // let reserve_time = this.props.navigation.getParam("reserve_time")
    // let timeDuration = this.props.navigation.getParam("timeDuration")

    let reserve_date = this.props.navigation.getParam("reserve_date")

  //  console.log("getting  reserve_date and amount --4 ----------",reserve_date,)

 

   BackHandler.addEventListener('hardwareBackPress', () =>
   this.handleBackButton(this.props.navigation),
 );
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
 
    let amount_en = this.props.navigation.getParam("amount_en")

    let realamout = amount_en - this.state.amount

    // console.log("gettig real ampunt ============",realamout)
    

    let reserve_time = this.props.navigation.getParam("reserve_time")
    let timeDuration = this.props.navigation.getParam("timeDuration")


    let booktype = this.props.navigation.getParam("booktype")
    let reserve_date = this.props.navigation.getParam("reserve_date")


    // console.log("getting promocode  -",typeof this.state.promocode)

  
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="blue"
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

            <View style={{flexDirection:'row',justifyContent:"space-between",margin:10,marginStart:15,marginEnd:15}}>
            <Text style={{margin:10,fontSize:15}}>Votre derniere accusation</Text>

            <TouchableOpacity style={{margin:10,borderColor:"#b41565",borderWidth:1,flexDirection:'row'}}>
            <Image style={{height:12,width:12,marginTop:13,marginRight:-10}} source={require("../../../../assets/icon/euro-currency-symbol-1.png")} />
              <Text style={{margin:10,color:"#b41565",borderWidth:0,}}>{realamout}</Text>
              {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
            </TouchableOpacity>
            </View> 
            :null
              }
 
              

               
            <View style={Styles.continueBtn}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("paymentoption",{
                     amount_en:realamout,
                     reserve_time:reserve_time,
                     timeDuration:timeDuration,
                     reserve_date:reserve_date,
                     promocodeId:this.state.promocodeId,
                     amount:this.state.amount,
                     exacttime:this.state.exacttime,
                     booktype:booktype
              })}}>
                <Text style={Styles.continueBtnTxt}>Réserver et payer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>         
        </View>
      </View>
    );
  }
}
