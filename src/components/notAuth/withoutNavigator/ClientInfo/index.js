import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  BackHandler,
  StatusBar
} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png';

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';
import Chat from '../../../../assets/icon/11.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }









  componentDidMount = async () => {
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Info Client</Text>
          <View style={{margin: 7, flexDirection: 'row', marginStart: 10}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("chat")}}>
              <Image source={Chat} style={Styles.headertxtInputImg2} />
            </TouchableOpacity>
            <Image source={logo} style={Styles.headertxtInputImg1} />
          </View>
        </View>

        <View style={Styles.mainContainer}>
          <ScrollView>
            <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={People} style={Styles.peopleStyle} />
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginTop: 10,
                      color:"#000000"
                    }}>
                    Hardley Smith
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={books} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>Débutant</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image source={watch} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>
                      27.05.2020, 17h00 à 21h00
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginStart: 10,
                    }}>
                    <Rating
                      type="custom"
                      ratingColor="#b41565"
                      ratingBackgroundColor="#c8c7c8"
                      ratingCount={5}
                      imageSize={15}
                      startingValue={0}
                      fractions={1}
                      // onFinishRating={this.ratingCompleted}
                      style={{paddingVertical: 10}}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={Styles.contentView2}>
              <View style={Styles.contViewHeader}>
                <Text style={Styles.contViewTxt1}>
                  Nombre de coachings suivis :
                </Text>
                <Text style={Styles.contentViewTxt2}>2</Text>
              </View>
              <View style={Styles.contViewHeader}>
                <Text style={Styles.contViewTxt1}>Compétences : </Text>
                <Text style={Styles.contentViewTxt2}>Verbes, articles</Text>
              </View>
              <View style={Styles.contViewHeader}>
                <Text style={Styles.contViewTxt1}>Profession : </Text>
                <Text style={Styles.contentViewTxt2}>
                  Baccalauréat en informatique
                </Text>
              </View>
              <View style={Styles.contViewHeader}>
                <Text style={Styles.contViewTxt1}>Âge : </Text>
                <Text style={Styles.contentViewTxt2}>25 ans</Text>
              </View>
            </View>

            <View style={Styles.contentView2}>
              <Text style={Styles.thirdHeaderTxt}>À propos de</Text>

              <Text style={Styles.thirdHeaderTxtContent}>
                À propos de Lorem ipsum, or lipsum as it is sometimes known, is
                dummy text used in laying out print, graphic or web designs. The
                passage is attributed to an unknown typesetter in the 15th
                century .
              </Text>
            </View>

            <View style={Styles.continueBtn}>
              <TouchableOpacity>
                <Text style={Styles.continueBtnTxt}>
                  {' '}
                  Appeler le tutor pour démarrer le coaching
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <BottomNavigator
          currentRoute={'reservation'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

// 16.Info Client
// Hardley Smith
// Débutant
// 27.05.2020, 17h00 à 21h00
// Nombre de coachings suivis  :  2
// Compétences : Verbes, articles
//

// À propos de
// Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .
// Appeler le tutor pour démarrer le coaching
