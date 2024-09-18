import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { ApiClient } from './ApiService';

interface IGenericRequest {
    id?: any | null;
}
export const findAll = <T>(route: string): AxiosPromise<T> => {
    return ApiClient.get(`/${route}`);
};

export const findById = <T>(route: string, id: number | string): AxiosPromise<T> => {
    return ApiClient.get(`/${route}/${id}`);
};

export const save = <T extends IGenericRequest, R>(route: string, data: T): AxiosPromise<R> => {
    if (data.id) {
        return ApiClient.put(`/${route}/${data.id}`, data);
    }

    return ApiClient.post(`/${route}`, data);
};

export const deleteData = (route: string, id: number): AxiosPromise<void> => {
    return ApiClient.delete(`/${route}/${id}`);
};

export const enableData = (route: string, id: number): AxiosPromise<void> => {
    return ApiClient.put(`/${route}/${id}/enable`);
};

export const disableData = (route: string, id: number): AxiosPromise<void> => {
    return ApiClient.put(`/${route}/${id}/disable`);
};

export const getRequest = <T extends any>(route: string, config?: AxiosRequestConfig<any>): AxiosPromise<T> => {
    return ApiClient.get(`/${route}`, config);
};

export const postRequest = <T extends any>(route: string, data?: object, config?: AxiosRequestConfig<any>): AxiosPromise<T> => {
    return ApiClient.post(`/${route}`, data, config);
};

export const putRequest = <T extends any>(route: string, data?: object, config?: AxiosRequestConfig<any>): AxiosPromise<T> => {
    return ApiClient.put(`/${route}`, data, config);
};

export const deleteRequest = <T extends any>(route: string, config?: AxiosRequestConfig<any>): AxiosPromise<T> => {
    return ApiClient.delete(`/${route}`, config);
};
