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
		// data: [
		// 	{
		// 		speaker: 'Agent',
		// 		start: 2.4504230261232713,
		// 		end: 3.9387558394850672,
		// 		text: 'hi thank you for going',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_2.06_3.30.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 4.522021401478203,
		// 		end: 6.653957593591047,
		// 		text: 'my nameis joge how may i help you',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_3.79_5.58.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 6.915421466208659,
		// 		end: 18.03769235525019,
		// 		text: 'i joss money with charo the i placed an order on february flackage it was bost bishipe and two packages a yesterday i refeved one package but on frotmiffing another package',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_5.80_15.13.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 18.19859319993795,
		// 		end: 28.576697682298583,
		// 		text: 'i charles thank you for calling and inquiring about your order it will be my pleasure to help you with that would you mind providing me your order number nonot at all thinke',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_15.27_23.98.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 28.576697682298583,
		// 		end: 29.079512821947837,
		// 		text: 'me a momen',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_23.98_24.40.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 29.079512821947837,
		// 		end: 31.191336408474708,
		// 		text: 'my pleasure i will be right here',
		// 		sentiment: 0.2857,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_24.40_26.17.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 31.774601970467845,
		// 		end: 32.6193314050786,
		// 		text: 'at to think you',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_26.66_27.37.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 33.5646238676192,
		// 		end: 35.696560059732036,
		// 		text: 'i gosted my order number of e',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_28.16_29.95.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 36.118924777037414,
		// 		end: 36.82286597254637,
		// 		text: 'de at',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_30.30_30.90.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 37.26534329543772,
		// 		end: 40.90572490649832,
		// 		text: 'ink you very much charles please give me a moment while i look that up',
		// 		sentiment: 0.26,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_31.27_34.32.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 41.00628793442817,
		// 		end: 41.891242580210864,
		// 		text: 'what ci thak you',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_34.41_35.15.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 42.21304426958639,
		// 		end: 42.997435887439224,
		// 		text: 'y pleasure',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_35.42_36.08.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 44.1639670114255,
		// 		end: 53.797905087105235,
		// 		text: 'i charles thank you very much for waiting i was able to find information for that ordere number which you please confirm the name and shippin nat reason the order',
		// 		sentiment: 0.38,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_37.05_45.14.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 53.8180176926912,
		// 		end: 55.24601268929509,
		// 		text: 'by yef i can do that',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_45.15_46.35.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 55.789053040116286,
		// 		end: 60.515515352819286,
		// 		text: 'a fo the name on the order charles peyworth and the shipping addrav',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_46.81_50.77.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 61.58148344887571,
		// 		end: 64.09555914712199,
		// 		text: 'at ohigro four four of indura fruit',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_51.67_53.78.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 64.17600956946586,
		// 		end: 70.5718181458044,
		// 		text: 'thank you very much i see you  balready receive one set of s e lero seven alarms',
		// 		sentiment: 0.26,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_53.85_59.21.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 70.81316941283603,
		// 		end: 76.5050367936656,
		// 		text: 'and youare still missing the art see zear one pro remark controller is that correct',
		// 		sentiment: -0.2,
		// 		tone: 'Annoyed',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_59.41_64.19.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 76.7866132718692,
		// 		end: 84.77131768949936,
		// 		text: "ah yes atkrat am i wasn't able o any information on the second package that of wondering is it on back order o something",
		// 		sentiment: 0.1667,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_64.43_71.13.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 84.77131768949936,
		// 		end: 95.18964738303194,
		// 		text: 'thank you very much according to your ordership and information all the rest of your order eson back order it looks like it will be shiped within three business days',
		// 		sentiment: 0.13,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_71.13_79.87.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 95.57178688916537,
		// 		end: 100.35858701862628,
		// 		text: 'with that you should be able to receive the rest of the order within one week or less',
		// 		sentiment: 0.1667,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_80.19_84.20.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 100.57982568007195,
		// 		end: 101.907257648746,
		// 		text: 'ah der the',
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_84.39_85.50.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 102.04804588784778,
		// 		end: 103.73750475706927,
		// 		text: 'ah think very much for your heal',
		// 		sentiment: 0.26,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_85.62_87.04.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 104.22020729113257,
		// 		end: 108.94666960383557,
		// 		text: 'if completely my pleasure charles is there anything else i can help you we to day',
		// 		sentiment: 0.1,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_87.44_91.41.wav',
		// 	},
		// 	{
		// 		speaker: 'Customer',
		// 		start: 109.06734523735139,
		// 		end: 110.53556544512722,
		// 		text: "but i'm not at all think you",
		// 		sentiment: 0,
		// 		tone: 'Neutral',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Customer_91.51_92.74.wav',
		// 	},
		// 	{
		// 		speaker: 'Agent',
		// 		start: 111.0786057959484,
		// 		end: 116.6900227544341,
		// 		text: 'thank you very much for calling and we hope that you enjoy the rest of your day eceeci',
		// 		sentiment: 0.33,
		// 		tone: 'Friendly',
		// 		segment_audio_path: 'audio/20241005-222420_3259/Agent_93.20_97.91.wav',
		// 	},
		// ],
		data: [
			{
				speaker: 'Agent',
				start: 0.039916583228942974,
				end: 5.782104378504533,
				text: "good afternoon thank you for galling insight's commercials this is maget how can i help you",
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
				text: 'o ka let me take a look at that for you could you please confirm your full name and the amiel address used for the order',
				sentiment: 0.35,
				tone: 'Friendly',
				segment_audio_path: 'audio/20241014-093600_5573/Agent_13.23_18.59.wav',
			},
			{
				speaker: 'Customer',
				start: 23.9656990635439,
				end: 26.010265930043545,
				text: "saw it's helen williams",
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
				text: "thank you please give me a moment while i pull up your order details all right i see your order of figy eight six five it seems there was a delay in the shipping process as i just mention your order has been delayed helen there was a shipping issue which is why the order didn't arrive as expected your order is now scheduled for delivery within the next forty eight hours you'll receive an emal with tracking details once it's despatched",
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
				text: 'oq thanks',
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
				text: 'ain',
				sentiment: 0,
				tone: 'Neutral',
				segment_audio_path: 'audio/20241014-093600_5573/Customer_62.60_62.97.wav',
			},
		],
		criteria_analysis: {
			Greeting: {
				Introduction: {
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
					'Friendly / energetic voice tone - smiling voice': {
						match: false,
						score: 4,
					},
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
				'Assessment and problem solving': {
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
			},

			'Reach Agreement': {
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
		},
	};

	const initialValues = {
		file: null,
		fileBlob: '',
		lang: 'English',
		data: null,
		loading: false,
	};

	const validationSchema = yup.object().shape({
		file: yup
			.mixed()
			.required('File is required')
			.test('is-not-null', 'File should not be null', (value) => {
				return value !== null;
			}),
	});
	const handleSubmit = (data: any) => {
		setFieldValue('loading', true);

		setFieldValue('data', reaData);
		setFieldValue('fileBlob', URL.createObjectURL(data.file));

		setFieldValue('loading', false);
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
			{values.data && <VAudioInformation data={values.data} sound={values.fileBlob} setFieldValue={setFieldValue} />}

			{!values.data && (
				<form onSubmit={handleSubmitFormik} className='min-h-[83vh]'>
					<section className='flex flex-col items-center justify-center gap-4 min-h-[83vh]  w-full sm:w-1/2 m-auto'>
						<h1 className='text-4xl font-bold text-center'>Audio Analysis Results</h1>
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

						<Button variant={'blue'} disabled={values.loading || !values.file} size={'lg'}>
							{values.loading ? (
								<div className='flex gap-2'>
									<span>{'Upload'}</span>
									<LoaderIcon className='animate-spin' />
								</div>
							) : (
								<span>{'Upload'}</span>
							)}
						</Button>
					</section>
				</form>
			)}
		</div>
	);
};

export default MainPage;
