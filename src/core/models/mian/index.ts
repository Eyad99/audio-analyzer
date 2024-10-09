export interface Segment {
	speaker: 'Agent' | 'Customer';
	text: string;
	sentiment: number;
	tone: string;
	start: number;
	end: number;
	segment_audio_path: string;
}

export interface Criterion {
	match: boolean;
	score: number;
	reason?: string;
}

export interface CriteriaGroupProps {
	[key: string]: Criterion | CriteriaGroupProps | any;
}

export interface AnalysisData {
	[key: string]: CriteriaGroupProps;
}
