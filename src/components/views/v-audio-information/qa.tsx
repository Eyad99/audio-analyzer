// import React, { FC, useState } from 'react';
// import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
// import { Progress } from '@/components/ui/progress';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { AnalysisData, CriteriaGroupProps } from '@/core';

// interface QaProps {
// 	criteriaAnalysis: AnalysisData;
// }

// function CriteriaGroup({ name, data }: { name: string; data: CriteriaGroupProps }) {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const matchCount = Object.values(data).filter((item) => 'match' in item && item.match).length;
// 	const totalCount = Object.values(data).filter((item) => 'match' in item).length;
// 	const percentage = Math.round((matchCount / totalCount) * 100);
// 	console.log('matchCountmatchCount', matchCount, totalCount);

// 	return (
// 		<Card className='mb-4'>
// 			<CardHeader className='p-4'>
// 				<CardTitle className='flex justify-between items-center'>
// 					<span>{name}</span>
// 					<Button variant='ghost' size='sm' onClick={() => setIsOpen(!isOpen)}>
// 						{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
// 					</Button>
// 				</CardTitle>
// 				<Progress value={percentage} className='h-2' />
// 				<div className='text-sm text-muted-foreground mt-2'>{percentage}% Completed</div>
// 			</CardHeader>
// 			{isOpen && (
// 				<CardContent className='p-4'>
// 					{Object.entries(data).map(([key, value]) =>
// 						'match' in value ? (
// 							<div key={key} className='flex justify-between items-center py-2 border-b last:border-b-0'>
// 								<span className='text-sm'>{key}</span>
// 								{value.match ? <Check className='text-green-500' size={20} /> : <X className='text-destructive' size={20} />}
// 							</div>
// 						) : (
// 							<CriteriaGroup key={key} name={key} data={value as CriteriaGroupProps} />
// 						)
// 					)}
// 				</CardContent>
// 			)}
// 		</Card>
// 	);
// }
// const Qa: FC<QaProps> = ({ criteriaAnalysis }) => {
// 	const overallPercentage = Math.round(
// 		(Object.values(criteriaAnalysis)
// 			.flatMap((group) => Object.values(group).filter((item) => 'match' in item && item.match).length)
// 			.reduce((a, b) => a + b, 0) /
// 			Object.values(criteriaAnalysis)
// 				.flatMap((group) => Object.values(group).filter((item) => 'match' in item).length)
// 				.reduce((a, b) => a + b, 0)) *
// 			100
// 	);
// 	return (
// 		// <div className='max-w-4xl mx-auto p-6 bg-background'>
// 		<React.Fragment>
// 			<Card className='mb-6'>
// 				<CardHeader className='p-6'>
// 					<CardTitle className='text-2xl font-bold'>QA Call Card Analysis</CardTitle>
// 					<div className='mt-4'>
// 						<Progress value={overallPercentage} className='h-4' />
// 						<div className='flex justify-between items-center mt-2'>
// 							<span className='text-sm text-muted-foreground'>Overall Score</span>
// 							<span className='text-2xl font-bold'>{overallPercentage}%</span>
// 						</div>
// 					</div>
// 				</CardHeader>
// 			</Card>
// 			{Object.entries(criteriaAnalysis).map(([key, value]) => (
// 				<CriteriaGroup key={key} name={key} data={value} />
// 			))}
// 		</React.Fragment>
// 		// </div>
// 	);
// };

// export default Qa;

import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalysisData, CriteriaGroupProps } from '@/core';

interface QaProps {
	criteriaAnalysis: AnalysisData;
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

const Qa: FC<QaProps> = ({ criteriaAnalysis }) => {
	const overallMatchData = calculateMatchPercentage(criteriaAnalysis);
	const overallPercentage = Math.round((overallMatchData.matchCount / overallMatchData.totalCount) * 100);

	return (
		<React.Fragment>
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
		</React.Fragment>
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
