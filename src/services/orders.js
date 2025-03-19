import { httpClient } from "../helpers/http-client";
const GetAllOrders = async(token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.get(process.env.REACT_APP_BASE_URL_API+`/api/pickup`,
            {
                headers
            }
        );
    
       return response.data;
    } catch (err) {
        console.error('error in GetAllOrders APi ', err);
    }
}
const OrdersUpdate = async(token, payload,id) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.REACT_APP_BASE_URL_API+`/api/pickup/update/`+id,payload,
            {
                headers
            }
        );
       return response.data;
    } catch (err) {
        console.error('error in GetAllOrders APi ', err);
    }
}
export {
    GetAllOrders,
    OrdersUpdate
}