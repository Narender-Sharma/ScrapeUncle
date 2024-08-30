import { httpClient } from "../helpers/http-client";
const adminLogin = async(data) => {
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL+`/api/users/sendOtp`,data,{});
        return response.data;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message};
        // console.error('error in adminLogin APi ', err);
    }
}
const adminLogOut = async(data) => {
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL+`/api/users/logout`,data,{});
        return response.data;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message};
        // console.error('error in adminLogin APi ', err);
    }
}
const LoginOtpVerify = async(data) => {
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL+`/api/users/verifyOtp`,data,{});
        return response.data;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message};
    }
}
const adminGetUser = async(token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.get(process.env.REACT_APP_BASE_URL+`/api/users`,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in adminLogin APi ', err);
    }
}
export {
    adminLogin,
    adminGetUser,
    LoginOtpVerify,adminLogOut
}