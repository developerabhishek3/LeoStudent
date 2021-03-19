import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Auth component...
import Login from '../components/auth/Login/';
import Splash from '../components/auth/Splash/';

import Signup from '../components/auth/Signup';

import Splash2 from '../components/auth/Splash2';
import ForgotPassword from '../components/auth/ForgotPassword'
import Welcome from '../components/auth/Welcome';
import Question from '../components/auth/Question';
import LevelChoice from '../components/auth/LevelChoice';

import AfterLevelChoice from '../components/auth/afterLevalChoice'

// Not Auth Component....
import Home from '../components/notAuth/Home';
import Profile from '../components/notAuth/Profile';
import Transaction from '../components/notAuth/Reservation/Transaction';
import Chat from '../components/notAuth/Chat';

import Profile2 from '../components/notAuth/Profile/index2';



// import ChooseTime from '../components/notAuth/withoutNavigator/ChooseTime';
import ClientInfo from '../components/notAuth/withoutNavigator/ClientInfo';
import Chat2 from '../components/notAuth/withoutNavigator/Chat2';

import Support from '../components/notAuth/withoutNavigator/ProfileDetails/Support';
import MyProfile from '../components/notAuth/withoutNavigator/ProfileDetails/MyProfile';
import Revenue from '../components/notAuth/withoutNavigator/ProfileDetails/Revenue';

import Parameter from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter';


import ChangePassword from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword'

import EditProfile from '../components/notAuth/withoutNavigator/ProfileDetails/MyProfile/editProfile'



import CurrentReservation from '../components/notAuth/Reservation/currentReservation';
import ChooseTime from '../components/notAuth/Reservation/ChooseTime';
import Summary from '../components/notAuth/Reservation/Summary';
import PromoCode from '../components/notAuth/Reservation/PromoCode';
import PaymentOption from '../components/notAuth/Reservation/PaymentOption';
import ChooseAddCard from '../components/notAuth/Reservation/ChooseAddCard';
import SearchTeacher from '../components/notAuth/Reservation/SearchTeacher';

import BookReservation from '../components/notAuth/Reservation/BookReservation';
import TeacherInfo from '../components/notAuth/Reservation/TeacherInfo';

import TeacherHistory from '../components/notAuth/withoutNavigator/TeacherHistory'




import StudentsTest from '../components/notAuth/withoutNavigator/StudentsTest';


import forgotpasswordReq2 from '../components/auth/ForgotPassword/index2';
import forgotpasswordReq3 from '../components/auth/ForgotPassword/setPassword';

import History from '../components/notAuth/Reservation/History';

import Paypal from '../components/notAuth/Reservation/PaymentOption/paypal';

import BookNowChooseTime from '../components/notAuth/Reservation/bookNowChooseTime';

import Filter from '../components/notAuth/Reservation/Filter';

import PromoCode2 from '../components/notAuth/withoutNavigator/ProfileDetails/Promocode2'

//Testing Routert

import CalenderScreen from '../components/notAuth/Reservation/ChooseTime/index2';
import TeacherViewHome from '../components/notAuth/Home/teacherprofile';

import notificationData from '../components/notAuth/withoutNavigator/ProfileDetails/Notifications';
import Stripe from '../components/notAuth/Reservation/PaymentOption/stripe';


import SavedCard from '../components/notAuth/Reservation/SavedCard';


import AcceptRequest from '../components/notification/Accept';
import RejectRequest from '../components/notification/Reject';


import questionResult from '../components/auth/questionResult';

import CancelReservation from '../components/notAuth/Reservation/currentReservation/CancelReservation';

import FirstCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/FirstChceck';
import SecondCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/SecondCheck';
import ThirdCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/ThirdCheck';
import FourthCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/FourthCheck';



import FirstValidationCheck from '../components/notAuth/Reservation/ChooseTimeValidation/FirstValidationCheck';
import SecondValidationCheck from '../components/notAuth/Reservation/ChooseTimeValidation/SecondValidationCheck';
import ThirdValidationCheck from '../components/notAuth/Reservation/ChooseTimeValidation/ThirdValidationCheck';

const AppNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash, 
      navigationOptions: {
        headerShown: false,
      },
    },
    splash2: {
      screen: Splash2,
      navigationOptions: {
        headerShown: false,
      },
    },
    calenderscreen: {
      screen: CalenderScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    firstcheck: {
      screen: FirstCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    secondcheck: {
      screen: SecondCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    thirdcheck: {
      screen: ThirdCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    fourthcheck: {
      screen: FourthCheck,
      navigationOptions: {
        headerShown: false,
      },
    },

    firstvalidationcheck: {
      screen: FirstValidationCheck,
      navigationOptions: {
        headerShown: false,
      },
    },

    secondvalidationcheck: {
      screen: SecondValidationCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    thirdvalidationcheck: {
      screen: ThirdValidationCheck,
      navigationOptions: {
        headerShown: false,
      },
    },


    welcome: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    singup:{
        screen:Signup,
        navigationOptions: {
          headerShown: false,
        },
    },  
    forgotpassword:{
      screen:ForgotPassword,
      navigationOptions: {
        headerShown: false,
      },
      },   
    question:{
      screen:Question,
      navigationOptions: {
        headerShown: false,
      },
    },
    questionresult:{
      screen:questionResult,
      navigationOptions: {
        headerShown: false,
      },
    },
    cancelreservation:{
      screen:CancelReservation,
      navigationOptions: {
        headerShown: false,
      },
    },
    teacherviewhome:{
      screen:TeacherViewHome,
      navigationOptions: {
        headerShown: false,
      },
    },
    levelchoice:{
      screen:LevelChoice,
      navigationOptions: {
        headerShown: false,
      },
    },
    paypal: {
      screen: Paypal,
      navigationOptions: {
        headerShown: false,
      },
    },
    stripe: {
      screen: Stripe,
      navigationOptions: {
        headerShown: false,
      },
    },
    savedcard: {
      screen: SavedCard,
      navigationOptions: {
        headerShown: false,
      },
    },

    history: {
      screen: History,
      navigationOptions: {
        headerShown: false,
      },
    },
    booknowchoosetime: {
      screen: BookNowChooseTime,
      navigationOptions: {
        headerShown: false,
      },
    },

    forgotpasswordReq2: {
      screen: forgotpasswordReq2,
      navigationOptions: {
        headerShown: false,
      },
    },
    forgotpasswordReq3: {
      screen: forgotpasswordReq3,
      navigationOptions: {
        headerShown: false,
      },
    },

    promocode2: {
      screen: PromoCode2,
      navigationOptions: {
        headerShown: false,
      },
    },
    notificationdata: {
      screen: notificationData,
      navigationOptions: {
        headerShown: false,
      },
    },


    home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    transaction: {
      screen: Transaction,
      navigationOptions: {
        headerShown: false,
      },
    },
    chat: {
      screen: Chat,
      navigationOptions: {
        headerShown: false,
      },
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    
    choosetime: {
      screen: ChooseTime,
      navigationOptions: {
        headerShown: false,
      },
    },

    clientinfo: {
      screen: ClientInfo,
      navigationOptions: {
        headerShown: false,
      },
    },

    chat2: {
      screen: Chat2,
      navigationOptions: {
        headerShown: false,
      },
    },
    filter:{
      screen:Filter,
      navigationOptions: {
        headerShown: false,
      },
    },


    support:{
      screen:Support,
      navigationOptions: {
        headerShown: false,
      },
    },

    profile2: {
      screen: Profile2,
      navigationOptions: {
        headerShown: false,
      },
    },
  
    myprofile: {
      screen: MyProfile,
      navigationOptions: {
        headerShown: false,
      },
    },  
    revenue: {
      screen: Revenue,
      navigationOptions: {
        headerShown: false,
      },
    },

    parameter:{
      screen:Parameter,
      navigationOptions: {
        headerShown: false,
      },
    },

    changepassword:{
      screen:ChangePassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    editprofile:{
      screen:EditProfile,
      navigationOptions: {
        headerShown: false,
      },
    },


    afterlevelchoice: {
      screen: AfterLevelChoice,
      navigationOptions: {
        headerShown: false,
      },
    },



   studentstest: {
      screen: StudentsTest,
      navigationOptions: {
        headerShown: false,
      },
    },


    currentreservation: {
      screen: CurrentReservation,
      navigationOptions: {
        headerShown: false,
      },
    },
    summary: {
      screen: Summary,
      navigationOptions: {
        headerShown: false,
      },
    },
    promocode: {
      screen: PromoCode,
      navigationOptions: {
        headerShown: false,
      },
    },
    paymentoption: {
      screen: PaymentOption,
      navigationOptions: {
        headerShown: false,
      },
    },
    chooseaddcard:{
      screen:ChooseAddCard,
      navigationOptions:{
        headerShown:false,
      }

    },
    searchteacher:{
      screen:SearchTeacher,
      navigationOptions:{
        headerShown:false,
      }
    },
    bookreservation:{
      screen:BookReservation,
      navigationOptions:{
        headerShown:false,
      }
    },

    teacherinfo:{
      screen:TeacherInfo,
      navigationOptions:{
        headerShown:false,
      }
    },
    acceptrequest:{
      screen:AcceptRequest,
      navigationOptions:{
        headerShown:false,
      }
    },
    rejectrequest:{
      screen:RejectRequest,
      navigationOptions:{
        headerShown:false,
      }
    },




    teacherhistory:{
      screen:TeacherHistory,
      navigationOptions:{
        headerShown:false,
      }
    }
  },
  {
    unmountInactiveRoutes: true,
    initialRouteName: 'splash2',
  },
);

export default createAppContainer(AppNavigator);
