import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

interface Criterion {
	name: string;
	match: boolean;
}

interface Category {
	name: string;
	criteria: Criterion[];
}

const categories: Category[] = [
	{
		name: 'Greeting',
		criteria: [
			{ name: 'Immediate attention to customer', match: true },
			{ name: 'Identify self and the organization', match: false },
			{ name: 'Clear and timely greeting', match: false },
			{ name: 'Ready and willing to help', match: false },
			{ name: 'Friendly / energetic voice tone - smiling voice', match: false },
		],
	},
	{
		name: 'Telephone Etiquette',
		criteria: [
			{ name: 'Follow hold protocol', match: false },
			{ name: 'Follow call redirect protocol', match: false },
			{ name: 'Portrays positive customer service attitude', match: false },
			{ name: "Confirm and use customer's name", match: false },
			{ name: 'Use protocol of asking security question', match: false },
		],
	},
	{
		name: 'Customer Care Skills',
		criteria: [
			{ name: 'Customer does not have to repeat unnecessarily', match: false },
			{ name: 'Agent does not interrupt (except for talkative customer)', match: false },
			{ name: 'Demonstrates empathy / compassion', match: false },
			{ name: 'Confirms understanding (repeat and reinstate)', match: false },
			{ name: 'Professional tone', match: false },
			{ name: 'Use of appropriate language / word choice', match: false },
			{ name: 'Pleasant voice', match: false },
			{ name: 'Avoid abbreviation / jargons', match: false },
			{ name: 'Efficient use of time', match: true },
			{ name: 'Agent takes control of the call', match: false },
			{ name: 'Displays confidence', match: false },
			{ name: "Identifies and verifies the customer's need", match: false },
		],
	},
];

export default function Qa() {
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

	const toggleCategory = (categoryName: string) => {
		setExpandedCategories((prev) => (prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName]));
	};

	const calculateScore = (criteria: Criterion[]) => {
		const matchedCriteria = criteria.filter((c) => c.match).length;
		return Math.round((matchedCriteria / criteria.length) * 100);
	};

	const calculateOverallScore = () => {
		const totalCriteria = categories.reduce((acc, category) => acc + category.criteria.length, 0);
		const totalMatched = categories.reduce((acc, category) => acc + category.criteria.filter((c) => c.match).length, 0);
		return Math.round((totalMatched / totalCriteria) * 100);
	};

	const getScoreColor = (score: number) => {
		if (score >= 80) return 'bg-green-500';
		if (score >= 60) return 'bg-yellow-500';
		return 'bg-red-500';
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					<span>QA Call Card Analysis</span>
					<div className='flex items-center space-x-2'>
						<span className='text-2xl font-bold'>{calculateOverallScore()}%</span>
						<Progress value={calculateOverallScore()} className='w-32' />
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{categories.map((category, index) => (
					<div key={index} className='mb-4 border rounded-lg overflow-hidden'>
						<Button
							variant='ghost'
							className='w-full flex justify-between items-center p-4 text-left'
							onClick={() => toggleCategory(category.name)}
						>
							<span className='text-lg font-semibold'>{category.name}</span>
							<div className='flex items-center space-x-2'>
								<span className={`px-2 py-1 rounded-full text-white text-sm ${getScoreColor(calculateScore(category.criteria))}`}>
									{calculateScore(category.criteria)}%
								</span>
								{expandedCategories.includes(category.name) ? <ChevronUp className='h-5 w-5' /> : <ChevronDown className='h-5 w-5' />}
							</div>
						</Button>
						{expandedCategories.includes(category.name) && (
							<div className='p-4 bg-gray-50'>
								{category.criteria.map((criterion, criterionIndex) => (
									<div key={criterionIndex} className='flex justify-between items-center py-2 border-b last:border-b-0'>
										<span className='text-sm'>{criterion.name}</span>
										{criterion.match ? <CheckCircle className='text-green-500 h-5 w-5' /> : <XCircle className='text-red-500 h-5 w-5' />}
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}
