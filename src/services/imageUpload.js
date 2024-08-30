import { httpClient } from "../helpers/http-client";
const imageUpload = async(data) => {
    try {
        const response = await httpClient.post(process.env.REACT_APP_IMAGE_UPLOAD+`/api/v1/files/upload`,data);
       return response.data;
    } catch (err) {
        console.error('error in adminLogin APi ', err);
    }
}

export {
    imageUpload
}