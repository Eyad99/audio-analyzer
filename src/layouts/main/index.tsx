import React from 'react';
import Sidebar from '@/components/widgets/sidebar';
import Navbar from '@/components/widgets/navbar';
import Footer from '@/components/widgets/footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NavigateByRole } from '@/utils';
import MainRoutes from '@/routes/main';

export default function MainLayout(props: { [x: string]: any }) {
	const { ...rest } = props;
	const location = useLocation();
	const [open, setOpen] = React.useState(true);
	const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');
	const [mini, setMini] = React.useState(false);

	React.useEffect(() => {
		window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
	}, []);
	React.useEffect(() => {
		getActiveRoute(MainRoutes);
	}, [location.pathname]);

	// functions for changing the states from components
	const getActiveRoute = (routes: RoutesType[]): string => {
		const activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				const collapseActiveRoute = getActiveRoute(routes[i].items as any);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					setCurrentRoute(routes[i].name);
				}
			}
		}
		return activeRoute;
	};

	const getActiveNavbar = (routes: RoutesType[]): boolean => {
		const activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				const collapseActiveNavbar = getActiveNavbar(routes[i].items as any);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondary!;
				}
			}
		}
		return activeNavbar;
	};

	const getRoutes = (routes: RoutesType[]): any => {
		return routes.map((prop, key) => {
			if (prop.layout === '/') {
				return <Route path={`${prop.path}`} element={prop.component} key={key} />;
			}
			if (prop.collapse) {
				return getRoutes(prop.items as any);
			}
			return null;
		});
	};

	// ---------- Open And Close Sidebar ----------
	const handleOpenAndCloseSideBar = () => setMini(!mini);

	document.documentElement.dir = 'ltr';
	return (
		<div className='flex h-full w-full bg-background-100 dark:bg-background-900'>
			<Sidebar open={open} mini={mini} handleOpenAndCloseSideBar={handleOpenAndCloseSideBar} />
			{/* Navbar & Main Content */}
			<div className='h-full w-full font-dm dark:bg-navy-900 bg-[#F5F8FE]'>
				{/* Main Content */}
				<main
					className={`mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 ${mini === false ? 'xl:ml-[313px]' : 'ml-0 xl:ml-[142px]'} `}
				>
					{/* Routes */}
					<div>
						<div>
							<Navbar brandText={currentRoute} mini={mini} open={open} handleOpenAndCloseSideBar={handleOpenAndCloseSideBar} {...rest} />
						</div>
						<div className='mx-auto min-h-screen p-2 !pt-[120px] md:p-2'>
							<Routes>
								{getRoutes(MainRoutes)}
								<Route path='/' element={<Navigate to={NavigateByRole} replace />} />
							</Routes>
						</div>
						<div className='p-3'>
							<Footer />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
