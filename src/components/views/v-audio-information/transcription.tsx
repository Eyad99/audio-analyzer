import React, { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SentimentAndSilence from './charts/sentiment-and-silence';
import FrequentWords from './charts/frequent-words';
import StagesOfACall from './charts/stages-call';

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
	transcribedText,
	totalTimeSpoken,
	totalTimeSilence,
	duration,
	cleanedDuration,
	silenceSegments,
	allData,
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Transcription Result</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className='h-[200px] w-full rounded-md border p-4 mb-4'>
					<p className='text-sm'>{transcribedText}</p>
				</ScrollArea>
				<div className='grid grid-cols-2 gap-4'>
					<Card className='transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)]'>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Duration</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{totalTimeSpoken} s</p>
						</CardContent>
					</Card>
					<Card className='transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)]'>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Total Time Silence</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{totalTimeSilence} s</p>
						</CardContent>
					</Card>
					<Card className='transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)]'>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Total Time Spoken</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{duration} s</p>
						</CardContent>
					</Card>
					<Card className='transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)]'>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Cleaned Duration [Noise & Damaged Parts]</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{cleanedDuration} s</p>
						</CardContent>
					</Card>
				</div>
				<div className='my-4'>
					<h3 className='font-semibold mb-2'>Silence Segments</h3>
					<Badge variant='secondary'>{silenceSegments}</Badge>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<SentimentAndSilence allData={allData} />
					<FrequentWords />
					<StagesOfACall />
				</div>
			</CardContent>
		</Card>
	);
};

export default Transcription;
