import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
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
    marginBottom: 10,
  },
  headerTxt: {
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'left',
    color: '#FFFFFF',
    margin: 10,
    marginStart: 30,
    fontFamily: 'Montserrat-Regular',
  },
  mainContentView: {
    flex: 2,
    borderWidth: 0,
    width: '95%',
    marginTop: 0,
    marginBottom: 0,
  },
  subheaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  subheaderTxt: {
    fontSize: 17,
    fontWeight: '700',
    margin: 7,
  },
  calenderStyle: {
    marginTop: 0,
    width: '96%',
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  headertxtInputImg: {
    height: 45,
    width: 30,
    margin: 10,
    marginEnd: 15,
  },
  headertxtInputImg1: {
    height: 20,
    width: 20,
    margin: 10,
    marginStart: 15,
  },
  headertxtInputImg2: {
    height: 20,
    width: 20,
    margin: 15,
    marginEnd: 5,
  },
  txtMainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtHeaderView: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
    margin: 7,
  },
  SubTxtview: {
    borderColor: '#DDDDDD',
    elevation: 0,
    borderWidth: 1,
    borderRadius: 4,
    margin: 6,
  },
  timeTxtView: {
    margin: 5,
    textAlign: 'center',
  },

  continueBtn: {
    backgroundColor: '#FF1493',
    margin: 3,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
