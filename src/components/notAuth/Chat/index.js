import React, {Component, Fragment} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity,BackHandler, Alert,TextInput,StatusBar} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import Styles from './indexCss';
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import nextArrow from '../../../assets/icon/36.png';

import {single_chat_dataFunction,add_single_chatFunction} from '../../../Api/afterAuth'
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSpinner: true,  
      isBodyLoaded: true,  
      to_id:0,
      from_id:0,
      ChatData:[],
      chat_msg:"",
    };
    this.myTextInput = React.createRef();
  }

  Getsingle_chat_data =  () => {
    this.setState({ spinner: true }, async () => {
      let teacher_id = this.props.navigation.getParam("teacher_id")
      console.log("gettng teacher id++++++++++++",teacher_id)
    const {from_id,to_id} = this.state;
    const single_chat_dataResponse = await single_chat_dataFunction({
      from_id,
      to_id:teacher_id
    });
    if (single_chat_dataResponse.result == true) {
      if(single_chat_dataResponse.response.status == true){
        console.log("getting response hre----------------",single_chat_dataResponse.response)
        var ChatData = single_chat_dataResponse.response.chat_history;
        // Alert.alert("Message","Message send sucessfully !")
        this.setState({ChatData,isBodyLoaded:true,isSpinner:false,chat_msg:""}) 
        
      }
      // else{
      //   this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
      //     Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
      //         this.props.navigation.goBack();
      //     }}]);
      // })
      // }

      // this.props.navigation.navigate("chat2")
    
      // Alert.alert("Message",this.state.chat_msg)     
      // console.log("getting ChatData data----------",single_chat_dataResponse.response)
    }
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Something went wrong!", [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ])
        }, 2)
      })
    }
    // this.setState({ChatData,isBodyLoaded:true,isSpinner:false});
  })
  };




  add_single_chatFunctionData = async () => {
    // console.log("getting inside the function level id " + this.state.level_id)
    let teacher_id = this.props.navigation.getParam("teacher_id")
    const {from_id,to_id,chat_msg} = this.state;
    const add_single_chatFunctionResponse = await add_single_chatFunction({
      from_id,
      to_id:teacher_id,
      chat_msg
    });
    if (add_single_chatFunctionResponse.result == true) {
      // this.props.navigation.navigate("chat2")
      // var ChatData = add_single_chatFunctionResponse.response;
      // Alert.alert("Message","Message send sucessfully !")
      
      this.setState({chat_msg:""})

      this.Getsingle_chat_data() 

      // console.log("getting ChatData data- inside ---------",add_single_chatFunctionResponse.response)
    }
    else{
      Alert.alert("Message","Erreur, essayez encore!")
    }
    // this.setState({ChatData,isBodyLoaded:true,isSpinner:false});
    
  };
  

  validateFunction(){
    if(this.state.chat_msg.length == 0){
      Alert.alert("Message","Veuillez ajouter un message!")
    }
    else{
      this.add_single_chatFunctionData()
    }
  }



  componentDidMount = async () => {

    // this.myTextInput.current.value='';
    // this.myTextInput.clear()
    setTimeout(() => {
      this.Getsingle_chat_data()
    }, 700);
   

    const user_id = await AsyncStorage.getItem('user_id');
    setTimeout(() => {
      this.setState({from_id:user_id})  
    }, 100);
    


   let teacher_id = this.props.navigation.getParam("teacher_id")
    console.log("getting teacher id here--------------,",teacher_id)


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


  resetTextInput = async () =>{
    this.setState({chat_msg:""})
    this.validateFunction()
  }
  
  render() {
    return (
      <View style={Styles.container}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <View style={{flexDirection: 'column', alignSelf: 'center'}}>
            <Text style={Styles.headerTxt}>Chat</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                alignSelf: 'center',
                color: '#FFFFFF',
              }}>
              Chat pendant la durée du coaching uniquement
            </Text>
          </View>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>

        <Spinner visible={this.state.isSpinner} />      
        <View style={{flex:2,alignItems:'center',justifyContent:'center',margin:20,borderWidth:0,}}>

          {
              this.state.isBodyLoaded == true ?
              <ScrollView style={{width:'100%'}}>
                  <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
              {
                this.state.ChatData.length > 0 ?
                <View >
                      {
                          this.state.ChatData.map((singleChatData)=>{
                            return(
                             <Fragment>{
                              singleChatData.left_right ==  "right" ?
                              <View style={{justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end'}}>
                                  <View style={{backgroundColor:"lightblue",borderRadius:20,margin:4,width:"100%",}}>
                                      <Text style={{fontSize:12,fontWeight:'700',color:"#000000",margin:7,marginStart:18,marginEnd:18}}>{singleChatData.msg}</Text>
                                  </View>
                              </View>

                              :
                              <View style={{justifyContent:'flex-start',alignItems:'flex-start',alignSelf:'flex-start'}}>
                                  <View style={{backgroundColor:"lightblue",borderRadius:20,margin:4,width:"100%",}}>
                                      <Text style={{fontSize:12,fontWeight:'700',color:"#000000",margin:7,marginStart:18,marginEnd:18}}>{singleChatData.msg}</Text>
                                  </View>
                              </View>
                               }                               
                              </Fragment>                         
                            )
                          })
                        }
                </View>

                :<View>
                <Text></Text>
            </View>

              }
              </KeyboardAwareScrollView>
        </ScrollView>

              :<View>
              <Text>Loading...</Text>
          </View>

          }
          
      

        </View>



        <View style={Styles.bottomView}>
                    <View style={{borderWidth:0,flexDirection:'row',}}>

                    <TextInput
                    // ref={input => { this.textInput = input }}
                      // ref={this.myTextInput}
                      value={this.state.chat_msg}
                      onChangeText={(chat_msg) => this.setState({chat_msg})}
                    style={{width:'80%',borderWidth:0,borderRadius:20,marginStart:10}} placeholder="Entrez votre message ici" />
                    <TouchableOpacity
                    //  onPress={()=>{this.props.navigation.navigate("chat2")}}
                    onPress={()=>{this.validateFunction()}}
                    >
                      <Image source={nextArrow} style={{height:25,width:25,marginEnd:0,margin:6,alignSelf:'flex-end'}} />
                    </TouchableOpacity>
                    </View>
                    </View>
     

        <BottomNavigator
          currentRoute={'chat2'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

// 17.Chat
// Chat pendant la durée du coaching uniquement
// Salut
// 23-04-2019, 2:59 PM
// Lorem Ipsum dummy text.Lorem Ipsum
// Reçu, 23-04-2019, 2:59 PM
// Lorem Ipsum
// 23-04-2019, 2:59 PM
