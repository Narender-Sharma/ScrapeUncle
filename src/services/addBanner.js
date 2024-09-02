import { httpClient } from "../helpers/http-client";
const getAddBanner = async(token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.get(process.env.REACT_APP_BASE_URL_API+`/api/ad`,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in adminLogin APi ', err);
    }
}
const addNewBanner = async(token,data) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/ad/create`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.log(err, 'sdfs')
        console.error('error in addNewBanner APi ', err);
    }
}
const bannerUpdate = async(token,data) =>{
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/ad/update`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in bannerUpdate APi ', err);
    }
}
export {
    getAddBanner,
    addNewBanner,
    bannerUpdate
}