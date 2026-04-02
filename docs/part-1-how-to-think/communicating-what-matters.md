---
title: Communicating What Matters
description: How to communicate technical information clearly, concisely, and persuasively to any audience
---

# Communicating What Matters

You can have the best ideas in the world, but if you can't communicate them effectively, they don't matter.

In the AI era, communication is more important than ever. AI can write code. AI can generate documentation. AI can create diagrams. But AI cannot understand your specific audience, read the room, adapt your message to the listener's context, and persuade them to take action.

That's your job. And it's one of the most valuable skills you can develop.

This chapter teaches you to communicate technical information to any audience — engineers, managers, executives, clients, and non-technical stakeholders — in a way that drives understanding and action.

## The Communication Hierarchy

Not all communication is equal. Here's the hierarchy from least to most valuable:

### Level 1: Information Dumping

Sharing everything you know without filtering. The listener must extract the signal from the noise.

**Example:** "So the API returns a 500 error because the database connection pool was exhausted, which happened because the connection timeout was set to 30 seconds but the query was taking 45 seconds due to a missing index on the user_sessions table, and also the connection pool size was configured for 10 connections but we're seeing 50 concurrent users, and—"

**Problem:** Too much detail. The listener doesn't know what matters.

### Level 2: Structured Information

Organizing information logically but still including everything.

**Example:** "The API failed. Root cause: database connection pool exhaustion. Contributing factors: missing index, undersized connection pool, long-running query. Fix: add index, increase pool size, optimize query."

**Better:** Structured and complete. But still not tailored to the audience.

### Level 3: Audience-Tailored Communication

Filtering and framing information based on what the audience needs to know.

**To an engineer:** "The API failed due to connection pool exhaustion. Missing index on user_sessions caused 45-second queries against a 30-second timeout. Pool was sized for 10 connections but we have 50 concurrent users. Fix: add index, increase pool to 50, add query timeout."

**To a manager:** "The API went down because the database couldn't handle the load. We've identified the fix and will implement it within the hour. We're also adding monitoring to catch this before it happens again."

**To an executive:** "We had a brief service interruption affecting the API. The root cause is identified and being fixed. We're implementing additional monitoring to prevent recurrence. No customer data was affected."

**Best:** Each audience gets exactly what they need — no more, no less.

:::info
**Core Principle:** The goal of communication is not to share information. It's to create understanding and drive action. Every word should serve that goal.
:::

## The Communication Framework

### Step 1: Know Your Audience

Before you communicate anything, answer these questions:

- Who am I talking to?
- What do they already know?
- What do they need to know?
- What decision do they need to make?
- What's their technical level?
- What's their time constraint?
- What's their emotional state? (Are they stressed about an outage? Excited about a launch?)

### Step 2: Define Your Core Message

What is the one thing you want your audience to understand or do?

**Bad core message:** "Here's everything that happened with the database."
**Good core message:** "The database issue is resolved, and we've implemented safeguards to prevent it from happening again."

### Step 3: Structure Your Communication

Use a structure that matches your audience and purpose:

**For status updates (BLUF - Bottom Line Up Front):**
1. Bottom line (the conclusion or status)
2. Key details (supporting information)
3. Next steps (what happens next)
4. Questions (what you need from the audience)

**For proposals:**
1. Problem (what needs to be solved)
2. Proposal (what you recommend)
3. Rationale (why this is the right choice)
4. Trade-offs (what you're giving up)
5. Recommendation (what you want the audience to decide)

**For incident reports:**
1. Impact (what was affected and for how long)
2. Root cause (what happened)
3. Resolution (how it was fixed)
4. Prevention (what will prevent recurrence)
5. Action items (who does what by when)

### Step 4: Eliminate Noise

Remove everything that doesn't serve your core message:

- Technical jargon for non-technical audiences
- Irrelevant details
- Tangential information
- Defensive language
- Unnecessary context

### Step 5: Check for Understanding

Communication is a two-way process. Verify that your message was received as intended:

- "Does that make sense?"
- "What questions do you have?"
- "Can you summarize what we've agreed?"
- "Is there anything unclear?"

## Communicating with Different Audiences

### Engineers

**What they need:** Technical details, implementation specifics, trade-offs, edge cases.
**What they don't need:** Business context (usually), high-level summaries without substance.
**Communication style:** Precise, detailed, technically accurate. Use code examples and diagrams.

### Engineering Managers

**What they need:** Status, risks, resource requirements, timeline impacts, team implications.
**What they don't need:** Line-by-line code explanations, implementation minutiae.
**Communication style:** Structured, action-oriented, with technical details available on request.

### Executives

**What they need:** Business impact, strategic implications, resource decisions, risk assessment.
**What they don't need:** Technical details, implementation approaches, tool comparisons.
**Communication style:** Concise, business-focused, with clear recommendations and trade-offs.

### Non-Technical Stakeholders

**What they need:** What it means for them, what's changing, what they need to do.
**What they don't need:** Any technical details, architectural discussions, technology choices.
**Communication style:** Plain language, analogy-based, focused on outcomes and impact.

### Clients and Customers

**What they need:** What's happening, how it affects them, what's being done, when it will be resolved.
**What they don't need:** Internal processes, technical root causes, blame assignments.
**Communication style:** Empathetic, clear, action-oriented, with specific timelines.

## Written Communication

Written communication is your primary mode in the AI era. Here's how to excel.

### Emails

- Subject line should summarize the core message
- First sentence should state the purpose
- Use bullet points for multiple items
- End with clear action items and owners
- Keep it under 200 words when possible

### Pull Request Descriptions

- What changed and why
- How to test the changes
- Any risks or considerations
- Screenshots or examples (for UI changes)
- Link to relevant tickets or discussions

### Technical Documentation

- Start with the problem the documentation solves
- Provide quick-start examples before deep explanations
- Use consistent structure across documents
- Include troubleshooting sections
- Keep it updated (outdated documentation is worse than no documentation)

### Incident Communications

- State the impact immediately
- Provide regular updates (even if there's no new information)
- Use plain language for customer-facing communications
- Include timelines and expected resolution
- Follow up with a post-incident report

## Verbal Communication

### The 30-Second Rule

You should be able to explain any technical situation in 30 seconds to a non-technical person. Practice this skill. It forces clarity.

### The Whiteboard Test

If you can't draw your architecture on a whiteboard and explain it to a colleague, you don't understand it well enough. The act of drawing forces you to identify gaps in your understanding.

### Handling Questions

When someone asks a question:

1. Listen fully before responding
2. Confirm you understand the question ("Are you asking about X?")
3. Answer directly
4. Provide context if needed
5. Check that the answer was sufficient

## Communication in the AI Era

AI changes the communication landscape:

### AI as a Communication Tool

Use AI to:
- Draft communications (then edit for your voice and accuracy)
- Simplify technical explanations for non-technical audiences
- Generate multiple versions of a message for different audiences
- Check your writing for clarity and conciseness

### AI as a Communication Risk

AI-generated communications can:
- Sound generic and impersonal
- Miss nuances specific to your audience
- Include inaccurate information
- Lack the emotional intelligence that human communication requires

**Rule:** Always review and personalize AI-generated communications. Never send AI output directly.

### The Human Edge

Your human communication skills are your competitive advantage. AI cannot:

- Read the room and adjust tone
- Build trust through authentic communication
- Navigate organizational politics
- Deliver difficult news with empathy
- Inspire and motivate through storytelling

Invest in these skills. They're irreplaceable.

## Common Communication Mistakes

### Mistake 1: Leading with Details

Starting with technical details before establishing context. Always start with the bottom line.

### Mistake 2: Using Jargon with the Wrong Audience

Technical terms that are clear to engineers are meaningless to executives. Translate.

### Mistake 3: Hiding Bad News

Delaying or softening bad news makes it worse. Communicate problems early and clearly, along with your plan to address them.

### Mistake 4: No Clear Ask

Every communication should have a clear purpose. What do you want the audience to do, decide, or understand?

### Mistake 5: Not Following Up

Communication doesn't end when you send the message. Follow up to ensure understanding and action.

## End-of-Chapter Checklist

- [ ] I understand the communication hierarchy and aim for Level 3 (audience-tailored)
- [ ] I know my audience before I communicate anything
- [ ] I can define a clear core message for any communication
- [ ] I use appropriate structures (BLUF, proposal, incident report) for different purposes
- [ ] I can communicate effectively with engineers, managers, executives, and non-technical stakeholders
- [ ] I write clear emails, PR descriptions, documentation, and incident communications
- [ ] I can explain any technical situation in 30 seconds to a non-technical person
- [ ] I use AI as a communication tool but always review and personalize the output

## What's Next

Communication is essential, but it's only one side of the collaboration equation. The next chapter teaches you to work with AI as a partner — not as a replacement, not as a servant, but as a collaborator that amplifies your capabilities.

**Next:** [Working With AI, Not For AI](./working-with-ai)
