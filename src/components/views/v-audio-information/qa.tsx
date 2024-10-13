import { FC, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp, Pause, Play, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisData, CriteriaGroupProps } from '@/core';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import AudioWaveform from '@/utils/helpers/audioWaveform';
import TextField from '@/components/reusable/fields/TextField';

interface QaProps {
	criteriaAnalysis: AnalysisData;
	sound: string | undefined;
	setFieldValue: any;
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

const Qa: FC<QaProps> = ({ criteriaAnalysis, sound, setFieldValue }) => {
	const overallMatchData = calculateMatchPercentage(criteriaAnalysis);
	const overallPercentage = Math.round((overallMatchData.matchCount / overallMatchData.totalCount) * 100);

	const [playingSegment, setPlayingSegment] = useState<boolean>(false);
	const [hoveredLabel, setHoveredLabel] = useState<string | undefined>(undefined);

	const playAudio = (play: boolean) => {
		setPlayingSegment(play);
	};

	const handleMouseEnter = (label: string) => {
		setHoveredLabel(label);
	};

	const handleMouseLeave = () => {
		setHoveredLabel(undefined);
	};
	return (
		<section className='flex'>
			<div className='w-[10%]'>
				<div className='flex flex-col gap-4 items-center  '>
					<Button size='sm' variant='ghost' onClick={() => playAudio(!playingSegment)} className='mb-2'>
						{playingSegment ? (
							<Pause className='text-[#383351]' size={28} strokeWidth={2} />
						) : (
							<Play className='text-[#383351]' size={28} strokeWidth={2} />
						)}
					</Button>
					<div className='w-full rotate-90 '>
						<AudioWaveform audioUrl={`${sound}`} playing={playingSegment} width={700} height={100} hoveredLabel={hoveredLabel} />
					</div>
				</div>
			</div>

			<div className='w-[90%]'>
				<Card className='mb-6'>
					<CardHeader className='p-6'>
						<CardTitle className='text-2xl font-bold'>QA Call Card Analysis</CardTitle>
						<div className='mt-4'>
							<Progress value={overallPercentage} className='h-4' indicatorColor='bg-[#383351]' />
							<div className='flex justify-between items-center mt-2'>
								<span className='text-sm text-muted-foreground'>Overall Score</span>
								<span className='text-2xl font-bold'>{overallPercentage}%</span>
							</div>
						</div>
					</CardHeader>
				</Card>
				{Object.entries(criteriaAnalysis).map(([key, value]) => (
					<div key={key} onMouseEnter={() => handleMouseEnter(key)} onMouseLeave={() => handleMouseLeave()}>
						<CriteriaGroup parentName={key} name={key} data={value} setFieldValue={setFieldValue} />
					</div>
				))}
			</div>
		</section>
	);
};

function CriteriaGroup({
	parentName,
	name,
	data,
	setFieldValue,
}: {
	parentName: string;
	name: string;
	data: CriteriaGroupProps;
	setFieldValue: any;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenReason, setIsOpenReason] = useState<string | null>(null);
	const [editScore, setEditScore] = useState('');
	const matchData = calculateMatchPercentage(data);

	const percentage = Math.round((matchData.matchCount / matchData.totalCount) * 100);

	const handleSelectScoreToEditIt = (row: string) => {
		setEditScore(row);
	};
	const handeEditOnScore = (parentName: string, name: string, key: string, newScore: string) => {
		console.log('name1name1name1', parentName, name);
		setFieldValue(`data.criteria_analysis.${parentName}.${name}.${key}.score`, newScore);
	};

	return (
		<Card className='mb-4'>
			<CardHeader className='p-4'>
				<CardTitle className='flex justify-between items-center'>
					<span>{name}</span>
					<Button variant='ghost' size='sm' onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</Button>
				</CardTitle>
				<Progress value={percentage} className='h-2' indicatorColor='bg-[#383351]' />
				<div className='text-sm text-muted-foreground mt-2'>{percentage}% Completed</div>
			</CardHeader>
			{isOpen && (
				<CardContent className='p-4'>
					{Object.entries(data).map(([key, value]) =>
						'match' in value ? (
							<div key={key} className='py-2 border-b last:border-b-0'>
								<div className='flex justify-between items-center'>
									<span className='text-sm'>{key}</span>
									<div className='flex items-center'>
										{/* Reason Button */}
										{[1, 2, 5].includes(value?.score) && (
											<Button variant='ghost' size='sm' onClick={() => setIsOpenReason(isOpenReason == key ? null : key)}>
												<div className='flex items-center justify-center text-gray-600'>
													<span>Reason</span>
													{isOpenReason == null || isOpenReason !== key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
												</div>
											</Button>
										)}
										<div className='flex items-center gap-4'>
											{/* Edit Score */}
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Pencil className='text-[#383351]' size={20} onClick={() => handleSelectScoreToEditIt(key)} />
													</TooltipTrigger>
													<TooltipContent>
														<span>Edit on score</span>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>

											{/*  Score */}
											{editScore === key ? (
												<TextField
													name={'reason'}
													onBlur={() => handleSelectScoreToEditIt('')}
													onChange={(event) => handeEditOnScore(parentName, name, key, event.target.value)}
													type={'number'}
													min={1}
													max={5}
													onKeyDown={(event) => event.key === 'Enter' && handleSelectScoreToEditIt('')}
												/>
											) : (
												<span
													className={
														[1, 2].includes(+value?.score)
															? 'text-red-500'
															: [3, 4]?.includes(+value?.score)
															? 'text-blue-500'
															: 'text-green-500'
													}
												>
													{value?.score}
												</span>
											)}
										</div>
									</div>
								</div>

								{/* Reason Accordion */}
								{[1, 2, 5].includes(value?.score) && (isOpenReason == null || isOpenReason !== key) && (
									<span className='text-gray-600'>{value?.reason}</span>
								)}
							</div>
						) : (
							<CriteriaGroup
								key={key}
								parentName={parentName}
								name={key}
								data={value as CriteriaGroupProps}
								setFieldValue={setFieldValue}
							/>
						)
					)}
				</CardContent>
			)}
		</Card>
	);
}

export default Qa;
