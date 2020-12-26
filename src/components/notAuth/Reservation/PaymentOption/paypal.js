import React, { Component } from 'react'
import { Alert, Text,  ActivityIndicator, BackHandler, View, StyleSheet, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage';
// import { Actions } from 'react-native-router-flux';

var currentOrderId = "";
class Webview_Paypal extends React.Component {
    constructor(props) {
        super(props);
        this.webView = null;
        this.state = {
            user_id: 0,
            orderid: '',

        }
    }
    async  componentDidMount() {

        let UserId = await AsyncStorage.getItem('user_id');
        
        let user_id = JSON.parse(UserId)
        setTimeout(() => {
            this.setState({user_id})
        }, 100);
      

        let amount_en = this.props.navigation.getParam("amount_en")
        let reserve_time = this.props.navigation.getParam("reserve_time")
        let timeDuration = this.props.navigation.getParam("timeDuration")
        let reserve_date = this.props.navigation.getParam("reserve_date")

        
        console.log("getting firts ---------",amount_en)
        console.log("getting 2 ------",reserve_time)
        console.log("getting 3----",timeDuration)
        console.log("getting 4 ------",reserve_date)

        BackHandler.addEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
    );
}



    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () =>
          this.handleBackButton(this.props.navigation),
        );
      }
    
      
      handleBackButton = (nav) => {
        if (!nav.isFocused()) {
          BackHandler.removeEventListener('hardwareBackPress', () =>
            this.handleBackButton(this.props.navigation),
          );
          return false;
        } else {
          nav.goBack();
          return true;
        }
      };
    




    // componentWillUnmount() {
    //     this.callPaypalMethod()
    //    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    // }
    // callPaypalMethod() {
    //     AsyncStorage.getItem("userid")
    //         .then(userid => {
    //             var userid = JSON.parse(userid);

    //             this.setState({ user_id: userid });
    //         })
    //     AsyncStorage.getItem("orderid")
    //         .then(orderid => {
    //             // var userid = JSON.parse(userid);

    //             this.setState({ orderid: orderid });
    //         })

    //         currentOrderId = this.props.navigation.getParam('currentOrderId')
    //         console.log("Current Order  ",currentOrderId)
    // }
    // handleBackPress = () => {
    //     this.props.navigation.navigate('Category')
    //     return true;
    // }
    onMessage(event) {
        console.log('On Message')
        Alert.alert(
            'On Message',
            event.nativeEvent.data,
            [
                { text: 'OK' },
            ],
            { cancelable: true }
        )
    }
    handleNavigation(event) {

        let time_slot = this.props.navigation.getParam("time_slot")
        let reserve_date = this.props.navigation.getParam("reserve_date")
        let booktype = this.props.navigation.getParam("booktype")
        console.log(event)
        console.log("Url::::" + event.url)
        var String_url = event.url;
        console.log("Url: path:::" + String_url)

        if (String_url.includes('https://www.spyk.fr/payment/txn_success')) { 

                // if(booktype == "now"){

                // }else{

                // }

            this.props.navigation.navigate("searchteacher",{time_slot:time_slot,reserve_date:reserve_date,booktype:booktype})
            // Actions.push("OrderStatus",{order_id: currentOrderId})

        }
        else if (String_url.includes('https://www.spyk.fr/payment/txn_cancel')) {         
            Alert.alert("Message","Payment Cancel")
            // this.props.navigation.goBack('MyCart');            
        }
        else if (String_url.includes('https://www.spyk.fr/payment/txn_fail')) {
          Alert.alert("Message","Payment Cancel")
            // this.props.navigation.goBack('MyCart');

        }

    }
    LoadingIndicatorView() {
        return (<View style={{ flex: 1 }}>
            <ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} />
        </View>)
    }
    render() {

        let amount_en = this.props.navigation.getParam("amount_en")
        let reserve_time = this.props.navigation.getParam("reserve_time")
        let timeDuration = this.props.navigation.getParam("timeDuration")
        let reserve_date = this.props.navigation.getParam("reserve_date")
        let promocodeId = this.props.navigation.getParam("promocodeId")
        let promocode_amount = this.props.navigation.getParam("amount")

        let time_slot = this.props.navigation.getParam("time_slot")
        let booktype = this.props.navigation.getParam("booktype")

        console.log("getting promocode id here--",timeDuration)
    
        console.log("inside render user id == = =  =  =  =",this.state.user_id)

        return (
            <View style={styles.container}>
                <WebView
                   source={{ uri: `https://www.spyk.fr/payment/transaction?user_id=${this.state.user_id}&course_date=${reserve_date}&course_time=${time_slot}&course_duration=${timeDuration}&course_amount=${amount_en}&promocode_id=${promocodeId}&promocode_amount=${promocode_amount}&type=paypal&booktype=${booktype}`}}
                    renderLoading={this.LoadingIndicatorView}
                    startInLoadingState={true}
                    onMessage={(event) => this.handleMessage(event)}
                    onNavigationStateChange={(event) => this.handleNavigation(event)}
                    javaScriptEnabled={true}
                />
            </View>
        )
    }
}
export default Webview_Paypal;
const styles = StyleSheet.create({
    container: { height: height, paddingBottom: 20 },
    ActivityIndicatorStyle: { flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    header: {
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: "#0c084c"
    },
    title: {
        color: "#fff",
        fontSize: 20, 
        fontWeight: "bold",
        textAlign: "center"
    },
})