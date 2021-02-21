import Axios from 'axios';
import {commonHeader, endPoints} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';

const CommonURL = `https://www.spyk.fr/api_student/`


export async function createUser(body = {}) {
  try {
    const createUserRegister = await Axios.post(
      'https://www.spyk.fr/api_student/registration_manual',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (createUserRegister.status) {
      console.log('getting response here-------', createUserRegister.data);
      return {result: true, response: createUserRegister.data};
    } else {
      console.log('getting error here----------', createUserRegister.data);
      return {result: false, error: createUserRegister.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function loginUser(body ={}) {
  try {      
    const loginUserResponse = await Axios.post(
      'https://www.spyk.fr/api_student/login_manual',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (loginUserResponse.status) {
      return {result: true, response: loginUserResponse.data};
    } else {
      return {result: false, response: loginUserResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}


export async function getCountryList() {


  try {
    const getCountryListResponse = await Axios.get(
      `https://www.spyk.fr/api_student/country_list`,      
      {
        headers: {...commonHeader}     
      },
    );
    if (getCountryListResponse.status) {
      // console.log("getting response on the function--------",getCountryListResponse.data)
      return {result: true, response: getCountryListResponse.data};
    } else {
      return {result: false, error: getCountryListResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}







export async function ForgotPassword1(body = {}) {
  try {
    const forgotpassword_req_1_Response = await Axios.post(
      'https://www.thelyfe.fr/api/forgotpassword_req_1',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotpassword_req_1_Response.status) {
      console.log('getting response here-------', forgotpassword_req_1_Response.data);
      return {result: true, response: forgotpassword_req_1_Response.data};
    } else {
      console.log('getting error here----------', forgotpassword_req_1_Response.data);
      return {result: false, error: forgotpassword_req_1_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function ForgotPassword2(body = {}) {
  try {
    const forgotpassword_req_2_Response = await Axios.post(
      'https://www.thelyfe.fr/api/forgotpassword_req_2',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotpassword_req_2_Response.status) {
      console.log('getting response here-------', forgotpassword_req_2_Response.data);
      return {result: true, response: forgotpassword_req_2_Response.data};
    } else {
      console.log('getting error here----------', forgotpassword_req_2_Response.data);
      return {result: false, error: forgotpassword_req_2_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function SetNewPassword(body = {}) {
  try {
    const setNewPasswordResponse = await Axios.post(
      'https://www.thelyfe.fr/api/setpassword',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (setNewPasswordResponse.status) {
      console.log('getting response here-------', setNewPasswordResponse.data);
      return {result: true, response: setNewPasswordResponse.data};
    } else {
      console.log('getting error here----------', setNewPasswordResponse.data);
      return {result: false, error: setNewPasswordResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function SocialAuth(body = {}) {
  try {
    const socialAuthResponse = await Axios.post(
      'https://www.thelyfe.fr/api/social_auth',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (socialAuthResponse.status) {
      console.log('getting response here-------', socialAuthResponse.data);
      return {result: true, response: socialAuthResponse.data};
    } else {
      console.log('getting error here----------', socialAuthResponse.data);
      return {result: false, error: socialAuthResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


