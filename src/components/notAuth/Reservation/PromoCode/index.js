import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  BackHandler,
  Alert
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Spinner from 'react-native-loading-spinner-overlay';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';
import rightIcon from '../../../../assets/icon/33.png';
import calenderIcon from '../../../../assets/icon/10.png';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import Styles from './indexCss';

import {RadioButton} from 'react-native-paper';
import  { getAllPromoCodes } from '../../../../Api/afterAuth';

import Collapsible from 'react-native-collapsible';
import HTML from 'react-native-render-html';

let today = '';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      allPromocide:[],
      isCollapseOpen:false,

      isSpinner: true,  
      isBodyLoaded: true,  
    };
    today = moment().format('YYYY-MM-DD');
  }


  toggleExpanded = () => {
    //Toggling the state of single Collapsible
    this.setState({ collapsed: !this.state.collapsed });
  };
  
  isCollapsedSelected(name,value){
    let data=this.state.collapsed
    data={...data,[name]:!value}
    this.setState({collapsed:data})
  }



  getAllPromoCodesData = async () => {
    const getAllPromoCodesResponse = await getAllPromoCodes();
    let isCollapsedData={}
    if (getAllPromoCodesResponse.result == true) {
      var allPromocide = getAllPromoCodesResponse.response.promocodes;
      console.log("getting allPromocode data----------",allPromocide)

      allPromocide.map((singleMap,Index) =>{
        let key=`collapsed${Index+1}`
        isCollapsedData={...isCollapsedData,[key]:true}
      })
    }
    this.setState({allPromocide,collapsed:isCollapsedData,isSpinner:false,isBodyLoaded:true});
  };

  

  componentDidMount = async () => {
    this.getAllPromoCodesData()
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
    
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }
  

callAlertFunction(){
  Alert.alert("Message","")
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

    const {allPromocide} = this.state;

    console.log("inside the render ---------------",allPromocide)

    let promocodeType = this.props.navigation.getParam("promocodeType")
    console.log("getting inisde the render method ???????????????",promocodeType)

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="#5541E1"
          hidden={false}
        />
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Mes bons cadeaux</Text>
          <View style={{flexDirection: 'row'}}>            
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>
        <Spinner visible={this.state.isSpinner} 
        />

        <View style={Styles.mainContentView}>
          {
            this.state.isBodyLoaded == true ?


            <ScrollView>  
            {
              allPromocide .length > 0 ? 


              allPromocide.map((singleMap,index)=>{

                let key=`collapsed${index+1}`
                return(
                  <View style={{width:'94%',borderWidth:1,borderColor:"#DDDDDD",borderRadius:10,elevation:0,shadowColor:"#FFFFFFF",shadowOffset:4,shadowOpacity:1,alignSelf:'center',margin:4}}> 
                  {/* <View style={{flexDirection:'row',margin:3,marginStart:10}}>                       
                      <Text style={{color:'gray',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>Charge</Text>
                      <Text style={{color:'#b41565',fontSize:14,fontWeight:'700',margin:2,marginStart:10,marginEnd:4}}>70.00</Text>
                  </View> */}
                  <Text style={{color:'#000000',fontSize:16,fontWeight:'700',margin:2,marginStart:20,marginEnd:4,margin:4}}>{singleMap.title}</Text>
                  <Text style={{color:'gray',fontSize:12,fontWeight:'700',margin:0,marginStart:20,marginEnd:4}}>amount : {singleMap.amount}</Text>
                  <View style={{borderColor:'#b41565',borderWidth:1,marginStart:18,margin:10,alignSelf:'flex-start',borderRadius:6}}>
                      <Text style={{color:"#b41565",margin:7,fontSize:10,fontWeight:'700'}}>{singleMap.code}</Text>
                    </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:7,marginTop:4,marginStart:16,marginEnd:16,alignSelf:'flex-end'}}>
                   
                  

                    {
                      singleMap.use_counter != 0 ?
                      <TouchableOpacity style={{borderColor:'#d57da9',opacity:0.6,borderWidth:1,backgroundColor:"#d57da9",borderRadius:3,marginTop:10,}}                     
                    >
                    <Text style={{color:'#ffffff',margin:10,fontWeight:'700',fontSize:13,marginStart:20,marginEnd:20,borderRadius:10}}>Déjà utilisé</Text>
                    </TouchableOpacity>
                      :
                      <TouchableOpacity style={{borderColor:'#b41565',borderWidth:1,backgroundColor:"#b41565",borderRadius:7,marginTop:10,}}
                      onPress={()=>{
                        this.props.navigation.navigate("summary",{
                          singleMap:singleMap
                        })
                      }}
                    >
                    <Text style={{color:'#ffffff',margin:10,fontWeight:'700',fontSize:13,marginStart:30,marginEnd:30,borderRadius:10,}}>Utiliser</Text>
                    </TouchableOpacity>
                    }

                  </View>
                  {/* <TouchableOpacity onPress={() => this.isCollapsedSelected(key,this.state.collapsed[key])} style={{marginBottom:10}}>

                    <Text style={{fontSize:14,fontWeight:'700',color:"#b41565",marginStart:10,margin:3,marginStart:18}}>Terms and condition</Text>
                  <Collapsible  collapsed={this.state.collapsed[key]} align="center" style={{borderWidth:0}}>
                    <View style={{borderColor:'orange',borderWidth:0,marginStart:20,}}>
                     
                      <HTML html={singleMap.terms_condition} containerStyle={{alignItems:'flex-start',}}  />
                      </View>
                    </Collapsible>
                  </TouchableOpacity> */}
          </View>
                )
              })
              :null
            }


            <View style={Styles.continueBtn}>
         
            </View>
          </ScrollView> 


            :
            <View style={{justifyContent:"center",alignItems:'center',}}>
              <Text style={{fontSize:16,fontWeight:'700',textAlign:'center'}}>chargement...</Text>
            </View>

        }
                  
        </View>
      </View>
    );
  }
}
