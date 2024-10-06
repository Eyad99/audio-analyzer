import React, { FC, useRef, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Maximize } from 'lucide-react';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const StagesOfACall = () => {
	const chartRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const data = {
		labels: ['Greeting', 'Issue Identification', 'Information Gathering', 'Resolution', 'Closing'],
		datasets: [
			{
				label: 'Call Stage Satisfaction',
				data: [7, 8, 6, 9, 7],
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 2,
			},
		],
	};

	const options = {
		scales: {
			r: {
				min: 0,
				max: 10,
				ticks: {
					stepSize: 1,
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
		},
	};

	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='md:max-w-[500px] max-w-fit'
				dialogBody={
					<div>
						<div className='flex justify-between'>
							<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Stages Of A Call</h2>
						</div>
						<Radar data={data} options={options as any} ref={chartRef} />
					</div>
				}
			/>
			<div className=' p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Stages Of A Call</h2>
					<div className='flex gap-2 items-center'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
					</div>
				</div>
				<Radar data={data} options={options as any} ref={chartRef} height={300} />
			</div>
		</React.Fragment>
	);
};

export default StagesOfACall;
