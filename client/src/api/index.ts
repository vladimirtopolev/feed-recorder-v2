import axios from 'axios';
import {getToken} from '../utils/auth0/getToken';
import {ProjectApi} from './projectApi';

const isDevelopment = process.env.NODE_ENV === 'development';

export type PaginatedResponse<T> = {
    items: T[],
    count: number
}

export const request = axios.create(isDevelopment?
    {
        baseURL: 'http://localhost:5000'
    }
    : {}
    );

request.interceptors.request.use(async (axiosConfig) => {
    axiosConfig.headers.Client = window.location.origin;
    try {
        const token = await getToken();
        console.log(token);
        axiosConfig.headers.Authorization = `Bearer ${token}`;
        return axiosConfig;
    } catch (e) {
        return axiosConfig;
    }
});

const API = {
    projects: new ProjectApi(request),
};

export default API;