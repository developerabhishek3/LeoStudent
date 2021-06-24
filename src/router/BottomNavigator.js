import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// import FastImage from 'react-native-fast-image';



// sleceted route image.....
import SelectedReservation from '../assets/BottomIcon/5.png'
import SelectedHome from '../assets/BottomIcon/1.png'
import SelectedChat from '../assets/BottomIcon/6.png'
import SelectedProfie from '../assets/BottomIcon/8.png'


// unselected route image.....

import UnSelectedReservation from '../assets/BottomIcon/3.png'
import UnSelectedHome from '../assets/BottomIcon/7.png'
import UnSelectedChat from '../assets/BottomIcon/2.png'
import UnSelectedProfie from '../assets/BottomIcon/4.png'
import AntDesign from 'react-native-vector-icons/AntDesign';


AntDesign.loadFont();
import {notification_count,pending_reservation_count} from '../Api/afterAuth'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
class BottomNavigator extends Component{
  constructor(props){
    super(props)
    this.state={
      isBodyLoaded:false,
      isSpinner:true,
      notificationCountValue:0,
      pendingReservationCountValue:0,
    
    }    
  }

  
  componentDidMount = async () => {   
    setInterval(() => {
      this.fetchNotificationCount()
      this.fetchpending_reservation_count()
    }, 2000);          
  }
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







  fetchpending_reservation_count = async () => {
    const notification_countResponse = await pending_reservation_count()
    if (notification_countResponse.result == true) {
      var pendingReservationCountValue = notification_countResponse.response.pending_reservation_count;          
      // console.log("getting notification_countResponse data----------",pendingReservationCountValue)
      this.setState({ isBodyLoaded: true,isSpinner: false,pendingReservationCountValue,});
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


    render(){
        let {currentRoute} = this.props;
        // console.log("current route name-",currentRoute)
        return(
            <View keyboardShouldPersistTaps="always">
                
                <View style={styles.TabNavigatorView}>

                <TouchableOpacity
                   style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'home') {
                      this.props.navigation.navigate('home', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                    {currentRoute == 'home' ? (
                   <Image source={SelectedHome} style={styles.routesImageView} />
                  ) : (
                    <Image source={UnSelectedHome} style={styles.routesImageView} />
                  )}  
                  {currentRoute == 'home' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Accueil</Text>
                  ) : (
                    <Text style={{color:'gray',margin:0,textAlign:'center'}}>Accueil</Text>
                  )}                 
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'currentreservation') {
                      this.props.navigation.navigate('currentreservation', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                     { this.state.pendingReservationCountValue != 0 ?
                      <Badge status="error" value={this.state.pendingReservationCountValue} badgeStyle={{margin:-27,marginTop:-4,marginStart:21,righ:-30,width:27,height:27,borderRadius:30}}></Badge>
                      :null
                    }
                  {currentRoute == 'currentreservation' ? (
                    <Image source={SelectedReservation} style={styles.routesImageView} />
                  ) : (
                    <Image source={UnSelectedReservation} style={styles.routesImageView} />
                  )}  
                  {currentRoute == 'currentreservation' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Réservation</Text>
                  ) : (
                    <Text style={{color:'gray',margin:0,textAlign:'center'}}>Réservation</Text>
                  )}                 
                </TouchableOpacity>

             
{/* 
                <TouchableOpacity
                   style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'chat2') {
                      this.props.navigation.navigate('chat2', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'chat2' ? (
                    <Image source={SelectedChat} style={styles.routesImageView} />
                  ) : (
                    <Image source={UnSelectedChat} style={styles.routesImageView} />
                  )}  
                  {currentRoute == 'chat2' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Chat</Text>
                    ) : (
                      <Text style={{color:'gray',margin:0,textAlign:'center'}}>Chat</Text>
                  )}                 
                </TouchableOpacity> */}



                <TouchableOpacity
                   style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'profile2') {
                      this.props.navigation.navigate('profile2', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                    { this.state.notificationCountValue != 0 ?
                      <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-27,marginTop:-4,marginStart:21,righ:-30,width:27,height:27,borderRadius:30}}></Badge>
                      :null
                    }
                   {currentRoute == 'profile2' ? (
                     <Image source={SelectedProfie} style={styles.routesImageView} />
                    ) : (
                      <Image source={UnSelectedProfie} style={styles.routesImageView} />
                  )}
                  {currentRoute == 'profile2' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Profil</Text>
                    ) : (
                      <Text style={{color:'gray',margin:0,textAlign:'center'}}>Profil</Text>
                  )}                 
                </TouchableOpacity>
                           
                </View>
            </View>
        )
    }
}


export default BottomNavigator;

const styles = StyleSheet.create({
    TabNavigatorView: {
      backgroundColor: '#FFFFFF',
      height: 65,
      borderColor: '#EFEFEF',
      borderWidth: 1,
      width: '103%',
      alignSelf:'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom:-3,
      // borderTopLeftRadius:30,
      // borderTopRightRadius:30
    },
    routesImageView: {
      alignSelf: 'center',
      height: 22,
      width: 22
    },
    routeTextView: {
      textAlign: 'center',
      fontSize: 12,  
      color: '#696969',
      paddingTop: 5,
    },
    selectedRouteTextView: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '700',
      color: '#793422',
      paddingTop: 5,
    },
    routesImageView1:{
      height:70,
      width:30,
      alignSelf:'center',
      borderColor:'red',
      borderWidth:0,
      marginBottom:30
    },
  });