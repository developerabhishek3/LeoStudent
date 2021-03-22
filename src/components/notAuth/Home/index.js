import React, { Component, Fragment } from 'react'
import { View,Text,ScrollView, StatusBar,Image,TouchableOpacity,Modal,Dimensions,TextInput, ImageBackground, Alert,BackHandler,Linking} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import Spinner from 'react-native-loading-spinner-overlay';

import { ECharts } from "react-native-echarts-wrapper";
import logo from '../../../assets/icon/96.png'
import Styles from './indexCss'
import {RadioButton} from 'react-native-paper';
import { getnewesletterInfo,newsletterSubscriptionFunction,count_data,home_teacher_slide} from '../../../Api/afterAuth'
import watch from '../../../assets/icon/22.png'
import AsyncStorage from '@react-native-community/async-storage';
export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      newsletter:[],
      countData:[],
      teacherSlideData:[],



      isBodyLoaded: false,
      isSpinner: true,  
    }

  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('choosetime')
  }

  componentDidMount = async () => {

    const token = await AsyncStorage.getItem('token');
    console.log("indie the home screen getting token ot not==========",token)

    let levelId = await AsyncStorage.getItem('level_id');
    let level_id = JSON.parse(levelId);

    console.log("getting level id on home=========",level_id)




    this.getnewesletterInfoData()

    this.count_dataFunction()

    this.home_teacher_slideFunction()

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    getnewesletterInfoData = async () => {
      const getnewesletterInfoResponse = await getnewesletterInfo();
      if (getnewesletterInfoResponse.result == true) {
        var newsletter = getnewesletterInfoResponse.response.newsletter_info;
        console.log("getting newsletter data----------",newsletter)
      }
      this.setState({newsletter,isBodyLoaded:true,isSpinner:false});
      // console.log("getting country response----------------",countryData.country_list)
    };



    count_dataFunction = async () => {
      const count_dataResponse = await count_data();
      if (count_dataResponse.result == true) {       
      var  countData = count_dataResponse.response.count_data
      }
      this.setState({countData,isBodyLoaded:true,isSpinner:false});
      // console.log("getting country response----------------",countryData.country_list)
    };


    home_teacher_slideFunction = async () => {
      const home_teacher_slideResponse = await home_teacher_slide();
      if (home_teacher_slideResponse.result == true) {       
        console.log("getting teacher slide data==============",home_teacher_slideResponse.response)
      var  teacherSlideData = home_teacher_slideResponse.response.home_teacher_slide
      }
      this.setState({teacherSlideData,isBodyLoaded:true,isSpinner:false});
      // console.log("getting country response----------------",countryData.country_list)
    };



    newsletterSubscriptionFunction = async () => {
      const newsletterSubscriptionResponse = await newsletterSubscriptionFunction();
      if (newsletterSubscriptionResponse.result == true) {       
        // console.log("getting newsletter data----------",newsletterSubscriptionResponse.response)
      }
      else{
        Alert.alert("Message","Error occur Try again !!!")
      }     
      // console.log("getting country response----------------",countryData.country_list)
    };



    


    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      
    }
    handleBackButton = (nav) => {
      if (!nav.isFocused()) {
        console.log('getting inside the if conditin--------------');
        return true;
      } else {
        console.log('getting inside the else conditin---------------');
        Alert.alert(
          'Quitter Spyk',
          'Voulez-vous vraiment quitter Spyk ?',
          [
            {
              text: 'Annuler',
              style: 'cancel',
            },
            {
              text: 'Quitter Spyk',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {
            cancelable: false,
          },
        );
        return true;
      }
    };
  



  render() {
 
const { newsletter } = this.state;

console.log("getint inside state ",this.state.teacherSlideData)

    return (
      <Fragment>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Spinner visible={this.state.isSpinner} 
        />
      
    
      <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
          <View style={Styles.header} >         
          <Text style={Styles.headerTxt}>Accueil   </Text>
          <Image source={logo} style={Styles.headertxtInputImg} />
          </View>                   
            <View style={{flex:2,marginTop:-10,borderWidth:0,borderColor:"red",width:'100%'}}>           
            {
              this.state.isBodyLoaded == true ?              
              <ScrollView>
              
{/*                
              <ScrollView horizontal={true}>
               
               {
                 this.state.teacherSlideData.length > 0 ?
                 <Fragment>
              {
                  this.state.teacherSlideData.map((singleTeacherSlideMAp)=>{
                    return(
                      <Fragment>
                         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('teacherviewhome',{
                           teacher_id:singleTeacherSlideMAp.teacher_id
                         });}} >
                         <View style={{backgroundColor:"#FFFFFF",margin:10,borderRadius:10}}>
                          <Text style={{fontSize:15,fontWeight:'700',margin:3,alignSelf:'center'}}>{singleTeacherSlideMAp.coach_type}</Text>
                          <View style={{flexDirection:'row',margin:3,alignSelf:'center'}}>
                            <Text style={{fontSize:12,fontWeight:'700',color:"gray",marginStart:4}}>{singleTeacherSlideMAp.course_date}</Text>
                            <Text style={{fontSize:12,fontWeight:'700',color:"gray",marginStart:10}}>{singleTeacherSlideMAp.course_time}</Text>
                          </View>
                          <View style={{borderColor:"gray",borderWidth:1,width:'90%',alignSelf:'center'}} />
                          <View style={{flexDirection:'row',margin:7}}>
                              <Image  source={{
                              uri: `https://www.spyk.fr/${singleTeacherSlideMAp.teacher_profile_url}`,
                            }}  style={{height:40,width:40,margin:7}} />
                              <View style={{flexDirection:'column',margin:3,alignSelf:'center'}}>
                                <Text style={{fontSize:15,fontWeight:'700',marginStart:10}}>{singleTeacherSlideMAp.teacher_name}</Text>
                                <Text style={{fontSize:12,fontWeight:'700',color:"gray",marginStart:10}}>Numbre d'Evaluation : {singleTeacherSlideMAp.evaluations_no}</Text>
                              </View>
                              <Image source={require("../../../assets/icon/5.png")} style={{height:20,width:20,margin:25}} />
                          </View>                    
                      </View>
                      </TouchableOpacity>
                      </Fragment>
                    )
                  })
                }         

                  </Fragment>
                 :<View>
                  </View>
               }
               
              </ScrollView> */}

          <Text style={{fontWeight:'700',margin:7,fontSize:20,alignSelf:'center',marginTop:0}}>Démarrer mon coaching d'anglais</Text>

{/* dynamicity from here.................. */}
     <ImageBackground  source={{
                   uri: `https://www.spyk.fr/${newsletter.image_path}`,
                 }} 
                  style={{width:'98%',alignSelf:'center',height:180,justifyContent:'flex-end',alignItems:'center'}} >
         {/* <View style={{opacity:0.6,width:'98%',height:50,backgroundColor:"#000000",alignSelf:'center',flexDirection:"row",justifyContent:'center',borderWidth:0,borderColor:"red",marginEnd:7}}>
               <Text style={{color:"#FFFFFF",fontSize:12,fontWeight:'700',margin:1,width:"70%"}}>{newsletter.description}</Text>
               <TouchableOpacity style={Styles.continueBtn} onPress={()=>{
                 this.newsletterSubscriptionFunction()
               }} >
               <Text style={Styles.continueBtnTxt}>S'criber</Text>
               </TouchableOpacity>                     
         </View> */}
     </ImageBackground>
         <View>
          <TouchableOpacity style={{backgroundColor:"#b41565",margin:10,justifyContent:'center',alignSelf:"center",flexDirection:"row",justifyContent:"center",borderRadius:13}}
            // onPress={()=>{Linking.openURL('https://api.whatsapp.com/send?phone=+33612345678')}}
            onPress={()=>{this.props.navigation.navigate("cancelreservation")}} 
          >
              <Image source={require("../../../assets/icon/whatsapp.png")} style={{height:30,width:30,margin:10}} />
              <Text style={{fontSize:20,fontWeight:"700",margin:15,marginStart:10,marginEnd:40,color:"#FFFFFF"}}>START</Text>
          </TouchableOpacity>
         </View>
              {
                this.state.countData.map((singleCountData)=>{                  
                  return(
                    <Fragment>

                    {/* <View style={{margin:10,flexDirection:'row',width:'95%',flexWrap:'wrap',alignContent:'center',flexDirection:"row"}}> */}
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:12}}>
                    <ImageBackground                 
                      resizeMode='cover' 
                      source={require("../../../assets/icon/green.png")}
                      style={{alignSelf:'center',width:SCREEN_WIDTH/2.2,height:80}}
                      
                    >
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:"#FFFFFF",fontWeight:'700',margin:4,alignItems:'center',width:"60%",textAlign:'center'}}>Total des heures</Text>
                        <View  style={{borderWidth:0,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require("../../../assets/icon/105.png")} style={{height:35,width:35,margin:4}} />
                  <Text style={{color:"#FFFFFF",fontWeight:'700',marginStart:3}}>{singleCountData.total_hours}</Text>
                        </View>
                        </View>






                    </ImageBackground>
                    <ImageBackground 
                      resizeMode='cover' 
                      source={require("../../../assets/icon/skyblue.png")}
                      style={{alignSelf:'center',width:SCREEN_WIDTH/2.2,height:80}}
                      
                    >


<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:"#FFFFFF",fontWeight:'700',margin:4,alignItems:'center',width:"60%",textAlign:'center'}}>Nombre de coachings suivis</Text>
                        <View  style={{borderWidth:0,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require("../../../assets/icon/books.png")} style={{height:35,width:35,margin:4}} />
                  <Text style={{color:"#FFFFFF",fontWeight:'700',marginStart:3}}>{singleCountData.monitored_coaching}</Text>
                        </View>
                        </View>



                     

                    </ImageBackground>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:12}}>
                    <ImageBackground                  
                      resizeMode='cover' 
                      source={require("../../../assets/icon/orange.png")}
                      style={{alignSelf:'center',width:SCREEN_WIDTH/2.2,height:80}}                      
                    >

                      

<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:"#FFFFFF",fontWeight:'700',margin:4,alignItems:'center',width:"60%",textAlign:'center'}}>Bons cadeaux</Text>
                        <View  style={{borderWidth:0,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require("../../../assets/icon/gift.png")} style={{height:35,width:35,margin:4}} />
                  <Text style={{color:"#FFFFFF",fontWeight:'700',marginStart:3}}>{singleCountData.offered_coaching}</Text>
                        </View>
                        </View>

                  
                    </ImageBackground>
                    <ImageBackground                 
                      resizeMode='cover' 
                      source={require("../../../assets/icon/red.png")}
                      style={{alignSelf:'center',width:SCREEN_WIDTH/2.2,height:80}}                      
                    >                                           
                     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:"#FFFFFF",fontWeight:'700',margin:4,alignItems:'center',width:"55%",textAlign:'center'}}>Niveau initial</Text>
                        <View  style={{borderWidth:0,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require("../../../assets/icon/cap.png")} style={{height:35,width:35,margin:4}} />
                  <Text style={{color:"#FFFFFF",fontWeight:'700',marginStart:3}}>{singleCountData.point_total}</Text>
                        </View>
                        </View>
                    </ImageBackground>
                    </View>
                    </Fragment>
                  )
                })
              }
              </ScrollView>
              : null

            }


            </View>
          
          {/* <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      this.Show_Custom_Alert()
                    }}>
                    <Text style={Styles.continueBtnTxt}>Définissez votre disponibilité</Text>
                  </TouchableOpacity>
                </View> */}


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
              backgroundColor: '#5541E1',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: SCREEN_HEIGHT /2.7,
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
                 <Image source={watch} style={{height:80,width:80,margin:10}} />
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
                 Je suis disponible pour
                </Text>
            
              </View>  
              <View style={Styles.radiobtnMainView}>
                  <RadioButton.Group
                    onValueChange={(value) => this.setState({value})}
                    value={this.state.value}>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="first" />
                      <Text style={Styles.radiobtnText}>COURS RÉSERVÉS</Text>
                    </View>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="second" />
                      <Text style={Styles.radiobtnText}>COURS INSTANTANÉS</Text>
                    </View>                   
                  </RadioButton.Group>
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
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Continuer
                  </Text>
                </TouchableOpacity>

             
              </View>
            </View>
          </View>
        </Modal>


          <BottomNavigator
            currentRoute={'home'}
            navigation={this.props.navigation}
        />
      
      </View>
      </Fragment>
    )
  }
}
