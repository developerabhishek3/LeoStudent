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
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf:'center',
    color: '#FFFFFF',
    
  },
  headertxtInputImg: {
    height: 20,
    width: 20,
    margin: 10,
    marginStart: 15,
  },
  bottomView:{
    borderRadius:20,borderColor:'gray',
    elevation:1,
    width:'90%',
    borderWidth:0,
    height:40,
    marginBottom:20

  },
  headertxtInputImg1: {
    height: 30,
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
    flex:2,width:'99%',borderWidth:0
  },
  mainContentContainer:{
    borderWidth:0,borderRadius:4,width:'96%',alignSelf:'center',margin:7,elevation:1
  },
  headerSubTxt:{
    fontSize: 12,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  peopleStyle: {height: 70, width: 70, margin: 10},
  contentView:{
    flexDirection:'column',margin:10,justifyContent:'center'
  },  
  contentTextStyle: {
    fontSize: 12,
    margin: 3,
    color: 'gray',
    fontWeight: '700',
  },
  contentHeaderTxt:{
    fontSize:15,fontWeight:'700',padding:1,
  },
  contentsubHeaderTxt:{
    fontSize:12,fontWeight:'700',padding:1,color:'gray'
  },

});
