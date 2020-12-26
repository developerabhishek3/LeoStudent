import { StyleSheet,Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
    container:{
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,        
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F6F2EF'
    },
    header:{
        height:130,
        backgroundColor:'blue',       
        borderColor:'red',
        borderWidth:0,
        width:'103%',    
        alignSelf:'center', 
        justifyContent:'space-between',        
        flexDirection:'row',
        marginBottom:10
    },headerTxt:{
        fontSize:20,
        fontWeight:'700',
        textAlign:"left",
        color:'#FFFFFF',
        margin:10,
        marginStart:30,        
        fontFamily:'Montserrat-Regular'       
        
    },
   
    headertxtInputImg:{
        height:50,
        width:50,
        margin:10,
        marginEnd:15,
    },
    continueBtn: {
        backgroundColor: '#FF1493',
        margin: 3,
        borderRadius: 5,
        
        justifyContent:'flex-end',
        alignItems:'flex-end',
        alignSelf: 'center',
      },
      continueBtnTxt: {
        margin: 4,
        marginStart:15,
        marginEnd:15,
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        alignSelf: 'center',
      },
      radiobtnMainView:{
        flexDirection: 'row',
         borderWidth: 0,
         width:'90%',
         flexWrap:'wrap',
         alignContent:'flex-start',
         
         alignSelf:'center'
      },
      radioBtnView:{
        flexDirection: 'row',
        
        marginStart:10,
        marginEnd:10
      },
      radiobtnText:{
        margin:3,
        marginStart:10
      },
})