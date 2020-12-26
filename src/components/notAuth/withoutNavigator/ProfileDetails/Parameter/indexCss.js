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

    borderColor: 'red',
    borderWidth: 0,
    width: '103%',
    backgroundColor: 'blue',
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
    height: 30,
    width: 30,
    margin: 10,
    marginEnd: 25,
  },
  containerView: {
    width: '100%',
    borderColor:"#DDDDDD",
    borderWidth: 1,
    elevation: 0,
    alignSelf: 'center',
    borderRadius:7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    margin:10
  },
  txtView:{
    fontSize:16,
    fontWeight:'700',
    margin:10,


  },
  bottomContentView:{
    margin:6,
    
  },
  bottomTxtView:{
    color:'#FF1493',
    alignSelf:'flex-start',
    padding:2,
    fontWeight:'700'
  },
});
