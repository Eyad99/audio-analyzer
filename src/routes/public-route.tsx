import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PublicRoute = ({ children, restricted }: any) => {
	const isLoggedIn = Cookies.get(KEY_TOKEN_COOKIE);

	return isLoggedIn && restricted ? <Navigate to={'/dashboard'} /> : children;
};
