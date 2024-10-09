import { post } from '@/utils/api';

export const mainApi = {
	upoadAudio: (data: any) => post(`api/upload/a1/`, data, { headers: { formData: true } }),
};
