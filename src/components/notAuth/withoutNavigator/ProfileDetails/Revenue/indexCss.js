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
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    color: '#FFFFFF',
    margin: 10,
  },
  headertxtInputImg: {
    height: 20,
    width: 20,
    margin: 10,
    marginStart: 15,
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
    fontSize: 16,
    fontWeight: '700',
    margin: 10,
    color: 'gray',
  },
  subheadingTxt1:{
    fontSize: 16,
    fontWeight: '700',
    margin: 10,
    color: '#FF1493',
  },
  mainContainer:{
    borderWidth: 0,
    flex: 2,
    marginTop: 0,
    marginBottom: 7,
    width: '99%',
  },
  contentContainer:{
    borderWidth:1,
    borderRadius:10,
    borderColor:'gray',
    elevation:2,
    width:'96%',
    alignSelf:'center',
    
    margin:6,
  },

  contentContainerView:{
    flexDirection:'row',    
    width:'96%',
    margin:10,
    borderWidth:0,
    justifyContent:'space-between'
    
    
  },
  insidecontentContainer:{
    flexDirection:'column',
    padding:3,
    width:'84%',
    borderWidth:0
  },
  mainHeader:{
    fontSize:12,fontWeight:'700',
    padding:2
  },
  subHeader:{
    fontSize:10,fontWeight:'700',
    padding:2,
    color:'gray'
  },currenyStylesView:{
    borderColor:'red',
    borderWidth:2,
    height:30,
    borderRadius:4,
    width:'15%',marginEnd:4,
    justifyContent:'center'
  },
  currencyTxtStyle:{
    fontWeight:'700',    
    fontSize:14,
    alignSelf:'center'
  },
  btnView:{
    flexDirection:'row',
    justifyContent:'center',
    borderWidth:0,
    justifyContent:'space-around'
  },
  continueBtn: {
    backgroundColor: '#FF1493',
    margin: 6,
    borderRadius: 5,
    
    alignItems: 'center',

  },
  continueBtn1: {
    borderColor: '#FF1493',
    margin: 6,
    borderWidth:1,
    borderRadius: 5,
    
    alignItems: 'center',

  },
  continueBtnTxt: {
    margin: 7,
    marginStart:7,
    marginEnd: 7,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    alignSelf: 'center',
  },
  continueBtnTxt1: {
    margin: 7,
    marginStart: 20,
    marginEnd: 20,
    color: '#FF1493',
    fontWeight: '700',
    fontSize: 14,
    alignSelf: 'center',
  },
});
