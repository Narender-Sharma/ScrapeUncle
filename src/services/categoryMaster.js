import { httpClient } from "../helpers/http-client";

const getCategoryMaster = async(token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.get(process.env.REACT_APP_BASE_URL_API+`/api/category`,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in GetCategory APi ', err);
    }
}
const createCategory = async(token,data) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/category/create`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in createCategory APi ', err);
    }
}
const updateCategory = async(token,data) =>{
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/category/update`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in updateCategory APi ', err);
    }
}
export{
    getCategoryMaster,
    createCategory,
    updateCategory
}