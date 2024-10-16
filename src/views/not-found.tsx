import error from '@/assets/img/others/error.png';
const NotFound = () => {
	return (
		<div className='dark:bg flex w-full flex-col items-center justify-center rounded-[20px] bg-white dark:!bg-navy-900 md:py-12 lg:py-28 3xl:py-40'>
			<img src={error} className='mt-4 w-[400px]' alt='' />
			<h1 className='mt-3 text-center text-4xl font-bold text-primary dark:text-white lg:text-5xl'>Ah, dang. We didn't find that page.</h1>
			<p className='mt-4 text-center text-sm font-normal text-primary dark:text-white xl:mt-8 xl:text-lg'>
				Maybe it’s best you start back at our home page...
				<a href='/' className='font-bold text-brand-500 hover:text-brand-500 dark:text-white dark:hover:text-white'>
					Return at home here
				</a>
			</p>
		</div>
	);
};

export default NotFound;
