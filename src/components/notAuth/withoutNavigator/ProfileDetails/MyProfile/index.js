import React, { Component, Fragment } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler,StatusBar} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/6.png'

import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import Edit from '../../../../../assets/icon/34.png';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import People from '../../../../../assets/icon/avatar.png';

import {StudentProfile} from '../../../../../Api/afterAuth';
import { connect } from 'react-redux';
import {
  getStudentsData,
} from '@redux';
class MyProfile extends Component {

constructor(props){
  super(props)
  this.state={
    profileData:[],
      
    isBodyLoaded: false,
    isSpinner: true,
    profile_url:"",
    birth_date:"",
  }
}

componentDidMount = async () => {
  setTimeout(() => {    
  this.fetchGetStdents()
  }, 3000);

  let profile_url = this.props.navigation.getParam("profile_url")
 this.setState({profile_url})

  this.fetchStudentProfileData()

  BackHandler.addEventListener('hardwareBackPress', () =>
  this.handleBackButton(this.props.navigation),
);
}

fetchGetStdents = async () => {
  this.props.fetchStudentsData(); 
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

  fetchStudentProfileData = async () => {
    const GetProfileDetails = await StudentProfile();
    if (GetProfileDetails.result == true) {
      var profileData = GetProfileDetails.response.my_profile;
      var profile_url  = GetProfileDetails.response.my_profile.profile_url;
      var birth_date = GetProfileDetails.response.my_profile.dob
      console.log("getting GetProfileDetails data----------",profileData)
      this.setState({ isBodyLoaded: true,isSpinner: false,profileData,profile_url,birth_date});
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




  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {
    const { studentStore } = this.props;
    const { studentsDetails, loader } = studentStore;

    console.log("getting student store details from the redux=============",studentStore)
    console.log("getting student store details 11111111111     from the redux=============",studentsDetails)

    const { profileData,isBodyLoaded,isSpinner } = this.state;
    // console.log("getting inside the render method ??????????????",this.state.birth_date)

    
      var birth_date =  JSON.stringify(this.state.birth_date)


        let birth_date_new =  birth_date.substring(1,birth_date.indexOf('T'));
    // console.log("getting birthdate==========",birth_date_new)

    // const userMap = Object.assign(profileData)
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Spinner visible={this.state.isSpinner}/>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
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
              onPress={()=>{this.props.navigation.navigate("editprofile",{profile_url:this.state.profile_url,birthDate:this.state.birth_date})}}
          >
           <Image source={Edit} style={Styles.headertxtInputImg2} />
          </TouchableOpacity>
          </View>
        </View>

        {
          isBodyLoaded == true ? 
        <Fragment>

          <View style={{marginTop:30}}> 
          {
            this.state.profile_url == "" ?

                        <Image source={People}  style={Styles.peopleStyle} />
            :
            <Image source={{
              uri: `https://www.spyk.fr/${profileData.profile_url}`,
            }}  style={Styles.peopleStyle} />
          }        
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


        
            <Text style={Styles.nameHeadingTxt}>{this.state.birth_date}</Text>
          
             

            </View>
            </View>




            {/* <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}></Text>

              <Text style={Styles.nameHeadingTxt}>{} </Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Vos compétences linguistiques</Text>

              <Text style={Styles.nameHeadingTxt}>anglais professionnel</Text>

            </View>
            </View> */}



            {/* <View style={Styles.addressView}>
                <Text style={Styles.nameHeading}>Address</Text>
    <Text style={Styles.nameHeadingTxt}>{profileData.address}</Text>

            </View> */}


{/* 
            <View style={Styles.addressView}>
                <Text style={Styles.nameHeading}>Objectif</Text>
                <Text style={Styles.nameHeadingTxt}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .</Text>
                <Text style={Styles.nameHeadingTxt}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .</Text>

            </View> */}


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
const mapStateToProps = (state) => {
  return {
    studentStore: state.studentStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentsData: () => {
      dispatch(getStudentsData());
    },  
    // setCurrentSelectedCategoryDispatch: (categoryData) => {
    //   dispatch(setCurrentSelectedCategory(categoryData));
    // },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);


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