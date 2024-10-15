import VFrequentWords from '@/components/views/dashboard/v-frequent-words';
import CountFilesAllStaffs from './count-files-all-staffs';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='grid gap-5 md:grid-cols-2 grid-cols-1'>
				<VFrequentWords />
				<CountFilesAllStaffs />
			</div>
		</div>
	);
};

export default Dashboard;
