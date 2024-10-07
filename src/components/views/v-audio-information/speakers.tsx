// import React, { FC, useRef, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Badge } from '@/components/ui/badge';
// import { ChartNoAxesColumnDecreasing, Pause, Play, User, UserCircle2 } from 'lucide-react';
// import { Segment } from '@/core';
// import { Button } from '@/components/ui/button';
// import { Avatar } from '@/components/ui/avatar';

// interface SpeakersProps {
// 	segments: Segment[];
// }
// const Speakers: FC<SpeakersProps> = ({ segments }) => {
// 	const [playingSegment, setPlayingSegment] = useState<number | null>(null);
// 	const audioRef = useRef<HTMLAudioElement | null>(null);

// 	const playAudio = (index: number) => {
// 		console.log('indexindexindex', index, playingSegment);
// 		if (audioRef.current) {
// 			console.log('audioRef.current', audioRef.current);
// 			if (playingSegment === index) {
// 				audioRef.current.pause();
// 				setPlayingSegment(null);
// 			} else {
// 				audioRef.current.src = `http://51.112.78.95/media/${segments[index].segment_audio_path}`;
// 				audioRef.current.play();
// 				setPlayingSegment(index);
// 			}
// 		}
// 	};
// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>Speakers and Segments Analysis</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				{/* <ScrollArea className='h-[600px] w-full rounded-md border p-4'>
// 					{segments.map((segment, index) => (
// 						<div key={index} className='mb-6 pb-6 border-b last:border-b-0'>
// 							<div className='flex justify-between items-center mb-2'>
// 								<Badge variant={segment.speaker === 'Agent' ? 'default' : 'secondary'}>{segment.speaker}</Badge>
// 								<div className='flex items-center space-x-2'>
// 									<Badge variant='outline'>{segment.tone}</Badge>
// 									<Badge variant='outline'>Sentiment: {segment.sentiment}</Badge>
// 								</div>
// 							</div>
// 							<p className='text-sm mb-2'>{segment.text}</p>
// 							<div className='flex justify-between items-center text-xs text-gray-700'>
// 								<span>
// 									{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} s
// 								</span>
// 								<button className='flex items-center space-x-1 bg-primary text-primary-foreground rounded-full px-3 py-1'>
// 									<Play className='w-3 h-3' />
// 									<span>Play</span>
// 								</button>
// 							</div>
// 						</div>
// 					))}
// 				</ScrollArea> */}

// 				<ScrollArea className='flex-grow p-4'>
// 					{segments.map((segment, index) => {
// 						console.log('playingSegment === index', playingSegment, index);
// 						return (
// 							<div key={index} className={`flex ${segment.speaker === 'Agent' ? 'justify-start' : 'justify-end'} mb-4`}>
// 								<div className={`flex ${segment.speaker === 'Agent' ? 'flex-row' : ' flex-row-reverse'} items-end`}>
// 									<Avatar className='w-8 h-8'>
// 										{segment.speaker === 'Agent' ? <UserCircle2 className='h-6 w-6' /> : <User className='h-6 w-6' />}
// 									</Avatar>
// 									<div
// 										className={`max-w-lg mx-2 p-3 rounded-lg ${
// 											segment.speaker === 'Agent' ? 'bg-primary text-white' : 'bg-white border border-gray-300'
// 										}`}
// 									>
// 										<p className='text-sm'>{segment.text}</p>
// 										<div className='flex justify-between items-center mt-2'>
// 											<Button size='sm' variant='ghost' className='p-1' onClick={() => playAudio(index)}>
// 												{playingSegment === index ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
// 											</Button>
// 											<span className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'}`}>
// 												{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} sc
// 											</span>
// 										</div>
// 										<div className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'} mt-1`}>
// 											Sentiment: {segment.sentiment.toFixed(2)} | Tone: {segment.tone}
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						);
// 					})}
// 				</ScrollArea>
// 			</CardContent>
// 		</Card>
// 	);
// };

// export default Speakers;

// import React, { FC, useRef, useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Button } from '@/components/ui/button';
// import { Avatar } from '@/components/ui/avatar';
// import { Pause, Play, User, UserCircle2 } from 'lucide-react';
// import { Segment } from '@/core';

// interface SpeakersProps {
// 	segments: Segment[];
// }

// const Speakers: FC<SpeakersProps> = ({ segments }) => {
// 	const [playingSegment, setPlayingSegment] = useState<number | null>(null);
// 	const [audioProgress, setAudioProgress] = useState<number>(0);
// 	const audioRef = useRef<HTMLAudioElement | null>(null);

// 	useEffect(() => {
// 		if (!audioRef.current) {
// 			audioRef.current = new Audio();
// 		}

// 		const handleTimeUpdate = () => {
// 			if (audioRef.current) {
// 				setAudioProgress(audioRef.current.currentTime);
// 			}
// 		};

// 		const handleEnded = () => {
// 			setPlayingSegment(null);
// 			setAudioProgress(0);
// 		};

// 		audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
// 		audioRef.current.addEventListener('ended', handleEnded);

// 		return () => {
// 			if (audioRef.current) {
// 				audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
// 				audioRef.current.removeEventListener('ended', handleEnded);
// 			}
// 		};
// 	}, []);

// 	const playAudio = (index: number) => {
// 		if (audioRef.current) {
// 			if (playingSegment === index) {
// 				audioRef.current.pause();
// 				setPlayingSegment(null);
// 			} else {
// 				audioRef.current.src = `http://insights24.pythonanywhere.com/media/${segments[index].segment_audio_path}`;
// 				audioRef.current.play();
// 				setPlayingSegment(index);
// 			}
// 		}
// 	};

// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>Speakers and Segments Analysis</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				<ScrollArea className='flex-grow p-4'>
// 					{segments.map((segment, index) => (
// 						<div key={index} className={`flex ${segment.speaker === 'Agent' ? 'justify-start' : 'justify-end'} mb-4`}>
// 							<div className={`flex ${segment.speaker === 'Agent' ? 'flex-row' : 'flex-row-reverse'} items-end`}>
// 								<Avatar className='w-8 h-8'>
// 									{segment.speaker === 'Agent' ? <UserCircle2 className='h-6 w-6' /> : <User className='h-6 w-6' />}
// 								</Avatar>
// 								<div
// 									className={`max-w-lg mx-2 p-3 rounded-lg ${
// 										segment.speaker === 'Agent' ? 'bg-primary text-white' : 'bg-white border border-gray-300'
// 									}`}
// 								>
// 									<p className='text-sm'>{segment.text}</p>
// 									<div className='flex justify-between items-center mt-2'>
// 										<Button size='sm' variant='ghost' className='p-1' onClick={() => playAudio(index)}>
// 											{playingSegment === index ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
// 										</Button>
// 										{/* <audio
// 											controls
// 											// ref={(el) => (audioRef.current[index + 1] = el)} // Assign ref dynamically
// 										>
// 											<source src={`http://insights24.pythonanywhere.com/media/${segment.segment_audio_path}`} type='audio/mpeg' />
// 										</audio> */}
// 										<span className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'}`}>
// 											{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} s
// 										</span>
// 									</div>
// 									<div className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'} mt-1`}>
// 										Sentiment: {segment.sentiment.toFixed(2)} | Tone: {segment.tone}
// 									</div>
// 									{playingSegment === index && (
// 										<div className='text-xs mt-2'>
// 											Progress: {audioProgress.toFixed(1)}s / {segment.end.toFixed(1)}s
// 										</div>
// 									)}
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</ScrollArea>
// 			</CardContent>
// 		</Card>
// 	);
// };

// export default Speakers;

import React, { FC, useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Pause, Play, User, UserCircle2 } from 'lucide-react';
import { Segment } from '@/core';
import AudioWaveform from '@/utils/helpers/audioWaveform';

interface SpeakersProps {
	segments: Segment[];
}

const Speakers: FC<SpeakersProps> = ({ segments }) => {
	const [playingSegment, setPlayingSegment] = useState<number | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio();
		}
	}, []);

	const playAudio = (index: number) => {
		if (audioRef.current) {
			if (playingSegment === index) {
				audioRef.current.pause();
				setPlayingSegment(null);
			} else {
				audioRef.current.src = `https://insights24.pythonanywhere.com/media/${segments[index].segment_audio_path}`;
				audioRef.current.play();
				setPlayingSegment(index);
			}
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Speakers and Segments Analysis</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className='flex-grow p-4'>
					{segments.map((segment, index) => (
						<div key={index} className={`flex ${segment.speaker === 'Agent' ? 'justify-start' : 'justify-end'} mb-4`}>
							<div className={`flex ${segment.speaker === 'Agent' ? 'flex-row' : 'flex-row-reverse'} items-end`}>
								<Avatar className='w-8 h-8'>
									{segment.speaker === 'Agent' ? <UserCircle2 className='h-6 w-6' /> : <User className='h-6 w-6' />}
								</Avatar>
								<div
									className={`max-w-lg mx-2 p-3 rounded-lg ${
										segment.speaker === 'Agent' ? 'bg-primary text-white' : 'bg-white border border-gray-300'
									}`}
								>
									<p className='text-sm'>{segment.text}</p>
									<div className='flex justify-between items-center mt-2'>
										<Button size='sm' variant='ghost' className='p-1' onClick={() => playAudio(index)}>
											{playingSegment === index ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
										</Button>
										<span className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'}`}>
											{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} s
										</span>
									</div>
									<div className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'} mt-1`}>
										Sentiment: {segment.sentiment.toFixed(2)} | Tone: {segment.tone}
									</div>
									{/* Add the audio waveform here */}
									{playingSegment === index && (
										<AudioWaveform
											audioUrl={`https://insights24.pythonanywhere.com/media/${segment.segment_audio_path}`}
											playing={playingSegment === index}
										/>
									)}
								</div>
							</div>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default Speakers;
