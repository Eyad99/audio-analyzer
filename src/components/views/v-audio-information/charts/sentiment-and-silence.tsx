import React, { FC, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Maximize } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SentimentAndSilenceProps {
	allData: any;
}

const SentimentAndSilence: FC<SentimentAndSilenceProps> = ({ allData }) => {
	const chartRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	// ----------- Sentiment -----------
	const sentimentData = allData.data.reduce((acc: any, segment: any) => {
		if (!acc[segment.speaker]) {
			acc[segment.speaker] = [];
		}
		acc[segment.speaker].push({
			x: segment.end,
			y: segment.sentiment,
		});
		return acc;
	}, {});

	const sentimentDatasets = Object.keys(sentimentData).map((speaker, index) => {
		const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'];
		return {
			label: `${speaker} - Sentiment`,
			data: sentimentData[speaker],
			borderColor: colors[index % colors.length],
			backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
			tension: 0.1,
			fill: false,
		};
	});

	// ----------- Silence -----------
	// const silenceDatasets = allData.silence_segments
	// 	.filter((segment: any) => segment.end - segment.start > 1) // Filter out segments with duration < 1
	// 	.map((segment: any, index: number) => {
	// 		return {
	// 			label: `Silence Segment ${index + 1}`,
	// 			data: [
	// 				{ x: segment.start, y: 0 },
	// 				{ x: segment.end, y: 0 },
	// 			],
	// 			borderColor: 'rgba(255, 165, 0, 0.8)',
	// 			backgroundColor: 'rgba(255, 255, 0, 0.2)',
	// 			borderDash: [15, 15],
	// 			pointRadius: 15, // No need for conditional here since all durations > 1
	// 		};
	// 	});
	// const silenceDatasets = [
	// 	{
	// 		label: `Silence Segment`,
	// 		data: [{ x: 5.8, y: 0 }],
	// 		borderColor: 'rgba(255, 165, 0, 0.8)',
	// 		backgroundColor: 'rgba(255, 255, 0, 0.2)',
	// 		borderDash: [15, 15],
	// 		pointRadius: 15,
	// 	},
	// ];

	const silenceDatasets = [
		{
			label: `Silence Segment`,
			data: [{ x: 5.8, y: 0.7 }],
			type: 'bar',
			backgroundColor: 'rgba(255, 165, 0, 0.3)',
			barThickness: 15, // Adjust the bar width
		},
	];

	// const holdDatasets = [
	// 	{
	// 		label: `Hold Segment ${1}`,
	// 		data: [{ x: 34.5, y: 0 }],
	// 		borderColor: 'rgba(0, 165, 255, 0.8)',
	// 		backgroundColor: 'rgba(0, 255, 255, 0.2)',
	// 		borderDash: [15, 15],
	// 		pointRadius: 15,
	// 	},
	// ];

	const holdDatasets = [
		{
			label: `Hold Segment`,
			data: [{ x: 34.5, y: 0.7 }],
			type: 'bar',
			backgroundColor: 'rgba(128, 128, 128, 0.3)',
			barThickness: 30, // Adjust the bar width
		},
	];

	// const interruptionDatasets = [
	// 	{
	// 		label: `Silence Segment ${1}`,
	// 		data: [{ x: 41.5, y: 0 }],
	// 		borderColor: 'rgba(165, 0, 0, 0.8)',
	// 		backgroundColor: 'rgba(255, 0, 0, 0.2)',
	// 		borderDash: [15, 15],
	// 		pointRadius: 15,
	// 	},
	// ];
	const interruptionDatasets = [
		{
			label: `Interruption Segment`,
			data: [{ x: 41.5, y: 0.7 }],
			type: 'bar',
			backgroundColor: 'rgba(255, 192, 203, 0.3)',
			barThickness: 30, // Adjust the bar width
		},
	];

	// ----------- Greeting And Closing Segments -----------
	const greetingAndClosingSegments = [];
	const startTime = allData.data.length ? allData.data[0].start : 0;
	const startendTime = allData.data.length ? allData.data[0].end : 0;
	const endstartTime = allData.data.length ? allData.data[allData.data.length - 1].start : 10;
	const endTime = allData.data.length ? allData.data[allData.data.length - 1].end : 10;
	// Check for matching criteria in Greeting and Closing and push if true
	if (allData.criteria_analysis['Greeting']) {
		const greetingCriteria = allData.criteria_analysis['Greeting'];

		// Push 'Greeting' segment only if any relevant criteria match is true
		if (
			greetingCriteria['Identify yourself & organization utilizing the standard answer'].match ||
			greetingCriteria['Ready and willing to help'].match ||
			greetingCriteria['Friendly, energetic voice tone'].match ||
			greetingCriteria['Understandable, conversational pace'].match ||
			greetingCriteria['Friendly / energetic voice tone - smiling voice'].match
		) {
			greetingAndClosingSegments.push({
				label: 'Greeting',
				data: [
					{ x: startTime, y: 0 },
					{ x: startendTime, y: 0 },
				],
				backgroundColor: '#b8e7b8',
				borderColor: '#00ff9f',
				borderDash: [10, 10],
				pointRadius: 10,
			});
		}
	}

	if (allData.criteria_analysis['Farewell']) {
		const closingCriteria = allData.criteria_analysis['Farewell'];

		// Push 'Closing' segment only if any relevant criteria match is true
		if (
			closingCriteria['Call summary']['Confirm action, expectations, results and time'].match ||
			closingCriteria['Further asstiance']['Offer further asstiance'].match ||
			closingCriteria['Staff name']['Reinforce agent name'].match ||
			closingCriteria['Tone of voice']['Friendly and energetic & Intelligible close'].match ||
			closingCriteria['Closure']['Use the standard contact closing script'].match
		) {
			greetingAndClosingSegments.push({
				label: 'Closing',
				data: [
					{ x: endstartTime - 1, y: 0 },
					{ x: endTime, y: 0 },
				],
				backgroundColor: 'rgba(0, 0, 255, 0.2)',
				borderColor: 'rgba(0, 0, 255, 0.5)',
				borderDash: [10, 10],
				pointRadius: 10,
			});
		}
	}

	const lineData = {
		labels: [],
		datasets: [...sentimentDatasets, ...silenceDatasets, ...holdDatasets, ...interruptionDatasets, ...greetingAndClosingSegments],
	};

	const options = {
		responsive: true,
		plugins: {},
		scales: {
			x: {
				type: 'linear',
				title: {
					display: true,
					text: 'Time (s)',
				},
				ticks: {
					callback: function (value: any) {
						return `${value.toFixed(2)}s`;
					},
				},
			},
			y: {
				// min: -1,
				// max: 1,
				title: {
					display: true,
					text: 'Sentiment',
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
							<h2 className='text-lg font-bold text-[#4F4A85] dark:text-white'>Sentiment and Silence Segments Over Time</h2>
						</div>
						<Line data={lineData as any} options={options as any} ref={chartRef} />
					</div>
				}
			/>
			<div className='h-fit p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-[#4F4A85] dark:text-white'>Sentiment and Silence Segments Over Time</h2>
					<div className='flex gap-2 items-center'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
					</div>
				</div>
				<Line data={lineData as any} options={options as any} ref={chartRef} />
			</div>
		</React.Fragment>
	);
};

export default SentimentAndSilence;

// import React, { FC, useRef, useState } from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Maximize } from 'lucide-react';
// import { Line } from 'react-chartjs-2';
// import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// interface SentimentAndSilenceProps {
// 	allData: any;
// }

// const SentimentAndSilence: FC<SentimentAndSilenceProps> = ({ allData }) => {
// 	const chartRef = useRef(null);
// 	const [isOpen, setIsOpen] = useState(false);

// 	const sentimentData = allData.data.reduce((acc: any, segment: any) => {
// 		if (!acc[segment.speaker]) {
// 			acc[segment.speaker] = [];
// 		}
// 		acc[segment.speaker].push({
// 			x: segment.end,
// 			y: segment.sentiment,
// 		});
// 		return acc;
// 	}, {});

// 	const sentimentDatasets = Object.keys(sentimentData).map((speaker, index) => {
// 		const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'];
// 		return {
// 			label: `${speaker} - Sentiment`,
// 			data: sentimentData[speaker],
// 			borderColor: colors[index % colors.length],
// 			backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
// 			tension: 0.1,
// 			fill: false,
// 		};
// 	});

// 	const holdDatasets = [
// 		{
// 			label: `Hold Segment ${1}`,
// 			data: [{ x: 34.5, y: 0.5 }],
// 			type: 'bar',
// 			backgroundColor: 'rgba(0, 165, 255, 0.4)',
// 			barThickness: 10, // Adjust the bar width
// 		},
// 	];

// 	const lineData = {
// 		labels: [],
// 		datasets: [...sentimentDatasets, ...holdDatasets],
// 	};

// 	const options = {
// 		responsive: true,
// 		plugins: {
// 			tooltip: {
// 				callbacks: {
// 					label: function (context: any) {
// 						if (context.dataset.label.includes('Hold Segment')) {
// 							return `Hold Duration at ${context.raw.x}s`;
// 						}
// 						return context.dataset.label;
// 					},
// 				},
// 			},
// 		},
// 		scales: {
// 			x: {
// 				type: 'linear',
// 				title: {
// 					display: true,
// 					text: 'Time (s)',
// 				},
// 				ticks: {
// 					callback: function (value: any) {
// 						return `${value.toFixed(2)}s`;
// 					},
// 				},
// 			},
// 			// y: {
// 			// 	min: -1,
// 			// 	max: 1,
// 			// 	title: {
// 			// 		display: true,
// 			// 		text: 'Sentiment',
// 			// 	},
// 			// },
// 		},
// 	};

// 	return (
// 		<React.Fragment>
// 			<EControlledDialog
// 				isOpen={isOpen}
// 				setOpen={setIsOpen}
// 				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
// 				dialogBody={
// 					<div>
// 						<div className='flex justify-between'>
// 							<h2 className='text-lg font-bold text-[#4F4A85] dark:text-white'>Sentiment and Silence Segments Over Time</h2>
// 						</div>
// 						<Line data={lineData as any} options={options as any} ref={chartRef} />
// 					</div>
// 				}
// 			/>
// 			<div className='h-fit p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
// 				<div className='flex justify-between'>
// 					<h2 className='text-lg font-bold text-[#4F4A85] dark:text-white'>Sentiment and Silence Segments Over Time</h2>
// 					<div className='flex gap-2 items-center'>
// 						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
// 					</div>
// 				</div>
// 				<Line data={lineData as any} options={options as any} ref={chartRef} />
// 			</div>
// 		</React.Fragment>
// 	);
// };

// export default SentimentAndSilence;
