import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, Pause, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalysisData, CriteriaGroupProps } from '@/core';
import AudioWaveform from '@/utils/helpers/audioWaveform';

interface QaProps {
	criteriaAnalysis: AnalysisData;
	sound: string | undefined;
}

// Recursive function to calculate matches and totals for nested structures
function calculateMatchPercentage(data: CriteriaGroupProps): { matchCount: number; totalCount: number } {
	let matchCount = 0;
	let totalCount = 0;

	Object.values(data).forEach((item) => {
		if ('match' in item) {
			// If it's a matchable criterion, count it
			totalCount++;
			if (item.match) {
				matchCount++;
			}
		} else {
			// If it's a nested structure, recursively calculate matches
			const nestedResult = calculateMatchPercentage(item as CriteriaGroupProps);
			matchCount += nestedResult.matchCount;
			totalCount += nestedResult.totalCount;
		}
	});

	return { matchCount, totalCount };
}

const Qa: FC<QaProps> = ({ criteriaAnalysis, sound }) => {
	const overallMatchData = calculateMatchPercentage(criteriaAnalysis);
	const overallPercentage = Math.round((overallMatchData.matchCount / overallMatchData.totalCount) * 100);

	const [playingSegment, setPlayingSegment] = useState<boolean>(false);

	const playAudio = (play: boolean) => {
		setPlayingSegment(play);
	};
	return (
		<section className='flex'>
			<div className='w-[5%]'>
				<div className='flex flex-col gap-4 items-center  '>
					<Button size='sm' variant='ghost' onClick={() => playAudio(!playingSegment)}>
						{playingSegment ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
					</Button>
					<div className='w-full rotate-90 '>
						<AudioWaveform audioUrl={`${sound}`} playing={playingSegment} width={700} />
					</div>
				</div>
			</div>
			<div className='w-[95%]'>
				<Card className='mb-6'>
					<CardHeader className='p-6'>
						<CardTitle className='text-2xl font-bold'>QA Call Card Analysis</CardTitle>
						<div className='mt-4'>
							<Progress value={overallPercentage} className='h-4' />
							<div className='flex justify-between items-center mt-2'>
								<span className='text-sm text-muted-foreground'>Overall Score</span>
								<span className='text-2xl font-bold'>{overallPercentage}%</span>
							</div>
						</div>
					</CardHeader>
				</Card>
				{Object.entries(criteriaAnalysis).map(([key, value]) => (
					<CriteriaGroup key={key} name={key} data={value} />
				))}
			</div>
		</section>
	);
};

function CriteriaGroup({ name, data }: { name: string; data: CriteriaGroupProps }) {
	const [isOpen, setIsOpen] = useState(false);
	const matchData = calculateMatchPercentage(data);
	const percentage = Math.round((matchData.matchCount / matchData.totalCount) * 100);

	return (
		<Card className='mb-4'>
			<CardHeader className='p-4'>
				<CardTitle className='flex justify-between items-center'>
					<span>{name}</span>
					<Button variant='ghost' size='sm' onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</Button>
				</CardTitle>
				<Progress value={percentage} className='h-2' />
				<div className='text-sm text-muted-foreground mt-2'>{percentage}% Completed</div>
			</CardHeader>
			{isOpen && (
				<CardContent className='p-4'>
					{Object.entries(data).map(([key, value]) =>
						'match' in value ? (
							<div key={key} className='flex justify-between items-center py-2 border-b last:border-b-0'>
								<span className='text-sm'>{key}</span>
								{value.match ? <Check className='text-green-500' size={20} /> : <X className='text-destructive' size={20} />}
							</div>
						) : (
							<CriteriaGroup key={key} name={key} data={value as CriteriaGroupProps} />
						)
					)}
				</CardContent>
			)}
		</Card>
	);
}

export default Qa;
