import { httpClient } from "../helpers/http-client";

const getMeasurementMaster = async(token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.get(process.env.REACT_APP_BASE_URL_API+`/api/weight`,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in getMeasurementMaster APi ', err);
    }
}
const addNewMeasurement = async(token,data) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/weight/create`,data,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in addNewMeasurement APi ', err);
    }
}
const measurementUpdate = async(token,data) =>{
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/weight/update`,data,
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
    getMeasurementMaster,
    addNewMeasurement,
    measurementUpdate
}