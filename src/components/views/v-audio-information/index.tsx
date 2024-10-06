import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Transcription from './transcription';
import Speakers from './speakers';
import Qa from './qa';
import { FC } from 'react';

interface VAudioInformationProps {
	data?: any;
}

const VAudioInformation: FC<VAudioInformationProps> = ({ data }) => {
	return (
		<div className='container mx-auto p-4 bg-white min-h-screen shadow-[0_0_40px_rgba(8,21,66,0.05)] rounded-sm'>
			<h1 className='text-3xl font-bold mb-6 text-center text-primary'>Audio Analysis Dashboard</h1>

			<Tabs defaultValue='transcription' className='w-full'>
				<TabsList className='grid w-full grid-cols-3 mb-4'>
					<TabsTrigger value='transcription'>Transcription</TabsTrigger>
					<TabsTrigger value='speakers'>Speakers and Segments</TabsTrigger>
					<TabsTrigger value='qa'>QA Call Card Analysis</TabsTrigger>
				</TabsList>

				<TabsContent value='transcription'>
					<Transcription
						transcribedText={data?.transcribed_text}
						totalTimeSpoken={data?.total_time_spoken.toFixed(2)}
						totalTimeSilence={data?.total_time_silence.toFixed(2)}
						duration={data?.duration.toFixed(2)}
						cleanedDuration={(
							parseFloat(data?.duration.toFixed(2)) -
							(parseFloat(data?.total_time_spoken.toFixed(2)) + parseFloat(data?.total_time_silence.toFixed(2)))
						).toFixed(2)}
						silenceSegments={data?.silence_segments.map((seg: any) => `${seg.start.toFixed(2)}s - ${seg.end.toFixed(2)}s`).join(', ')}
					/>
				</TabsContent>

				<TabsContent value='speakers'>
					<Speakers segments={data?.data} />
				</TabsContent>
				<TabsContent value='qa'>
					<Qa />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default VAudioInformation;
