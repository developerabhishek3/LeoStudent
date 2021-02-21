import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Styles from './indexCss';

class questionResult extends Component {
  componentDidMount() {
    let correctAnswer = this.props.navigation.getParam('correctAnswer');
    let questionAttempt = this.props.navigation.getParam('questionAttempt');
  }

  render() {
    let correctAnswer = this.props.navigation.getParam('correctAnswer');
    let questionAttempt = this.props.navigation.getParam('questionAttempt');
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={{flex: 2}}
          source={require('../../../assets/bgImages/3.png')}
          resizeMode="stretch">
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginEnd: 60,
            }}>
            <Image
              source={require('../../../assets/icon/196.png')}
              style={{width: 70, height: 70, alignSelf: 'center'}}
            />
            <Text style={{fontSize: 26, fontWeight: '700', color: '#FFFFFF'}}>
              Félicitations !
            </Text>
          </View>

          <View style={{borderWidth: 0, marginTop: 40, alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                alignSelf: 'center',
                color: 'red',
              }}>
              Merci d'avoir passé le test
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 16,
                  margin: 4,
                  fontWeight: '700',
                  alignSelf: 'center',
                  color: 'gray',
                }}>
                Vous avez donné
                <Text
                  style={{
                    fontSize: 16,
                    margin: 4,
                    marginStart:10,marginEnd:10,

                    fontWeight: '700',
                    alignSelf: 'center',
                    color: 'lightgreen',
                  }}>  {correctAnswer}  </Text>
                réponses{' '}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  margin: 4,
                  fontWeight: '700',
                  alignSelf: 'center',
                  color: 'gray',
                }}>
                correctes.
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                margin: 4,
                fontWeight: '700',
                alignSelf: 'center',
                color: 'gray',
              }}>
              {' '}
              Votre niveau est
            </Text>


            <Image source={require("../../../assets/icon/Niveau.png")} style={{height:90,width:90,alignSelf:'center',margin:10}} />

            <TouchableOpacity
              style={{
                borderRadius: 7,
                borderWidth: 1,
                borderColor: '#b41565',
                margin: 15,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  margin: 7,
                  textAlign: 'center',
                  marginStart: 10,
                  marginEnd: 10,
                }}>
                Débutant
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate("login")}}
              style={{
                borderRadius: 7,
                borderWidth: 0,
                backgroundColor: '#b41565',
                margin: 20,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  margin: 7,
                  textAlign: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  marginStart: 30,
                  marginEnd: 30,
                }}>
                Continuer
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default questionResult;
