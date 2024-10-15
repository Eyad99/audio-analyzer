import MainPage from '@/views/main';
import NotFound from '@/views/not-found';

const MainRoutes = [
	{
		name: 'Dashboard',
		layout: '/',
		path: '/dashboard',
		component: <MainPage />,
	},

	{
		name: 'NotFound',
		layout: '/',
		path: '*',
		invisible: true,
		component: <NotFound />,
	},
];
export default MainRoutes;
