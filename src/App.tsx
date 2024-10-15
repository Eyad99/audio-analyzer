import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './routes/public-route';
import MainLayout from './layouts/main';
import AuthLayout from '@/layouts/auth';
import NotFound from './views/not-found';
import '@/assets/css/Plugins.css';
import { PrivateRoute } from './routes/private-route';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/auth/sign-in' replace />} />
			<Route
				path='auth/*'
				element={
					<PublicRoute restricted={true}>
						<AuthLayout />
					</PublicRoute>
				}
			/>
			<Route
				path='/*'
				element={
					<PrivateRoute>
						<MainLayout />
					</PrivateRoute>
				}
			/>
			<Route
				path='/401'
				element={
					<PublicRoute restricted={false}>
						<NotFound />
					</PublicRoute>
				}
			/>
		</Routes>
	);
};

export default App;
