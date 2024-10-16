import React, { FC, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SentimentAndSilence from './charts/sentiment-and-silence';
import FrequentWords from './charts/frequent-words';
import StagesOfACall from './charts/stages-call';
import { Separator } from '@/components/ui/separator';
import DurationImage from '@/assets/img/others/duration.png';
import NoiseImage from '@/assets/img/others/countdown.png';
import SilenceImage from '@/assets/img/others/silence.png';
import SpockImage from '@/assets/img/others/microphone.png';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranscriptionProps {
	transcribedText: string;
	totalTimeSpoken: string;
	totalTimeSilence: string;
	duration: string;
	cleanedDuration: string;
	silenceSegments: string;
	allData: any;
}

const Transcription: FC<TranscriptionProps> = ({
	// transcribedText,
	totalTimeSpoken,
	totalTimeSilence,
	duration,
	// cleanedDuration,
	silenceSegments,
	allData,
}) => {
	const cardClassName = 'transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)]';
	const [openCollapse, setOpenCollapse] = useState(true);
	return (
		<Card>
			<CardHeader className=''>
				<CardTitle className='flex justify-between text-[#4F4A85] font-bold'>
					Transcription Result
					<Button size='sm' onClick={() => setOpenCollapse(!openCollapse)}>
						<div className='text-white'>{openCollapse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
					</Button>
				</CardTitle>
			</CardHeader>
			<Separator orientation='horizontal' className='h-[1px] bg-gray-200 px-4 w-1/2' />
			{openCollapse && (
				<CardContent className='mt-4'>
					{/* <ScrollArea className='h-[200px] w-full rounded-md border p-4 mb-4'>
					<p className='text-md'>{transcribedText}</p>
				</ScrollArea> */}

					<div className='grid grid-cols-1 mb-4'>
						<SentimentAndSilence allData={allData} />
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<Card className={cardClassName}>
							<div className='grid grid-cols-2'>
								<div className='col-span-2 md:col-span-1'>
									<CardHeader>
										<CardTitle className='text-sm text-[#4F4A85] font-bold'>Duration</CardTitle>
									</CardHeader>
									<CardContent className='flex justify-between'>
										<p className='text-2xl font-semibold'>{totalTimeSpoken} s</p>
									</CardContent>
								</div>
								<div className='col-span-1 md:flex items-center justify-end px-6 hidden'>
									<img src={DurationImage} alt='Duration' width={40} />
								</div>
							</div>
						</Card>
						<Card className={cardClassName}>
							<div className='grid grid-cols-2'>
								<div className='col-span-2 md:col-span-1'>
									<CardHeader>
										<CardTitle className='text-sm text-[#4F4A85] font-bold'>Total Time Of Silence</CardTitle>
									</CardHeader>
									<CardContent>
										<p className='text-2xl font-semibold'>{totalTimeSilence} s</p>
									</CardContent>
								</div>
								<div className='col-span-1 md:flex items-center justify-end px-6 hidden'>
									<img src={SilenceImage} alt='Silence' width={40} />
								</div>
							</div>
						</Card>
						<Card className={cardClassName}>
							<div className='grid grid-cols-2'>
								<div className='col-span-2 md:col-span-1'>
									<CardHeader>
										<CardTitle className='text-sm text-[#4F4A85] font-bold'>Total Talk Time</CardTitle>
									</CardHeader>
									<CardContent>
										<p className='text-2xl font-semibold'>{duration} s</p>
									</CardContent>
								</div>
								<div className='col-span-1 md:flex items-center justify-end px-6 hidden'>
									<img src={SpockImage} alt='Spock' width={40} />
								</div>
							</div>
						</Card>
						{/* <Card className={cardClassName}>
							<div className='grid grid-cols-2'>
								<div className='col-span-2 md:col-span-1'>
									<CardHeader>
										<CardTitle className='text-sm text-[#4F4A85] font-bold'>Cleaned Duration [Noise & Damaged Parts]</CardTitle>
									</CardHeader>
									<CardContent>
										<p className='text-2xl font-semibold'>{cleanedDuration} s</p>
									</CardContent>
								</div>
								<div className='col-span-1 md:flex items-center justify-end px-6 hidden'>
									<img src={NoiseImage} alt='Noise' width={40} />
								</div>
							</div>
						</Card> */}
						<Card className={cardClassName}>
							<div className='grid grid-cols-2'>
								<div className='col-span-2 md:col-span-1'>
									<CardHeader>
										<CardTitle className='text-sm text-[#4F4A85] font-bold'>Number Of Hold And Silence</CardTitle>
									</CardHeader>
									<CardContent className='flex gap-3'>
										<p className='text-2xl font-semibold'>Hold 1</p>
										<p>__</p>
										<p className='text-2xl font-semibold'>Silence 1</p>
									</CardContent>
								</div>
								<div className='col-span-1 md:flex items-center justify-end px-6 hidden'>
									<img src={NoiseImage} alt='Noise' width={40} />
								</div>
							</div>
						</Card>
					</div>
					<div className='my-4'>
						<h3 className=' mb-2 text-[#4F4A85] font-bold'>Silence Segments</h3>
						<Badge variant='secondary' className='font-semibold'>
							{silenceSegments}
						</Badge>
					</div>
					<div className=' flex justify-center items-center'>
						<StagesOfACall />
					</div>
				</CardContent>
			)}
		</Card>
	);
};

export default Transcription;
