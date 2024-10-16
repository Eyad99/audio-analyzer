import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC } from 'react';
import Transcription from './transcription';
import Speakers from './speakers';
import Qa from './qa';

interface VAudioInformationProps {
	data?: any;
	sound?: string;
	setFieldValue?: any;
}

const VAudioInformation: FC<VAudioInformationProps> = ({ data, sound, setFieldValue }) => {
	return (
		<div className='mx-6 p-4'>
			<Tabs defaultValue='call_phases' className='w-full'>
				<div className='p-4 bg-white shadow-[0_0_40px_rgba(8,21,66,0.05)] rounded-md'>
					{/* bg-transparent */}
					<TabsList className='mb-4 w-1/3 flex m-auto'>
						<TabsTrigger
							value='call_phases'
							className='w-full data-[state=active]:border-primary data-[state=active]:bg-[#383351] data-[state=active]:text-white'
						>
							Call Phases
						</TabsTrigger>
						<TabsTrigger
							value='call_transcribed'
							className='w-full data-[state=active]:border-primary data-[state=active]:bg-[#383351] data-[state=active]:text-white'
						>
							Call Transcribed
						</TabsTrigger>
					</TabsList>

					<TabsContent value='call_phases'>
						<Qa criteriaAnalysis={data.criteria_analysis} sound={sound} setFieldValue={setFieldValue} />
					</TabsContent>
					<TabsContent value='call_transcribed' className='flex flex-col gap-4'>
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
						<Speakers segments={data?.data} />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default VAudioInformation;
