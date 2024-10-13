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

	const defaultRegions = [
		{ start: 1, end: 2, color: 'red' },
		{ start: 5, end: 6, color: 'red' },
		{ start: 99, end: 100, color: 'yellow' },
		{ start: 115, end: 116, color: 'yellow' },
	];

	const addRegion = useCallback(
		(label: string | undefined) => {
			if (!label) {
				wsRegions.clearRegions();

				defaultRegions.forEach((region) =>
					wsRegions?.addRegion({
						...region,
						resize: false,
						drag: false,
					})
				);
			}
			if (!wavesurferRef.current || !isReady || !label) return;

			// Clear existing regions before adding a new one
			wsRegions.clearRegions();

			const regionMapping = {
				Greeting: { start: 0, end: 20 },
				Understanding: { start: 20, end: 50 },
				Helping: { start: 50, end: 80 },
				'Reach Agreement': { start: 80, end: 105 },
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

				defaultRegions.forEach((region) =>
					wsRegions?.addRegion({
						...region,
						resize: false,
						drag: false,
					})
				);
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

				defaultRegions.forEach((region) =>
					wsRegions?.addRegion({
						...region,
						resize: false,
						drag: false,
					})
				);
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
