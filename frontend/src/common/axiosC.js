import axios from 'axios';
import { getCookie } from './Cookie';

export const AxiosC = async () => {
    return axios.create({
        headers: {
            'Authorization': await getCookie('accessToken'),
        }
    })
}