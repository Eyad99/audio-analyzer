export interface Segment {
	speaker: 'Agent' | 'Customer';
	text: string;
	sentiment: number;
	tone: string;
	start: number;
	end: number;
	segment_audio_path: string;
}



export interface  Criterion {
	match: boolean;
};

export interface  CriteriaGroupProps {
	[key: string]: Criterion | CriteriaGroupProps;
};

export interface  AnalysisData {
	[key: string]: CriteriaGroupProps;
};