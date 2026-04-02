---
title: Working With AI, Not For AI
description: How to establish a productive partnership with AI tools where you remain in control and AI amplifies your capabilities
---

# Working With AI, Not For AI

There are three ways developers relate to AI:

**Working for AI:** You accept AI output without question. You adapt your workflow to what AI can do easily. You let AI drive. This is the path to irrelevance.

**Working against AI:** You resist AI tools. You insist on writing everything manually. You view AI as a threat. This is the path to obsolescence.

**Working with AI:** You direct AI. You use it as a tool to amplify your capabilities. You maintain control over decisions, quality, and outcomes. This is the path to becoming an Architect of Intent.

This chapter teaches you to work with AI — to establish a partnership where you're the architect and AI is the builder.

## The Partnership Model

Think of AI as a highly skilled but imperfect collaborator. It has strengths and weaknesses:

### AI's Strengths

- **Speed:** Generates code, documentation, and analysis faster than any human
- **Breadth:** Knows every language, framework, and library
- **Pattern recognition:** Identifies patterns across vast amounts of code
- **Availability:** Always ready, never tired, never distracted
- **Consistency:** Applies the same standards every time

### AI's Weaknesses

- **No true understanding:** Predicts tokens, doesn't comprehend meaning
- **No accountability:** Cannot take responsibility for outcomes
- **No context awareness:** Doesn't know your specific situation unless you tell it
- **No judgment:** Cannot weigh trade-offs based on business context
- **No creativity:** Reproduces patterns from training data, doesn't invent new ones

### Your Role

Your role in the partnership is to:

1. **Define the problem** — AI can't do this
2. **Set the constraints** — AI doesn't know your constraints
3. **Evaluate the output** — AI can't judge quality in your context
4. **Make the decisions** — AI can recommend, but you decide
5. **Take responsibility** — AI cannot be held accountable

:::info
**The Partnership Principle:** AI is a force multiplier, not a replacement. Your value comes from the judgment, context, and responsibility that AI cannot provide. The better you direct AI, the more your value multiplies.
:::

## The AI Workflow

Here's a practical workflow for working with AI effectively.

### Phase 1: Preparation (Human)

Before engaging AI, do the thinking work:

1. **Define the problem clearly.** What are you trying to achieve?
2. **Identify constraints.** Performance, security, compatibility, timeline, resources.
3. **Determine the approach.** What's the high-level strategy?
4. **Break it into pieces.** What are the sub-tasks AI can help with?

This preparation is critical. AI amplifies your thinking — if your thinking is unclear, AI amplifies the confusion.

### Phase 2: Direction (Human → AI)

Give AI clear, specific directions:

1. **Provide context.** What's the project? What technologies? What constraints?
2. **Specify the task.** What exactly should AI do?
3. **Set the format.** What output format do you need?
4. **Define quality criteria.** What makes a good result?

**Good prompt:**
```
I'm building a REST API with Express.js and PostgreSQL. I need a middleware function that:
- Validates request body against a JSON schema
- Returns 400 with specific error messages for each validation failure
- Handles nested object validation
- Is compatible with Express error handling middleware
- Includes TypeScript types

The validation schema will be passed as a parameter. Use the ajv library.
```

**Bad prompt:**
```
Write validation middleware for Express.
```

### Phase 3: Execution (AI)

AI generates the output. This is the fastest phase.

### Phase 4: Evaluation (Human)

This is where the real work happens:

1. **Read every line.** Don't skim. Understand what the code does.
2. **Check for correctness.** Does it solve the problem?
3. **Check for security.** Are there vulnerabilities?
4. **Check for efficiency.** Is the approach optimal?
5. **Check for consistency.** Does it match your codebase's patterns?
6. **Test it.** Run it. Verify it works as expected.

### Phase 5: Integration (Human)

1. **Adapt the code** to fit your codebase's patterns and conventions.
2. **Add tests** that cover the new functionality.
3. **Add documentation** explaining what the code does and why.
4. **Commit with a clear message** that explains the change.

### Phase 6: Reflection (Human)

1. **What did I learn?** Did AI teach me something new?
2. **What would I do differently?** Could I have directed AI better?
3. **What patterns emerged?** Are there reusable approaches?

## The Delegation Matrix

Not everything should be delegated to AI. Use this matrix to decide:

| | High Understanding Required | Low Understanding Required |
|---|---|---|
| **High Impact** | Do yourself with AI assistance | Do yourself, verify with AI |
| **Low Impact** | Direct AI, review carefully | Delegate to AI, spot-check |

**High Impact + High Understanding:** Architecture decisions, security-critical code, core business logic. You do the thinking, AI assists with implementation details.

**High Impact + Low Understanding:** Boilerplate, standard patterns, well-documented APIs. You design the approach, AI implements it, you review thoroughly.

**Low Impact + High Understanding:** Complex but isolated tasks. Direct AI carefully, review the output.

**Low Impact + Low Understanding:** Simple utilities, formatting, documentation. Delegate to AI, spot-check the results.

## Common Anti-Patterns

### Anti-Pattern 1: The Prompt-and-Pray

You prompt AI, accept the output, and hope it works.

**Fix:** Always evaluate and test AI output. Never accept without verification.

### Anti-Pattern 2: The Over-Delegation

You delegate thinking to AI, not just implementation.

**Fix:** Do the thinking work yourself. Use AI for implementation, not for decisions.

### Anti-Pattern 3: The Under-Delegation

You use AI only for autocomplete, missing its full potential.

**Fix:** Expand your AI usage to include code generation, refactoring, testing, documentation, and analysis.

### Anti-Pattern 4: The Dependency

You can't work without AI. When AI is down, you're paralyzed.

**Fix:** Maintain your core skills. Practice working without AI regularly. AI is a tool, not a crutch.

### Anti-Pattern 5: The Echo Chamber

You only ask AI questions that confirm your existing beliefs.

**Fix:** Ask AI to challenge your assumptions. Ask for counterarguments. Seek diverse perspectives.

## Building AI Fluency

AI fluency is not about knowing every AI tool. It's about understanding how to work with AI effectively.

### Skill 1: Prompt Crafting

Write prompts that are specific, contextual, and constrained. Practice this skill daily.

### Skill 2: Output Evaluation

Develop the ability to quickly assess AI output for correctness, security, efficiency, and consistency.

### Skill 3: Iterative Refinement

When AI output isn't right, refine your prompt and try again. Learn from each iteration.

### Skill 4: Tool Selection

Know which AI tool is best for which task. Different tools have different strengths.

### Skill 5: Limitation Awareness

Understand what AI cannot do well. Don't ask AI to do things it's bad at.

## The Human Advantage

As AI gets better, your human advantages become more valuable:

1. **Context:** You know your specific situation. AI doesn't.
2. **Judgment:** You can weigh trade-offs. AI can only list them.
3. **Responsibility:** You can be held accountable. AI cannot.
4. **Creativity:** You can invent new approaches. AI can only recombine existing ones.
5. **Empathy:** You understand user needs and stakeholder concerns. AI cannot.
6. **Ethics:** You can make moral judgments. AI has no moral compass.

Invest in these advantages. They're your career insurance.

## End-of-Chapter Checklist

- [ ] I understand the three ways developers relate to AI (for, against, with) and commit to working with AI
- [ ] I know AI's strengths and weaknesses and work within them
- [ ] I follow the six-phase AI workflow (prepare, direct, execute, evaluate, integrate, reflect)
- [ ] I use the delegation matrix to decide what to delegate to AI
- [ ] I avoid the five common anti-patterns
- [ ] I'm building AI fluency across all five skills
- [ ] I invest in my human advantages: context, judgment, responsibility, creativity, empathy, and ethics

## What's Next

Working with AI effectively requires not just technical skill but ethical awareness. The next chapter explores ethical reasoning in the AI era — how to make decisions that are not just technically sound but morally right.

**Next:** [Ethical Reasoning in the AI Era](./ethical-reasoning)
