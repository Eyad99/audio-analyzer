const Footer = () => {
	return (
		<footer className='flex w-full flex-col items-center justify-center px-1 pb-4 pt-3 lg:px-8 xl:flex-row h-[5vh]'>
			<p className='mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg'>
				<span className='mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base'>
					©{new Date().getFullYear()} Insights Middle East. All rights reserved
				</span>
			</p>
		</footer>
	);
};

export default Footer;
