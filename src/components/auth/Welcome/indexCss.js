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
            backgroundColor:'#b41565',
            margin:20,
            borderRadius:5,
            width:'40%',
            alignSelf:'center',
            justifyContent:'center',
                  
        },
    headerView:{                
        marginTop:10,
        justifyContent:'center',
        alignItems:"center",
        alignSelf:"center"
    },
    headerLogo:{
        height:130,width:115,
        margin:10,
        alignSelf:'center'
    },
    headerTxt:{
        fontSize:22,
        fontWeight:'700',
        margin:1,
        marginStart:0,
        alignSelf:'center',
        color:"gray"        

    },
    txtStyle:{
        fontSize:15,
        fontWeight:'600',
        marginStart:0,
        textAlign:"center",alignSelf:'center',
        alignSelf:'flex-start',marginBottom:30,
        margin:10,marginStart:6
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
        textAlign:"center",
        margin:2,
        color: 'gray',
        alignSelf: 'center',
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
        alignSelf:'center'
    },

})