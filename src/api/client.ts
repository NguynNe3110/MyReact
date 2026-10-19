import axios from "axios";
import { ENV } from "../config/config";
import { mapApiError } from "./AppError";
import { tokenStorage } from "./tokenStorage";


// phải có thêm interceptor vào bear token
export const apiClient = axios.create({
    baseURL: ENV.API_URL,
    timeout: 10000,
});


//request phải chèn token
apiClient.interceptors.request.use(async config => {
    const token = await tokenStorage.getAccessToken();

    if(token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
}); 


// ham nay nhan 2 ham 
apiClient.interceptors.response.use(
    response => response, // trả nguyên vẹn mà axios trả về
    (error: unknown) => {
        return Promise.reject(mapApiError(error));
    },
);