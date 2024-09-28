import axios from "axios";
import { AdminModel, AuthModel, StudentModel,SuperAdminModel} from "./_models";
import { DOMAIN } from "../../../routing/ApiEndpoints";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_STUDENT_BY_ACCESSTOKEN_URL = `${DOMAIN}/api/student/student-details`;
export const GET_SCHOOL_USER_BY_ACCESSTOKEN_URL = `${DOMAIN}/api/school/school-user/details`;
export const GET_SUPER_ADMIN_BY_ACCESSTOKEN_URL = `${DOMAIN}/api/superadmin/by_token`;

export const LOGIN_URL_SCHOOL_USER = `${DOMAIN}/api/school/school-user/login`;
export const LOGIN_URL_STUDENT = `${DOMAIN}/api/student/userlogin`;
export const LOGIN_URL_SUPER_ADMIN = `${DOMAIN}/api/superadmin/login`;
// export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function loginSchoolUser(email: string, password: string) {
  return(axios.post<AuthModel>(LOGIN_URL_SCHOOL_USER, {
    email,
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

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(username: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    username,
  });
}

export async function getStudentByToken(user_id: string) {
  const response = await axios.post<StudentModel>(GET_STUDENT_BY_ACCESSTOKEN_URL, {
    user_id,
   } );
   
   return(
    response
   )
}
export async function getSchoolUserByToken(token: string) {
  try {
    const response = await axios.post(GET_SCHOOL_USER_BY_ACCESSTOKEN_URL, {
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



