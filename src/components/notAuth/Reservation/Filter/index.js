import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  BackHandler
} from 'react-native';
import Styles from './indexCss';

import logo from '../../../../assets/icon/96.png';
import {RadioButton} from 'react-native-paper';
import bgImg from '../../../../assets/bgImages/1.png'

import back from '../../../../assets/icon/20.png'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:'',
      data1:[
        {"id": "1",
        "value":"coach natif"
          },
          {"id": "2",
          "value":"coach bilingue"
          },
          {"id": "3",
          "value":"lex deux me vant"
          },              
      ],


    };
  }


  componentDidMount = async () => {

    // setInterval(() => {
    //     console.log("inside the did mount ----------" +this.state.value)
    // }, 200);
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
          <Text style={Styles.headerTxt}>       Filtre</Text>
          {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate("filter")}}>
              <Image source={logo} style={Styles.headertxtInputImg1} />
          </TouchableOpacity> */}
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
          {/* <ScrollView> */}
        
              <View style={{flex:2,width:"100%",borderWidth:0,marginStart:20,margin:10}}>
                <View >
                  <Text style={{fontSize:18,fontWeight:'700',color:"red",marginStart:10,margin:7}}>Choisir l'experience</Text>
                </View>

                <View>
                  {
                    this.state.data1.map((singleMAp,key)=>{
                      return(
                        <View >                           
                                  {
                                      this.state.value == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({value:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center',margin:6}}>
                                          <Image source={require("../../../../assets/icon/9.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"red"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({value:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center',margin:6}}>
                                          <Image source={require("../../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>




                                  }


                                  
                                 
                        </View>
                      )


                      
                    })
                  }


<View style={Styles.continueBtn}>
                  <TouchableOpacity   
                                  
                    onPress={()=>{this.props.navigation.navigate("searchteacher",{coach_type:this.state.value})}}
                    >
                    <Text style={Styles.continueBtnTxt}>Sauver</Text>
                  </TouchableOpacity>
                </View>
                </View>

               
         

               


            
              </View>
        
          {/* </ScrollView> */}
        </ImageBackground>
      </View>
    );
  }
}
