import AsyncStorage from '@react-native-community/async-storage';
import {StudentProfile} from '../Api/afterAuth';

const FETCH_STUDENTDETAILS_REQUEST = 'FETCH_STUDENTDETAILS_REQUEST';
const FETCH_STUDENTDETAILS_SUCCESS = 'FETCH_STUDENTDETAILS_SUCCESS';
const FETCH_STUDENTDETAILS_ERROR = 'FETCH_STUDENTDETAILS_ERROR';



const userInitialState = {
  authToken: null,
  studentsDetails: {},
  loading: true,
};

const studentDetailsProcess = () => {
  return {
    type: FETCH_STUDENTDETAILS_REQUEST,
  };
};
const studentDetailsFail = () => {
  return {
    type: FETCH_STUDENTDETAILS_ERROR,
  };
};
const studentDetailsSucess = () => {
  return {
    type: FETCH_STUDENTDETAILS_SUCCESS,
  };
}

// export const userLogoutSucess = (payload) => {
//   //resetInboxOnLogout();
//   return {
//     type: USER_lOGOUT_SUCCESS,
//     payload
//   };
// };

const studentsReducer = (initialState = userInitialState, action) => {
  const {type} = action;

  switch (type) {
    case FETCH_STUDENTDETAILS_REQUEST:
      return {
        isUserLoggedIn: null,
        authToken: null,
        studentsDetails: {},
        loading: true,
      };

    case FETCH_STUDENTDETAILS_ERROR:
      return {
        isUserLoggedIn: false,
        authToken: null,
        studentsDetails: {},
        loading: false,
      };    
    case FETCH_STUDENTDETAILS_SUCCESS:
      return {
        isUserLoggedIn: false,
        authToken: null,
        studentsDetails: {},
        loading: false,
      };
    default:
      return initialState;
  }
};



export const getStudentsData = () => async (dispatch) => {
    dispatch(studentDetailsProcess());
    const studentsDetails = await StudentProfile();
    if (studentsDetails.result) {
      let updatedResponse = studentsDetails.response.my_profile;
      console.log("getting updated respose on redux page----------",updatedResponse)    
      dispatch(studentDetailsSucess(updatedResponse));
    } else {
      dispatch(studentDetailsFail());
    }
  };

export default studentsReducer;
