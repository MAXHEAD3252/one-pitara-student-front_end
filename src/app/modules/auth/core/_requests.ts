import axios from "axios";
import { AdminModel, AuthModel, StudentModel,SuperAdminModel} from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_STUDENT_BY_ACCESSTOKEN_URL = `https://erp.innoveraschool.com/site/get_erp_student_data`;
export const GET_ADMIN_BY_ACCESSTOKEN_URL = `http://127.0.0.1:5000/api/staff/staff-details`;
export const GET_SUPER_ADMIN_BY_ACCESSTOKEN_URL = `http://127.0.0.1:5000/api/superadmin/by_token`;

export const LOGIN_URL_STAFF = `http://127.0.0.1:5000/api/staff/staff-login`;
export const LOGIN_URL_STUDENT = `https://erp.innoveraschool.com/site/userlogin_api/`;
export const LOGIN_URL_SUPER_ADMIN = `http://127.0.0.1:5000/api/superadmin/login`;
// export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function loginStaff(email: string, password: string) {
  return(axios.post<AuthModel>(LOGIN_URL_STAFF, {
    email,
    password,
  }) .then(response => {
    if (response.data && response.data.res_code === "00") {
      // console.log('Error:', response.data.message);
      throw new Error('Invalid response');
    } else {
      // console.log('Success:', response);
      return ({response,data :response.data }); 
    }
  })
  .catch(error => {
    console.error('Errord:', error);
    return error;
  })
  )
   
}
export function loginSuperAdmin(username: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL_SUPER_ADMIN, {
    username,
    password,
  })
  .then(response => {
    if (response.data && response.data.res_code === "00") {
      // console.log('Error:', response.data.message);
      throw new Error('Invalid response');
    } else {
      // console.log('Success:', response.data);
      return ({response,data :response.data }); 
    }
  })
  .catch(error => {
    console.error('Error:', error);
    throw error;
  });
}
export function loginStudent(username: string, password: string) {
  return(axios.post<AuthModel>(LOGIN_URL_STUDENT, {
    username,
    password,
  }) .then(response => {
    if (response.data && response.data.res_code === "00") {
      // console.log('Error:', response.data.message);
      throw new Error('Invalid response');
    } else {
      return ({response,data :response.data });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    return error;
  })
  )
   
}

// Server should return AuthModel
// export function register(
//   username: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return axios.post(REGISTER_URL, {
//     username,
//     first_name: firstname,
//     last_name: lastname,
//     password,
//     password_confirmation,
//   });
// }

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(username: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    username,
  });
}

export async function getStudentByToken(token: string) {
  const response = await axios.post<StudentModel>(GET_STUDENT_BY_ACCESSTOKEN_URL, {
    mobile_no: token,
   } );
   
   return(
    response
   )
}
export async function getAdminByToken(token: string) {
  try {
    const response = await axios.post(GET_ADMIN_BY_ACCESSTOKEN_URL, {
      id: token,
    });
    
    const userData = response; // Log the response data
    
    return userData;
  } catch (error) {
    console.error('Error fetching admin by token:', error);
    throw error;
  }
}

export async function getSuperAdminByToken(username: string) {
  try {
    const response = await axios.post<SuperAdminModel>(GET_SUPER_ADMIN_BY_ACCESSTOKEN_URL, {
      username: username,
    });
    // console.log(response.data);
    
    return response; // Return the data property of the response
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



