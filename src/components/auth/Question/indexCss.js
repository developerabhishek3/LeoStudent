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
 
  headerView: {
    marginTop: -20,
  },
  headerLogo: {
    height: 60,
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
    marginEnd: 110,
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
    margin:3,
    marginStart:3,
    marginEnd:10
  },
  radiobtnText:{
    margin:7
  },
  subHeader: {
    marginTop: 30,
    margin: 16,
    marginBottom:16,
    marginBottom:-5
  },
  placeHolderStyle:{
    color:'red',
    flexWrap:'wrap',
    alignContent:'flex-start',
    fontSize:6,
    
  },
  txtStyle1: {
    fontSize: 16,
    fontWeight: '700',
    marginStart: 7,
    alignSelf: 'flex-start',
    color: 'gray',
    margin:7
  },
  txtStyle2: {
    fontSize: 16,
    fontWeight: '600',
    marginStart: 20,
    alignSelf: 'flex-start',
    color: 'gray',
  },
  txtStyle3: {
    fontSize: 16,
    fontWeight: '700',
    marginStart: 0,
    alignSelf: 'flex-start',
    color: 'green',
  },

  textInputView: {
    borderWidth: 0,
    width: '96%',
    margin: 30,
    alignSelf: 'center',
  },

  textInputField: {
    borderWidth: 0,
    marginTop:-20,
    borderColor: 'red',
    borderRadius: 10,
    margin: 10,
    paddingStart: 10,
  },
  socialLogo: {
    height: 30,
    width: 30,
    margin: 16,
    alignSelf: 'center',
  },
  continueBtn: {
    backgroundColor: '#FF1493',
    margin: 3,
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
  },
  continueBtnTxt: {
    margin: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
});
