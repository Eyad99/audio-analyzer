import MainRoutes from '@/routes/main';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
		<div>
			<div className='relative float-right h-full min-h-screen w-full dark:!bg-navy-900'>
				<main className={`mx-auto min-h-screen`}>
					<Routes>{getRoutes(MainRoutes)}</Routes>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
