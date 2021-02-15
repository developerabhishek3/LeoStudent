import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/1.png';
import logo from '../../../assets/icon/96.png';
import logoIcon from '../../../assets/icon/1.png';
import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';

import {level_academic_info} from '../../../Api/afterAuth'


export default class index extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      isSpinner:true,
      LevelInfo:true,
      AcademicInfo:true
    }
  }
 


  fetchlevel_academic_infoData = async () => {
    const level_academic_infoResponse = await level_academic_info();
    if (level_academic_infoResponse.result == true) {

        var AcademicInfo  = level_academic_infoResponse.response.is_academic_info;
        var LevelInfo = level_academic_infoResponse.response.is_level_info;  
        this.setState({LevelInfo,AcademicInfo}, () => {
          this.checkScreenStatus();
        });
        console.log("::::::::::::::::::::::::::::::::::::",LevelInfo,AcademicInfo)      
    }  
  };
  


async componentDidMount(){

    this.fetchlevel_academic_infoData()

   

        // setTimeout(() => {          
        // }, 900);
 
}




async checkScreenStatus () {

  console.log("coming inside function ort not================================================")

    console.log("getting level info=========",this.state.AcademicInfo,this.state.LevelInfo)

  
    try{
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';

      if(this.state.AcademicInfo == false){
        this.props.navigation.navigate('question');     
      }
      else if(this.state.LevelInfo == false){
        this.props.navigation.navigate('levelchoice');     
      }
      else if(userLoggedIn == 'true'){                
          this.props.navigation.navigate('home');                                        
      }    
      setTimeout(()=>{
        this.setState({ isLoading: false,isSpinner:false });
      },100);

    }catch(error){
    }   
}




render() {
    const { 
      isLoading
    } = this.state;

    // console.log("getting state value inside here--------------",this.state.is_academic_info,this.state.is_academic_info)
    return (
      <Fragment>
              <Spinner visible={this.state.isSpinner} />
        {  !isLoading && 
             <View style={Styles.container}>                   
             <StatusBar hidden />
             <ImageBackground
               source={bgImg}
               resizeMode="stretch"
               style={Styles.bgImgStyle}>
               <ScrollView>
                 <View style={{borderWidth: 0, marginBottom: 20, marginTop: 0,width:"99%",alignSelf:'center',borderWidth:0}}>
                   <View style={Styles.headerView}>
                   <Image source={logo} style={Styles.headerLogo} />
                     <View style={{alignSelf:'center',marginBottom:10}}>
                       <Text style={Styles.headerTxt}>Connectez-vous avec un coach </Text>
                       <Text style={Styles.headerTxt}>d'anglais pour un call in English</Text>
                     </View>                     
                   </View>                                  
                   <Text style={Styles.txtStyle2}>
                   GO ! Faites un call de 30 min ou 1h avec un coach d’anglais SPYK 
                   </Text>
                   {/* <Text style={Styles.txtStyle2}>
                   coach d'anglais SPYK !
                   </Text>              */}
     
                   <View style={{marginTop: 10, marginBottom: 0}}>
                     <Text style={Styles.txtStyle2}>
                       
                     Vous pouvez faire un call in English maintenant ou programmer un coaching d’anglais pour plus tard.
 
                     </Text>
                     {/* <Text style={Styles.txtStyle2}>
                     maintenant ou programmer un coaching
                     </Text>
     
                     <Text style={Styles.txtStyle2}>
                     d'anglais pour plus tard.
                     </Text> */}
                   </View>
                   <View>
                     <Image source={logoIcon} style={{width:190,height:190,margin:10,alignSelf:'center'}} />
                   </View>                      
                   <View style={Styles.continueBtn}>
                     <TouchableOpacity
                       onPress={() => {
                         this.props.navigation.navigate('login');
                       }}>
                       <Text style={Styles.continueBtnTxt}>Continuer</Text>
                     </TouchableOpacity>
                   </View>
                 </View>
               </ScrollView>
             </ImageBackground>
           </View>
        }
     
      </Fragment>
    );
  }
}
