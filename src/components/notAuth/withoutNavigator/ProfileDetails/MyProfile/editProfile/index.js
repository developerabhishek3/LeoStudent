import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Button,
  Alert,
  Dimensions,
  StatusBar
} from 'react-native';
import Styles from './indexCss';
import AsyncStorage from '@react-native-community/async-storage';
import {RadioButton} from 'react-native-paper';
import bgImg from '../../../../../../assets/bgImages/6.png';

import logo from '../../../../../../assets/icon/96.png';
import back from '../../../../../../assets/icon/20.png';
import Right from '../../../../../../assets/icon/33.png';
import {Rating, AirbnbRating} from 'react-native-ratings';

import People from '../../../../../../assets/icon/25.png';
import DatePicker from 'react-native-date-picker'
import ImagePicker from 'react-native-image-picker';

import {StudentProfile,get_academic_info} from '../../../../../../Api/afterAuth'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'
import { add } from 'react-native-reanimated';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import Spinner from 'react-native-loading-spinner-overlay';
import { Fragment } from 'react';

const SCREEN_HEIGHT = Dimensions.get('window').height; 
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Oui1',
      value: 'Non1',
      filePath:"",
      loading:true,

      first_name:"",
      last_name:"",
      birth_date:"",
      email:"",     
      telephone_no:"",
      address:"",
      postcode:"",    
      city:"",
      country:"",  
      q_1_ans:"",
      q_2_ans:"",
      q_3_ans:"",
      q_4_ans:"",
      q_5_ans:"", 
      path:"",
      isBodyLoaded:false,
      isSpinner:true,

      date: new Date(),
      profileData:[],      
      AcademicDetails:[],
      // filePath: {},
       


      data1:[
        {"id": "1",
        "value":"BAC"
          },
          {"id": "2",
          "value":"Bac + 2"
          },
          {"id": "3",
          "value":"Bachelor"
          },
          {"id": "4",
          "value":"Doctorat"
          },
          {"id": "5",
          "value":"Sans diplôme"
          },
          {"id": "6",
          "value":"Autre"
          },      
      ],




      data2:[
        {"id": "1",
        "value":"Voyage"
          },
          {"id": "2",
          "value":"Besoin professionnel"
          },
          {"id": "3",
          "value":"Les deux"
          },          
      ],
    };
  }

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };




 uploadWholeData(){


  this.setState({ isSpinner: true }, async () => { 




    console.log("inside the function calling for upload form data------------------------------")
    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    var ActualDate = new Date( this.state.birth_date)
    var birth_date =JSON.stringify(ActualDate)
    let birth_date_new =  birth_date.substr(1,10)
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id);
    const URL = `https://www.spyk.fr/api_student/update_profile`
    let headers = {
      'Content-Type': 'multipart/form-data',
      'x-api-key':'leo@2020',
      'user-id': `${UserId}`,
      token: `${TokenValue}`,
      };
    
      RNFetchBlob.fetch("post",URL,headers,[      
        { name: 'profile_pic', filename: 'photo.jpg', type: 'image/png', data: this.state.filePath},
        { name: 'first_name', data: this.state.first_name.trim() },
        { name: 'last_name', data: this.state.last_name.trim() },
        { name: 'birth_date', data:birth_date_new},
        { name: 'email', data: this.state.email.trim() },
        { name: 'telephone_no', data: this.state.telephone_no.trim() },
        { name: 'address', data: this.state.address.trim() },
        { name: 'postcode', data: this.state.postcode.trim() },
        { name: 'city', data: this.state.city.trim() },
        { name: 'country', data: this.state.country.trim() },   
        { name: 'q_1_ans', data: this.state.q_1_ans },
        { name: 'q_2_ans', data: this.state.q_2_ans.trim()},
        { name: 'q_3_ans', data: this.state.q_3_ans},
        { name: 'q_4_ans', data: this.state.q_4_ans.trim()},
        { name: 'q_5_ans', data: this.state.q_5_ans }
  
      
        ]).then((resp) => {        
          this.setState({
            isSpinner:false
          }); 
      console.log("response:::::::" + JSON.stringify(resp.text()));
      Alert.alert("Message","Mise à jour du profil réussie")
      this.props.navigation.navigate("home")      
      if(resp.json().error === "false"){
      this.setState({
        isSpinner:false
      });  
      }else if(resp.json().error=== "true"){
      // alert(resp.json().errorMessage)
      this.showalerts(resp.json().errorMessage)
      this.setState({
        isSpinner:false
      });      
      }
      }).catch((err) => {
      this.setState({
        isSpinner:false
      });
      console.log("response::::err:::" + err);
      });
  })
  }









  fetchStudentProfileData = async () => {
    const GetProfileDetails = await StudentProfile();
    if (GetProfileDetails.result == true) {
      var profileData = GetProfileDetails.response.my_profile;
      var first_name = GetProfileDetails.response.my_profile.first_name;
      var last_name = GetProfileDetails.response.my_profile.last_name;
      var birth_date = GetProfileDetails.response.my_profile.dob;
      var address = GetProfileDetails.response.my_profile.address;
      var postcode = GetProfileDetails.response.my_profile.postcode;
      var city = GetProfileDetails.response.my_profile.city;
      var country =  GetProfileDetails.response.my_profile.country;
      var telephone_no =  GetProfileDetails.response.my_profile.phone;
      var email =  GetProfileDetails.response.my_profile.email;

    

      // console.log("getting GetProfileDetails data----------",profileData)
      this.setState({ isBodyLoaded: true,isSpinner: false,profileData,
        first_name,last_name,birth_date,address,postcode,city,country,telephone_no,email
      
      });
    }
   
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Quelque chose a mal tourné, essayez encore",[ { text: "Ok",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }   
    // console.log("getting country response----------------",countryData.country_list)
  };









  fetchget_academic_info = async () => {
    const get_academic_infoResponse = await get_academic_info();
    if (get_academic_infoResponse.result == true) {
     var AcademicDetails = get_academic_infoResponse.response.academic_info;
     var q_1_ans = get_academic_infoResponse.response.academic_info.q_1
     var q_2_ans = get_academic_infoResponse.response.academic_info.q_2
     var q_3_ans = get_academic_infoResponse.response.academic_info.q_3
     var q_4_ans = get_academic_infoResponse.response.academic_info.q_4
     var q_5_ans = get_academic_infoResponse.response.academic_info.q_5

      console.log("getting get academic detail data----------",get_academic_infoResponse.academic_info)
      this.setState({ isBodyLoaded: true,isSpinner: false,AcademicDetails,
        q_1_ans,q_2_ans,q_3_ans,q_4_ans,q_5_ans      
      });
    }
   
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }   
    // console.log("getting country response----------------",countryData.country_list)
  };






  validateUser = async () => {
    const {      
      first_name,
      last_name,
      birth_date,
      email,     
      telephone_no,
      address,
      postcode,    
      city,
      country,  
      q_1_ans,
      q_2_ans,
      q_3_ans,
      q_4_ans,
      q_5_ans,
      q_6_ans
    } = this.state;
     if (first_name.length === 0) {
      this.myAlert('Message', 'Veuillez saisir votre prénom!');
    } else if (last_name.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre nom de famille!');
    }
    else if (birth_date.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre date de naissance!');
    }
    // else if (address.length === 0) {
    //   this.myAlert('Message', 'Veuillez entrer votre adresse!');
    // }
    // else if (postcode.length === 0) {
    //   this.myAlert('Message', 'Veuillez entrer votre code postal!');
    // }
    else if (city.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre ville!');
    } else if (country.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre pays!');
    } 
     else if (telephone_no.length === 0) {
      this.myAlert('Message', 'Veuillez saisir votre numéro de téléphone!');
    } 
    else if (email.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
    }   
    else if (q_1_ans.length === 0) {
      this.myAlert('Message', 'Veuillez choisir votre répondre à !');
    }
    else if (q_2_ans.length === 0 ) {
      this.myAlert('Message', 'Veuillez entrer votre répondre à');
    }
    // else if (q_3_ans.length === 0 ) {
    //   this.myAlert('Message', 'Veuillez entrer votre répondre à".');
    // }
    else if (q_4_ans.length === 0 ) {
      this.myAlert('Message', 'Veuillez entrer votre répondre à".');
    }
    else if (q_5_ans.length === 0 ) {
      this.myAlert('Message', 'Veuillez choisir votre répondre à !');
    }
    else {
   
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Email-id invalide');
        return false;
      }  
      this.uploadWholeData();
    }
  };

 





  chooseFile = () => {
    var options = {
      title: 'Choisir une photo',     
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    // let options = {
    //   title: 'Choisir une photo',
    //   maxWidth: 256,
    //   maxHeight: 256,
    //   storageOptions: {
    //     skipBackup: true
    //   }
    // };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.data;
        let path = response.uri
        // console.log("Getting source response here"+source)
        this.setState({
          filePath: source,
          path:path
          
        });
      }
    });
  };




  componentDidMount = async () => {
    // let DOB = this.props.navigation.getParam("birthDate")
    // var birth_date = new Date(DOB);
    // setTimeout(() => {
    //   this.setState({birth_date})
    // }, 300);
    

    setTimeout(() => {
      this.fetchStudentProfileData()
      this.fetchget_academic_info()
    }, 2000);

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
      nav.goBack();
      return true;
    }
  };


  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  render() {
    // console.log("inside render===================",this.state.filePath)
    const {profileData} = this.state;

    let profile_url = this.props.navigation.getParam("profile_url")

    console.log("getting profile img  ------------------",profile_url)

    let DOB = this.props.navigation.getParam("birthDate")   
    var birth_date = new Date(DOB)

    console.log("getting birht daye========",birth_date)

    

//   var birth_date = JSON.stringify(new Date(birth_date))


//   let birth_date_new =  birth_date.substr(0, birth_date.indexOf('T'));

//  console.log("getting now velue rere===================",birth_date_new)  
 

    console.log("INSIDE REDNER METHOD+++++++++++++", typeof profile_url)
    return (
      <View style={{flex: 1, }}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
      
          <ImageBackground source={require("../../../../../../assets/icon/bg1.png")} resizeMode="cover" style={{height:200,width:"100%",flexDirection:"row",justifyContent:"space-between"}}>                 
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={back} style={Styles.headertxtInputImg} />
            </TouchableOpacity>
            <Text style={Styles.headerTxt}>       Editer le Profil</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={()=>{this.validateUser()}}>
                <Image source={Right} style={Styles.headertxtInputImg2} />
              </TouchableOpacity>
              <Image source={logo} style={Styles.headertxtInputImg1} />
            </View>
          
          </ImageBackground>

          <Spinner visible={this.state.isSpinner}/>   

          {
            this.state.isBodyLoaded == true ?



            <Fragment>
            {
             this.state.path == "" ?
             <View style={{marginTop: -60}}>
             <Image  source={require("../../../../../../assets/icon/avatar.png")} style={Styles.peopleStyle} />
           </View>
           :
           this.state.path == "" ?
           <View style={{marginTop: -60}}>
             <Image  source={{
           uri: `https://www.spyk.fr/${profileImg}`,
         }}  style={Styles.peopleStyle} />
           </View> :
             <View style={{marginTop: -60}}>
             <Image  source={{ uri: this.state.path }} style={Styles.peopleStyle} />
           </View>
           }



           {/* {
             profile_url != "" || profile_url != undefined || profile_url != null ?
              <Fragment>

             <View style={{marginTop: -60}}>
             <Image  source={{
           uri: `https://www.spyk.fr/${profile_url}`,
         }}  style={Styles.peopleStyle} />
           </View>
         </Fragment>
            :
            <Fragment>
                {
                  this.state.path == "" || this.state.path == undefined || this.state.path == null ?

                     <View style={{marginTop: -60}}>
                        <Image  source={require("../../../../../../assets/icon/avatar.png")} style={Styles.peopleStyle} />
                      </View>

                      :

                      <View style={{marginTop: -60}}>
                      <Image  source={{ uri: this.state.path }} style={Styles.peopleStyle} />
                    </View>



                }



              </Fragment>



           }
          */}
 
        
 
           <TouchableOpacity onPress={this.chooseFile.bind(this)} style={{height:30,width:30,alignSelf:'center'}}>
           <Image source={require('../../../../../../assets/icon/27.png')} style={{height:30,width:30,margin:-15,alignSelf:'center'}} />
           </TouchableOpacity>
           <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
           <ScrollView>
             <View
               style={{
                 flex: 2,
                 borderWidth: 0,
                 width: '99%',
                 alignSelf: 'center',
                 marginTop: 6,
                 marginBottom: 15,
                 alignItems: 'center',
               }}>
               <TextInput placeholder="  Nom" 
                 onChangeText={(first_name) => this.setState({first_name})}
               style={Styles.txtInput} >{this.state.first_name}</TextInput>
    <TextInput placeholder="  Prénom" 
                 onChangeText={(last_name) => this.setState({last_name})}
               style={Styles.txtInput} >{this.state.last_name}</TextInput>
              <View   style={Styles.textInputField}>                              
              <Text style={{fontWeight:"600",color:"gray",margin:10,marginStart:-10}}>Date de naissance</Text>
                     <DatePicker                    
                         mode="date"   
                         style={{width:SCREEN_WIDTH*0.80,marginStart:-10,backfaceVisibility:"visible", backgroundColor: '#F6F2EF',}}                          
                         maximumDate={this.state.date}               
                         date={birth_date}
                         locale={'fr'}                    
                         onDateChange={(birth_date) => {
                           this.setState({birth_date});
                         }}
                     />
 
 
                 </View>
             
             
                  <TextInput placeholder="  Ville" 
                 onChangeText={(city) => this.setState({city})}  
               style={Styles.txtInput} >{this.state.city}</TextInput>
            <TextInput placeholder="  Pays" 
                onChangeText={(country) => this.setState({country})} 
               style={Styles.txtInput} >{this.state.country}</TextInput>
               <TextInput
                 placeholder="  Numéro de téléphone"
                 style={Styles.txtInput}
                 keyboardType="phone-pad"
                 onChangeText={(telephone_no) => this.setState({telephone_no})}
               >{this.state.telephone_no}</TextInput>
                  <TextInput placeholder="  Email" 
                onChangeText={(email) => this.setState({email})}              
               style={Styles.txtInput} >{this.state.email}</TextInput>
 
               <View style={{alignSelf: 'flex-start'}}>
                 <Text style={Styles.txtStyle1}>Diplôme</Text>
                 <View style={Styles.radiobtnMainView}>
                 <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                         {
                             this.state.data1.map((singleMap,key)=>{
                               // console.log("geeeeeeee",singleMap)
                                 return(
                                     <View style={{marginStart:20}}>
                                         {
                                             this.state.q_1_ans == singleMap.value ? 
                                             <TouchableOpacity onPress={()=>{this.setState({q_1_ans:singleMap.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                                 <Image source={require("../../../../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                                 <Text style={{color:"lightgreen",fontWeight:"700"}}>{singleMap.value}</Text>
                                             </TouchableOpacity>
 
                                             :
                                             <TouchableOpacity onPress={()=>{this.setState({q_1_ans:singleMap.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                                 <Image source={require("../../../../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                                 <Text style={{color:"gray"}}>{singleMap.value}</Text>
                                             </TouchableOpacity>
                                         }
                                     </View>
                                 )
                             })                         
                         }
                     </View>
                 </View>
               </View>
 
               <View style={{alignSelf: 'flex-start'}}>
                 <Text style={Styles.txtStyle1}>
                 Vos centres d'intérêts (voyages, cinéma, lecture, cuisine, etc.)
                 </Text>
                 <View style={Styles.radiobtnMainView}>                             
                 </View>
               </View>
 
           
             
                   <TextInput
                    style={Styles.txtInput}
                     onChangeText={(q_2_ans) => this.setState({q_2_ans})}
                    placeholder="Profession">{this.state.q_2_ans}</TextInput> 
             
 
            
 
               <View
                 style={{
                   margin: 6,
                   borderColor: 'gray',
                   borderWidth: 1,
                   height: 90,
                   width: '85%',
                   alignSelf: 'center',
                   borderRadius: 10,
                   borderColor: 'gray',
                 }}>
                 <Text style={{fontSize: 12, color: 'gray', margin: 7}}>
                 A propos de vous. Vos centres d'intérêt
                 </Text>
                 <TextInput
                     onChangeText={(q_4_ans) => this.setState({q_4_ans})}
                 // style={Styles.txtInput1}
                 >{this.state.q_4_ans}</TextInput>
               </View>
 
 
 
 
 
 
               <Text style={{fontSize:16,fontWeight:'700',alignSelf:'flex-start',marginStart:30,color:"gray"}}>Votre besoin en anglais </Text>
 
               <View style={Styles.radiobtnMainView}>
                 <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                         {
 
                             this.state.data2.map((singleMap,key)=>{
                               // console.log("geeeeeeee",singleMap)
                                 return(
                                     <View style={{marginStart:20}}>
                                         {
                                             this.state.q_5_ans == singleMap.value ? 
                                             <TouchableOpacity onPress={()=>{this.setState({q_5_ans:singleMap.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                                 <Image source={require("../../../../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                                 <Text style={{color:"lightgreen",fontWeight:"700"}}>{singleMap.value}</Text>
                                             </TouchableOpacity>
 
                                             :
                                             <TouchableOpacity onPress={()=>{this.setState({q_5_ans:singleMap.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                                 <Image source={require("../../../../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                                 <Text style={{color:"gray"}}>{singleMap.value}</Text>
                                             </TouchableOpacity>
                                         }
                                     </View>
                                 )
                             })                         
                         }
                     </View>
                 </View>
 
 
 
 
 
             </View>
           </ScrollView>
           </KeyboardAwareScrollView>   
 
 
           </Fragment> 



            :
            <View>
              <Text></Text>
            </View>
          }                       
       
       
      </View>
    );
  }
}

// 23.Mon profil
// Nom
// John Smith
//
//
//
//
//
//
//
//
//  :
//
//
//
//
//
// Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .
