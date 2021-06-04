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

import {StudentProfile,get_academic_info} from '../../../../../Api/afterAuth';
// import { connect } from 'react-redux';
// import {
//   getStudentsData,
// } from '../../../../../Redux/StudentDetails';
export default class MyProfile extends Component {

constructor(props){
  super(props)
  this.state={
    profileData:[],
    AcademicDetails:[],
                   
    isBodyLoaded: false,
    isSpinner: true,
    profile_url:"",
    birth_date:"",

    diploma:"",
    interest:"",
    aboutYouYourInterest:"",
    YourEnglishNeeds:""
  }
}

componentDidMount = async () => {

  let profile_url = this.props.navigation.getParam("profile_url")
 this.setState({profile_url})

  this.fetchStudentProfileData()
  this.fetchget_academic_info()

  BackHandler.addEventListener('hardwareBackPress', () =>
  this.handleBackButton(this.props.navigation),
);
}

// fetchGetStdents = async () => {
//   this.props.fetchStudentsData(); 
// };
  
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
 







  fetchget_academic_info = async () => {
    const get_academic_infoResponse = await get_academic_info();
    if (get_academic_infoResponse.result == true) {
     var AcademicDetails = get_academic_infoResponse.response.academic_info;
     var diploma = get_academic_infoResponse.response.academic_info.q_1
     var interest = get_academic_infoResponse.response.academic_info.q_2
     var q_3_ans = get_academic_infoResponse.response.academic_info.q_3
     var aboutYouYourInterest = get_academic_infoResponse.response.academic_info.q_4
     var YourEnglishNeeds = get_academic_infoResponse.response.academic_info.q_5

      console.log("getting get academic detail data----------",get_academic_infoResponse.response.academic_info)
      this.setState({diploma,interest,aboutYouYourInterest,YourEnglishNeeds})
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
    // const { studentStore } = this.props;
    // const { studentsDetails, loader } = studentStore;

    // console.log("getting student store details from the redux=============",studentStore)
    // console.log("getting student store details 11111111111     from the redux=============",studentsDetails)

    const { profileData,isBodyLoaded,isSpinner } = this.state;
    // console.log("getting inside the render method ??????????????",this.state.birth_date)

    var newdate = this.state.birth_date.split("-").reverse().join("/");
    console.log("getting birthdate==========",newdate)

    // const userMap = Object.assign(profileData)
    return (
      <View style={{flex:1,}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <ImageBackground source={require("../../../../../assets/icon/bg1.png")} resizeMode="cover" style={{height:200,width:"100%",flexDirection:"row",justifyContent:"space-between"}}> 
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

        </ImageBackground>

        <View style={{marginTop:-60}}> 
          {
            this.state.profile_url == "" ?

                        <Image source={People}  style={Styles.peopleStyle} />
            :
            <Image source={{
              uri: `https://www.spyk.fr/${profileData.profile_url}`,
            }}  style={Styles.peopleStyle} />
          }        
          </View>    


        <Spinner visible={this.state.isSpinner}/>                          
       
        {
          isBodyLoaded == true ? 
          <ScrollView>

          <View style={{flex:2,borderWidth:0,width:'99%',alignSelf:'center',marginTop:6,marginBottom:15}}>


            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Nom</Text>

    <Text style={Styles.nameHeadingTxt}>{profileData.first_name} {profileData.last_name}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}> Numéro de téléphone</Text>

    <Text style={Styles.nameHeadingTxt}> {profileData.phone}</Text>

            </View>
            </View>




            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Email</Text>

            <Text style={Styles.nameHeadingTxt}>{profileData.email}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Date de naissance</Text>
              <Text style={Styles.nameHeadingTxt}>{newdate}</Text>        
              </View>
            </View>



            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Ville</Text>

            <Text style={Styles.nameHeadingTxt}>{profileData.city}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Pays</Text>
              <Text style={Styles.nameHeadingTxt}>{profileData.country}</Text>        
              </View>
            </View>




            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Diplôme</Text>

            <Text style={Styles.nameHeadingTxt}>{this.state.diploma}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Centres d'intérêts</Text>
              <Text style={Styles.nameHeadingTxt}>{this.state.interest}</Text>        
              </View>
            </View>

            <View style={Styles.nameStyleView1}>
           

            <Text style={Styles.nameHeading1}>Vos besoins en anglais</Text>
            <Text style={Styles.nameHeadingTxt1}>{this.state.YourEnglishNeeds}</Text>


         
</View>

<View style={Styles.nameStyleView1}>
           

          

            <Text style={Styles.nameHeading1}>A propos de vous. Vos centres d'intérêt</Text>
           <Text style={Styles.nameHeadingTxt1}>{this.state.aboutYouYourInterest}</Text>  

 
</View>


          </View>
       
          </ScrollView>
          :null}
             
        
           
      </View>
    )
  }
}
// const mapStateToProps = (state) => {
//   return {
//     studentStore: state.studentStore,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchStudentsData: () => {
//       dispatch(getStudentsData());
//     },  
//     // setCurrentSelectedCategoryDispatch: (categoryData) => {
//     //   dispatch(setCurrentSelectedCategory(categoryData));
//     // },
//   };
// };

// export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);
