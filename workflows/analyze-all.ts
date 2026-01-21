import { WorkflowEntrypoint, WorkflowEvent, WorkflowStep } from 'cloudflare:workers';

interface Feedback {
	id: number;
	source: string;
	text: string;
}

interface Env {
	d1_db: D1Database;
	AI: Ai;
}

interface AnalyzeAllParams {
	triggeredBy: string;
}

interface FeedbackAnalysis {
	category: string;
	sentiment: string;
	urgency: string;
}

export class AnalyzeAllWorkflow extends WorkflowEntrypoint<Env, AnalyzeAllParams> {
	async run(event: WorkflowEvent<AnalyzeAllParams>, step: WorkflowStep) {
		// Step 1: Delete all existing analyses
		await step.do('delete-all-analyses', async () => {
			await this.env.d1_db.prepare('DELETE FROM feedback_analysis').run();
			console.log('Deleted all feedback analyses');
		});

		// Step 2: Fetch all feedback
		const feedbacks = await step.do('fetch-all-feedback', async () => {
			const result = await this.env.d1_db
				.prepare('SELECT id, source, text FROM feedback ORDER BY id')
				.all();
			return result.results as Pick<Feedback, 'id' | 'source' | 'text'>[];
		});

		console.log(`Processing ${feedbacks.length} feedbacks`);

		// Valid values for randomization
		const validCategories = ['docs', 'onboarding', 'wrangler_cli', 'workers_runtime', 'd1', 'workflows', 'ai_search', 'observability', 'dashboard_ui', 'other'];
		const validSentiments = ['positive', 'neutral', 'negative'];
		const validUrgencies = ['high', 'medium', 'low'];

		// Step 3: Process each feedback individually
		for (let i = 0; i < feedbacks.length; i++) {
			const feedback = feedbacks[i];
			
			await (step.do as any)(
				`analyze-feedback-${feedback.id}`,
				async () => {
					// Simulate AI analysis with randomized values
					const category = validCategories[Math.floor(Math.random() * validCategories.length)];
					const sentiment = validSentiments[Math.floor(Math.random() * validSentiments.length)];
					const urgency = validUrgencies[Math.floor(Math.random() * validUrgencies.length)];

					// Insert into feedback_analysis
					await this.env.d1_db
						.prepare(`
							INSERT INTO feedback_analysis (feedback_id, category, sentiment, urgency)
							VALUES (?, ?, ?, ?)
						`)
						.bind(feedback.id, category, sentiment, urgency)
						.run();

					console.log(`Processed feedback ${feedback.id}: ${category}, ${sentiment}, ${urgency}`);
				},
				// Define a retry strategy
				{
					retries: {
						limit: 5,
						delay: '5 seconds',
						backoff: 'exponential',
					},
					timeout: '15 minutes',
				}
			);
		}

		return {
			success: true,
			processed: feedbacks.length,
			triggeredBy: (event.payload as AnalyzeAllParams).triggeredBy,
			completedAt: new Date().toISOString()
		};
	}
}

// Default export with fetch handler to trigger the workflow
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// GET /status?instanceId=xxx - Get workflow status
		if (request.method === 'GET' && url.pathname === '/status') {
			const instanceId = url.searchParams.get('instanceId');
			if (!instanceId) {
				return Response.json({ error: 'instanceId required' }, { status: 400 });
			}

			const instance = await env.ANALYZE_ALL_WORKFLOW.get(instanceId);
			const status = await instance.status();
			return Response.json({ status });
		}

		// POST /trigger - Trigger the workflow
		if (request.method === 'POST' && url.pathname === '/trigger') {
			const body = await request.json<AnalyzeAllParams>();
			const instance = await env.ANALYZE_ALL_WORKFLOW.create({
				params: body
			});

			return Response.json({
				success: true,
				instanceId: instance.id,
				status: await instance.status()
			});
		}

		return Response.json({ error: 'Not found' }, { status: 404 });
	}
};
