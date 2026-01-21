-- 0003_populate_feedback.sql
INSERT INTO feedback (source, text) VALUES
  -- High urgency / firefighting (a few)
  ('github',  'D1 query results between local and remote are inconsistent, and it’s blocking my deployment.'),
  ('discord', 'My Worker started returning 500s globally right after a config change. Rollbacks are not obvious in the dashboard and I need a faster way to recover.'),
  ('github',  'wrangler deploy fails with a vague error and no actionable hint. I’m stuck and can’t ship.'),
  ('email',   'AI Search isn’t returning any results for queries that should obviously match. This is blocking a demo I’m giving today.'),
  ('forum',   'Workflows keeps retrying a step even after it succeeds, and I can’t tell why. It’s causing duplicate writes and breaking my pipeline.'),

  -- D1 (mix of negative/neutral/positive)
  ('github',  'D1 migrations are helpful, but the docs didn’t clearly explain local vs remote apply. I had to learn by trial and error.'),
  ('discord', 'D1 is fast for my use case, but I wish there was a clearer guide on indexing and query performance.'),
  ('github',  'I love that D1 is so easy to bind to a Worker. I was querying data within minutes.'),
  ('forum',   'When I run D1 locally, the error messages feel different than when deployed. It made debugging slower than it should be.'),
  ('email',   'I’m unsure how to handle schema changes safely. The migration workflow is there, but I couldn’t find a “best practices” page.'),
  ('discord', 'It would be nice if D1 had a built-in way to inspect recent queries or slow queries. Right now I’m guessing what’s happening.'),

  -- Wrangler CLI
  ('github',  'wrangler dev is great, but I got confused about which environment it was using. I accidentally pointed at the wrong database.'),
  ('discord', 'wrangler deploy output is hard to parse when something fails. A single clear “here’s what to fix” line would save a lot of time.'),
  ('github',  'The wrangler config schema helped catch mistakes early. That was a nice surprise.'),
  ('forum',   'I keep forgetting the exact command for D1 migrations and end up searching again. A shorter “common commands” cheat sheet would help.'),
  ('email',   'When I add new bindings, I’m never 100% sure they’re being picked up until runtime. I wish wrangler validated bindings more explicitly.'),

  -- Docs
  ('twitter', 'Docs feel fragmented. I keep bouncing between pages to find a working example.'),
  ('forum',   'The docs are generally good, but the “happy path” examples stop right before the part where real apps get complicated.'),
  ('discord', 'Some docs pages assume you already know Cloudflare terminology. A small glossary would help new users a lot.'),
  ('email',   'I wanted one end-to-end tutorial: Worker + D1 + Workers AI + AI Search. I found pieces, but not a single coherent walkthrough.'),
  ('twitter', 'A lot of examples use placeholders but don’t show realistic data. It makes it harder to adapt to my own project.'),
  ('forum',   'The Workers AI docs don’t clearly explain input size limits. I had to guess and retry a few times.'),

  -- Onboarding
  ('email',   'Onboarding is confusing. I wasn’t sure how to connect Workers, D1, and AI together as a single project.'),
  ('discord', 'The dashboard has a lot of products and it’s hard to know what I should click first. A “build a small app” guided setup would help.'),
  ('forum',   'I understood Workers quickly, but bindings took longer. The concept is simple, but the UI didn’t make it feel simple.'),
  ('twitter', 'I like the platform, but the first 30 minutes felt like context switching across too many pages.'),

  -- Workers runtime
  ('twitter', 'Global deployment speed is great. My Worker was up in seconds and ran exactly as expected.'),
  ('github',  'Node compatibility is helpful, but it’s still unclear which Node APIs are supported. I ran into a runtime issue and didn’t know what was “allowed.”'),
  ('forum',   'The fetch API behavior is clean, but I wish there were more examples of streaming responses and larger payload patterns.'),
  ('discord', 'I hit a performance edge case with JSON parsing on a large request body. Not sure if there are recommended patterns for this runtime.'),
  ('email',   'Workers feel snappy, but debugging production-only issues is tough. I’d love a better “reproduce request” flow.'),

  -- Workflows
  ('discord', 'Workflows are surprisingly easy to set up. A few more examples for multi-step pipelines would help.'),
  ('forum',   'I’m unsure when to use Workflows vs just doing it inside one Worker request. A decision guide would be really helpful.'),
  ('github',  'Workflows status pages are useful, but I want a clearer “what step failed and why” view.'),
  ('email',   'I tried using Workflows for ingestion and got confused about idempotency. Duplicate runs created duplicate DB writes.'),
  ('discord', 'The retry behavior is powerful, but the defaults weren’t obvious. I accidentally retried something that shouldn’t retry.'),

  -- AI Search
  ('github',  'AI Search setup was confusing. I wasn’t sure what “source” meant or how crawling works.'),
  ('twitter', 'AI Search is a cool idea, but I want a simpler “test my index” page to see what got ingested.'),
  ('discord', 'Crawling didn’t pick up my pages even after several hours. I’m not sure if it’s a permissions issue or a path filter issue.'),
  ('forum',   'When I query AI Search, the results are relevant, but I’d like a little more transparency into why a result matched.'),
  ('email',   'I expected “similar feedback” to work out of the box, but it took some fiddling. A short reference implementation would save time.'),

  -- Observability
  ('forum',   'Logs are fine, but I wish there were better filters when debugging multiple Workers at once.'),
  ('discord', 'It’s hard to correlate a specific request with a downstream D1 error quickly. I want tighter tracing across products.'),
  ('github',  'The observability view is helpful, but I couldn’t find the one error I cared about without lots of clicking.'),
  ('email',   'Metrics are useful, but I’m not sure what “good” looks like for a Worker. Some recommended dashboards would be great.'),
  ('twitter', 'I like that observability is built in. It’s way easier than wiring everything myself.'),

  -- Dashboard UI
  ('twitter', 'The Workers dashboard UI is clean and fast. It’s easy to navigate between deployments.'),
  ('discord', 'I wish the bindings page surfaced common mistakes. I misconfigured a binding and only found out at runtime.'),
  ('forum',   'The D1 UI is decent, but I kept looking for a simple way to run a query and see results without switching contexts.'),
  ('email',   'I like the product layout, but the naming in the dashboard sometimes differs from the docs, which is confusing.'),
  ('github',  'It would be helpful if the dashboard showed “recent changes” for a Worker, like bindings added/removed or config edits.'),

  -- Other (pricing, limits, misc)
  ('email',   'Billing alerts are unclear. I got a sudden spike without understanding what caused it.'),
  ('forum',   'I wish product limits were summarized in one place. I keep discovering them only when something fails.'),
  ('twitter', 'Overall the platform feels cohesive. Once it clicks, it’s really fun to build on.'),
  ('discord', 'Rate limits surprised me during testing. A clearer “you are near a limit” warning would prevent a lot of confusion.'),
  ('github',  'I like the idea of using Cloudflare for everything, but I sometimes worry I’m building on features that will change. A stability promise per product would help.');
