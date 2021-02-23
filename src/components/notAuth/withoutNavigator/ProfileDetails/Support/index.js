import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler, StatusBar,Linking} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/1.png'
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../../../assets/icon/25.png';

import {supportFunction} from '../../../../../Api/afterAuth'
import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {      
        supportData:[],
        isSpinner:true,
        isBodyLoaded:false
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
      this.setState({supportData,isBodyLoaded: true,isSpinner: false});
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
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
         <View style={Styles.header}>
         <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Support</Text>
          <Text style={Styles.headerTxt}>    </Text>
        </View>
        <Spinner visible={this.state.isSpinner}/>

        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>
       

        {
        this.state.isBodyLoaded == true ?


          
          <ScrollView>



        <View style={{flexDirection:'column',alignSelf:'center',margin:20}}>

            {/* <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:14,fontWeight:'700',color:'gray'}}>{supportData.about_us}</Text>
             <Image  />
            </View> */}


            {/* <View style={{flexDirection:'column',marginTop:20}}>
    <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center'}}>{supportData.address}</Text>
    <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center'}}>{supportData.contact_no}</Text>
  
            </View> */}

        </View>







        <View > 
                <TouchableOpacity style={{flexDirection:'column',margin:15,justifyContent:'center',alignSelf:"center"}}
                
                onPress={()=>{
                  Linking.openURL(`tel:${9999999999}`)
                }}
                >
                    <Image source={require("../../../../../assets/icon/call1.png")} style={{height:60,width:60,margin:1,alignSelf:'center'}} />
                    <Text style={{fot:16,fontWeight:'600',color:"gray"}}>Appelez notre service clientèle</Text>
                </TouchableOpacity>
  
  
                <TouchableOpacity style={{flexDirection:'column',margin:15,justifyContent:'center',alignSelf:'center'}}
                  onPress={() => Linking.openURL('mailto:supprtleo@gmail.com?subject=SendMail&body=Description') }
                  title="support@example.com"
                >
                <Image source={require("../../../../../assets/icon/mssg1.png")} style={{height:60,width:60,margin:1,alignSelf:"center"}} />
                <Text style={{fot:16,fontWeight:'600',color:"gray"}}>Envoyez un message à notre </Text>
                  </TouchableOpacity>
    
    
  
  
          </View>
  





          </ScrollView>


:



<View style={{alignItems:'center',justifyContent:'center'}}>
   <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:18,fontWeight:'700',marginTop:160}}>chargement...</Text>
  </View>
          }
          



          
        </ImageBackground>
          
      </View>
    )
  }
}
