---
title: "Root Cause Analysis: Finding the Real Problem"
description: How to systematically find the underlying cause of problems instead of treating symptoms
---

# Root Cause Analysis: Finding the Real Problem

Most debugging treats symptoms, not causes. The API is slow → add caching. The database is overloaded → add more servers. The application crashes → restart it.

These fixes work temporarily. But the underlying cause remains, and the problem will return — often worse than before.

Root cause analysis (RCA) is the systematic process of finding the underlying cause of a problem. It's the difference between putting out fires and fireproofing the building.

This chapter teaches you to conduct effective root cause analysis.

## The RCA Process

### Step 1: Define the Problem

Be specific about what's happening.

**Bad:** "The system is slow."
**Good:** "The /api/users endpoint response time increased from 200ms to 2000ms starting at 14:30 UTC on April 1."

### Step 2: Gather Evidence

Collect all relevant data:

- **Logs:** Application logs, system logs, access logs
- **Metrics:** CPU, memory, disk, network, response times
- **Traces:** Distributed traces showing request flow
- **Changes:** Recent deployments, configuration changes, data changes
- **User reports:** What users are experiencing

### Step 3: Identify Possible Causes

Brainstorm all possible causes. Don't filter yet.

**Technique: Fishbone Diagram**

```
                    ┌─────────────┐
                    │   Problem   │
                    │  (Slow API) │
                    └──────┬──────┘
                           │
    ┌──────────┬───────────┼───────────┬──────────┐
    │          │           │           │          │
┌───┴───┐  ┌───┴───┐  ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
│ People│  │Process│  │System │  │ Data  │  │External│
└───────┘  └───────┘  └───────┘  └───────┘  └───────┘
```

For each category, list possible causes:

- **People:** Did someone change a configuration? Deploy new code?
- **Process:** Did a deployment process skip a step? Was testing inadequate?
- **System:** Did a server fail? Is there a resource leak?
- **Data:** Did data volume increase? Is there a data quality issue?
- **External:** Did a third-party API slow down? Is there a network issue?

### Step 4: Test Each Hypothesis

For each possible cause, test whether it explains the evidence.

**Technique: Elimination**

| Hypothesis | Evidence For | Evidence Against | Verdict |
|-----------|-------------|-----------------|---------|
| New deployment caused it | Deployment at 14:25, slowdown at 14:30 | Rollback didn't fix it | Unlikely |
| Data volume increase | Table grew 10x last week | Query plan unchanged | Possible |
| Missing index | Query does full table scan | Index existed before | Likely |
| Third-party API | External API latency increased | Internal API also slow | Unlikely |

### Step 5: Identify the Root Cause

The root cause is the deepest cause that, if fixed, would prevent the problem from recurring.

**Technique: Five Whys**

1. Why is the API slow? → The database query is slow.
2. Why is the query slow? → It's doing a full table scan.
3. Why is it doing a full table scan? → The index on `user_email` is missing.
4. Why is the index missing? → The migration that adds it failed silently.
5. Why did the migration fail silently? → The migration script doesn't check for errors.

**Root cause:** Migration scripts don't validate their execution, allowing silent failures.

### Step 6: Implement the Fix

Fix the root cause, not just the symptom.

**Symptom fix:** Add the missing index manually.
**Root cause fix:** Fix the migration script to validate execution and alert on failure. Add the missing index. Add monitoring for migration health.

### Step 7: Verify the Fix

Confirm that the fix resolves the problem and doesn't introduce new problems.

- Monitor the affected metric
- Run regression tests
- Check for side effects

### Step 8: Document and Prevent

Document the RCA and implement preventive measures.

- What happened?
- Why did it happen?
- How was it fixed?
- What preventive measures were implemented?
- What lessons were learned?

## RCA Techniques

### Technique 1: Five Whys

Ask "why" five times to drill down to the root cause.

**When to use:** Simple to moderate problems with a clear causal chain.

### Technique 2: Fishbone Diagram

Categorize possible causes and systematically evaluate each.

**When to use:** Complex problems with multiple potential cause categories.

### Technique 3: Fault Tree Analysis

Build a tree of events that could lead to the problem, with logical gates (AND, OR).

**When to use:** Safety-critical systems where you need to understand all failure paths.

### Technique 4: Change Analysis

Compare the system before and after the problem started. What changed?

**When to use:** Problems that started at a specific point in time.

### Technique 5: Barrier Analysis

Identify the barriers that should have prevented the problem and why they failed.

**When to use:** Problems that should have been caught by existing safeguards.

## RCA in AI Systems

AI systems introduce unique root causes:

### Model-Related Causes

- Model version change
- Training data drift
- Prompt template change
- Temperature/parameter change

### Data-Related Causes

- Input distribution shift
- Knowledge base staleness
- Embedding model change
- Vector database corruption

### System-Related Causes

- API rate limiting
- Token limit changes
- Infrastructure scaling
- Dependency updates

### AI-Specific RCA Questions

1. Did the model version change?
2. Did the prompt change?
3. Did the input distribution change?
4. Did the knowledge base change?
5. Did the evaluation criteria change?
6. Did a dependency change?

## Common RCA Mistakes

### Mistake 1: Stopping at the Symptom

Fixing the symptom without finding the root cause.

### Mistake 2: Blaming People

Attributing the cause to human error without examining the system that allowed the error.

### Mistake 3: Single Cause Thinking

Assuming there's only one root cause when multiple factors contributed.

### Mistake 4: Not Verifying

Implementing a fix without verifying it actually addresses the root cause.

### Mistake 5: Not Preventing

Fixing the problem without implementing preventive measures.

## End-of-Chapter Checklist

- [ ] I follow the eight-step RCA process
- [ ] I use appropriate RCA techniques (Five Whys, Fishbone, Fault Tree, Change Analysis, Barrier Analysis)
- [ ] I ask AI-specific RCA questions for AI system problems
- [ ] I avoid the five common RCA mistakes
- [ ] I document RCAs and implement preventive measures

## What's Next

Root cause analysis finds the real problem. But sometimes the standard solutions don't work. The final Part 7 chapter teaches creative solutions for when standard patterns fail.

**Next:** [Creative Solutions: When Standard Patterns Fail](./creative-solutions)
