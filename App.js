import React from 'react';
import {AppRegistry, Alert, View,SafeAreaView,Modal,Image,TouchableOpacity,Text,} from 'react-native';
import firebase from 'react-native-firebase';

import Appcontainer from './src/router/index';


import AsyncStorage from '@react-native-community/async-storage';



class App extends React.Component {




  
  constructor() {
    super();
    this.state = {
      push_val: '',
      title:"",
      body:"",     
      Alert_Visibility: false,
    };
  }

  Show_Custom_Alert(visible,) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false}); 
    // this.props.navigation.navigate("login")    
  }


  async componentDidMount() {
   
      this.checkPermission();   
        
    
    // this.createNotificationListeners(); //add this line
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      this.createNotificationListeners();
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // const localNotification = new firebase.notifications.Notification({
      //   sound: 'uber_2019',
      //   show_in_foreground: true,

      // })
      //   .setSound('uber_2019.wav')
      //   .setNotificationId(notification.notificationId)
      //   .setTitle(notification.title)
      //   .setBody(notification.body)
      //   .android.setChannelId('notificationchannel') // e.g. the id you chose above
      //   .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
      //   .android.setColor('#000000') // you can set a color here
      //   .android.setPriority(firebase.notifications.Android.Priority.High);
      //   firebase.notifications()
      //   .displayNotification(localNotification)
      //   .catch(err => console.error(err));
      // console.log("getting notification value on the listener-------------",notification.data)
      // if(notification._data.reciever_id == UserId ){
        const { title, body } = notification;
        this.setState({title, body})
        this.Show_Custom_Alert()
        // Alert.alert(title, body)
        // this.showAlert(title, body);
      // }    
      });      
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {        
      console.log("getting notification open value here-------------",notificationOpen.notification.data)
      // if(notificationOpen._data.reciever_id == UserId ){
        const { title, body } = notificationOpen.notification;
        this.setState({title, body})
        this.Show_Custom_Alert()

        // this.showAlert(title, body);
      // }        
      });
      
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        console.log("in the notification open  - - -  - - - - - -",notificationOpen.notification.title)
            const { title, body } = notificationOpen.notification;
            this.setState({title, body})
            this.Show_Custom_Alert()

          // this.showAlert(title, body);
      }
      
      this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
      });
  }


  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCM token$$$ ' + fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();      
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
  
  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
      this.createNotificationListeners();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }



  render() {
    return (
      <SafeAreaView style={{ flex:1}}>
        <Appcontainer />

        

        <Modal
            visible={this.state.Alert_Visibility}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility);
            }}>
            <View
              style={{
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 245,
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
                      source={require('./src/assets/icon/check21.png')}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 21,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 1,           
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                     {/* Veuillez entrer votre nouveau mot de passe de confirmation */}
                     {this.state.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',                    
                      marginTop: 7,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                     {/* Veuillez entrer votre nouveau mot de passe de confirmation */}
                     {this.state.body}
                  </Text>
                </View>                 
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'center',
                    alignSelf:'center',
                    margin: 5,
                  }}>
                  <TouchableOpacity                 
                    onPress={() => {                      
                      this.Hide_Custom_Alert();
                    }}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 20,
                   
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
                        fontFamily: 'Montserrat-Regular',
                      }}>
                          OK
                    </Text>
                  </TouchableOpacity>                
                </View>
              </View>
            </View>
          </Modal> 

      </SafeAreaView>
    );
  }
}
export default App;