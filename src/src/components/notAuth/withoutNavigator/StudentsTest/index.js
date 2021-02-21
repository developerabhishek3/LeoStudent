import React, {Component, Fragment} from 'react';
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
import bgImg from '../../../../assets/bgImages/3.png';
import logo from '../../../../assets/icon/96.png';
import facebook from '../../../../assets/icon/fb.png';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import {get_questionaireFunction,post_questionaireFunction} from '../../../../Api/afterAuth'
import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:['computer','laptop','mobile'],
        checked:0,
        questionData:[],
        isBodyLoaded: false,
        isSpinner: true,
        question_id:0,
        option_id:0,
        postAnswer:[]
    };
  }

  componentDidMount = async () => {
    this.fetchQuestionData()

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchQuestionData = async () => {
      const GetquestionDataResponse = await get_questionaireFunction();
      if (GetquestionDataResponse.result == true) {
        var questionData = GetquestionDataResponse.response.questionaire;
        console.log("getting response inside getting all question.............",questionData)
        this.setState({questionData,isBodyLoaded:true,isSpinner:false});
        // console.log("getting GetquestionDataResponse data----------", JSON.stringify(questionData))
      }
      else{
        Alert.alert("Message","Erreur Réessayer !")
      }    
      // console.log("getting country response----------------",countryData.country_list)
    };
    
    
    userPostQuestionFunction = async () => {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh ----------============ ======== = = = =   =  =========== = = =  =")
      //Single question body
      //{ "question_id": 1, "option_id": 1 },
      let questionBody = [];
      this.state.questionData.map((question,index) => {
        if(question.selectedAns != undefined && question.selectedAns.hasOwnProperty('option_id')) { 
            questionBody.push({ "question_id": question.ques_id, "option_id": question.selectedAns.option_id });
        }
      });
      console.log("POST_QUESTION_BODY - ", {test_data: JSON.stringify(questionBody)});

      const post_questionaireResponse = await post_questionaireFunction({test_data: questionBody});
      if (post_questionaireResponse.result == true) {
        console.log("getting result here --------", post_questionaireResponse.response)

        if (post_questionaireResponse.response.status == true) {           
            console.log("getting response >>>>>>>>>>>>>>>>",post_questionaireResponse.response)  
            let questionAttempt = post_questionaireResponse.response.ques_ans_attempt;
            let correctAnswer = post_questionaireResponse.response.ques_ans_right
            await AsyncStorage.setItem("level_id", JSON.stringify(post_questionaireResponse.response.level_id)); 

           this.props.navigation.navigate("questionresult",{correctAnswer:correctAnswer,questionAttempt:questionAttempt})
        }
        else {
          // Alert.alert("Message", post_questionaireResponse.response.message)
        }
      } else {
        Alert.alert('Error', post_questionaireResponse.error);
        console.log('getting error here-------------');
      }
      return;
    };
     


    
    handleAnswerOnPress = (singleData, singleMAp, qIndex, aIndex) => { 
      const newState = [...this.state.questionData]; 
      console.log("qIndex - ",qIndex);
      newState[qIndex].selectedAns = singleMAp;
      this.setState({ questionData: newState });
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
    // console.log("getting inside render-----------",this.state.questionData)
    return (
      <View style={Styles.container}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "blue" translucent = {false}/>
        <Spinner visible={this.state.isSpinner} />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
            {
              this.state.isBodyLoaded == true ? 
              <ScrollView>
              <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
                <View style={Styles.headerView}>
                <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
                  <Image source={logo} style={Styles.headerLogo} />
                  </TouchableOpacity>
                  <View style={{marginEnd: 50, marginTop: -10}}>                   
                    <Text style={Styles.headerTxt1}>     Test de niveau </Text>
                     <Text style={Styles.headerTxt}>(10 min)</Text>
                  </View>
                </View>

                <View style={{marginTop: 30}}>
                  {/* <View style={Styles.subHeader}>
                    <Text style={Styles.txtStyle1}>Choisissez votre niveau ou faites le test (10min)</Text>
                  </View> */}

                  <View style={Styles.radiobtnMainView}>
                  <View style={{width:'96%',}}>
                    {this.state.questionData.map((singleData, qIndex) => {     
                      
                      
                      // console.log("getting respone -----------",singleData)
                      let QuestionKey = Object.values(singleData)[1];       
                      let InstructionKey = Object.values(singleData)[2];           
                      return (
                        <View>
                          {   
                           <View>
                              <Text style={{fontSize:12,fontWeight:'700',color:"#000000",marginStart:20,width:"90%",borderWidth:0,margin:1,}}>
                                {QuestionKey}
                              </Text>

                              <Text style={{fontSize:12,fontWeight:'700',color:"#000000",marginStart:20,width:"90%",borderWidth:0,margin:1,fontStyle:'italic'}}>
                                  {InstructionKey}
                              </Text>
                          </View>                                                    
                          }                        
                        
                            {/* <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderWidth: 0,
                                borderColor:"red",
                                marginStart: 10,                              
                                
                              }}> */}
                                <Fragment>
                              {
                                // console.log("getting value >>>>>>>>>>>>",singleData.optionss)
                                singleData.optionss.map((singleMAp,aIndex)=>{
                                  let OptionKey = singleMAp.option_id
                                  return(
                                    <View style={{borderColor:"green",borderWidth:0,width:"80%",marginStart:15,flexDirection:'row',justifyContent:'flex-start',flexWrap:'wrap',alignSelf:'flex-start'}} >
                                      {
                                          singleData?.selectedAns?.option_id == OptionKey ? 
                                          <TouchableOpacity onPress={() => this.handleAnswerOnPress(singleData, singleMAp, qIndex, aIndex)} style={{flexDirection:'row',alignItems:'flex-start',borderColor:"red",borderWidth:0}}>
                                              <Image source={require("../../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                              <Text key={aIndex} style={{fontSize:12,color:"lightgreen",fontWeight:'700',margin:3,}}>{singleMAp.option}</Text>
                                          </TouchableOpacity>
                                          :
                                          <TouchableOpacity onPress={() => this.handleAnswerOnPress(singleData, singleMAp, qIndex, aIndex)} style={{flexDirection:'row',alignItems:'flex-start'}}>
                                              <Image source={require("../../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                              <Text key={aIndex} style={{fontSize:12,color:"gray",fontWeight:'700',margin:3,}}>{singleMAp.option}</Text>
                                         </TouchableOpacity>
                                      }                                      
                                    </View>                                    
                                  )
                                })                                                     
                              }
                              </Fragment>
                            {/* </View> */}
                        </View>
                      );
                    })}
                  </View>                  
                  </View>
  
  






                <View style={{marginTop:60}}>               
  
                  <View style={Styles.continueBtn}>
                    <TouchableOpacity
                      // onPress={() => {
                      //   this.props.navigation.navigate('home');
                      // }}
                      onPress={()=>{this.userPostQuestionFunction()}}
                      >
                      <Text style={Styles.continueBtnTxt}>Valider</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </View>
            </ScrollView>



              :null
            }

        </ImageBackground>
      </View>
    );
  }
}
