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

// import React, { useEffect, useRef, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
// import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

// interface AudioWaveformProps {
// 	audioUrl: string;
// 	playing: boolean;
// 	width?: number | string;
// 	height?: number;
// 	hoveredLabel?: string | null;
// }

// const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, playing, width = undefined, height = 50, hoveredLabel }) => {
// 	const [isReady, setIsReady] = useState(false);
// 	const waveformRef = useRef<HTMLDivElement | null>(null);
// 	const wavesurferRef = useRef<WaveSurfer | null>(null);
// 	const wsRegions = RegionsPlugin.create();

// 	const random = (min: number, max: number) => Math.random() * (max - min) + min;
// 	const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

// 	useEffect(() => {
// 		if (!waveformRef.current || !audioUrl) return;

// 		wavesurferRef.current = WaveSurfer.create({
// 			container: waveformRef.current,
// 			waveColor: '#4F4A85',
// 			progressColor: '#383351',
// 			height: height,
// 			width: width,
// 			barWidth: 2,
// 			plugins: [wsRegions],
// 		});

// 		console.log('Loading audio from:', audioUrl);
// 		wavesurferRef.current.load(audioUrl);

// 		wavesurferRef.current.on('ready', () => {
// 			console.log('Wavesurfer is ready');
// 			// wsRegions.clearRegions();
// 			setIsReady(true);

// 			// wsRegions.addRegion({ start: 0, end: 20, content: 'Greeting', color: randomColor(), resize: false, drag: false });
// 			// wsRegions.addRegion({ start: 20, end: 50, content: 'Understanding', color: randomColor(), resize: false, drag: false });
// 			// wsRegions.addRegion({ start: 50, end: 80, content: 'Helping', color: randomColor(), resize: false, drag: false });
// 			// wsRegions.addRegion({ start: 80, end: 105, content: 'Setting Agreement', color: randomColor(), resize: false, drag: false });
// 			// wsRegions.addRegion({ start: 105, end: 116, content: 'Farewell', color: randomColor(), resize: false, drag: false });
// 		});

// 		wavesurferRef.current.on('error', (error) => {
// 			console.error('Error loading audio:', error);
// 		});

// 		return () => {
// 			wavesurferRef.current?.destroy();
// 			wavesurferRef.current = null;
// 		};
// 	}, [audioUrl]);

// 	useEffect(() => {
// 		if (!wavesurferRef.current || !hoveredLabel || !isReady) return;

// 		// Map hovered label to specific regions
// 		const regionMapping = {
// 			Greeting: { start: 0, end: 20 },
// 			Understanding: { start: 20, end: 50 },
// 			Helping: { start: 50, end: 80 },
// 			'Setting Agreement': { start: 80, end: 105 },
// 			Farewell: { start: 105, end: 116 },
// 		} as any;

// 		const region = regionMapping[hoveredLabel];

// 		console.log('regionregionregion', region);
// 		wavesurferRef.current.on('ready', () => {
// 			if (region && isReady) {
// 				wsRegions.addRegion({
// 					...region,
// 					content: 'Greeting',
// 					color: randomColor(),
// 					resize: false,
// 					drag: false,
// 				});
// 			}
// 		});

// 		return () => {
// 			// Clean up the region when the hovered label changes or is removed
// 			wsRegions.clearRegions();
// 		};
// 	}, [isReady, hoveredLabel]);

// 	useEffect(() => {
// 		if (wavesurferRef.current) {
// 			if (playing) {
// 				wavesurferRef.current.play();
// 			} else {
// 				wavesurferRef.current.pause();
// 			}
// 		}
// 	}, [playing]);

// 	return <div ref={waveformRef} />;
// };

// export default AudioWaveform;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

interface AudioWaveformProps {
	audioUrl: string;
	playing: boolean;
	hoveredLabel?: string;
	width?: number | string;
	height?: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, playing, hoveredLabel, width = undefined, height = 50 }) => {
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);
	const wsRegions = RegionsPlugin.create();
	const [isReady, setIsReady] = useState(false);

	const random = (min: number, max: number) => Math.random() * (max - min) + min;
	const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

	const addRegion = useCallback(
		(label: string | undefined) => {
			if (!wavesurferRef.current || !isReady || !label) return;

			// Clear existing regions before adding a new one
			wsRegions.clearRegions();

			const regionMapping = {
				Greeting: { start: 0, end: 20 },
				Understanding: { start: 20, end: 50 },
				Helping: { start: 50, end: 80 },
				'Setting Agreement': { start: 80, end: 105 },
				Farewell: { start: 105, end: 116 },
			} as any;

			const region = regionMapping[label];
			if (region) {
				wsRegions.addRegion({
					...region,
					content: label,
					color: randomColor(),
					resize: false,
					drag: false,
				});
			}
		},
		[isReady]
	);

	useEffect(() => {
		if (!waveformRef.current || !audioUrl) return;

		if (!wavesurferRef.current) {
			wavesurferRef.current = WaveSurfer.create({
				container: waveformRef.current,
				waveColor: '#4F4A85',
				progressColor: '#383351',
				height: height,
				width: width,
				barWidth: 2,
				plugins: [wsRegions],
			});

			wavesurferRef.current.load(audioUrl);

			wavesurferRef.current.on('ready', () => {
				setIsReady(true);
				addRegion(hoveredLabel); // Add the region once ready
			});

			wavesurferRef.current.on('error', (error) => {
				console.error('Error loading audio:', error);
			});
		}

		return () => {
			wavesurferRef.current?.destroy();
			wavesurferRef.current = null;
		};
	}, [audioUrl, addRegion]);

	useEffect(() => {
		if (isReady) {
			addRegion(hoveredLabel); // Update region when hoveredLabel changes
		}
	}, [hoveredLabel, addRegion, isReady]);

	useEffect(() => {
		if (wavesurferRef.current && isReady) {
			playing ? wavesurferRef.current.play() : wavesurferRef.current.pause();
		}
	}, [playing, isReady]);

	return <div ref={waveformRef} />;
};

export default AudioWaveform;
