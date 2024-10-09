import insightsImg from '@/assets/img/others/insights.png';

const Navbar = () => {
	return (
		<nav className='w-full flex justify-between items-center h-[12vh] px-5 '>
			<img src={insightsImg} width={160} />
		</nav>
	);
};

export default Navbar;
