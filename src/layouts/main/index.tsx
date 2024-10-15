import Footer from '@/components/widgets/footer';
import Navbar from '@/components/widgets/navbar';
import MainRoutes from '@/routes/main';
import { NavigateByRole } from '@/utils';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainLayout = () => {
	const getRoutes = (routes: RoutesType[]): any => {
		return routes.map((prop, key) => {
			if (prop.layout === '/') {
				return <Route path={`${prop.path}`} element={prop.component} key={key} />;
			}

			return null;
		});
	};
	document.documentElement.dir = 'ltr';
	return (
		<div className='h-full min-h-screen w-full'>
			<main className={`mx-auto `}>
				<Navbar />
				<Routes>
					{getRoutes(MainRoutes)}
					<Route path='/' element={<Navigate to={NavigateByRole} replace />} />
				</Routes>
				<Footer />
			</main>
		</div>
	);
};

export default MainLayout;
