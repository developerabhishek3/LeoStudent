import { StyleSheet,Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
    container:{
        flex:1,               
        backgroundColor:'#F6F2EF',
        justifyContent:'center',
        alignItems:'center',
    },
   
    bgImgStyle: {
        height:'100%',
        width:'100%',         
        },
        continueBtn:{
            backgroundColor:'#FF1493',
            margin:20,
            borderRadius:5,
            width:'40%',
            alignSelf:'center'        
        },
    headerView:{                
        marginTop:10,
    },
    headerLogo:{
        height:130,width:110,
        margin:10,
        alignSelf:'center'
    },
    headerTxt:{
        fontSize:24,
        fontWeight:'700',
        margin:1,
        marginStart:10,
        alignSelf:'center',        

    },
    txtStyle:{
        fontSize:15,
        fontWeight:'600',
        marginStart:20,
        alignSelf:'flex-start',marginBottom:30,
        margin:10
    },
    txtStyle1:{
        fontSize:15,
        fontWeight:'600',
        marginStart:20,
        alignSelf:'flex-start',
        marginBottom:10        
    },
    txtStyle2:{
        fontSize:15,
        fontWeight:'600',        
        marginStart:20,
        alignSelf:'flex-start',        
        margin:2,
    },
    txtStyle3:{
        fontSize:15,
        fontWeight:'700',
        marginStart:20,
        alignSelf:'flex-start',
        marginBottom:10   
    },

    continueBtnTxt:{
        margin:10,
        color:'#FFFFFF',
        fontWeight:"700",
        fontSize:16,
        marginStart:30,marginEnd:30,
    },

})