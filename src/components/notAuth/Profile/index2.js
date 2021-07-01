import React, { Component,Fragment} from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Modal,Dimensions,Alert,BackHandler, StatusBar} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/6.png'
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../assets/icon/avatar.png';

import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'


import profileIcon from '../../../assets/ProfileIcon/24.png'
import revenueIcon from '../../../assets/ProfileIcon/23.png'
import settingIcon from '../../../assets/ProfileIcon/30.png'
import supporIcon from '../../../assets/ProfileIcon/29.png'
import logoutIcon from '../../../assets/ProfileIcon/36.png'

import packageContent from '../../../../package.json'
import Spinner from 'react-native-loading-spinner-overlay';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';

import {LogoutFunction,notification_count,StudentProfile,} from '../../../Api/afterAuth';

export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
          value: 'first',
          email:"",
          Model_Visibility: false,
          Alert_Visibility: false,
          profileData:[],
          profile_url:"",
          isBodyLoaded:false,
          isSpinner:true,
          notificationCountValue:0,
        }    
      }
          

      componentDidMount = async () => {
        this.fetchStudentProfileData()
        setInterval(() => {
          this.fetchNotificationCount()
        }, 4000);     
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
    
      userLogoutFunction() {

        this.setState({ isSpinner: true }, async () => { 

          const LogoutResponse = await LogoutFunction();
        
          if(LogoutResponse.result == true) {
              // console.log("getting logout response---------------",LogoutResponse.response)
              await AsyncStorage.setItem('userLoggedIn','false')
              let keys = ['token'];
              AsyncStorage.multiRemove(keys)
              this.props.navigation.navigate("login")  
              this.setState({isSpinner: false})          
              // Alert.alert("Message","Déconnexion réussie!")
          }
          else{
              this.setState({isSpinner: false})          
              // console.log("getting error on logout -------------",LogoutResponse.error)
          }    

        })          
        // console.log("getting country response----------------",countryData.country_list)
      };
    





      fetchStudentProfileData = async () => {
        const GetProfileDetails = await StudentProfile();
        if (GetProfileDetails.result == true) {
          var profileData = GetProfileDetails.response.my_profile;
          var profile_url = GetProfileDetails.response.my_profile.profile_url;
          var email = GetProfileDetails.response.my_profile.email
          // console.log("getting GetProfileDetails data----------",profileData)
          this.setState({ isBodyLoaded: true,isSpinner: false,profileData,profile_url,email});
        }
       
        else{
          this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
            Alert.alert("Message","Quelque chose a mal tourné, essayez encore !",[ { text: "Ok",onPress:()=>{
                this.props.navigation.goBack();
            }}]);
        })
        }   
        // console.log("getting country response----------------",countryData.country_list)
      };





      fetchNotificationCount = async () => {
        const notification_countResponse = await notification_count();
        if (notification_countResponse.result == true) {
          var notificationCountValue = notification_countResponse.response.notification_count;          
          // console.log("getting notification_countResponse data----------",notificationCountValue)
          this.setState({ isBodyLoaded: true,isSpinner: false,notificationCountValue,});
        }
       
        else{
          this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
            Alert.alert("Message","Quelque chose a mal tourné, essayez encore !",[ { text: "Ok",onPress:()=>{
                this.props.navigation.goBack();
            }}]);
        })
        }   
        // console.log("getting country response----------------",countryData.country_list)
      };







    

      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false}); 
        this.userLogoutFunction()       
      }

      Hide_Custom_Alert1() {
        this.setState({Alert_Visibility: false});         
      }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {
    const {profileData} = this.state;
    // console.log("gggggggggggggggg",profileData)
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
            <ImageBackground source={require("../../../assets/icon/bg1.png")} resizeMode="cover" style={{height:200,width:"100%",flexDirection:"row",justifyContent:"space-between"}}> 
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("home")}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>  Profil</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </ImageBackground>
        <Spinner visible={this.state.isSpinner}/>
        {/* <ImageBackground source={bgImg} resizeMode="cover" > */}
        <View style={{flex:2,width:"100%"}}>
       
    

         
          

            
            {
            this.state.isBodyLoaded == true ?

        <Fragment>

          <View style={{marginTop:-50}}> 
          {
            this.state.profile_url == "" ?

                        <Image source={People}  style={Styles.peopleStyle} />
            :
            <Image source={{
              uri: `https://www.spyk.fr/${profileData.profile_url}`,
            }}  style={Styles.peopleStyle} />
          }
           
            
          </View>
          {/* <Text style={{fontSize:13,color:'gray',fontWeight:'700',alignSelf:'center'}}>Votre client</Text> */}
          <Text style={{alignSelf:'center',fontWeight:'700',fontSize:16,color:"#000000",marginTop:10}}>{profileData.first_name}</Text>          
        
            <ScrollView keyboardShouldPersistTaps="always" style={{margin:10}}> 
        
                <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate("myprofile",{profile_url:this.state.profile_url})}}
                >
                  <View style={{flexDirection:'row',margin:0}}>
                      <Image source={profileIcon} style={{height:24,width:24,margin:10}}  />
                      <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Mon profil</Text>
                  </View>
                </TouchableOpacity>


            
                

              


                <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate('notificationdata')}}
                >
                <View style={{flexDirection:'row',margin:0}}>
                    <Image source={require("../../../assets/ProfileIcon/notification.png")} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Notifications</Text>{
                      this.state.notificationCountValue != 0 ?
                      <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-20,marginTop:4,marginStart:-15,righ:-30,width:27,height:27,borderRadius:30}}></Badge>
                      :null
                    }
                    
                </View>
                </TouchableOpacity>


                <TouchableOpacity
                     onPress={()=>{this.props.navigation.navigate("promocode2",{promocodeType:"profile"})}}
                >
                <View style={{flexDirection:'row',margin:0}}>
                <Image source={require("../../../assets/icon/gift1.png")} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Bons cadeaux</Text>
                </View>
                </TouchableOpacity>

                  <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate('allsavedcards',{email:this.state.email})}}
                >
                <View style={{flexDirection:'row',margin:0}}>
                    <Image source={require("../../../assets/ProfileIcon/23.png")} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Mode de paiement</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('parameter')}}
                >
                <View style={{flexDirection:'row',margin:0}}>
                    <Image source={settingIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Paramètres</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate('support')}}
                >
                <View style={{flexDirection:'row',margin:0}}>
                    <Image source={supporIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Support</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                <View style={{flexDirection:'row',margin:0}}>
                    <Image source={logoutIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15,color:"gray"}}>Déconnexion</Text>
                </View>
                </TouchableOpacity>




            </ScrollView>

    <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',margin:10,color:"#b41565"}}>Version de l'application : {packageContent.version}</Text>


        

          </Fragment> 
            : null            
          }
          
       
         




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
                height: 230,
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
                 <Image source={logoutIcon} style={{height:70,width:70,margin:18}} />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:10,
                    marginTop:-10,
                    color: '#000000',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                 Déconnexion
                </Text>







                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:10,
                    color: 'gray',
                    textAlign: 'center',
                   
                  }}>
                        Etes-vous sûr de vouloir vous
                </Text>


                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:-10,
                    color: 'gray',
                    textAlign: 'center',
                   
                  }}>
                  déconnecter?
                </Text>
            
              </View>                        
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf:'center',
                  borderRadius:6,
                  textAlign: 'center',
                  margin: 5,                
                }}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}                 
                  style={{
                   
                    backgroundColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 13,
                      marginStart: 30,
                      marginEnd: 30,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Oui
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert1()}                 
                  style={{
                   
                    backgroundColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
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





        </View>
          <BottomNavigator
            currentRoute={'profile2'}
            navigation={this.props.navigation}
        />
      </View>
    )
  }
}
