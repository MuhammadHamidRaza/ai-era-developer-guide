---
title: ""Decision Frameworks: Making Calls With Incomplete Data""
description: Structured approaches to making sound decisions when you don't have all the information
---

# Decision Frameworks: Making Calls With Incomplete Data

In software development, you rarely have complete information. You don't know exactly how users will behave, how the system will scale, or how requirements will evolve. Yet you must decide — every day.

Decision frameworks provide structure for making sound calls when information is incomplete. They don't guarantee the right answer, but they guarantee a reasoned answer — one you can defend, learn from, and adjust.

This chapter teaches you the most practical decision frameworks for software development.

## Framework 1: WRAP

Developed by Chip and Dan Heath, WRAP is a four-step process for better decisions.

### W — Widen Your Options

Don't frame decisions as "whether or not." Frame them as "which of several."

**Bad frame:** "Should we use PostgreSQL or MongoDB?"
**Good frame:** "What are all the ways we could store and query this data?"

**Techniques:**
- Consider the opposite: "If our preferred option were unavailable, what would we do?"
- Find someone who's solved this problem before
- Use the vanishing options test: "If both options disappeared, what would we do?"

### R — Reality-Test Your Assumptions

Your assumptions are invisible to you. Test them.

**Techniques:**
- Consider the base rate: "What typically happens in situations like this?"
- Zoom out: Look at similar decisions and their outcomes
- Zoom in: Look at specific details that might make your case different
- Run small experiments: Test assumptions with low-cost experiments

### A — Attain Distance Before Deciding

Emotions and proximity distort judgment. Create distance.

**Techniques:**
- 10/10/10: How will you feel about this decision in 10 days? 10 months? 10 years?
- Best friend advice: "What would I tell my best friend to do in this situation?"
- Pre-mortem: Imagine the decision failed. Why did it fail?

### P — Prepare to Be Wrong

No decision is certain. Prepare for the possibility of being wrong.

**Techniques:**
- Set a tripwire: "If X happens, we'll revisit this decision."
- Define success criteria upfront: "We'll know this was right if Y happens."
- Plan for iteration: "We can adjust in Z weeks based on results."

## Framework 2: Cynefin

The Cynefin framework helps you categorize problems and choose appropriate decision-making approaches.

### Simple (Clear)

Cause and effect are obvious. Best practices exist.

**Approach:** Sense → Categorize → Respond
**Example:** Setting up a standard CI/CD pipeline

### Complicated

Cause and effect require analysis. Expert knowledge is needed.

**Approach:** Sense → Analyze → Respond
**Example:** Choosing a database architecture

### Complex

Cause and effect are only clear in retrospect. Emergent behavior.

**Approach:** Probe → Sense → Respond
**Example:** Designing a new product feature

### Chaotic

No clear cause and effect. Immediate action needed.

**Approach:** Act → Sense → Respond
**Example:** Responding to a production outage

### Disorder

You don't know which domain you're in.

**Approach:** Break the situation into parts and assign each to a domain.

## Framework 3: OODA Loop

Observe, Orient, Decide, Act. Originally developed for military strategy.

### Observe

Gather information about the situation.

### Orient

The most critical step. Interpret the information through:
- Your cultural traditions
- Your genetic heritage
- Your previous experience
- Your new information

### Decide

Choose a course of action based on your orientation.

### Act

Execute the decision. Then loop back to Observe.

**Key insight:** The faster you cycle through the OODA loop, the faster you learn and adapt. In competitive situations, the faster loop wins.

## Framework 4: Decision Matrix

For decisions with multiple criteria, use a weighted decision matrix.

### Steps:

1. **List options:** What are the possible choices?
2. **List criteria:** What factors matter?
3. **Weight criteria:** How important is each factor? (1-10)
4. **Score options:** How does each option perform on each criterion? (1-10)
5. **Calculate:** Multiply scores by weights and sum

### Example: Choosing a Deployment Platform

| Criterion | Weight | Vercel | Render | Northflank |
|-----------|--------|--------|--------|------------|
| Ease of use | 8 | 9 | 8 | 6 |
| Cost | 7 | 7 | 9 | 7 |
| Scalability | 8 | 7 | 6 | 9 |
| AI/GPU support | 9 | 3 | 4 | 9 |
| Team familiarity | 6 | 8 | 7 | 5 |
| **Weighted Score** | | **169** | **171** | **214** |

Northflank wins for this specific set of priorities.

## Framework 5: Regret Minimization

Project yourself to age 80 and look back. Which decision will you regret less?

**Application:**
- Career decisions: "Will I regret not taking this risk?"
- Technology decisions: "Will I regret not adopting this technology earlier?"
- Business decisions: "Will I regret not pursuing this opportunity?"

## Framework 6: Reversible vs. Irreversible

Categorize decisions by their reversibility (from Part 1).

| Type | Reversibility | Decision Speed | Analysis Depth |
|------|--------------|----------------|----------------|
| Type 1 | Irreversible | Slow | Deep |
| Type 2 | Reversible with cost | Moderate | Moderate |
| Type 3 | Easily reversible | Fast | Light |

**Rule:** Spend decision-making effort proportional to irreversibility.

## Making Decisions with AI

AI can help with decision-making but has limitations:

### What AI Does Well

- Generating options you might not have considered
- Analyzing trade-offs systematically
- Providing data and evidence
- Simulating scenarios

### What AI Does Poorly

- Understanding your specific context
- Making value judgments
- Taking responsibility for outcomes
- Reading organizational dynamics

### The AI-Assisted Decision Process

1. **Define the decision** (human)
2. **Generate options** (AI + human)
3. **Analyze trade-offs** (AI)
4. **Apply decision framework** (human)
5. **Make the call** (human)
6. **Document reasoning** (human + AI)
7. **Monitor outcomes** (human + AI)

## Common Decision-Making Mistakes

### Mistake 1: Analysis Paralysis

Over-analyzing reversible decisions wastes time.

**Fix:** Categorize by reversibility. Move fast on reversible decisions.

### Mistake 2: Confirmation Bias

Seeking information that confirms your preferred choice.

**Fix:** Actively seek disconfirming evidence. Use pre-mortems.

### Mistake 3: Sunk Cost Fallacy

Continuing because of past investment.

**Fix:** Evaluate based on future costs and benefits only.

### Mistake 4: Groupthink

Converging on a decision without critical evaluation.

**Fix:** Assign a devil's advocate. Use anonymous input.

### Mistake 5: Decision Fatigue

Making too many decisions degrades quality.

**Fix:** Automate routine decisions. Save mental energy for important ones.

## End-of-Chapter Checklist

- [ ] I can apply the WRAP framework (Widen, Reality-test, Attain distance, Prepare)
- [ ] I use the Cynefin framework to categorize problems
- [ ] I cycle through the OODA loop for rapid decision-making
- [ ] I use decision matrices for multi-criteria decisions
- [ ] I apply regret minimization for high-stakes decisions
- [ ] I categorize decisions by reversibility and allocate effort accordingly
- [ ] I use AI appropriately in the decision process

## What's Next

Decision frameworks help you make calls. The next chapter applies all your skills to specific domain workflows — finance, legal, HR, and sales agents.

**Next:** [Domain Workflows: Finance, Legal, HR, Sales Agents](./domain-workflows)
