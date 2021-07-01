import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Modal,Image,TextInput,TouchableOpacity,BackHandler, Alert,StatusBar} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/6.png'
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../assets/icon/25.png';
import Stars from 'react-native-stars';
import {rating_to_teacher,teacher_rating_info} from '../../../Api/afterAuth';
import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      teacher_id:0,
      rating:0,
      comment:"",
      TeacherRating:[],
      isBodyLoaded:false,
      isSpinner:true,
      alertValue:"",
      Model_Visibility: false,
      Alert_Visibility1: false,
      Alert_Visibility: false,
    }
  }



  Show_Custom_Alert(visible,) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false}); 
    // this.props.navigation.navigate("login")    
  }

  Show_Custom_Alert1(visible,) {
    this.setState({Alert_Visibility1: visible});
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility1: false}); 
    this.props.navigation.navigate("profile2")  
  }



  rating_to_teacherFunction = async () => {
    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)
    const {teacher_id,rating,comment} = this.state;
    console.log("getting rating before send--------",rating)
    const rating_to_teacherResponse = await rating_to_teacher({
        teacher_id,
        rating,
        comment,
      });
    if (rating_to_teacherResponse.result == true) {  
      this.Show_Custom_Alert1()  
    
      console.log("getting TeacherDetails data----------",rating_to_teacherResponse.response)
    }
    // this.setState({TeacherDetails,isBodyLoaded:true,isSpinner:false});
    // console.log("getting country response----------------",countryData.country_list)
  };


  




 teacher_rating_infoFunction = async () => {
    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)

   let teacher_id =  this.props.navigation.getParam("teacher_id")
    
    console.log("getting teacher_id before send--------",teacher_id)
    const teacher_rating_infoResponse = await teacher_rating_info({
        teacher_id,       
      });
    if (teacher_rating_infoResponse.result == true) {     
      // console.log("getting TeacherDetails data----------",teacher_rating_infoResponse.response)
      var TeacherRating = teacher_rating_infoResponse.response.rating_info
    }
    this.setState({TeacherRating,isBodyLoaded:true,isSpinner:false});
    // console.log("getting country response----------------",countryData.country_list)
  };



  // ratingCompleted(rating) {
  //   console.log("Rating is: " + rating)
  //   this.setState({rating:rating})
  // }

  ratingCompleted = (rating) => {
    this.setState({ rating })        
  }

  componentDidMount = async () => {


    let teacher_id = this.props.navigation.getParam("teacher_id")
    setTimeout(() => {
      this.setState({teacher_id})  
    }, 100);

    setTimeout(() => {
      this.teacher_rating_infoFunction()
    }, 600);
    
    
    // this.fetchLevelData()
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


validateFunction(){
  let alertValue;
  const {rating,comment} = this.state;
  if(!rating){

    alertValue = "S'il vous plaît, donnez une note à l'enseignant!"
    this.setState({alertValue})
    this.Show_Custom_Alert()
    // Alert.alert("Message","Please give some rating to teacher!")
  }  
  else{
    this.rating_to_teacherFunction() 
  }

   
}





  render() {

  const {TeacherRating} = this.state;

  let teacher_profile_url = this.props.navigation.getParam("teacher_profile_url")
  let course_date = this.props.navigation.getParam("course_date")
  let course_time = this.props.navigation.getParam("course_time")
  let teacher_name = this.props.navigation.getParam("teacher_name")

  // console.log("inside the render methid=========",TeacherRating)

  // console.log("getting all param==============",teacher_profile_url,teacher_name,course_date,course_time)



    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        {/* <ImageBackground source={bgImg} resizeMode="cover" style={{flex:2,borderWidth:0,width:'100%'}}> */}
        {/* <View style={Styles.header}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Notez votre coach</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View> */}
          <ImageBackground source={require("../../../assets/icon/bg1.png")} resizeMode="cover" style={{height:200,width:"100%",flexDirection:"row",justifyContent:"space-between"}}> 
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Notez votre coach</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </ImageBackground>
        <Spinner visible={this.state.isSpinner} 
        />
        <View style={{flex:2,width:"100%"}}>
       

        <View style={{marginTop:-50}}> 
            <Image   source={{
                              uri: `https://www.spyk.fr/${teacher_profile_url}`,
                            }}  style={Styles.peopleStyle} />            
          </View>

          <Text style={{fontSize:13,color:'gray',fontWeight:'700',alignSelf:'center'}}>Votre coach</Text>
          <Text style={{alignSelf:'center',fontWeight:'700',fontSize:16,}}>{teacher_name}</Text>


{
  this.state.isBodyLoaded == true ?


  <ScrollView keyboardShouldPersistTaps="always">

        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>

            <View style={{flexDirection:'column'}}>
              <Text style={{fontSize:14,fontWeight:'700',color:'gray'}}>Date du coaching</Text>
              <Text style={{fontSize:16,fontWeight:'700',color:'gray'}}>{course_date}</Text>
            </View>


            <View style={{flexDirection:'column'}}>
              <Text style={{fontSize:14,fontWeight:'700',color:'gray'}}>Horaire du coaching</Text>
    <Text style={{fontSize:16,fontWeight:'700',color:'gray'}}>{course_time}</Text>
            </View>

        </View>
        <View style={{alignItems:'center',margin:16}}>
                                    <Stars
                                    update={(rating)=>{this.setState({rating: rating})}}
                                      default={TeacherRating.rating}
                                      count={5}
                                      // half={true}
                                      starSize={30}
                                      fullStar={<Image source={require("../../../assets/icon/111.png")} style={{height:27,width:27,margin:3}} />}
                                      emptyStar={<Image source={require("../../../assets/icon/112.png")} style={{height:27,width:27,margin:3}} />}
                                      halfStar={<Image source={require("../../../assets/icon/113.png")} style={{height:27,width:27,margin:3}} />}
                                    />
                                  </View>


          {/* <View style={{margin:20}}>
            <Rating
                  type='custom'
                  ratingCount={5}
                  imageSize={24}
                  ratingColor='#FF1493'
                  ratingBackgroundColor='#c8c7c8'
                
                  // showRating={TeacherRating.rating}
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
          </View> */}
         


        <View>
          {/* <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center',margin:1}}>Hardley</Text> */}
          <Text style={{fontSize:16,fontWeight:'700',color:'gray',alignSelf:'center',margin:1}}>Comment s'est déroulé votre coaching ?</Text>
        </View>


          <View>
          <TextInput
            numberOfLines={4}
            multiline={true}
            onChangeText={(comment) => this.setState({ comment })}
            placeholder="Commentaire supplémentaire"
            placeholderTextColor="gray"
            style={{textAlign:'left',textAlignVertical:'top',width:'90%',alignSelf:'center',margin:10,padding:10,paddingVertical:3,backfaceVisibility:'hidden',backgroundColor:'#FFFFFF',elevation:3,borderRadius:7,}}
          />
          </View>



          <View style={Styles.continueBtn}>
              <TouchableOpacity
              
                // onPress={()=>{this.Show_Custom_Alert1()}}
                onPress={()=>{this.validateFunction()}}
              >
                <Text style={Styles.continueBtnTxt}>                  
                Valider
                </Text>
              </TouchableOpacity>
            </View>



          </ScrollView>




          
          :<View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
          <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}></Text>
        </View>

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
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 221,
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
                      source={require("../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                     {/* Veuillez entrer votre nouveau mot de passe de confirmation */}
                     {this.state.alertValue}
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











        
          <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert1(!this.state.Alert_Visibility1);
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
                  height: 221,
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
                      source={require("../../../assets/icon/101.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                    Félicitations, à bientôt
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
                      this.Hide_Custom_Alert1();
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








          </View>
          {/* <BottomNavigator
            currentRoute={'profile'}
            navigation={this.props.navigation}
        /> */}
      </View>
    )
  }
}



// 21.Evaluez le client
// 
// Hardley Smith
// Durée du coaching
// 30 min
// Horaire du cours
// 14 H 00 - 14 H 30
// Hardley,
// Comment s'est déroulée votre session ?
// Commentaire supplémentaire
// Soumettre