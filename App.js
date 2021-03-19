import React from 'react';
import {AppRegistry, Alert, View,SafeAreaView} from 'react-native';
import firebase from 'react-native-firebase';
import Appcontainer from './src/router/index';
import AsyncStorage from '@react-native-community/async-storage';
import { EventRegister } from 'react-native-event-listeners';
// import { Provider} from 'react-redux';
// import store from './src/Redux/store'

class App extends React.Component {



  constructor() {
    super();
    this.state = {
      push_val: '',
    };
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
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
      // console.log("getting notification value here-------------",notification.data)
      let acceptReject = notification.title
      // console.log("getting whole data 1-----------",notification.title) 
      if(notification.title == `Accepté !`){
        EventRegister.emit('myCustomEvent', acceptReject)
        console.log("inside accept 1=======",acceptReject)
      }
      else{
        EventRegister.emit('myCustomEvent', acceptReject)
        console.log("inside reject 1------",acceptReject)
      }
      // console.log("getting whole data 1-----------",notification)
      // if(notification._data.reciever_id == UserId ){
      //   const { title, body } = notification;
      //   this.showAlert(title, body);
      // }    
      });      
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // console.log("getting notification open value here-------------",notificationOpen.notification.title)
      let acceptReject = notificationOpen.notification.title;
      if(notificationOpen.notification.title == `Accepté !` ){
        console.log("inside accept 2=======",acceptReject)
        EventRegister.emit('myCustomEvent', acceptReject)
      }
      else{
        EventRegister.emit('myCustomEvent', acceptReject)
        console.log("inside reject 2------",acceptReject)
      }
      // console.log("getting whole date========= notification listerner---------",notificationOpen.notification.body)
      // console.log("getting whole date========= notification listerner---------",notificationOpen.notification)
      // if(notificationOpen._data.reciever_id == UserId ){
      //   const { title, body } = notificationOpen.notification;
      //   this.showAlert(title, body);
      // }        
      });
      
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        // console.log("getting whole date========= notification notificationOpen---------",notificationOpen.notification.title)
        let acceptReject = notificationOpen.notification.title;

        if(notificationOpen.notification.title == `Accepté !`){
          console.log("inside accept 3=======",acceptReject)
          EventRegister.emit('myCustomEvent', acceptReject)
        }
        else{
          EventRegister.emit('myCustomEvent', acceptReject)
          console.log("inside reject 3------",acceptReject)
        }
        // console.log("getting whole date========= notification notificationOpen---------",notificationOpen.notification.body)
    //   const { title, body } = notificationOpen.notification;
    //  this.showAlert(title, body);
      }
      
      this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
      });
  }

  showAlert = (title, message) => {
    Alert.alert(
    title,
    message,
    [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
    );
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
      // <Provider store={store}>
        <SafeAreaView style={{ flex:1}}>        
          <Appcontainer />
        </SafeAreaView>
      // </Provider>
    );
  }
}
export default App;