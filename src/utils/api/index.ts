import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { KEY_TOKEN_COOKIE } from '@/variables/constants';
import Cookies from 'js-cookie';
import { ObjToFormData } from '../helpers';

const baseURL = 'http://insights24.pythonanywhere.com/';
export interface ApiResponse<T = any> {
	data: T;
	statusCode: number;
	message: string;
}

const api: AxiosInstance = axios.create({
	baseURL,
	timeout: 180000,
	headers: {
		Accept: 'application/json',
	},
});

api.interceptors.request.use(
	(config: any) => {
		config.headers['Authorization'] = `Bearer ${Cookies.get(KEY_TOKEN_COOKIE)}`;
		if (Boolean(config.headers.formData)) {
			config.data = ObjToFormData(config.data, undefined, undefined);
			// Set Content-Type to undefined to let Axios set it automatically for FormData
			delete config.headers['Content-Type'];
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response: AxiosResponse<ApiResponse>) => response,
	(error) => {
		if (error.response) {
			if (error.response.statusCode === 401) {
				window.location.href = '/';
			} else {
				// Handle other response errors

				console.error('Error: elseee', error.message);
			}
		} else if (error.request) {
			// Handle request error
			console.error('Request error:', error.request);
		} else {
			// Handle other errors
			console.error('Error:', error.message);
		}

		return Promise.reject(error?.response?.data);
	}
);

export const { get, post, put, delete: destroy, patch } = api;
