import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Pause, Play, User, UserCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Segment } from '@/core';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import AudioWaveformSpeacker from '@/utils/helpers/audioWaveform-speacker';

interface SpeakersProps {
	segments: Segment[];
}

const Speakers: FC<SpeakersProps> = ({ segments }) => {
	const [playingSegment, setPlayingSegment] = useState<number | null>(null);
	const [openCollapse, setOpenCollapse] = useState(false);

	const playAudio = (index: number) => {
		setPlayingSegment(playingSegment === index ? null : index);
	};

	return (
		<Card>
			<CardHeader className=''>
				<CardTitle className='flex justify-between text-[#4F4A85] font-bold'>
					View Speakers and Segments Analysis
					<Button size='sm' onClick={() => setOpenCollapse(!openCollapse)}>
						<div className='text-white'>{openCollapse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
					</Button>
				</CardTitle>
			</CardHeader>
			<Separator orientation='horizontal' className='h-[1px] bg-gray-200 px-4 w-1/2' />
			{openCollapse && (
				<CardContent>
					<ScrollArea className='flex-grow p-4'>
						{segments.map((segment, index) => (
							<div key={index} className={`flex ${segment.speaker === 'Agent' ? 'justify-start' : 'justify-end'} mb-4`}>
								<div className={`flex ${segment.speaker === 'Agent' ? 'flex-row' : 'flex-row-reverse'} items-end`}>
									<Avatar className='w-8 h-8'>
										{segment.speaker === 'Agent' ? <UserCircle2 className='h-6 w-6' /> : <User className='h-6 w-6' />}
									</Avatar>
									<div
										className={`max-w-2xl mx-2 p-3 rounded-md ${
											segment.speaker === 'Agent'
												? 'bg-primary text-white rounded-bl-[25px]'
												: 'bg-white border border-gray-300 rounded-br-[25px]'
										}`}
									>
										<p className='text-sm'>{segment.text}</p>

										<div className='grid grid-cols-3  mt-2 items-center'>
											<div className='flex items-center col-span-2 '>
												<Button size='sm' variant='ghost' className='p-1 flex items-center' onClick={() => playAudio(index)}>
													{playingSegment === index ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
												</Button>
												<div className='ml-2 w-full'>
													<AudioWaveformSpeacker
														// audioUrl={`http://insights24.pythonanywhere.com/media/${segment.segment_audio_path}`}
														audioUrl={`https://corsproxy.io/?https://insights24.pythonanywhere.com/media/${segment.segment_audio_path}`}
														playing={playingSegment === index}
													/>
												</div>
											</div>

											<div className='flex justify-end col-span-1 '>
												<span className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'}`}>
													{segment.start.toFixed(2)} s - {segment.end.toFixed(2)} s
												</span>
											</div>
										</div>

										<div className={`text-xs ${segment.speaker === 'Agent' ? 'text-gray-200' : 'text-gray-400'} mt-1`}>
											Sentiment: {segment.sentiment.toFixed(2)} | Tone: {segment.tone}
										</div>
									</div>
								</div>
							</div>
						))}
					</ScrollArea>
				</CardContent>
			)}
		</Card>
	);
};

export default Speakers;
