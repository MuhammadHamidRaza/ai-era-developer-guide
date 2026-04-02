---
title: Detecting Broken Reasoning in AI Output
description: How to spot logical fallacies, hallucinated facts, and flawed analysis in AI-generated content
---

# Detecting Broken Reasoning in AI Output

AI models are confident. They present their reasoning with authority, structure, and apparent logic. This confidence is both their greatest strength and their greatest danger.

When AI reasoning is sound, it accelerates your thinking. When it's broken, it leads you confidently in the wrong direction. The difference is not always obvious.

This chapter teaches you to detect broken reasoning in AI output — a skill that separates effective AI users from people who are led astray by confident nonsense.

## Why AI Reasoning Breaks

AI models don't reason the way humans do. They predict the next token based on patterns in their training data. This means:

- They can produce logically structured arguments that are internally inconsistent
- They can cite facts that sound plausible but are fabricated
- They can follow valid logical rules applied to false premises
- They can miss obvious contradictions because they're optimizing for coherence, not truth
- They can be confident about things they're uncertain about

Understanding these failure modes is the first step to detecting them.

## Types of Broken Reasoning

### 1. Hallucinated Facts

The AI states something as fact that is not true.

**Example:** "Python's GIL was removed in Python 3.12, allowing true parallel thread execution."

This is false. The GIL still exists in Python 3.12. The AI has hallucinated a fact that sounds plausible because there have been discussions about removing the GIL.

**How to detect:** Verify any factual claim that seems important. If the AI cites a specific version, feature, or statistic, check it against official documentation.

### 2. False Causation

The AI implies that A causes B when the relationship is correlational, coincidental, or reversed.

**Example:** "Teams that use TypeScript have 40% fewer bugs, so switching to TypeScript will reduce your bug rate by 40%."

This confuses correlation with causation. Teams that use TypeScript may also have better testing practices, code review processes, and engineering cultures. The TypeScript itself may not be the cause.

**How to detect:** Ask: "Is there a direct causal mechanism, or are there confounding factors?" Look for alternative explanations.

### 3. Overgeneralization

The AI takes a pattern that holds in some cases and applies it universally.

**Example:** "Microservices are always better for large teams because they enable independent deployment."

This ignores the significant costs of microservices: distributed system complexity, network latency, data consistency challenges, and operational overhead. For many large teams, a modular monolith is the better choice.

**How to detect:** Look for absolute language ("always," "never," "every"). Ask: "Are there exceptions? What conditions would make the opposite true?"

### 4. Circular Reasoning

The AI's conclusion is embedded in its premises.

**Example:** "This architecture is the best choice because it's the most optimal solution. We know it's optimal because it's the best architecture for this use case."

This reasoning goes in a circle. It doesn't provide any independent evidence for the conclusion.

**How to detect:** Trace the logical chain. Does the conclusion depend on premises that themselves depend on the conclusion?

### 5. False Dichotomy

The AI presents two options as the only choices when more exist.

**Example:** "You can either have fast development with no tests, or slow development with comprehensive tests."

This ignores the middle ground: fast development with targeted tests on critical paths. It also ignores that tests can speed up development by catching bugs early.

**How to detect:** Ask: "Are these really the only options? What's the spectrum of possibilities?"

### 6. Appeal to Authority

The AI cites an authority or trend as evidence without providing actual reasoning.

**Example:** "Google uses Kubernetes, so you should too."

Google's needs are nothing like most companies' needs. What works at Google's scale may be overkill for your situation.

**How to detect:** Ask: "Does this authority's situation match mine? What's the actual reasoning, independent of who does it?"

### 7. Missing Counterarguments

The AI presents only one side of an argument without acknowledging valid counterpoints.

**Example:** "Serverless is the future of computing. It eliminates server management, scales automatically, and you only pay for what you use."

This ignores cold starts, vendor lock-in, debugging complexity, cost at scale, and limitations on execution time and memory.

**How to detect:** Ask: "What would someone who disagrees say? What are the weaknesses of this position?"

:::warning
**Critical Pattern:** The most dangerous broken reasoning is the kind that sounds right. It follows logical structure, uses correct terminology, and reaches plausible conclusions. Always examine the reasoning chain, not just the surface appearance.
:::

## The Reasoning Audit Framework

When reviewing AI output, apply this systematic audit:

### Step 1: Extract the Argument

Identify the AI's main claim and the reasoning that supports it. Write it out explicitly:

- Claim: [What the AI is asserting]
- Premise 1: [Supporting point]
- Premise 2: [Supporting point]
- Conclusion: [How premises lead to claim]

### Step 2: Verify the Facts

Check every factual claim against reliable sources:

- Are the statistics accurate?
- Are the technical details correct?
- Are the cited features real?
- Are the version numbers right?

### Step 3: Check the Logic

Evaluate the logical structure:

- Do the premises actually support the conclusion?
- Are there logical fallacies?
- Are there hidden assumptions?
- Is the reasoning internally consistent?

### Step 4: Identify Missing Information

What important factors did the AI not consider?

- Edge cases
- Trade-offs
- Alternative approaches
- Context-specific factors

### Step 5: Stress Test the Conclusion

Try to break the AI's conclusion:

- What evidence would contradict it?
- Under what conditions would it be wrong?
- What would an expert in this domain say?

## Practical Example: Auditing AI Architecture Advice

**AI Output:** "For your e-commerce platform, you should use a microservices architecture. Amazon uses microservices and handles millions of transactions. Microservices allow independent scaling, so your checkout service can scale independently of your product catalog. Each service can use the best technology for its purpose. This is the industry standard for modern e-commerce."

### Step 1: Extract the Argument

- Claim: Use microservices for your e-commerce platform
- Premise 1: Amazon uses microservices successfully
- Premise 2: Microservices allow independent scaling
- Premise 3: Each service can use the best technology
- Premise 4: It's the industry standard

### Step 2: Verify the Facts

- Amazon does use microservices. True.
- Microservices do allow independent scaling. True.
- Each service can use different technologies. True.
- It's the "industry standard." Questionable — many successful e-commerce platforms use monoliths.

### Step 3: Check the Logic

- Appeal to authority: Amazon's use of microservices doesn't mean it's right for you. Amazon has thousands of engineers and unique scale requirements.
- Missing context: What's your team size? Your transaction volume? Your deployment frequency?
- False dichotomy: Implies microservices vs. nothing, ignoring modular monoliths.

### Step 4: Identify Missing Information

- Team size and expertise with distributed systems
- Current and projected transaction volume
- Deployment frequency requirements
- Budget for infrastructure and operations
- Time to market pressures

### Step 5: Stress Test

- If the team has 3 developers, microservices would be a disaster.
- If transaction volume is 100/day, independent scaling is unnecessary.
- If time to market is critical, the complexity of microservices slows development.

**Conclusion:** The AI's advice is generic and potentially harmful. The right answer depends on context that the AI didn't consider.

## Building Your Detection Skills

### Practice with Known Examples

Take AI outputs on topics you already understand well and audit them. You'll quickly spot errors in familiar domains. This builds your detection muscle.

### Learn Common Fallacies

Study logical fallacies. The more fallacies you can name, the faster you'll spot them:

- Ad hominem (attacking the person, not the argument)
- Straw man (misrepresenting an argument to make it easier to attack)
- Slippery slope (assuming one event will inevitably lead to another)
- False equivalence (treating two unequal things as equal)
- Sunk cost fallacy (continuing because of past investment)

### Cross-Reference with Multiple Sources

Never rely on a single AI output for important decisions. Compare with:

- Other AI tools
- Official documentation
- Expert articles
- Community discussions

### Develop Domain Expertise

The more you know about a domain, the easier it is to spot broken reasoning in that domain. Invest in deep understanding of your core areas.

## The Confidence-Competence Gap

AI models are confident regardless of their competence on a specific question. This is the confidence-competence gap, and it's the most dangerous aspect of AI reasoning.

**How to handle it:**

- Never trust AI confidence as evidence of correctness
- Always verify important claims independently
- Treat AI output as a hypothesis to test, not a conclusion to accept
- Pay attention to what the AI is uncertain about — that's often where the real complexity lies

## When Broken Reasoning Is Subtle

The hardest broken reasoning to detect is the kind that's mostly right but has one subtle flaw.

**Example:** An AI correctly explains how to implement OAuth 2.0 but recommends storing refresh tokens in localStorage. The OAuth explanation is perfect. The token storage recommendation is a security vulnerability.

**How to catch it:** Review every recommendation independently. Don't let correct reasoning in one area blind you to errors in another.

## End-of-Chapter Checklist

- [ ] I understand the seven types of broken reasoning (hallucinated facts, false causation, overgeneralization, circular reasoning, false dichotomy, appeal to authority, missing counterarguments)
- [ ] I can apply the five-step reasoning audit framework
- [ ] I verify factual claims against reliable sources before accepting them
- [ ] I check logical structure for fallacies and hidden assumptions
- [ ] I identify missing information and counterarguments in AI output
- [ ] I stress-test AI conclusions by looking for contradictory evidence
- [ ] I understand the confidence-competence gap and never trust AI confidence as evidence

## What's Next

Detecting broken reasoning protects you from bad AI output. But what about building your own reasoning from the ground up? The next chapter teaches first principles thinking — the most powerful reasoning technique available.

**Next:** [First Principles Thinking: Reasoning From Scratch](./first-principles)
