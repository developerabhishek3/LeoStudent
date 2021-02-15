import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImgStyle: {
    flex: 2,
    borderWidth: 0,
    width: '100%',
  },
  continueBtn: {
    
    backgroundColor: '#b41565',
    margin: 10,
    borderRadius: 5,
    alignSelf: 'center',    
    width:"60%"
  },
  headerView: {
    marginTop: -20,
  },
  headerLogo: {
    height: 80,
    width: 60,
    margin: 3,
    marginEnd: 50,
    alignSelf: 'center',
  },
  headerTxt: {
    fontSize: 25,
    fontWeight: '700',
    margin: 1,
    color: '#FFFFFF',
    alignSelf: 'center',
    marginEnd: 50,
  },
  headerTxt1: {
    fontSize: 25,
    fontWeight: '700',
    margin: 1,
    color: '#FFFFFF',
    alignSelf: 'center',
    marginEnd: 70,
  },
  forgotPwd: {
    alignSelf: 'flex-end',
    margin: 3,
    color: 'green',
    fontWeight: '700',
  },
  txtStyle: {
    fontSize: 15,
    fontWeight: '600',
    marginStart: 20,
    alignSelf: 'flex-start',
    marginBottom: 30,
    margin: 10,
  },
  radiobtnMainView:{
    flexDirection: 'row',
     borderWidth: 0,
     flexWrap:'wrap',
     alignContent:'flex-start',
     width:'95%',
     alignSelf:'center'
  },
  radioBtnView:{
    flexDirection: 'row',
    margin:10,
    marginStart:10,
    marginEnd:10
  },
  radiobtnText:{
    margin:7
  },
  radiobtnText1:{
    margin:1
  },
  subHeader: {
    marginTop: 70,
    margin: 10,
    marginBottom:-5,
  },
  
  txtStyle1: {
    fontSize: 16,
    fontWeight: '700',
    marginStart: 20,
    alignSelf: 'center',
    color: 'gray',
    width:'70%',    
  },


  socialLogo: {
    height: 30,
    width: 30,
    margin: 16,
    alignSelf: 'center',
  },
  continueBtnTxt: {
    margin: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginStart:30,marginEnd:30,
    alignSelf: 'center',
  },
});
