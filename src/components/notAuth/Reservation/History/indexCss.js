import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F2EF',
  },
  header: {
    height: 70,
    backgroundColor: '#5541E1',
    borderColor: 'red',
    borderWidth: 0,
    width: '103%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    color: '#FFFFFF',
    margin: 10,
  },
  headertxtInputImg: {
    height: 21,
    width: 21,
    margin: 10,
    marginStart: 20,
  },
  headertxtInputImg1: {
    height: 45,
    width: 30,
    margin: 10,
    marginEnd: 15,
  },
  subhaderView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 0,
    width: '100%',
  },
  subheadingTxt:{
    fontSize: 14,
    fontWeight: '700',
    margin: 6,
    color: 'gray',
  },
  subheadingTxt1:{
    fontSize: 14,
    fontWeight: '700',
    margin: 6,
    color: '#b41565',
  },
  mainContainer:{
    borderWidth: 0,
    flex: 2,
    marginTop: 0,
    marginBottom: 7,
    width: '99%',
  },
  contentView: {
    borderWidth: 0,
    borderColor: '#DDDDDD',
    elevation: 0,
    width: '96%',
    borderRadius: 7,
    alignSelf: 'center',
    margin: 7,
    marginBottom:70,
  },
  peopleStyle: {height: 70, width: 70, margin: 10},
  bookStyle: {height: 16, width: 16, margin: 3},
  contentTextStyle: {
    fontSize: 12,
    margin: 3,
    color: 'gray',
    fontWeight: '700',
  },
  continueBtn: {
    backgroundColor: '#b41565',
    margin: 6,
    borderRadius: 5,
    justifyContent:"center",
    alignItems:'center',
    alignSelf: 'center',
    marginEnd: 0,
    marginStart:-20,
  },
  continueBtnTxt: {
    margin: 7,
    marginStart: 20,
    marginEnd: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
    textAlign:'center',
    alignSelf: 'center',
  },
});
