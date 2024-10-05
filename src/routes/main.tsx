import MainPage from '@/views/main';
import NotFound from '@/views/not-found';

const MainRoutes = [
	{
		name: '',
		layout: '/',
		path: '/',
		component: <MainPage />,
	},

	{
		name: 'NotFound',
		layout: '/auth',
		path: '*',
		invisible: true,
		component: <NotFound />,
	},
];
export default MainRoutes;
