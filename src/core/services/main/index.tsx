import { SignIn_Req } from '@/core/models';
import { post } from '@/utils/api';

export const mainApi = {
	signin: (data: SignIn_Req) => post(`login`, data),
};
