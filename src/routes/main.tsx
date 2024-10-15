import MainPage from '@/views/main';
import Dashboard from '@/views/main/Dashboard';
import NotFound from '@/views/not-found';
import { AudioLines, Files, LayoutDashboard, Users } from 'lucide-react';

const MainRoutes = [
	{
		name: 'Dashboard',
		layout: '/',
		icon: <LayoutDashboard />,
		path: '/dashboard',
		component: <Dashboard />,
	},
	{
		name: 'Staffs',
		layout: '/',
		icon: <Users />,
		path: '/staffs',
		component: <></>,
	},
	{
		name: 'Activities',
		layout: '/',
		icon: <Files />,
		path: '/activities',
		component: <></>,
	},
	{
		name: 'Audio Analisis',
		layout: '/',
		icon: <AudioLines />,
		path: '/audio-analisis',
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
