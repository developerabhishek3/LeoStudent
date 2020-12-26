import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler, StatusBar} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/1.png'
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../../../assets/icon/25.png';

import {supportFunction} from '../../../../../Api/afterAuth'


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {      
        supportData:[],
    };
  }

  componentDidMount = async () => {
    this.fetchSupportData()


    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchSupportData = async () => {
      const GetSupportResponse = await supportFunction();
      if (GetSupportResponse.result == true) {
        var supportData = GetSupportResponse.response.contact_info;
        console.log("getting supportData data----------",supportData)
      }
      this.setState({supportData});
      // console.log("getting country response----------------",countryData.country_list)
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
  



  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {

    const {supportData} =  this.state;

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
         <View style={Styles.header}>
         <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Aide</Text>
          <Text style={Styles.headerTxt}>    </Text>
        </View>

        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>
       


          
          <ScrollView>



        <View style={{flexDirection:'column',alignSelf:'center',margin:20}}>

            <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:14,fontWeight:'700',color:'gray'}}>{supportData.about_us}</Text>
             <Image  />
            </View>


            <View style={{flexDirection:'column',marginTop:20}}>
    <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center'}}>{supportData.address}</Text>
    <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center'}}>{supportData.contact_no}</Text>
    {/* <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center'}}>{supportData.contact_no}</Text>
    <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center'}}>{supportData.contact_no}</Text> */}
              {/* <Text style={{fontSize:16,fontWeight:'700'}}>14 H 00 - 14 H 30</Text> */}
            </View>

        </View>












          </ScrollView>




          
        </ImageBackground>
          
      </View>
    )
  }
}
