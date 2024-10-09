import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioWaveformProps {
	audioUrl: string;
	playing: boolean;
	onReady?: () => void;
	width?: number | string;
	height?: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, playing, onReady, width = undefined, height = 50 }) => {
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);

	useEffect(() => {
		if (!waveformRef.current) return;

		wavesurferRef.current = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: '#4F4A85',
			progressColor: '#383351',
			height: height,
			width: width,
			barWidth: 2,
		});

		wavesurferRef.current.load(audioUrl);

		wavesurferRef.current.on('ready', () => {
			if (onReady) onReady();
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
// 			plugins: [
// 				Hover.create({
// 					lineColor: '#ff0000',
// 					lineWidth: 2,
// 					labelBackground: '#555',
// 					labelColor: '#fff',
// 					labelSize: '11px',
// 				}),
// 			],
// import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
// http://insights24.pythonanywhere.com/media/audio/20241008-164416_1877/Agent_2.06_3.30.wav
