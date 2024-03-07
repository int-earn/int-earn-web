import { setCookie } from '../common/Cookie';
import { AxiosC } from '../common/axiosC'
import { API_URL } from '../config';
import axios from 'axios';

const handleError = (error, callback) => {
    console.log(error);
    if (error.response.status === 403) {
        callback([false, 403]);
    } else {
        callback([false, 'others']);
    }
    
}

export const login = async (user, callback) => {
    try {
        const result = await axios.post(`${API_URL}/api/user/login`, user);
        setCookie('accessToken', 'Bearer '+result.data.data.token);

        if (callback)
            callback([true, result.data.message])
    
    } catch (error) {
        handleError(error, callback);
    }
}

export const loadUser = async (callback) => {
    try {
        const axiosInstance = await AxiosC();
        const result = await axiosInstance.get(`${API_URL}/api/user`);

        if (callback) {
            callback([true, result.data.data])
        }
    } catch (error) {
        console.log(error);
    }
}