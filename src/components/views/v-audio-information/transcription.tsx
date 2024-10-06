import React, { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TranscriptionProps {
	transcribedText: string;
	totalTimeSpoken: string;
	totalTimeSilence: string;
	duration: string;
	cleanedDuration: string;
	silenceSegments: string;
}

const Transcription: FC<TranscriptionProps> = ({
	transcribedText,
	totalTimeSpoken,
	totalTimeSilence,
	duration,
	cleanedDuration,
	silenceSegments,
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
					<Card>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Duration</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{totalTimeSpoken} s</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Total Time Silence</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{totalTimeSilence} s</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Total Time Spoken</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{duration} s</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='text-sm font-medium'>Cleaned Duration [Noise & Damaged Parts]</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{cleanedDuration} s</p>
						</CardContent>
					</Card>
				</div>
				<div className='mt-4'>
					<h3 className='font-semibold mb-2'>Silence Segments</h3>
					<Badge variant='secondary'>{silenceSegments}</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

export default Transcription;
