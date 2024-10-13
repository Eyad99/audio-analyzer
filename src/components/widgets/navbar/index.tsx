import insightsImg from '@/assets/img/others/insights.png';

const Navbar = () => {
	return (
		<nav className='w-full flex justify-center items-center h-[12vh] px-5 pt-6'>
			<img src={insightsImg} width={220} />
		</nav>
	);
};

export default Navbar;
