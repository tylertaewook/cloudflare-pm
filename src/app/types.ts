export interface Feedback {
	id: number;
	source: string;
	text: string;
	created_at: string;
}

export interface FeedbackAnalysis {
	feedback_id: number;
	category: string;
	sentiment: string;
	urgency: string;
	labeled_at: string;
}