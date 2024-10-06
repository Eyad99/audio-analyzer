import { post } from '@/utils/api';

export const mainApi = {
	signin: (data: any) => post(`login`, data),
};
