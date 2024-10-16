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
		name: 'Staff',
		layout: '/',
		icon: <Users />,
		path: '/staff',
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
		name: 'Audio Analysis',
		layout: '/',
		icon: <AudioLines />,
		path: '/audio-analysis',
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
