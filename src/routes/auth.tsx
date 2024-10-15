import SignIn from '@/views/auth/sign-in';
import NotFound from '@/views/not-found';

const AuthRoutes = [
	{
		name: 'sign-in',
		layout: '/auth',
		path: '/sign-in',
		component: <SignIn />,
	},

	{
		name: 'NotFound',
		layout: '/auth',
		path: '*',
		invisible: true,
		component: <NotFound />,
	},
];
export default AuthRoutes;
