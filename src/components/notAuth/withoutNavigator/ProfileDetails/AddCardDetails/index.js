import React,{Component} from 'react';
import {View, Text, TouchableOpacity,Image,BackHandler,TextInput,Alert,Modal} from 'react-native';
import Styles from './indexCss'

import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import {save_my_card} from '../../../../../Api/afterAuth';

import Spinner from 'react-native-loading-spinner-overlay';
class AddCardDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            user_email:"",
            card_holder_name:"",
            card_number:"",
            exp_month:"",
            exp_year:"",
            cvv:"",
            Model_Visibility: false,
            Alert_Visibility: false,
            alertValue:"",
        }
    }

    Show_Custom_Alert(visible,) {
      this.setState({Alert_Visibility: visible});
    }
    Hide_Custom_Alert() {
      this.setState({Alert_Visibility: false}); 
      // this.props.navigation.navigate("login")    
    }

    save_my_cardFunction() {  

      this.setState({ isSpinner: true }, async () => { 


        let email = this.props.navigation.getParam("email")
        console.log("getting inisde the render method ???????????????",email)
        const {      
    
          card_holder_name,
          card_number,
          exp_month,
          exp_year,
          cvv,     
        } = this.state;
        const save_my_cardResponse = await save_my_card({      
          user_email:email,
          card_holder_name,
          card_number,
          exp_month,
          exp_year,
          cvv,       
        });
        if (save_my_cardResponse.result == true) {
          console.log('getting resu333333333lt here --------', save_my_cardResponse.response);
          console.log(
            'getting result222222 here --------',
            save_my_cardResponse.response.message,
          );    
          if(save_my_cardResponse.response.status == true){
            this.setState({isSpinner: false})
            this.props.navigation.navigate("allsavedcards")
          }
          else{
           let alertValue = save_my_cardResponse.response.message
            this.setState({alertValue})
            this.Show_Custom_Alert()
            this.setState({isSpinner: false})
            // Alert.alert("Message",save_my_cardResponse.response.message)
          }
        } else {
          Alert.alert('Error', save_my_cardResponse.error);
          this.setState({isSpinner: false})
          console.log('getting error here-------------');
        }
        return;
        
       })
      
     
    };
  
    myAlert = (title = '', message = '') => {
      Alert.alert(title, message);
    };
  

 
    validateUser = () => {

      let alertValue;
      const {      
        // user_email,
        card_holder_name,
        card_number,
        exp_month,
        exp_year,
        cvv,          
      } = this.state;
      //  if (user_email.length === 0) {
      //   this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
      // } 
      if (card_holder_name.length === 0) {
        alertValue = "Veuillez entrer votre nom!"
        this.setState({alertValue})
        this.Show_Custom_Alert()
        // this.myAlert('Message', 'Veuillez entrer votre nom!');
      }    
      else if (card_number.length === 0) {
        alertValue = "Veuillez entrer votre Numéro da le carte!"
        this.setState({alertValue})
        this.Show_Custom_Alert()
        // this.myAlert('Message', 'Veuillez entrer votre Numéro da le carte!');
      } else if (exp_month.length === 0) {
        alertValue = "Veuillez entrer votre Mois d'expiration!"
        this.setState({alertValue})
        this.Show_Custom_Alert()
        // this.myAlert('Message', `Veuillez entrer votre Mois d'expiration!`);
      } 
       else if (exp_year.length === 0) {

        alertValue = "Veuillez saisir votre Année d'expiration!"
        this.setState({alertValue})
        this.Show_Custom_Alert()
        // this.myAlert('Message', `Veuillez saisir votre Année d'expiration!`);
      } 
      else if (cvv.length === 0) {
        alertValue = "Veuillez entrer votre cvv!"
        this.setState({alertValue})
        this.Show_Custom_Alert()
        // this.myAlert('Message', 'Veuillez entrer votre cvv');
      }        
      else {
        // const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if (!user_email.match(mailformat)) {
        //   this.myAlert('Message', 'Courriel non valide!');
        //   return false;
        // }  
  
        this.save_my_cardFunction();
      }
    };
  
  
  


  componentDidMount = async () => {
    let email = this.props.navigation.getParam("email")
    console.log("getting inisde the didmount in the add card page method ???????????????",email)
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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
    render() {

      let email = this.props.navigation.getParam("email")
      // console.log("getting inisde the render method ???????????????",email)
        return(
            <View style={Styles.container}>
                  <View style={Styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                            this.props.navigation.goBack();
                            }}>
                            <Image source={back} style={Styles.headertxtInputImg1} />
                        </TouchableOpacity>
                        <Text style={Styles.headerTxt}>Enregistrer une carte bancaire</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={logo} style={Styles.headertxtInputImg} />
                        </View>
                     </View>

                     <Spinner visible={this.state.isSpinner}/>   
                <View style={{flex:2,width:"100%",margin:0}}>


                    <View>
                        {/* <TextInput
                            style={{width:"90%",margin:10,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:13}}
                            placeholder="Votre user_email"
                            placeholderTextColor="gray"
                            value={this.state.user_email}
                            onChangeText={(user_email) => this.setState({user_email})}
                            keyboardType="user_email-address"
                        /> */}

                        <TextInput
                            style={{width:"90%",margin:10,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:13}}
                            placeholder="Nom sur la carte"
                            placeholderTextColor="gray"
                            value={this.state.card_holder_name}
                            onChangeText={(card_holder_name) => this.setState({card_holder_name})}
                            keyboardType="default"
                        
                        />



                        <TextInput
                            style={{width:"90%",margin:10,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:13}}
                            placeholder="Numéro de la carte bancaire"
                            placeholderTextColor="gray"
                            value={this.state.card_number}
                            onChangeText={(card_number) => this.setState({card_number})}
                            keyboardType="numeric"
                        
                        />
                    </View>




                    <View style={{flexDirection:"row",margin:3,alignSelf:"center"}}>
                        <TextInput
                            style={{width:"32%",margin:4,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:12}}
                            placeholder="Mois d'expiration"
                            placeholderTextColor="gray"
                            value={this.state.exp_month}
                            onChangeText={(exp_month) => this.setState({exp_month})}
                            keyboardType="numeric"
                        
                        />

                        <TextInput
                            style={{width:"32%",margin:4,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:11}}
                            placeholder="Année d'expiration"
                            placeholderTextColor="gray"
                            value={this.state.exp_year}
                            onChangeText={(exp_year) => this.setState({exp_year})}
                            keyboardType="numeric"
                        
                        />



                        <TextInput
                            style={{width:"24%",margin:4,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:13}}
                            placeholder="cvv"                
                            placeholderTextColor="gray"
                            value={this.state.cvv}
                            onChangeText={(cvv) => this.setState({cvv})}
                            keyboardType="numeric"
                        
                        />
                    </View>
                    <View style={Styles.continueBtn}>     

                            <TouchableOpacity
                              onPress={() => this.validateUser()}        
                            >
                            <Text style={Styles.continueBtnTxt}>Enregistrer cette carte</Text>
                            </TouchableOpacity>              
                    </View>
                </View>



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
                      source={require("../../../../../assets/icon/17.png")}
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


            </View>
        )
    }
}



export default AddCardDetails;