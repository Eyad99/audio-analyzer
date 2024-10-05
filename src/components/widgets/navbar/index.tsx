import React from 'react';

import { Moon, Sun } from 'lucide-react';
import insightsIcon from '@/assets/img/others/logo-icon.png';
import insightsImg from '@/assets/img/others/insights.png';

const Navbar = () => {
	const [darkmode, setDarkmode] = React.useState(document.body.classList.contains('dark'));

	return (
		<nav className='w-full flex justify-between items-center h-[12vh] px-5'>
			<img src={insightsImg} width={120} />

			{/* Dark Mood And light Mood  */}
			{/* <div
				className='cursor-pointer text-gray-600'
				onClick={() => {
					if (darkmode) {
						document.body.classList.remove('dark');
						setDarkmode(false);
					} else {
						document.body.classList.add('dark');
						setDarkmode(true);
					}
				}}
			>
				{darkmode ? <Sun className='h-4 w-4 text-gray-600 dark:text-white' /> : <Moon className='h-4 w-4 text-gray-600 dark:text-white' />}
			</div> */}
		</nav>
	);
};

export default Navbar;
