// import React, { useEffect, useRef } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
// import EnvelopePlugin from 'wavesurfer.js/dist/plugins/envelope.esm.js';
// import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
// import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';

// interface AudioWaveformProps {
// 	audioUrl: string;
// 	playing: boolean;
// 	onReady?: (addRegion: (region: { start: number; end: number; content: string; color: string }) => void) => void;

// 	width?: number | string;
// 	height?: number;
// }

// const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, playing, onReady, width = undefined, height = 50 }) => {
// 	const waveformRef = useRef<HTMLDivElement | null>(null);
// 	const wavesurferRef = useRef<WaveSurfer | null>(null);
// 	const wsRegions = RegionsPlugin.create();

// 	const random = (min: number, max: number) => Math.random() * (max - min) + min;

// 	const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

// 	useEffect(() => {
// 		if (!waveformRef.current) return;

// 		wavesurferRef.current = WaveSurfer.create({
// 			container: waveformRef.current,
// 			waveColor: '#4F4A85',
// 			progressColor: 'red',
// 			height: height,
// 			width: width,
// 			barWidth: 2,
// 			// interact: true,
// 			// barAlign: 'top',
// 			// barHeight: 40,
// 			// vertical: true,

// 			plugins: [
// 				Hover.create({
// 					lineColor: '#ff0000',
// 					lineWidth: 2,
// 					labelBackground: '#555',
// 					labelColor: '#fff',
// 					labelSize: '11px',
// 				}),
// 				wsRegions,
// 			],
// 		});

// 		wavesurferRef.current.load(audioUrl);

// 		wavesurferRef.current.on('ready', () => {
// 			if (onReady) {
// 				onReady((region) => {
// 					console.log('region', region);
// 					wsRegions.addRegion(region);
// 				});
// 			} // Create some regions at specific time ranges
// 			// wsRegions.addRegion({
// 			// 	start: 0,
// 			// 	end: 7,
// 			// 	content: 'Blue',
// 			// 	id: 'region-green',
// 			// });

// 			// wsRegions.addRegion({
// 			// 	start: 1,
// 			// 	content: 'Start',
// 			// 	color: randomColor(),
// 			// });
// 		});

// 		return () => {
// 			wavesurferRef.current?.destroy();
// 		};
// 	}, [audioUrl]);

// 	useEffect(() => {
// 		if (wavesurferRef.current) {
// 			if (playing) {
// 				wavesurferRef.current.play();
// 			} else {
// 				wavesurferRef.current.pause();
// 			}
// 		}
// 	}, [playing]);

// 	// return <div ref={waveformRef} id='waveform' />;
// 	return <div ref={waveformRef} />;
// };

// export default AudioWaveform;

// // http://insights24.pythonanywhere.com/media/audio/20241008-164416_1877/Agent_2.06_3.30.wav

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

interface AudioWaveformProps {
	audioUrl: string;
	playing: boolean;
	onReady?: (addRegion: (region: { start: number; end: number; content: string; color: string }) => void) => void;
	width?: number | string;
	height?: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, playing, onReady, width = undefined, height = 50 }) => {
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);
	const wsRegions = RegionsPlugin.create();

	const random = (min: number, max: number) => Math.random() * (max - min) + min;
	const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

	useEffect(() => {
		if (!waveformRef.current || !audioUrl) return; // Ensure audioUrl is valid

		wavesurferRef.current = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: '#4F4A85',
			progressColor: 'red',
			height: height,
			width: width,
			barWidth: 2,
			// barHeight: 0,
			plugins: [
				Hover.create({
					lineColor: '#ff0000',
					lineWidth: 2,
					labelBackground: '#555',
					labelColor: '#fff',
					labelSize: '11px',
				}),
				wsRegions,
			],
		});

		console.log('Loading audio from:', audioUrl);
		wavesurferRef.current.load(audioUrl);

		wavesurferRef.current.on('ready', () => {
			console.log('Wavesurfer is ready');
			// if (onReady) {
			// 	onReady((region) => {
			// 		console.log('Adding region:', region);
			// 		wsRegions.addRegion(region);
			// 	});
			// }
			wsRegions.addRegion({ start: 0, end: 20, content: 'Greeting', color: randomColor(), resize: false, drag: false });
			wsRegions.addRegion({ start: 20, end: 50, content: 'Understanding', color: randomColor(), resize: false, drag: false });
			wsRegions.addRegion({ start: 50, end: 80, content: 'Helping', color: randomColor(), resize: false, drag: false });
			wsRegions.addRegion({ start: 80, end: 105, content: 'Setting Agreement', color: randomColor(), resize: false, drag: false });
			wsRegions.addRegion({ start: 105, end: 116, content: 'Farewell', color: randomColor(), resize: false, drag: false });
		});

		wavesurferRef.current.on('error', (error) => {
			console.error('Error loading audio:', error);
		});

		return () => {
			wavesurferRef.current?.destroy();
		};
	}, [audioUrl]);

	useEffect(() => {
		if (wavesurferRef.current) {
			if (playing) {
				wavesurferRef.current.play();
			} else {
				wavesurferRef.current.pause();
			}
		}
	}, [playing]);

	return <div ref={waveformRef} />;
};

export default AudioWaveform;
