import React, { Component,Fragment } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler, StatusBar,Linking,Localization} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/1.png'
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../../../assets/icon/25.png';

import {my_notification} from '../../../../../Api/afterAuth'
import Spinner from 'react-native-loading-spinner-overlay';

import TimeAgo from 'react-native-timeago';


import * as RNLocalize from "react-native-localize";


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {      
        notificationData:[],
        isSpinner:true,
        isBodyLoaded:false
    };
  }

  componentDidMount = async () => {
    this.fetchnotificationData()

    console.log("--------time zone-------",RNLocalize.getTimeZone());

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchnotificationData = async () => {
      const my_notificationResponse = await my_notification();
      if (my_notificationResponse.result == true) {
        var notificationData = my_notificationResponse.response.notification_list;
        console.log("getting notificationData data----------",notificationData)
      }
      this.setState({notificationData,isBodyLoaded: true,isSpinner: false});
      // console.log("getting country response----------------",countryData.country_list)
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
    const {supportData} =  this.state;
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
         <View style={Styles.header}>
         <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Notifications</Text>
          <Text style={Styles.headerTxt}>    </Text>
        </View>
        <Spinner visible={this.state.isSpinner}/>

        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>
       

        {
        this.state.isBodyLoaded == true ?

          <ScrollView>

              {
                  this.state.notificationData.length > 0 ?
                    <Fragment>


            {
                this.state.notificationData.map((singleNotification)=>{
                    // console.log("getting isseen ==========",singleNotification.is_seen)
                     return(
                         <Fragment>
                             {
                                 singleNotification.is_seen == 0 ?

                                 <View style={{width:"96%",margin:7,borderRadius:7,borderWidth:1,borderColor:"#DDDDDD",alignSelf:'center'}}> 
                                 <Text style={{color:"#b41565",fontSize:13,fontWeight:'700',margin:7}}>{singleNotification.message}</Text>

                                 {/* <View style={{alignSelf:'flex-end',margin:5}}>
                                 <TimeAgo time={singleNotification.create_date} />
                                 </View> */}
                             </View>

                                 :
                                <View style={{width:"96%",margin:7,borderRadius:7,borderWidth:1,borderColor:"#DDDDDD",alignSelf:'center'}}> 
                            <Text style={{color:"#b41565",fontSize:12,fontWeight:'600',margin:7}}>{singleNotification.message}</Text>
                            
                            {/* <View style={{alignSelf:'flex-end',margin:5,}}>
                                 <TimeAgo time={singleNotification.create_date} />
                                 </View> */}
                        </View>
                             }                        
                        </Fragment>
                     )                                  
                })
            }
            

                        </Fragment>

                  :<View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
                  <Text style={{fontSize:18,fontWeight:'700',textAlign:'center',color:"gray"}}>Aucune notification reçue</Text>
                </View>
              }
       


           

          </ScrollView>
                            :

                            <View style={{alignItems:'center',justifyContent:'center',}}>
                            <Text style={{textAlign:'center',textAlignVertical:'center',color:"gray",fontSize:18,fontWeight:'700',marginTop:160}}>chargement...</Text>
                        </View>
          }
          



          
        </ImageBackground>
          
      </View>
    )
  }
}
