import React, { Component, Fragment } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler,StatusBar} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/6.png'

import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import Edit from '../../../../../assets/icon/34.png';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import People from '../../../../../assets/icon/25.png';

import {StudentProfile} from '../../../../../Api/afterAuth'

export default class index extends Component {

constructor(props){
  super(props)
  this.state={
    profileData:[],
      
    isBodyLoaded: false,
    isSpinner: true,
  }
}

componentDidMount = async () => {
  this.fetchStudentProfileData()

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








  fetchStudentProfileData = async () => {
    const GetProfileDetails = await StudentProfile();
    if (GetProfileDetails.result == true) {
      var profileData = GetProfileDetails.response.my_profile;
      console.log("getting GetProfileDetails data----------",profileData)
      this.setState({ isBodyLoaded: true,isSpinner: false,profileData});
    }
   
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }   
    // console.log("getting country response----------------",countryData.country_list)
  };




  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {
    const { profileData,isBodyLoaded,isSpinner } = this.state;
    console.log("getting inside the render method ??????????????",profileData)

    // const userMap = Object.assign(profileData)
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Spinner visible={this.state.isSpinner}/>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        {/* {
          isBodyLoaded == true ?  */}
          <Fragment>



<ImageBackground source={bgImg} resizeMode="cover" style={{flex:2,borderWidth:0,width:'100%'}}>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>        Mon profil</Text>
          <View style={{flexDirection:'row'}}>
          <Image source={logo} style={Styles.headertxtInputImg1} />
          <TouchableOpacity 
              onPress={()=>{this.props.navigation.navigate("editprofile")}}
          >
           <Image source={Edit} style={Styles.headertxtInputImg2} />
          </TouchableOpacity>
          </View>
        </View>



        {
          isBodyLoaded == true ? 


<Fragment>

          <View style={{marginTop:60}}> 
            <Image source={People} style={Styles.peopleStyle} />            
          </View>          
          <ScrollView>
            

          <View style={{flex:2,borderWidth:0,width:'99%',alignSelf:'center',marginTop:6,marginBottom:15}}>





            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Nom</Text>

    <Text style={Styles.nameHeadingTxt}>{profileData.first_name} {profileData.last_name}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}> Numéro de téléphone</Text>

    <Text style={Styles.nameHeadingTxt}>+{profileData.phone}</Text>

            </View>
            </View>




            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Email</Text>

    <Text style={Styles.nameHeadingTxt}>{profileData.email}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Date de naissance</Text>

    <Text style={Styles.nameHeadingTxt}>{profileData.dob}</Text>

            </View>
            </View>




            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Diplôme</Text>

              <Text style={Styles.nameHeadingTxt}>{} </Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Vos compétences linguistiques</Text>

              <Text style={Styles.nameHeadingTxt}>anglais professionnel</Text>

            </View>
            </View>



            <View style={Styles.addressView}>
                <Text style={Styles.nameHeading}>Address</Text>
    <Text style={Styles.nameHeadingTxt}>{profileData.address}</Text>

            </View>



            <View style={Styles.addressView}>
                <Text style={Styles.nameHeading}>Objectif</Text>
                <Text style={Styles.nameHeadingTxt}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .</Text>
                <Text style={Styles.nameHeadingTxt}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .</Text>

            </View>









          </View>
          </ScrollView>  
          </Fragment>  
          
          :null}
        </ImageBackground>      


            </Fragment>     
      </View>
    )
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