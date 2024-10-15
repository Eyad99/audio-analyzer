import React, { useState, FC, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Maximize } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VCountFilesAllStaffsProps {
	statements: any[];
}
const VCountFilesAllStaffs: FC<VCountFilesAllStaffsProps> = ({ statements }) => {
	const chartRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	let barData = {
		labels: statements?.map((item: any) => item?.name),
		datasets: [
			{
				label: `Total Excel Files`,
				data: statements?.map((item: any) => item?.xlfile_count),
				borderWidth: 1,
				backgroundColor: '#D7E3FD',
				borderColor: '#D7E3FD',
			},
		],
	};

	const options = {
		responsive: true,

		plugins: {
			legend: {
				display: false,
				position: 'top',
			},
		},

		scales: {
			x: {
				title: {
					display: true,
					text: 'Staff Name',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Number of uploaded files',
				},
			},
		},
	};

	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<div className='flex justify-between'>
							<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files uploaded for each Staff</h2>
						</div>{' '}
						<Bar options={options as any} data={barData} ref={chartRef} />
					</div>
				}
			/>
			<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files uploaded for each Staff</h2>
					<div className='flex gap-2 items-center'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
					</div>
				</div>
				<Bar options={options as any} data={barData} ref={chartRef} />
			</div>{' '}
		</React.Fragment>
	);
};

export default VCountFilesAllStaffs;
