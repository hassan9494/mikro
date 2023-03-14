import axios from 'axios';
import {toast} from "react-toastify";

const errors = {
    error_response: 'Operation failed!',
    error_invalid_coupon: 'Invalid coupon code!'
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    /* other custom settings */
});


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = typeof window != "undefined" ? localStorage.getItem('access_token') : '';
    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    return config;
}, function (error) {
    // Do something with request error
    toast.error(errors[error?.response?.data?.message || 'error_response']);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    function(res) {
        return res;
    },
    function(error) {
        if (error?.response.config.url !== 'user/me') {
            const msg = error?.response?.data?.message;
            toast.error(errors[msg || 'error_response'] || msg);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
