// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Button } from '@/components/ui/button';
// import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

// interface Criterion {
// 	name: string;
// 	match: boolean;
// }

// interface Category {
// 	name: string;
// 	criteria: Criterion[];
// }

// const categories: Category[] = [
// 	{
// 		name: 'Greeting',
// 		criteria: [
// 			{ name: 'Immediate attention to customer', match: true },
// 			{ name: 'Identify self and the organization', match: false },
// 			{ name: 'Clear and timely greeting', match: false },
// 			{ name: 'Ready and willing to help', match: false },
// 			{ name: 'Friendly / energetic voice tone - smiling voice', match: false },
// 		],
// 	},
// 	{
// 		name: 'Telephone Etiquette',
// 		criteria: [
// 			{ name: 'Follow hold protocol', match: false },
// 			{ name: 'Follow call redirect protocol', match: false },
// 			{ name: 'Portrays positive customer service attitude', match: false },
// 			{ name: "Confirm and use customer's name", match: false },
// 			{ name: 'Use protocol of asking security question', match: false },
// 		],
// 	},
// 	{
// 		name: 'Customer Care Skills',
// 		criteria: [
// 			{ name: 'Customer does not have to repeat unnecessarily', match: false },
// 			{ name: 'Agent does not interrupt (except for talkative customer)', match: false },
// 			{ name: 'Demonstrates empathy / compassion', match: false },
// 			{ name: 'Confirms understanding (repeat and reinstate)', match: false },
// 			{ name: 'Professional tone', match: false },
// 			{ name: 'Use of appropriate language / word choice', match: false },
// 			{ name: 'Pleasant voice', match: false },
// 			{ name: 'Avoid abbreviation / jargons', match: false },
// 			{ name: 'Efficient use of time', match: true },
// 			{ name: 'Agent takes control of the call', match: false },
// 			{ name: 'Displays confidence', match: false },
// 			{ name: "Identifies and verifies the customer's need", match: false },
// 		],
// 	},
// ];

// export default function Qa() {
// 	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

// 	const toggleCategory = (categoryName: string) => {
// 		setExpandedCategories((prev) => (prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName]));
// 	};

// 	const calculateScore = (criteria: Criterion[]) => {
// 		const matchedCriteria = criteria.filter((c) => c.match).length;
// 		return Math.round((matchedCriteria / criteria.length) * 100);
// 	};

// 	const calculateOverallScore = () => {
// 		const totalCriteria = categories.reduce((acc, category) => acc + category.criteria.length, 0);
// 		const totalMatched = categories.reduce((acc, category) => acc + category.criteria.filter((c) => c.match).length, 0);
// 		return Math.round((totalMatched / totalCriteria) * 100);
// 	};

// 	const getScoreColor = (score: number) => {
// 		if (score >= 80) return 'bg-green-500';
// 		if (score >= 60) return 'bg-yellow-500';
// 		return 'bg-red-500';
// 	};

// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle className='flex justify-between items-center'>
// 					<span>QA Call Card Analysis</span>
// 					<div className='flex items-center space-x-2'>
// 						<span className='text-2xl font-bold'>{calculateOverallScore()}%</span>
// 						<Progress value={calculateOverallScore()} className='w-32' />
// 					</div>
// 				</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				{categories.map((category, index) => (
// 					<div key={index} className='mb-4 border rounded-lg overflow-hidden'>
// 						<Button
// 							variant='ghost'
// 							className='w-full flex justify-between items-center p-4 text-left'
// 							onClick={() => toggleCategory(category.name)}
// 						>
// 							<span className='text-lg font-semibold'>{category.name}</span>
// 							<div className='flex items-center space-x-2'>
// 								<span className={`px-2 py-1 rounded-full text-white text-sm ${getScoreColor(calculateScore(category.criteria))}`}>
// 									{calculateScore(category.criteria)}%
// 								</span>
// 								{expandedCategories.includes(category.name) ? <ChevronUp className='h-5 w-5' /> : <ChevronDown className='h-5 w-5' />}
// 							</div>
// 						</Button>
// 						{expandedCategories.includes(category.name) && (
// 							<div className='p-4 bg-gray-50'>
// 								{category.criteria.map((criterion, criterionIndex) => (
// 									<div key={criterionIndex} className='flex justify-between items-center py-2 border-b last:border-b-0'>
// 										<span className='text-sm'>{criterion.name}</span>
// 										{criterion.match ? <CheckCircle className='text-green-500 h-5 w-5' /> : <XCircle className='text-red-500 h-5 w-5' />}
// 									</div>
// 								))}
// 							</div>
// 						)}
// 					</div>
// 				))}
// 			</CardContent>
// 		</Card>
// 	);
// }

// import { useState } from 'react';
// import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

// type Criterion = {
// 	match: boolean;
// };

// type CriteriaGroup = {
// 	[key: string]: Criterion | CriteriaGroup;
// };

// type AnalysisData = {
// 	[key: string]: CriteriaGroup;
// };

// const analysisData: AnalysisData = {}

// function CriteriaGroup({ name, data }: { name: string; data: CriteriaGroup }) {
// 	const [isOpen, setIsOpen] = useState(name === 'Greeting');
// 	const matchCount = Object.values(data).filter((item) => 'match' in item && item.match).length;
// 	const totalCount = Object.values(data).filter((item) => 'match' in item).length;
// 	const percentage = Math.round((matchCount / totalCount) * 100);

// 	return (
// 		<div className='mb-4'>
// 			<div className='flex justify-between items-center bg-gray-100 p-2 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
// 				<h2 className='text-lg font-semibold'>{name}</h2>
// 				<div className='flex items-center'>
// 					<span className='mr-2 text-sm font-medium'>{percentage}%</span>
// 					{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
// 				</div>
// 			</div>
// 			{isOpen && (
// 				<div className='mt-2'>
// 					{Object.entries(data).map(([key, value]) =>
// 						'match' in value ? (
// 							<div key={key} className='flex justify-between items-center py-1'>
// 								<span>{key}</span>
// 								{value.match ? <Check className='text-green-500' size={20} /> : <X className='text-red-500' size={20} />}
// 							</div>
// 						) : (
// 							<CriteriaGroup key={key} name={key} data={value as CriteriaGroup} />
// 						)
// 					)}
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// export default function CallAnalysis() {
// 	const overallPercentage = Math.round(
// 		(Object.values(analysisData)
// 			.flatMap((group) => Object.values(group).filter((item) => 'match' in item && item.match).length)
// 			.reduce((a, b) => a + b, 0) /
// 			Object.values(analysisData)
// 				.flatMap((group) => Object.values(group).filter((item) => 'match' in item).length)
// 				.reduce((a, b) => a + b, 0)) *
// 			100
// 	);

// 	return (
// 		<div className='max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg'>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h1 className='text-2xl font-bold'>QA Call Card Analysis</h1>
// 				<div className='text-3xl font-bold'>{overallPercentage}%</div>
// 			</div>
// 			{Object.entries(analysisData).map(([key, value]) => (
// 				<CriteriaGroup key={key} name={key} data={value} />
// 			))}
// 		</div>
// 	);
// }

import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalysisData, CriteriaGroup1 } from '@/core';

interface QaProps {
	criteriaAnalysis: AnalysisData;
}

function CriteriaGroup({ name, data }: { name: string; data: CriteriaGroup1 }) {
	const [isOpen, setIsOpen] = useState(false);
	const matchCount = Object.values(data).filter((item) => 'match' in item && item.match).length;
	const totalCount = Object.values(data).filter((item) => 'match' in item).length;
	const percentage = Math.round((matchCount / totalCount) * 100);

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
							<CriteriaGroup key={key} name={key} data={value as CriteriaGroup1} />
						)
					)}
				</CardContent>
			)}
		</Card>
	);
}
const Qa: FC<QaProps> = ({ criteriaAnalysis }) => {
	const overallPercentage = Math.round(
		(Object.values(criteriaAnalysis)
			.flatMap((group) => Object.values(group).filter((item) => 'match' in item && item.match).length)
			.reduce((a, b) => a + b, 0) /
			Object.values(criteriaAnalysis)
				.flatMap((group) => Object.values(group).filter((item) => 'match' in item).length)
				.reduce((a, b) => a + b, 0)) *
			100
	);
	return (
		// <div className='max-w-4xl mx-auto p-6 bg-background'>
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
		// </div>
	);
};

export default Qa;
