import React,{Component} from 'react';
import {View, Text, TouchableOpacity,Image,BackHandler,TextInput,Alert} from 'react-native';
import Styles from './indexCss'

import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import {save_my_card} from '../../../../../Api/afterAuth';


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
        }
    }



    save_my_cardFunction = async () => {  
      const {      
        user_email,
        card_holder_name,
        card_number,
        exp_month,
        exp_year,
        cvv,     
      } = this.state;
      const save_my_cardResponse = await save_my_card({      
        user_email,
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
          this.props.navigation.navigate("allsavedcards")
        }
        else{
          Alert.alert("Message",save_my_cardResponse.response.message)
        }
      } else {
        Alert.alert('Error', save_my_cardResponse.error);
        console.log('getting error here-------------');
      }
      return;
    };
  
    myAlert = (title = '', message = '') => {
      Alert.alert(title, message);
    };
  

 
    validateUser = () => {
      const {      
        user_email,
        card_holder_name,
        card_number,
        exp_month,
        exp_year,
        cvv,          
      } = this.state;
       if (user_email.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
      } else if (card_holder_name.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre nom!');
      }    
      else if (card_number.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre Numéro da le carte!');
      } else if (exp_month.length === 0) {
        this.myAlert('Message', `Veuillez entrer votre Mois d'expiration!`);
      } 
       else if (exp_year.length === 0) {
        this.myAlert('Message', `Veuillez saisir votre Année d'expiration!`);
      } 
      else if (cvv.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre cvv');
      }        
      else {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!user_email.match(mailformat)) {
          this.myAlert('Message', 'Courriel non valide!');
          return false;
        }  
  
        this.save_my_cardFunction();
      }
    };
  
  
  


  componentDidMount = async () => {
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
        return(
            <View style={Styles.container}>
                  <View style={Styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                            this.props.navigation.goBack();
                            }}>
                            <Image source={back} style={Styles.headertxtInputImg1} />
                        </TouchableOpacity>
                        <Text style={Styles.headerTxt}>Ajouter votre moyen de paiement</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={logo} style={Styles.headertxtInputImg} />
                        </View>
                     </View>
                <View style={{flex:2,width:"100%",margin:0}}>


                    <View>
                        <TextInput
                            style={{width:"90%",margin:10,alignSelf:"center",color:"gray",borderColor:"#DDDDDD",borderWidth:1,height:45,borderRadius:10,paddingStart:15,fontSize:13}}
                            placeholder="Votre user_email"
                            placeholderTextColor="gray"
                            value={this.state.user_email}
                            onChangeText={(user_email) => this.setState({user_email})}
                            keyboardType="user_email-address"
                        />

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
                            placeholder="Numéro da le carte bancaire"
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
            </View>
        )
    }
}



export default AddCardDetails;