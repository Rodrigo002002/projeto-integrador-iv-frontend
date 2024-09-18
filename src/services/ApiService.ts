import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, getRefreshToken, removeTokens, setAccessToken, setRefreshToken } from './SessionService';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthClient: AxiosInstance = axios.create({
    baseURL: `${BASE_URL}${import.meta.env.VITE_AUTH_URI}`,
});

const ApiClient: AxiosInstance = axios.create({
    baseURL: `${BASE_URL}${import.meta.env.VITE_API_URI}`,
});

const SystemClient: AxiosInstance = axios.create({
    baseURL: BASE_URL
});

// Request Interceptor
const requestInterceptor: any = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const accessToken = getAccessToken();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
};

// Response Interceptor
const responseInterceptor = async (response: AxiosResponse): Promise<AxiosResponse> => {
    return response;
};

// Error Interceptor
const errorInterceptor = async (error: any): Promise<any> => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = getRefreshToken();

            if (refreshToken) {

                const headers = { 'Authorization': `Bearer ${refreshToken}` };
                const response = await SystemClient.post(`${import.meta.env.VITE_AUTH_URI}/refresh-token`, null, { headers });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                setAccessToken(accessToken);
                setRefreshToken(newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return axios(originalRequest);
            } else {
                removeTokens();
                window.location.href = '/auth/login';
            }
        } catch (_error) {
            console.error(_error)
            removeTokens();
            window.location.href = '/auth/login';
            return Promise.reject(_error);
        }
    }

    return Promise.reject(error);
};

ApiClient.interceptors.request.use(requestInterceptor, Promise.reject);
ApiClient.interceptors.response.use(responseInterceptor, errorInterceptor);

AuthClient.interceptors.request.use(requestInterceptor, Promise.reject);

export { AuthClient, ApiClient, SystemClient };
