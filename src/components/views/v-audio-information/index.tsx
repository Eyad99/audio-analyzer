import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC } from 'react';
import Transcription from './transcription';
import Speakers from './speakers';
import Qa from './qa';

interface VAudioInformationProps {
	data?: any;
	sound?: string;
}

const VAudioInformation: FC<VAudioInformationProps> = ({ data, sound }) => {
	return (
		<div className='mx-6 p-4'>
			<Tabs defaultValue='call_phases' className='w-full'>
				<TabsList className='grid w-full grid-cols-2 mb-4'>
					<TabsTrigger value='call_phases'>Call Phases</TabsTrigger>
					<TabsTrigger value='call_transcribed'>Call Transcribed</TabsTrigger>
				</TabsList>

				<div className='p-4 bg-white shadow-[0_0_40px_rgba(8,21,66,0.05)] rounded-md'>
					<TabsContent value='call_phases'>
						<Qa criteriaAnalysis={data.criteria_analysis} sound={sound} />
					</TabsContent>

					<TabsContent value='call_transcribed' className='flex flex-col gap-4'>
						<Speakers segments={data?.data} />
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
							allData={data}
						/>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default VAudioInformation;
