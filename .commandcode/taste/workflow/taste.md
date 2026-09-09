# Workflow

- Prefers summoning multiple subagents and loading relevant skills to judge completeness and correctness of content before finalizing. Confidence: 0.97
- Prefers the agent to proactively research and fill content gaps beyond the literal request (e.g., identifying missing topics and whether the result is complete). Confidence: 0.7
- When the user refers to "previous" behavior/state, prefers the agent to consult the relevant prior chat session or history to understand the intent rather than guessing. Confidence: 0.6
- For content grounded in external facts (e.g., SQL dialect syntax, pricing), prefers the agent to verify against official documentation and surface corrections to commonly-held myths rather than writing from assumption. Confidence: 0.8
- Prefers the agent to validate new content end-to-end (frontmatter parse, full renderer run, syntax-highlight/table markers present) and clean up temporary files left by subagents before finishing. When a rendering bug surfaces after publishing (e.g., via a user screenshot), re-verifies the fix by rendering the post and scanning the HTML for leftover escape artifacts (e.g., stray backslashes, stray `**`), checking all posts for the same bug class rather than only the edited file, before declaring it done. Confidence: 0.8
- Prefers subagents to return research findings directly in their response rather than writing files to disk; when a subagent misbehaves (writes files, fails), re-spawns with tighter instructions. Confidence: 0.85
- Once research has been gathered (e.g., from an earlier pass or subagents), prefers the agent to write directly from that material when asked to rewrite/expand content, rather than re-running research agents ("gaperlu riset lagi"). Confidence: 0.65
