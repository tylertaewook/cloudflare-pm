export interface Feedback {
	id: number;
	source: string;
	text: string;
	created_at: string;
	analysis?: FeedbackAnalysis | null;
}

export interface FeedbackAnalysis {
	feedback_id: number;
	category: string;
	sentiment: string;
	urgency: string;
	labeled_at: string;
}