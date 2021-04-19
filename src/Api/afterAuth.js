import Axios from 'axios';
import {commonHeader, endPoints, commonHeaderById} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';
import {Body} from 'native-base';

export async function level_academic_info() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log('getting ion level acedemic welcom page==========', UserId);
  console.log('getting ion level acedemic welcom page==========', TokenValue);

  try {
    const level_academic_infoResponse = await Axios.get(
      `https://www.spyk.fr/api_student/level_academic_info`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (level_academic_infoResponse.status) {
      // console.log("getting response on the function--------",level_academic_infoResponse.data)
      return {result: true, response: level_academic_infoResponse.data};
    } else {
      return {result: false, error: level_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function ChangePassword(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const ChangePasswordResponse = await Axios.post(
      'https://www.spyk.fr/api_student/change_password',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (ChangePasswordResponse.status) {
      return {result: true, response: ChangePasswordResponse.data};
    } else {
      return {result: false, response: ChangePasswordResponse.data};
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

//ADD CHATTING TEXT APi calling here--------

export async function add_single_chatFunction(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const add_single_chatResponse = await Axios.post(
      'https://www.spyk.fr/api_student/add_single_chat',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (add_single_chatResponse.status) {
      return {result: true, response: add_single_chatResponse.data};
    } else {
      return {result: false, response: add_single_chatResponse.data};
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

// GET CHATTING USER LIST API calling here----------------

export async function chat_usersFunction() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'getting token and user id here inside the function-----------',
  //   UserId,
  // );

  try {
    const chat_usersRresponse = await Axios.get(
      'https://www.spyk.fr/api_student/chat_users',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (chat_usersRresponse.status) {
      // console.log("getting response on the function--------",chat_usersRresponse.data)
      return {result: true, response: chat_usersRresponse.data};
    } else {
      // console.log("getting error on the function--------",chat_usersRresponse.data)
      return {result: false, error: chat_usersRresponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

//  UPDATE STUDENT LEVEL APi calling here------------------------

export async function update_levelFunction(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const update_levelResponse = await Axios.post(
      'https://www.spyk.fr/api_student/update_level',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (update_levelResponse.status) {
      return {result: true, response: update_levelResponse.data};
    } else {
      return {result: false, response: update_levelResponse.data};
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

// GET ALL STUDENT MASTER LEVEL'S API

export async function get_all_levelsFunction() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const get_all_levelsResponse = await Axios.get(
      'https://www.spyk.fr/api_student/get_all_levels',
      {
        headers: {...commonHeader, 'user-id': `${UserId}`},
      },
    );
    if (get_all_levelsResponse.status) {
      // console.log("getting inside the true ?????????????????????")
      return {result: true, response: get_all_levelsResponse.data};
    } else {
      // console.log("getting inside the false ?????????????????????")
      return {result: false, response: get_all_levelsResponse.data};
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

// GET WAITING TIME APi calling here---------------

export async function get_waiting_timeFunction() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );

  try {
    const get_waiting_timeRresponse = await Axios.get(
      'https://www.spyk.fr/api_student/my_profile',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (get_waiting_timeRresponse.status) {
      // console.log("getting response on the function--------",get_waiting_timeRresponse.data)
      return {result: true, response: get_waiting_timeRresponse.data};
    } else {
      // console.log("getting error on the function--------",get_waiting_timeRresponse.data)
      return {result: false, error: get_waiting_timeRresponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

// SUPPORT API calling

export async function supportFunction() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );

  try {
    const supportRresponse = await Axios.get(
      'https://www.spyk.fr/api_student/support',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (supportRresponse.status) {
      // console.log("getting response on the function--------",supportRresponse.data)
      return {result: true, response: supportRresponse.data};
    } else {
      // console.log("getting error on the function--------",supportRresponse.data)
      return {result: false, error: supportRresponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

//  GET QUESTIONAIRE  API ...........

export async function get_questionaireFunction() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );
  console.log(
    'getting token and user id here inside the function-----------',
    TokenValue,
  );

  try {
    const get_questionaireResponse = await Axios.get(
      'https://www.spyk.fr/api_student/get_questionaire',
      {
        headers: {...commonHeader},
      },
    );
    if (get_questionaireResponse.status) {
      // console.log("getting response on the function--------",get_questionaireResponse.data)
      return {result: true, response: get_questionaireResponse.data};
    } else {
      // console.log("getting error on the function--------",get_questionaireResponse.data)
      return {result: false, error: get_questionaireResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

//  POST QUESTIONAIRE TEST API .............

export async function post_questionaireFunction(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log('getting userId on post question-------------', UserId);

  try {
    const post_questionaireResponse = await Axios.post(
      'https://www.spyk.fr/api_student/post_questionaire',
      body,
      {
        headers: {'x-api-key': 'leo@2020', 'user-id': `${UserId}`},
      },
    );
    if (post_questionaireResponse.status) {
      return {result: true, response: post_questionaireResponse.data};
    } else {
      return {result: false, response: post_questionaireResponse.data};
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

//logout api call here--------

export async function LogoutFunction() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );

  try {
    const logoutResponse = await Axios.get(
      'https://www.spyk.fr/api_student/my_profile',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (logoutResponse.status) {
      // console.log("getting response on the function--------",logoutResponse.data)
      return {result: true, response: logoutResponse.data};
    } else {
      // console.log("getting error on the function--------",logoutResponse.data)
      return {result: false, error: logoutResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

// getting user profile.........

export async function StudentProfile() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'getting token and user id here inside the function-----------',
  //   UserId,
  // );

  try {
    const StudentProfileResponse = await Axios.get(
      'https://www.spyk.fr/api_student/my_profile',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (StudentProfileResponse.status) {
      // console.log("getting response on the function--------",StudentProfileResponse.data)
      return {result: true, response: StudentProfileResponse.data};
    } else {
      // console.log("getting error on the function--------",StudentProfileResponse.data)
      return {result: false, error: StudentProfileResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

// export async function loginToken() {

//   // const token = await AsyncStorage.getItem('token');
//   const user_id = await AsyncStorage.getItem('user_id');

//   const UserId = JSON.parse(user_id)

//   console.log("getting token and user id here inside the function-----------",UserId)

//   try {
//     const loginTokenResponse = await Axios.get(
//       'https://www.thelyfe.fr/api/login_token',
//       {
//         headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}
//       },
//     );
//     if (loginTokenResponse.status) {
//       // console.log("getting response on the function--------",loginTokenResponse.data)
//       return {result: true, response: loginTokenResponse.data};
//     } else {
//       // console.log("getting error on the function--------",loginTokenResponse.data)
//       return {result: false, error: loginTokenResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }

// forgot password API 1

export async function forgotPasswordReq1Function(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const forgotPasswordReq1Response = await Axios.post(
      'https://www.spyk.fr/api_student/forgotpassword_req_1',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotPasswordReq1Response.status) {
      return {result: true, response: forgotPasswordReq1Response.data};
    } else {
      return {result: false, response: forgotPasswordReq1Response.data};
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
// forgot password API 2

export async function forgotPasswordReq2Function(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const forgotPasswordReq2Response = await Axios.post(
      'https://www.spyk.fr/api_student/forgotpassword_req_2',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotPasswordReq2Response.status) {
      return {result: true, response: forgotPasswordReq2Response.data};
    } else {
      return {result: false, response: forgotPasswordReq2Response.data};
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

// forgot password 3

export async function forgotPasswordReq3Function(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const forgotPasswordReq3Response = await Axios.post(
      'https://www.spyk.fr/api_student/setpassword',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotPasswordReq3Response.status) {
      return {result: true, response: forgotPasswordReq3Response.data};
    } else {
      return {result: false, response: forgotPasswordReq3Response.data};
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

// # : NEWSLETTER INFORMATION

export async function getnewesletterInfo() {
  try {
    const getnewesletterInfoResponse = await Axios.get(
      'https://www.spyk.fr/api_student/newsletter_info',
      {
        headers: {...commonHeader},
      },
    );
    if (getnewesletterInfoResponse.status) {
      // console.log("getting response on the function--------",getnewesletterInfoResponse.data)
      return {result: true, response: getnewesletterInfoResponse.data};
    } else {
      return {result: false, error: getnewesletterInfoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

// NEWSLETTER SUBSCRIPTION

export async function newsletterSubscriptionFunction(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log('getig token and id here on newsletter funtion--------------------', TokenValue, UserId);

  try {
    const newsletterSubscriptionResponse = await Axios.post(
      'https://www.spyk.fr/api_student/subscribe_newsletter',
      body,
      {
        headers: {...commonHeader, 'user-id': `${UserId}`},
      },
    );
    if (newsletterSubscriptionResponse.status) {
      return {result: true, response: newsletterSubscriptionResponse.data};
    } else {
      return {result: false, response: newsletterSubscriptionResponse.data};
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

// # :  GET ALL PROMOCODES

export async function getAllPromoCodes() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const getAllPromoCodesResponse = await Axios.get(
      'https://www.spyk.fr/api_student/all_promocodes',
      {
        headers: {...commonHeader, 'user-id': `${UserId}`},
      },
    );
    if (getAllPromoCodesResponse.status) {
      // console.log("getting response on the function--------",getAllPromoCodesResponse.data)
      return {result: true, response: getAllPromoCodesResponse.data};
    } else {
      return {result: false, error: getAllPromoCodesResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function duration_amount_by_level(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const duration_amount_by_levelResponse = await Axios.post(
      'https://www.spyk.fr/api_student/duration_amount_by_level',
      body,
      {
        headers: {...commonHeader, 'user-id': `${UserId}`},
      },
    );
    if (duration_amount_by_levelResponse.status) {
      return {result: true, response: duration_amount_by_levelResponse.data};
    } else {
      return {result: false, response: duration_amount_by_levelResponse.data};
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

export async function search_teacherFunction(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const getSearchTeacherResponse = await Axios.post(
      'https://www.spyk.fr/api_student/search_teacher',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (getSearchTeacherResponse.status) {
      // console.log("getting getSearchTeacherResponse the true ?????????????????????")
      return {result: true, response: getSearchTeacherResponse.data};
    } else {
      // console.log("getting getSearchTeacherResponse the false ?????????????????????")
      return {result: false, response: getSearchTeacherResponse.data};
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

//  POST teacher_info_for_reservation TEST API .............

export async function teacher_info_for_reservation(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const teacher_info_for_reservationResponse = await Axios.post(
      'https://www.spyk.fr/api_student/teacher_info_for_reservation',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (teacher_info_for_reservationResponse.status) {
      return {
        result: true,
        response: teacher_info_for_reservationResponse.data,
      };
    } else {
      return {
        result: false,
        response: teacher_info_for_reservationResponse.data,
      };
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

export async function check_reservation_by_datetime_slot(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const check_reservation_by_datetime_slotResponse = await Axios.post(
      'https://www.spyk.fr/api_student/check_reservation_by_datetime_slot',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (check_reservation_by_datetime_slotResponse.status) {
      return {
        result: true,
        response: check_reservation_by_datetime_slotResponse.data,
      };
    } else {
      return {
        result: false,
        response: check_reservation_by_datetime_slotResponse.data,
      };
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










export async function modified_reservation(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const modified_reservationResponse = await Axios.post(
      'https://www.spyk.fr/api_student/modified_reservation',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (modified_reservationResponse.status) {
      return {
        result: true,
        response: modified_reservationResponse.data,
      };
    } else {
      return {
        result: false,
        response: modified_reservationResponse.data,
      };
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












// get incomplete transaction

export async function incomplete_reservation() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const incomplete_reservationResponse = await Axios.get(
      `https://www.spyk.fr/api_student/incomplete_reservation`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (incomplete_reservationResponse.status) {
      // console.log("getting response on the function--------",incomplete_reservationResponse.data)
      return {result: true, response: incomplete_reservationResponse.data};
    } else {
      return {result: false, error: incomplete_reservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

// # : GET STUDENT ACADEMIC DETAILS

export async function get_academic_info() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  try {
    const get_academic_infoResponse = await Axios.get(
      `https://www.spyk.fr/api_student/get_academic_info`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (get_academic_infoResponse.status) {
      // console.log("getting response on the function--------",get_academic_infoResponse.data)
      return {result: true, response: get_academic_infoResponse.data};
    } else {
      return {result: false, error: get_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function count_data() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log("getting all data-------------",TokenValue,UserId)

  try {
    const count_dataResponse = await Axios.get(
      `https://www.spyk.fr/api_student/count_data`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (count_dataResponse.status) {
      // console.log("getting response on the function--------",count_dataResponse.data)
      return {result: true, response: count_dataResponse.data};
    } else {
      return {result: false, error: count_dataResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

// STUDENT ACADEMIC INFORMATION (ADD/UPDATE)

export async function add_update_academic_info(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  try {
    const add_update_academic_infoResponse = await Axios.post(
      'https://www.spyk.fr/api_student/add_update_academic_info',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (add_update_academic_infoResponse.status) {
      return {result: true, response: add_update_academic_infoResponse.data};
    } else {
      return {result: false, response: add_update_academic_infoResponse.data};
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

export async function single_chat_dataFunction(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  // console.log('getting tpken and user Id ========', TokenValue, UserId);

  try {
    const single_chat_dataResponse = await Axios.post(
      'https://www.spyk.fr/api_student/single_chat_data',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (single_chat_dataResponse.status) {
      return {result: true, response: single_chat_dataResponse.data};
    } else {
      return {result: false, response: single_chat_dataResponse.data};
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

export async function history_reservation() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );
  console.log(
    'getting token and user id here inside the function-----------',
    TokenValue,
  );

  try {
    const history_reservationResponse = await Axios.get(
      'https://www.spyk.fr/api_student/history_reservation',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (history_reservationResponse.status) {
      // console.log("getting response on the function--------",history_reservationResponse.data)
      return {result: true, response: history_reservationResponse.data};
    } else {
      // console.log("getting error on the function--------",history_reservationResponse.data)
      return {result: false, error: history_reservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function current_reservation() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );
  console.log(
    'getting token and user id here inside the function-----------',
    TokenValue,
  );

  try {
    const current_reservationResponse = await Axios.get(
      'https://www.spyk.fr/api_student/current_reservation',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (current_reservationResponse.status) {
      // console.log("getting response on the function--------",current_reservationResponse.data)
      return {result: true, response: current_reservationResponse.data};
    } else {
      // console.log("getting error on the function--------",current_reservationResponse.data)
      return {result: false, error: current_reservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function teacher_history(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  console.log('getting tpken and user Id ========', TokenValue, UserId);

  try {
    const teacher_historyResponse = await Axios.post(
      'https://www.spyk.fr/api_student/teacher_history',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (teacher_historyResponse.status) {
      return {result: true, response: teacher_historyResponse.data};
    } else {
      return {result: false, response: teacher_historyResponse.data};
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

export async function rating_to_teacher(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  console.log('getting tpken and user Id ========', TokenValue, UserId);

  try {
    const rating_to_teacherResponse = await Axios.post(
      'https://www.spyk.fr/api_student/rating_to_teacher',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (rating_to_teacherResponse.status) {
      return {result: true, response: rating_to_teacherResponse.data};
    } else {
      return {result: false, response: rating_to_teacherResponse.data};
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

export async function teacher_rating_info(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  console.log('getting tpken and user Id ========', TokenValue, UserId);

  try {
    const teacher_rating_infoResponse = await Axios.post(
      'https://www.spyk.fr/api_student/teacher_rating_info',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (teacher_rating_infoResponse.status) {
      return {result: true, response: teacher_rating_infoResponse.data};
    } else {
      return {result: false, response: teacher_rating_infoResponse.data};
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

export async function update_profile(body = {}) {
  let formData = new FormData();
  formData.append('body', 'body Upload');
  formData.append('body', body);

  console.log('getting formdat exact value===========', formData);

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);
  console.log('getting tpken and user Id ========', TokenValue, UserId);

  try {
    const update_profileResponse = await Axios.post(
      'https://www.spyk.fr/api_student/update_profile',
      formData,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (update_profileResponse.status) {
      return {result: true, response: update_profileResponse.data};
    } else {
      return {result: false, response: update_profileResponse.data};
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

export async function delete_account(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log('getting token and user id on delete account-----------', UserId);

  try {
    const delete_accountResponse = await Axios.post(
      'https://www.spyk.fr/api_student/delete_account',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (delete_accountResponse.status) {
      return {result: true, response: delete_accountResponse.data};
    } else {
      return {result: false, response: delete_accountResponse.data};
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

// notification API

export async function setting_notification_status() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );
  console.log(
    'getting token and user id here inside the function-----------',
    TokenValue,
  );

  try {
    const setting_notification_statusResponse = await Axios.get(
      'https://www.spyk.fr/api_student/setting_notification_status',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (setting_notification_statusResponse.status) {
      // console.log("getting response on the function--------",setting_notification_statusResponse.data)
      return {result: true, response: setting_notification_statusResponse.data};
    } else {
      // console.log("getting error on the function--------",setting_notification_statusResponse.data)
      return {result: false, error: setting_notification_statusResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}

export async function setting_notification_update(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id on setting_notification_update -----------',
    UserId,
  );

  try {
    const setting_notification_updateResponse = await Axios.post(
      'https://www.spyk.fr/api_student/setting_notification_update',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (setting_notification_updateResponse.status) {
      return {result: true, response: setting_notification_updateResponse.data};
    } else {
      return {
        result: false,
        response: setting_notification_updateResponse.data,
      };
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







export async function search_teacher_booking_later(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id on search_teacher_booking_later -----------',
    UserId,
    TokenValue
  );

  try {
    const search_teacher_booking_laterResponse = await Axios.post(
      'https://www.spyk.fr/api_student/search_teacher_booking_later',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (search_teacher_booking_laterResponse.status) {
      return {result: true, response: search_teacher_booking_laterResponse.data};
    } else {
      return {
        result: false,
        response: search_teacher_booking_laterResponse.data,
      };
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









export async function search_teacher_booking_now() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id here inside the function-----------',
    UserId,
  );
  console.log(
    'getting token and user id here inside the function-----------',
    TokenValue,
  );

  try {
    const search_teacher_booking_nowResponse = await Axios.get(
      'https://www.spyk.fr/api_student/search_teacher_booking_now',
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (search_teacher_booking_nowResponse.status) {
      // console.log("getting response on the function--------",search_teacher_booking_nowResponse.data)
      return {result: true, response: search_teacher_booking_nowResponse.data};
    } else {
      // console.log("getting error on the function--------",search_teacher_booking_nowResponse.data)
      return {result: false, error: search_teacher_booking_nowResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}






// GET waiting time in seconds


export async function get_waiting_time() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'ghetting incomplete transactoin tokena dn ujserId =========',
    TokenValue,
    UserId,
  );

  try {
    const get_waiting_timeResponse = await Axios.get(
      `https://www.spyk.fr/api_student/get_waiting_time`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (get_waiting_timeResponse.status) {
      // console.log("getting response on the function--------",get_waiting_timeResponse.data)
      return {result: true, response: get_waiting_timeResponse.data};
    } else {
      return {result: false, error: get_waiting_timeResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}






export async function reservation_request(body = {}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id on reservation_request -----------',
    UserId,
    TokenValue
  );

  try {
    const reservation_requestResponse = await Axios.post(
      'https://www.spyk.fr/api_student/reservation_request',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (reservation_requestResponse.status) {
      return {result: true, response: reservation_requestResponse.data};
    } else {
      return {
        result: false,
        response: reservation_requestResponse.data,
      };
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






// export async function getInstgramUserName() {

//   const InstaUserId = await AsyncStorage.getItem('InstaUserId');
//   const Instatoken = await AsyncStorage.getItem('Instatoken');

//   const  InstatokenValue = JSON.parse(Instatoken);
//   const InstaUserIdValue = JSON.parse(InstaUserId)

//   console.log("getting token and userID on the api calling--------------",InstaUserId,Instatoken)

//   try {
//     const getInstgramUserNameResponse = await Axios.get(
//       `https://graph.instagram.com/${InstaUserIdValue}?fields=id,username&access_token=${InstatokenValue}`,
//       {
//         headers: {...commonHeader}
//       },
//     );
//     if (getInstgramUserNameResponse.status) {
//       // console.log("getting response on the function--------",getInstgramUserNameResponse.data)
//       return {result: true, response: getInstgramUserNameResponse.data};
//     } else {
//       return {result: false, error: getInstgramUserNameResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }





export async function home_teacher_slide() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'ghetting home_teacher_slide tokena dn ujserId =========',
    TokenValue,
    UserId,
  );

  try {
    const home_teacher_slideResponse = await Axios.get(
      `https://www.spyk.fr/api_student/home_teacher_slide`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (home_teacher_slideResponse.status) {
      // console.log("getting response on the function--------",home_teacher_slideResponse.data)
      return {result: true, response: home_teacher_slideResponse.data};
    } else {
      return {result: false, error: home_teacher_slideResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}





export async function cancel_reservation(body = {}) {
  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id on cancel_reservation -----------',
    UserId,
  );

  try {
    const cancel_reservationResponse = await Axios.post(
      'https://www.spyk.fr/api_student/cancel_reservation',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (cancel_reservationResponse.status) {
      return {result: true, response: cancel_reservationResponse.data};
    } else {
      return {
        result: false,
        response: cancel_reservationResponse.data,
      };
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



export async function notification_count() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const notification_countResponse = await Axios.get(
      `https://www.spyk.fr/api_student/notification_count`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (notification_countResponse.status) {
      // console.log("getting response on the function--------",notification_countResponse.data)
      return {result: true, response: notification_countResponse.data};
    } else {
      return {result: false, error: notification_countResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function my_notification() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const my_notificationResponse = await Axios.get(
      `https://www.spyk.fr/api_student/my_notification`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (my_notificationResponse.status) {
      // console.log("getting response on the function--------",my_notificationResponse.data)
      return {result: true, response: my_notificationResponse.data};
    } else {
      return {result: false, error: my_notificationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}






export async function saved_cards() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const saved_cardsResponse = await Axios.get(
      `https://www.spyk.fr/api_student/saved_cards`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (saved_cardsResponse.status) {
      // console.log("getting response on the function--------",saved_cardsResponse.data)
      return {result: true, response: saved_cardsResponse.data};
    } else {
      return {result: false, error: saved_cardsResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}





export async function delete_saved_card(body = {}) {
  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id on delete_saved_card -----------',
    UserId,
  );

  try {
    const delete_saved_cardResponse = await Axios.post(
      'https://www.spyk.fr/api_student/delete_saved_card',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (delete_saved_cardResponse.status) {
      return {result: true, response: delete_saved_cardResponse.data};
    } else {
      return {
        result: false,
        response: delete_saved_cardResponse.data,
      };
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




export async function save_my_card(body = {}) {
  
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  console.log(
    'getting token and user id on save_my_card -----------',
    UserId,
  );

  try {
    const save_my_cardResponse = await Axios.post(
      'https://www.spyk.fr/api_student/save_my_card',
      body,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (save_my_cardResponse.status) {
      return {result: true, response: save_my_cardResponse.data};
    } else {
      return {
        result: false,
        response: save_my_cardResponse.data,
      };
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