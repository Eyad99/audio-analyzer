import { KEY_TOKEN_COOKIE } from '@/variables/constants';
import Cookies from 'js-cookie';

const isLoggedIn = Cookies.get(KEY_TOKEN_COOKIE);

export const NavigateByRole = isLoggedIn ? '/dashboard' : '/auth/sign-in';
