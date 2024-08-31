import { httpClient } from "../helpers/http-client";

const getCategory = async(token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.get(process.env.REACT_APP_BASE_URL+`/api/category`,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in getCategory APi ', err);
    }
}
const addCategory = async(token,data) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL+`/api/category/create`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in addCategory APi ', err);
    }
}
const categoryUpdate = async(token,data) =>{
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL+`/api/category/update`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in measurementUpdate APi ', err);
    }
}
export{
    getCategory,
    addCategory,
    categoryUpdate
}