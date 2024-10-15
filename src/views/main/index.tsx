import { useMutateData } from '@/hooks/useMutateData';
import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { mainApi } from '@/core';
import { Button } from '@/components/ui/button';
import VAudioInformation from '@/components/views/v-audio-information';
import SelectField from '@/components/reusable/fields/SelectField';
import Uploader from '@/components/reusable/uploader/inex';
import * as yup from 'yup';

const MainPage = () => {
	const reaData = {
		code: 200,
		message: 'success',
		duration: 80.4,
		total_time_silence: 0.021750711345742246,
		total_time_spoken: 80.32537699982103,
		silence_segments: [
			{
				start: 5.803855089850274,
				end: 5.825605801196017,
				type: 'silence',
				total_time_silence: 0.021750711345742246,
			},
		],
		transcribed_text:
			"good afternoon thank you for galling insight's commercials this is maget how can i help you hi my name is helen i placed on order last weekbut i haven't received it yet my order number is f g eight six five o ka let me take a look at that for you could you please confirm your full name and the amiel address used for the order saw it's helen williams and my email is helen dot williams at insights commercials dot calm thank you please give me a moment while i pull up your order details all right i see your order of figy eight six five it seems there was a delay in the shipping process as i just mention your order has been delayed helen there was a shipping issue which is why the order didn't arrive as expected your order is now scheduled for delivery within the next forty eight hours you'll receive an emal with tracking details once it's despatched thanks but it's frustrating because i needed it sooner i completely understand and i apologize for the delay while we can't speed it up at this point your patience is greatly appreciated oq thanks thank you for your call to day helen if you need any further assistance feel free to reach out have a great day ain ",

		data: [
			{
				speaker: 'Agent',
				start: 0.039916583228942974,
				end: 5.782104378504533,
				text: 'good afternoon thank you for calling insights commercials this is magid how can I help you',
				sentiment: 0.7,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Agent_0.03_4.49.wav',
			},
			{
				speaker: 'Customer',
				start: 5.825605801196017,
				end: 16.87496716483238,
				text: "hi my name is helen i placed on order last weekbut i haven't received it yet my order number is f g eight six five",
				sentiment: 0,
				tone: 'Neutral',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_4.52_13.09.wav',
			},
			{
				speaker: 'Agent',
				start: 17.048972855598308,
				end: 23.9656990635439,
				text: 'okay let me take a look at that for you could you please confirm your full name and the email address used for the order',
				sentiment: 0.35,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Agent_13.23_18.59.wav',
			},
			{
				speaker: 'Customer',
				start: 23.9656990635439,
				end: 26.010265930043545,
				text: "sure it's helen williams",
				sentiment: 0,
				tone: 'Neutral',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_18.59_20.18.wav',
			},
			{
				speaker: 'Customer',
				start: 26.032016641389287,
				end: 32.66598360184025,
				text: 'and my email is helen dot williams at insights commercials dot calm',
				sentiment: 0.3,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_20.20_25.34.wav',
			},
			{
				speaker: 'Agent',
				start: 32.752986447223215,
				end: 59.44110926844726,
				text: 'thank you please give me a moment while I pull up your order details alright i see your order figy eight six five it seems there was a delay in the shipping process as i just mentioned your order has been delayed Helen there was a shipping issue which is why the order didn’t arrive as expected your order is now scheduled for delivery within the next 48 hours you will receive an email with tracking details once it is dispatched',
				sentiment: 0.0619,
				tone: 'Neutral',
				segment_audio_path: 'audio/20241014-093600_5573/Agent_25.41_46.12.wav',
			},
			{
				speaker: 'Customer',
				start: 59.484610691138755,
				end: 64.03050936239859,
				text: "thanks but it's frustrating because i needed it sooner",
				sentiment: -0.1,
				tone: 'Neutral',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_46.15_49.68.wav',
			},
			{
				speaker: 'Agent',
				start: 64.09576149643583,
				end: 72.92655030280662,
				text: "i completely understand and i apologize for the delay while we can't speed it up at this point your patience is greatly appreciated",
				sentiment: 0.15,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Agent_49.73_56.58.wav',
			},
			{
				speaker: 'Customer',
				start: 72.92655030280662,
				end: 73.97058444740217,
				text: 'okay thanks',
				sentiment: 0.2,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_56.58_57.39.wav',
			},
			{
				speaker: 'Agent',
				start: 74.2533436948968,
				end: 80.60455140785314,
				text: 'thank you for your call to day helen if you need any further assistance feel free to reach out have a great day',
				sentiment: 0.4,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Agent_57.61_62.54.wav',
			},
			{
				speaker: 'Customer',
				start: 80.6915542532361,
				end: 81.1700699028424,
				text: 'thanks',
				sentiment: 0,
				tone: 'Neutral',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_62.60_62.97.wav',
			},
		],
		criteria_analysis: {
			Greeting: {
				'Identify yourself & organization utilizing the standard answer': {
					match: true,
					score: 4,
				},
				'Ready and willing to help': {
					match: false,
					score: 3,
				},
				'Friendly, energetic voice tone': {
					match: false,
					score: 2,
					reason:
						'The agent identified the need to use this compentency and attempted to use it but did not follow guidelines or was ineffective.',
				},
				'Understandable, conversational pace': {
					match: false,
					score: 5,
					reason: 'The agent used the comperency and the customer reacted positively to it',
				},
			},

			Understanding: {
				Listening: {
					'Fill silence': {
						match: true,
						score: 3,
					},
					'Frequent acknowledgment': {
						match: true,
						score: 3,
					},
					'Use paraphrasing to confirm understanding': {
						match: true,
						score: 3,
					},
					'Don’t interrupt': {
						match: true,
						score: 3,
					},
					'Show attention': {
						match: true,
						score: 3,
					},
					'Identify problem': {
						match: true,
						score: 3,
					},
					'Repeat numbers and confirm letters phonetically': {
						match: true,
						score: 3,
					},
				},
				'Telephone etiquette': {
					'Follow hold protocol': {
						match: false,
						score: 3,
					},
					'Follow call redirect protocol': {
						match: false,
						score: 3,
					},
					'Portrays positive CS attitude (polite, friendly, energetic)': {
						match: false,
						score: 3,
					},
					'Show Empathy': {
						match: false,
						score: 3,
					},
					'Use customer name': {
						match: false,
						score: 3,
					},
					'Avoid unexplained/confusing abbreviations/jargons': {
						match: false,
						score: 3,
					},
					'Project appropriate vocal emotion (tone)': {
						match: false,
						score: 3,
					},
					'Project appropriate vocal emotion (volume)': {
						match: false,
						score: 3,
					},
					'Project appropriate vocal emotion (pace)': {
						match: false,
						score: 3,
					},
					'Project appropriate vocal emotion (inflection)': {
						match: false,
						score: 3,
					},
					'Project appropriate vocal emotion (pronunciation / diction)': {
						match: false,
						score: 3,
					},
				},
				'Difficult Call': {
					'Demonstrate empathy (phrasing, voice characteristics, actions)': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Apologies for inconvenience': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Follow PACR': {
						match: false,
						score: 2,
						reason:
							'The agent identified the need to use this compentency and attempted to use it but did not follow guidelines or was ineffective.',
					},
					'Allows customer to vent, does not interrupt': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Maintains a positive attitude & control throughout': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Able to deliver negative decisions / results': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Avoid being argumentative': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Focus more on solutions than on problem': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
					'Follow the steps of saying ENOUGH when as appropriate': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
				},
			},

			Helping: {
				'Ask/Confirm customer name': {
					match: true,
					score: 3,
				},
				'Ask verification questions': {
					match: true,
					score: 3,
				},
				'Correct questioning technique (open. closed)': {
					match: true,
					score: 5,
					reason: 'The agent usedmeet the standard requirements.',
				},
				'Use processes questions': {
					match: true,
					score: 3,
				},
				'Offer preferred solutions': {
					match: true,
					score: 3,
				},
				'Confirm customer agreement': {
					match: true,
					score: 5,
					reason: 'The agent usedmeet the standard requirements.',
				},
			},

			'Getting Agreement': {
				'Process knowledge': {
					'Complete and accurate information was provided as per the process': {
						match: false,
						score: 1,
						reason: 'There was no reason to use this competency at this time in this call and/or the agent was ustified in not using it.',
					},
				},
				'Technical Ticket/ Complaint Handling ': {
					'Registered the technical ticket/complaint accurately and didn’t miss out any important field': {
						match: false,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
				},
				'Systems Usage': {
					'Use of appropriate resources/systems to address the query and provide': {
						match: false,
						score: 3,
					},
					'Updating correct and complete customer’s information and ticket details on': {
						match: false,
						score: 2,
						reason:
							'The agent identified the need to use this compentency and attempted to use it but did not follow guidelines or was ineffective.',
					},
					'Updating correct ticket dispositions & notes on CRM': {
						match: false,
						score: 2,
						reason:
							'The agent identified the need to use this compentency and attempted to use it but did not follow guidelines or was ineffective.',
					},
					'Updating callback request or assigning action on CRM to the right person': {
						match: false,
						score: 3,
					},
				},
			},

			Farewell: {
				'Call summary': {
					'Confirm action, expectations, results and time': {
						match: true,
						score: 5,
						reason: 'The agent used the comperency and the customer reacted positively to it',
					},
				},
				'Further asstiance': {
					'Offer further asstiance': {
						match: true,
						score: 5,
						reason: 'The agent used the comperency and the customer reacted positively to it',
					},
				},
				'Staff name': {
					'Reinforce agent name': {
						match: true,
						score: 5,
						reason: 'The agent used the comperency and the customer reacted positively to it',
					},
				},
				'Tone of voice': {
					'Friendly and energetic & Intelligible close': {
						match: true,
						score: 5,
						reason: 'The agent used the comperency and the customer reacted positively to it',
					},
				},
				Closure: {
					'Use the standard contact closing script': {
						match: true,
						score: 5,
						reason: 'The agent used the comperency and the customer reacted positively to it',
					},
				},
			},

			'Non Phased Competencies': {
				'Call Management': {
					'Reasonable hold': {
						match: true,
						score: 3,
					},
					'Agent took control of the call & Display confidence': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'First call resolution (agent)': {
						match: true,
						score: 3,
					},
					'Justified CSAT transfer': {
						match: true,
						score: 3,
					},
					'Justified internal transfer/ Call Escalation': {
						match: true,
						score: 3,
					},
					'Justified IVR transfer': {
						match: true,
						score: 3,
					},
				},
				'Fatal Errors': {
					'Customer abuse': {
						match: true,
						score: 'Y',
					},
					'Incorrect information/ advice': {
						match: true,
						score: 'Y',
					},
					'Contravening Ministry polices': {
						match: true,
						score: 'Y',
					},
					'Failure to complete actions as promised to customer': {
						match: true,
						score: 'Y',
					},
					Misrepresentation: {
						match: true,
						score: 'Y',
					},
				},
				'Customer Related': {
					'Customer praise for the call': {
						match: true,
						score: 'Y',
					},
					'Customer praise for the company': {
						match: true,
						score: 'Y',
					},
					'Customer objection to queue': {
						match: true,
						score: 'Y',
					},
					'Customer objection to agent behavior': {
						match: true,
						score: 'Y',
					},
					'Customer objection to policy': {
						match: true,
						score: 'Y',
					},
					'Customer objection to technology': {
						match: true,
						score: 'Y',
					},
					'Customer objection to other department': {
						match: true,
						score: 'Y',
					},
					Greeting: {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					Understanding: {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'Assessment and problem solving': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'Telephone etiquette': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'Difficult Call': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					Farewell: {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
				},
				'Agent Related': {
					Greeting: {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					Understanding: {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'Assessment and problem solving': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'Telephone etiquette': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					'Difficult Call': {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
					Farewell: {
						match: true,
						score: 5,
						reason: 'The agent usedmeet the standard requirements.',
					},
				},
			},
		},
	};

	const initialValues = {
		file: null,
		fileBlob: '',
		lang: 'English',
		data: null,
		loading: false,
		progress: 0,
	};

	const validationSchema = yup.object().shape({
		file: yup
			.mixed()
			.required('File is required')
			.test('is-not-null', 'File should not be null', (value) => {
				return value !== null;
			}),
	});

	const incrementProgress = (initialValue = 0, step = 10) => {
		let progress = initialValue;

		return () => {
			progress = Math.min(progress + step, 100);
			return progress;
		};
	};
	const handleSubmit = (data: any) => {
		setFieldValue('loading', true);
		setFieldValue('progress', 0);

		const updateProgress = incrementProgress(0, 10);

		const interval = setInterval(() => {
			const newProgress = updateProgress();
			setFieldValue('progress', newProgress);

			if (newProgress >= 100) {
				clearInterval(interval);
				setFieldValue('loading', false);
				setFieldValue('data', reaData);
				setFieldValue('fileBlob', URL.createObjectURL(data.file));
			}
		}, 500); // Adjust the interval duration as needed
	};

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit: handleSubmitFormik,
		setFieldValue,
	} = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema: validationSchema,
	});

	const uploadAudioMutate = useMutateData({
		mutationFn: (data: any) => mainApi.upoadAudio(data),
	});

	return (
		<div className='min-h-[83vh]'>
			{values.data && values.progress == 100 && (
				<VAudioInformation data={values.data} sound={values.fileBlob} setFieldValue={setFieldValue} />
			)}

			{!values.data && (
				<form onSubmit={handleSubmitFormik} className='min-h-[83vh]'>
					<section className='flex flex-col items-center justify-center gap-4 min-h-[83vh] w-full sm:w-1/2 m-auto'>
						<h1 className='text-4xl font-bold text-center'>Insights AI QA</h1>
						<h1 className='text-sm sm:text-lg text-center'>Upload an audio file to view the analysis results here.</h1>

						<Uploader
							onChange={(files: any) => {
								setFieldValue('file', files);
							}}
							fileTypes={{ audio: ['.wav'] }}
							errors={errors.file as any}
							error={!!touched.file && !!errors.file}
							singleFile={true}
						/>

						<div className='w-[74%]'>
							<SelectField
								name={'lang'}
								value={values.lang}
								label={'languages'}
								elements={[
									{ id: 'English', name: 'English' },
									{ id: 'Arabic', name: 'Arabic' },
								]}
								onChange={(itam: any) => setFieldValue('lang', itam)}
								errors={errors.lang as any}
								error={!!touched.lang && !!errors.lang}
								helperText={touched.lang && errors.lang}
								placeholder={'Select Language'}
							/>
						</div>

						<Button disabled={values.loading || !values.file} size={'lg'}>
							{values.loading ? (
								<div className='flex gap-2 items-center'>
									<span>Uploading...</span>
									<LoaderIcon className='animate-spin' />
									<span>{values.progress}%</span>
								</div>
							) : (
								<span>Upload</span>
							)}
						</Button>
					</section>
				</form>
			)}
		</div>
	);
};

export default MainPage;
