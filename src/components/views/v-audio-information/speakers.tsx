import React, { FC, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Pause, Play, User, UserCircle2 } from 'lucide-react';
import { Segment } from '@/core';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface SpeakersProps {
	segments: Segment[];
}
const Speakers: FC<SpeakersProps> = ({ segments }) => {
	const [playingSegment, setPlayingSegment] = useState<number | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const playAudio = (index: number) => {
		if (audioRef.current) {
			if (playingSegment === index) {
				audioRef.current.pause();
				setPlayingSegment(null);
			} else {
				audioRef.current.src = `http://51.112.78.95/media/${segments[index].segment_audio_path}`;
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
				{/* <ScrollArea className='h-[600px] w-full rounded-md border p-4'>
					{segments.map((segment, index) => (
						<div key={index} className='mb-6 pb-6 border-b last:border-b-0'>
							<div className='flex justify-between items-center mb-2'>
								<Badge variant={segment.speaker === 'Agent' ? 'default' : 'secondary'}>{segment.speaker}</Badge>
								<div className='flex items-center space-x-2'>
									<Badge variant='outline'>{segment.tone}</Badge>
									<Badge variant='outline'>Sentiment: {segment.sentiment}</Badge>
								</div>
							</div>
							<p className='text-sm mb-2'>{segment.text}</p>
							<div className='flex justify-between items-center text-xs text-gray-700'>
								<span>
									{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} s
								</span>
								<button className='flex items-center space-x-1 bg-primary text-primary-foreground rounded-full px-3 py-1'>
									<Play className='w-3 h-3' />
									<span>Play</span>
								</button>
							</div>
						</div>
					))}
				</ScrollArea> */}

				<ScrollArea className='flex-grow p-4'>
					{segments.map((segment, index) => (
						<div key={index} className={`flex ${segment.speaker === 'Agent' ? 'justify-end' : 'justify-start'} mb-4`}>
							<div className={`flex ${segment.speaker === 'Agent' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
								<Avatar className='w-8 h-8'>
									{segment.speaker === 'Agent' ? <UserCircle2 className='h-6 w-6' /> : <User className='h-6 w-6' />}
								</Avatar>
								<div
									className={`max-w-lg mx-2 p-3 rounded-lg ${
										segment.speaker === 'Agent' ? 'bg-gray-900  text-white' : 'bg-white border border-gray-300'
									}`}
								>
									<p className='text-sm'>{segment.text}</p>
									<div className='flex justify-between items-center mt-2'>
										<Button size='sm' variant='ghost' className='p-1' onClick={() => playAudio(index)}>
											{playingSegment === index ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
										</Button>
										<span className='text-xs text-gray-400'>
											{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} sc
										</span>
									</div>
									<div className='text-xs text-gray-400 mt-1'>
										Sentiment: {segment.sentiment.toFixed(2)} | Tone: {segment.tone}
									</div>
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
