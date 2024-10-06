export interface Segment {
	speaker: 'Agent' | 'Customer';
	text: string;
	sentiment: number;
	tone: string;
	start: number;
	end: number;
	segment_audio_path: string;
}
