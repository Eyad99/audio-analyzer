import React, { useRef, useState } from 'react';
import { Chart as ChartJS, BubbleController, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Maximize } from 'lucide-react';
import { Bubble } from 'react-chartjs-2';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Legend, Title);

const FrequentWords = () => {
	const chartRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const wordsData = [
		{ word: 'thank', frequency: 9 },
		{ word: 'order', frequency: 8 },
		{ word: 'order', frequency: 6 },
		{ word: 'charles', frequency: 12 },
		{ word: 'help', frequency: 4 },
		{ word: 'ship', frequency: 4 },
		{ word: 'name', frequency: 3 },
		{ word: 'pleasure', frequency: 3 },
		{ word: 'much', frequency: 3 },
		{ word: 'missing', frequency: 3 },
		{ word: 'received', frequency: 2 },
		{ word: 'information', frequency: 2 },
		{ word: 'waiting', frequency: 2 },
		{ word: 'moment', frequency: 2 },
		{ word: 'calling', frequency: 2 },
	];

	const data = {
		datasets: wordsData.map((wordData, index) => ({
			label: wordData.word,
			data: [
				{
					x: index,
					y: wordData.frequency,
					r: wordData.frequency * 1.5, // Adjust the multiplier for better visualization of bubble sizes
				},
			],
			backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 80) % 255}, ${(index * 100) % 255}, 0.5)`,
			borderColor: `rgba(${(index * 50) % 255}, ${(index * 80) % 255}, ${(index * 100) % 255}, 1)`,
			borderWidth: 1,
		})),
	};

	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: any) => {
						const { dataset, label, raw } = context;
						return `Word: ${dataset.label}, Frequency: ${raw.y}`;
					},
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Words',
				},
				ticks: {
					callback: (_value: any, index: number) => wordsData[index].word,
				},
			},
			y: {
				title: {
					display: true,
					text: 'Frequency',
				},
				beginAtZero: true,
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
							<h2 className='text-lg font-bold text-[#4F4A85] dark:text-white'>Frequent Words</h2>
						</div>
						<Bubble data={data} options={options} ref={chartRef} />
					</div>
				}
			/>
			<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-[#4F4A85] dark:text-white'>Frequent Words</h2>
					<div className='flex gap-2 items-center'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
					</div>
				</div>
				<Bubble data={data} options={options} ref={chartRef} />
			</div>
		</React.Fragment>
	);
};

export default FrequentWords;
