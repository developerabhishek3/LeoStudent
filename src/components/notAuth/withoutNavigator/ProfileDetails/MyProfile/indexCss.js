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
    
    justifyContent: 'space-between',
    
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
    marginEnd: 25,
  },
  headertxtInputImg2: {
    height: 20,
    width: 20,
    marginTop:15,
    marginEnd: 25,
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
  peopleStyle: {height: 90, width: 90, alignSelf:'center',borderRadius:50,},
  maincontentContaine:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:10,
    marginTop:36
    
  },
  nameStyleView:{
    margin:7,
    width:'48%',borderWidth:0
  },
  nameHeading:{
    fontSize:10,color:'#b41565',
    fontWeight:'700',
    padding:3
  },
  nameHeadingTxt:{
    fontSize:13,color:'gray',
    fontWeight:'700',
    padding:2,
    
  },
  addressView:{
    margin:10,alignSelf:'flex-start',
    marginStart:20
  },
});
