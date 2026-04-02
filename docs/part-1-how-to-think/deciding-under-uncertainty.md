---
title: Deciding Under Uncertainty
description: How to make sound decisions when you don't have complete information
---

# Deciding Under Uncertainty

In software development, you rarely have complete information. You don't know exactly how users will behave. You don't know exactly how the system will scale. You don't know exactly how a technology will evolve.

And yet, you must decide. Every day, you make decisions that commit resources, shape architecture, and affect users — all with incomplete information.

The developers who excel are not the ones who wait for certainty. They're the ones who make good decisions despite uncertainty.

This chapter teaches you frameworks and techniques for deciding under uncertainty — making calls that are defensible, reversible when needed, and aligned with your goals.

## Types of Uncertainty

### Aleatoric Uncertainty (Inherent Randomness)

This is uncertainty that cannot be reduced, no matter how much information you gather. The outcome is genuinely random.

**Example:** Whether a specific user will click a button. You can estimate the probability, but you can't know for certain.

### Epistemic Uncertainty (Lack of Knowledge)

This is uncertainty that could be reduced with more information.

**Example:** Whether a new technology will meet performance requirements. You could run benchmarks to reduce this uncertainty.

**Key insight:** Distinguish between these two types. For aleatoric uncertainty, you need probabilistic thinking. For epistemic uncertainty, you need information gathering — but only up to the point where the cost of more information exceeds its value.

## Decision Frameworks

### Framework 1: Expected Value

When outcomes are uncertain but probabilities are estimable, calculate expected value.

**Formula:** Expected Value = (Probability of Outcome A × Value of Outcome A) + (Probability of Outcome B × Value of Outcome B) + ...

**Example:** Should we invest two weeks in performance optimization?

- 60% chance it reduces load time by 50%, increasing conversions by 10% → $50,000/year value
- 30% chance it reduces load time by 20%, increasing conversions by 4% → $20,000/year value
- 10% chance it has no measurable impact → $0 value

Expected Value = (0.6 × $50,000) + (0.3 × $20,000) + (0.1 × $0) = $36,000/year

Cost: 2 weeks of developer time ≈ $10,000

Expected Value ($36,000) > Cost ($10,000). The investment is justified.

### Framework 2: Reversible vs. Irreversible Decisions

Not all decisions have the same cost of being wrong. Categorize decisions by reversibility:

**Type 1: Irreversible (or nearly so)**
- High cost of being wrong
- Requires thorough analysis
- Examples: Choosing a core database, signing a multi-year contract, laying off a team

**Type 2: Reversible with cost**
- Moderate cost of being wrong
- Requires reasonable analysis
- Examples: Choosing a framework, designing an API, selecting a deployment strategy

**Type 3: Easily reversible**
- Low cost of being wrong
- Requires minimal analysis
- Examples: Trying a new library, changing a UI color, adjusting a configuration

**Rule:** Spend decision-making effort proportional to irreversibility. Don't overthink reversible decisions. Don't underthink irreversible ones.

### Framework 3: The OODA Loop

Observe, Orient, Decide, Act. Originally developed for military strategy, the OODA loop is powerful for software decisions.

**Observe:** Gather information about the situation.
**Orient:** Interpret the information in context. Update your mental model.
**Decide:** Choose a course of action.
**Act:** Execute the decision.

Then loop back to Observe. The faster you cycle through the loop, the faster you learn and adapt.

**Application:** Instead of spending months analyzing the perfect architecture, deploy a reasonable architecture, observe how it performs, orient based on real data, decide on adjustments, and act. Repeat.

### Framework 4: Optionality

Preserve options when uncertainty is high. An option is the right but not the obligation to take a future action.

**Example:** Instead of committing to a single database, design an abstraction layer that allows you to switch databases later. This option has a cost (the abstraction layer) but preserves flexibility.

**When to buy options:** When uncertainty is high and the cost of being wrong is significant.

**When to skip options:** When uncertainty is low or the cost of the option exceeds the value of flexibility.

### Framework 5: Regret Minimization

Project yourself into the future and ask: "Which decision will I regret less?"

**Example:** Should we build this feature in-house or buy a third-party solution?

- If we build and it fails: We wasted time and money.
- If we buy and it's insufficient: We're locked into a vendor and may need to rebuild.
- If we build and it succeeds: We have a competitive advantage.
- If we buy and it works: We saved time and can focus on our core differentiator.

Which outcome would you regret more? The answer guides your decision.

## Practical Techniques

### Technique 1: Pre-Mortem

Before making a decision, imagine it's one year later and the decision was a disaster. Work backward: what went wrong?

This reveals risks that optimistic thinking misses. It's especially valuable for Type 1 (irreversible) decisions.

### Technique 2: Reference Class Forecasting

Instead of estimating based on your specific case, look at similar cases and their outcomes.

**Bad estimation:** "This project will take 3 months because we're skilled and motivated."
**Reference class forecasting:** "Similar projects in our organization have taken 4-8 months. Our estimate should be in that range."

### Technique 3: The Outside View

Step outside your specific situation and look at the base rate.

**Inside view:** "Our team is special. We'll succeed where others failed."
**Outside view:** "80% of similar initiatives fail. What makes us different? Do we have evidence for that difference?"

### Technique 4: Decision Trees

Map out decisions, possible outcomes, and their probabilities visually. This reveals the structure of complex decisions and helps you identify the highest-value information to gather.

### Technique 5: Confidence Intervals

Instead of giving a single estimate, give a range with a confidence level.

**Bad:** "This will take 3 months."
**Good:** "I'm 80% confident this will take between 2 and 5 months."

Confidence intervals force you to acknowledge uncertainty and communicate it honestly.

## Deciding Under Uncertainty with AI

AI changes the uncertainty landscape:

### AI Reduces Some Uncertainty

AI can help you:
- Analyze historical data to estimate probabilities
- Simulate scenarios to understand potential outcomes
- Identify risks you might have missed
- Generate options you might not have considered

### AI Creates New Uncertainty

AI introduces:
- Uncertainty about output quality (will the generated code be correct?)
- Uncertainty about model behavior (will the model perform consistently?)
- Uncertainty about long-term effects (how will AI-generated code age?)

### The AI Decision Framework

When making decisions involving AI:

1. **Identify what AI can estimate** (probabilities, patterns, scenarios)
2. **Identify what AI cannot estimate** (human behavior, ethical implications, strategic context)
3. **Use AI for what it's good at** (data analysis, scenario generation)
4. **Use human judgment for what AI is bad at** (value judgments, ethical decisions, strategic direction)
5. **Monitor AI-assisted decisions** and update your models based on outcomes

## Common Decision-Making Mistakes

### Mistake 1: Waiting for Certainty

Certainty is impossible. Waiting for it means never deciding.

**Fix:** Decide with the information you have. Build in reversibility where possible.

### Mistake 2: Overconfidence

Overestimating the accuracy of your predictions leads to bad decisions.

**Fix:** Use confidence intervals. Seek disconfirming evidence. Track your calibration.

### Mistake 3: Analysis Paralysis

Over-analyzing reversible decisions wastes time and energy.

**Fix:** Categorize decisions by reversibility. Spend effort proportional to irreversibility.

### Mistake 4: Sunk Cost Fallacy

Continuing a failing course of action because of past investment.

**Fix:** Evaluate decisions based on future costs and benefits, not past investments.

### Mistake 5: Confirmation Bias

Seeking information that confirms your preferred decision.

**Fix:** Actively seek disconfirming evidence. Use pre-mortems. Consult people who disagree with you.

## Building Decision-Making Muscle

### Track Your Decisions

Keep a decision journal. For each significant decision, record:

- The decision
- The information you had
- Your reasoning
- Your expected outcome
- Your confidence level

Review quarterly. Compare expected outcomes to actual outcomes. This builds calibration and improves future decisions.

### Practice with Low-Stakes Decisions

Practice decision frameworks on low-stakes decisions. The skill transfers to high-stakes decisions when you need it.

### Seek Diverse Perspectives

Before making important decisions, consult people with different perspectives. They'll see risks and opportunities you miss.

## End-of-Chapter Checklist

- [ ] I understand the two types of uncertainty (aleatoric and epistemic)
- [ ] I can apply five decision frameworks: expected value, reversibility categorization, OODA loop, optionality, and regret minimization
- [ ] I use practical techniques: pre-mortem, reference class forecasting, outside view, decision trees, and confidence intervals
- [ ] I know how AI changes the uncertainty landscape and how to leverage it appropriately
- [ ] I avoid the five common decision-making mistakes
- [ ] I keep a decision journal to improve my calibration
- [ ] I spend decision-making effort proportional to the irreversibility of the decision

## What's Next

Decision-making under uncertainty is essential, but all the decision frameworks in the world are useless if you can't learn and adapt. The final chapter of Part 1 teaches you the meta-skill that makes everything else possible: learning how to learn in the AI era.

**Next:** [Learning How to Learn in the AI Era](./learning-how-to-learn)
