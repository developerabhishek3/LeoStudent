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
  textInputField: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    margin: 10,
    paddingStart: 20,
    width:"85%"
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
    marginTop: 15,
    marginEnd: 25,
  },

  mainContainer: {
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
  peopleStyle: {height: 90, width: 90, alignSelf: 'center',borderRadius:50,marginTop:0},
  maincontentContaine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  txtInput: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    height: 40,
    borderRadius: 10,
    margin:12,paddingStart:10
  },
  txtInput1: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    height: 90,
    borderRadius: 10,
    margin:12
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
  txtStyle1: {
    fontSize: 16,
    fontWeight: '700',
    marginStart: 30,
    
    color: 'gray',
  },
});
