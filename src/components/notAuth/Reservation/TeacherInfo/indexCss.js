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
    backgroundColor: 'blue',
    borderColor: 'red',
    borderWidth: 0,
    width: '103%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    color: '#FFFFFF',
    margin: 10,
    marginStart:40,
  },
  headertxtInputImg: {
    height: 20,
    width: 20,
    
    marginStart: 25,
  },
  headertxtInputImg1: {
    height: 45,
    width: 30,
    
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
    fontSize: 16,
    fontWeight: '700',
    margin: 10,
    color: 'gray',
  },
  subheadingTxt1:{
    fontSize: 16,
    fontWeight: '700',
    margin: 10,
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
    borderWidth: 1,
    borderColor: '#DDDDDD',
    elevation: 0,
    width: '96%',
    borderRadius: 7,
    alignSelf: 'center',
    margin: 7,
  },
  peopleStyle: {height: 70, width: 70, margin: 10},
  bookStyle: {height: 16, width: 16, margin: 3},
  contentTextStyle: {
    fontSize: 12,
    margin: 3,
    color: 'gray',
    fontWeight: '700',
  },
  contentTextStyle1: {
    fontSize: 12,
    margin: 3,
    color: '#b41565',
    fontWeight: '700',
  },
  contentTextStyle2: {
    fontSize: 12,
    margin: 6,
    color: 'gray',
    fontWeight: '700',
  },
  continueBtn: {    
    backgroundColor: '#b41565',
    alignSelf:'center',
    margin: 6,
    borderRadius: 5,
    justifyContent:'center',alignItems:'center',    
  },
  continueBtnTxt: {
    margin: 7,
    marginStart: 20,
    marginEnd: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    alignSelf: 'center',
  },
});
