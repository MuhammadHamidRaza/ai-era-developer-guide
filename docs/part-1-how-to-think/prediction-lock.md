---
title: "Prediction Lock: Commit Before You Ask"
description: A powerful technique for improving your reasoning by making predictions before consulting AI
---

# Prediction Lock: Commit Before You Ask

Here's a counterintuitive truth: the best way to learn from AI is to make a prediction before you ask it anything.

Not a guess. A prediction. A committed statement about what you think the answer is, why you think so, and what evidence would prove you wrong.

This technique — called Prediction Lock — transforms AI from an answer machine into a reasoning partner. It forces you to think before you outsource thinking. It reveals gaps in your understanding. And it dramatically accelerates your learning.

This chapter will teach you how to use Prediction Lock to develop deeper understanding, sharper intuition, and better judgment.

## The Problem with Asking First

When you ask AI a question and immediately read its answer, something subtle happens: you outsource your thinking.

The AI's answer feels authoritative. It's well-structured, confident, and detailed. Your brain accepts it with less scrutiny than it would apply to your own reasoning. This is called automation bias — the tendency to favor suggestions from automated systems.

The result: you get an answer, but you don't develop understanding. You've outsourced the thinking, and the thinking is where the learning happens.

:::info
**Key Insight:** Learning doesn't happen when you receive information. It happens when you struggle with a problem, form a hypothesis, test it, and update your mental model. Prediction Lock forces this process.
:::

## How Prediction Lock Works

Prediction Lock has five steps:

### Step 1: Formulate the Question

Be specific about what you want to know.

"What will happen if I change this database index?"
"Will this algorithm handle 10 million records efficiently?"
"Is this authentication approach secure against session hijacking?"

### Step 2: Make a Prediction

Before consulting AI, write down:

- What you think the answer is
- Why you think so (your reasoning)
- What evidence would prove you wrong
- Your confidence level (0-100%)

Example:

> **Question:** Will adding an index on the `user_email` column improve query performance?
>
> **Prediction:** Yes, it will significantly improve performance for queries that filter by email.
>
> **Reasoning:** Email lookups are currently doing full table scans. An index creates a B-tree structure that enables O(log n) lookups instead of O(n).
>
> **Falsification:** If the table is small (< 10,000 rows), the index overhead might outweigh the benefit. If queries rarely filter by email, the index is wasted.
>
> **Confidence:** 85%

### Step 3: Consult AI

Now ask AI the same question. But don't just read the answer — compare it to your prediction.

### Step 4: Compare and Analyze

This is the critical step. Compare AI's answer to your prediction:

- Did AI agree with your prediction? If so, does it provide additional reasoning that strengthens or weakens your confidence?
- Did AI disagree? If so, what reasoning does it provide? Is the reasoning sound?
- Did AI reveal factors you didn't consider?

### Step 5: Update Your Mental Model

Based on the comparison, update your understanding:

- If you were right: What did you get right? Can you generalize this reasoning to similar situations?
- If you were wrong: What did you miss? Why did you miss it? How can you avoid this gap in the future?
- If you were partially right: What nuances did you miss? What conditions affect the outcome?

## Why Prediction Lock Works

### It Forces Active Thinking

Prediction Lock requires you to think before you receive an answer. Active thinking creates stronger neural connections than passive reading. You're not consuming information — you're generating and testing hypotheses.

### It Reveals Knowledge Gaps

When you make a prediction, you immediately see what you know and what you don't. If you can't articulate your reasoning, you've identified a gap. If your reasoning is flawed, you've identified a misconception.

### It Builds Calibration

Calibration is the alignment between your confidence and your accuracy. A well-calibrated person who says they're 80% confident is right 80% of the time. Most people are poorly calibrated — they're overconfident about things they don't understand and underconfident about things they do.

Prediction Lock builds calibration by forcing you to state your confidence level and then check it against reality.

### It Reduces Automation Bias

When you've already formed a prediction, you're less likely to blindly accept AI's answer. You compare, evaluate, and decide. This critical stance is essential for working with AI effectively.

## Practical Examples

### Example 1: Performance Prediction

**Scenario:** You're considering adding caching to an API endpoint.

**Prediction:**
> Adding Redis caching will reduce response time from 200ms to 20ms for frequently accessed data.
>
> Reasoning: The endpoint queries a database that doesn't change often. Caching eliminates the database query for cache hits.
>
> Falsification: If the data changes frequently, cache invalidation overhead might negate the benefit. If the endpoint is rarely called, caching adds complexity without value.
>
> Confidence: 75%

**AI Response:** AI confirms the prediction but adds that you need to consider cache stampede (when cache expires and many requests hit the database simultaneously). It suggests using cache-aside pattern with jitter on TTL.

**Analysis:** Your prediction was directionally correct but missed an important edge case. You update your mental model to include cache stampede as a consideration for all caching decisions.

### Example 2: Security Prediction

**Scenario:** You're evaluating whether to store JWT tokens in localStorage or httpOnly cookies.

**Prediction:**
> httpOnly cookies are more secure because they're not accessible to JavaScript, preventing XSS attacks from stealing tokens.
>
> Reasoning: localStorage is accessible to any JavaScript running on the page. httpOnly cookies are only sent with HTTP requests.
>
> Falsification: If CSRF is a bigger threat than XSS in our application, cookies might be less secure. If we need token access in JavaScript for API calls, cookies add complexity.
>
> Confidence: 70%

**AI Response:** AI agrees but adds nuance: cookies are vulnerable to CSRF, which requires additional protection (CSRF tokens, SameSite attribute). localStorage is vulnerable to XSS. The right choice depends on which threat is more relevant to your application.

**Analysis:** Your prediction was correct but incomplete. You now understand that both options have trade-offs and the choice depends on your specific threat model.

### Example 3: Architecture Prediction

**Scenario:** You're deciding whether to use a message queue for processing user uploads.

**Prediction:**
> A message queue is overkill for our current scale of 100 uploads per day. We can process uploads synchronously.
>
> Reasoning: Message queues add operational complexity. At 100 uploads per day, synchronous processing is fast enough and simpler.
>
> Falsification: If upload processing takes more than a few seconds, synchronous processing will create a poor user experience. If we expect rapid growth, building the queue now might be cheaper than adding it later.
>
> Confidence: 80%

**AI Response:** AI agrees but suggests a hybrid approach: process synchronously now but design the code so it can be easily moved to a message queue later. This gives you simplicity now and flexibility later.

**Analysis:** Your prediction was correct, and AI added a valuable design principle: design for future change without implementing future complexity.

## The Prediction Lock Journal

Keep a Prediction Lock journal. For each significant technical decision, record:

1. The question
2. Your prediction (answer, reasoning, falsification, confidence)
3. AI's response
4. Comparison and analysis
5. What you learned

Review your journal weekly. Look for patterns:

- Are you consistently overconfident or underconfident?
- What types of questions do you consistently get wrong?
- What reasoning patterns lead to correct predictions?
- What blind spots keep appearing?

This journal becomes a personalized learning tool that accelerates your development.

## Prediction Lock in Team Settings

Prediction Lock is even more powerful in team settings.

### Before Architecture Reviews

Before an architecture review, have each team member write down their predictions about the proposed design:

- Will it meet performance requirements?
- What are the failure modes?
- What will be the hardest part to implement?
- What will break first under load?

Compare predictions during the review. This surfaces diverse perspectives and hidden concerns.

### Before Code Reviews

Before reviewing code, predict what issues you'll find:

- Where are the likely bugs?
- What edge cases are missing?
- What security concerns exist?
- What performance issues might arise?

This makes code reviews more focused and thorough.

### Before Production Deployments

Before deploying, predict what might go wrong:

- What's the most likely failure mode?
- What monitoring should we watch?
- What's our rollback plan?
- What's the expected impact if something goes wrong?

This turns deployment from a hope-based process into a prediction-based process.

## Common Mistakes

### Mistake 1: Vague Predictions

"I think it will work" is not a prediction. A prediction must be specific enough to be falsifiable.

**Bad:** "The caching will help."
**Good:** "Caching will reduce average response time by at least 50% for the top 10 most-accessed endpoints."

### Mistake 2: No Reasoning

A prediction without reasoning is a guess. The reasoning is where the learning happens.

### Mistake 3: No Falsification Criteria

If you don't know what would prove you wrong, you can't update your mental model. Always define falsification criteria.

### Mistake 4: Ignoring the Comparison

The value of Prediction Lock is in the comparison between your prediction and reality. Don't skip this step.

### Mistake 5: Not Tracking Calibration

If you don't track your confidence levels and actual accuracy, you can't improve your calibration. Record both.

## Building the Habit

Prediction Lock takes practice. Start small:

1. Pick one technical decision per day to apply Prediction Lock to
2. Write your prediction before consulting any resource
3. Compare and analyze
4. Record what you learned

Within two weeks, you'll notice your predictions becoming more accurate and your reasoning becoming sharper. Within a month, you'll find yourself naturally thinking through problems before seeking answers.

This is the transformation. You're becoming someone who thinks first and consults second — which is exactly what an Architect of Intent does.

## End-of-Chapter Checklist

- [ ] I understand why asking AI first leads to outsourced thinking and automation bias
- [ ] I can apply all five steps of Prediction Lock (formulate, predict, consult, compare, update)
- [ ] I write predictions that include answer, reasoning, falsification criteria, and confidence level
- [ ] I'm keeping a Prediction Lock journal to track my learning and calibration
- [ ] I understand how to use Prediction Lock in team settings (architecture reviews, code reviews, deployments)
- [ ] I can identify and avoid the five common Prediction Lock mistakes
- [ ] I commit to practicing Prediction Lock on at least one technical decision per day

## What's Next

Prediction Lock helps you think before you ask. But what happens when AI gives you an answer that contradicts your prediction — or when two AI tools give you different answers? The next chapter teaches you the Divergence Test: a systematic approach to resolving disagreements.

**Next:** [The Divergence Test: When AI Answers Disagree](./divergence-test)
