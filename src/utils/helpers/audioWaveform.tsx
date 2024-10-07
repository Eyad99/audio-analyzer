import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioWaveformProps {
	audioUrl: string;
	playing: boolean;
	onReady?: () => void;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, playing, onReady }) => {
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);

	useEffect(() => {
		if (!waveformRef.current) return;

		wavesurferRef.current = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: '#4F4A85',
			progressColor: '#383351',
			height: 80,
			// responsive: true,
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
