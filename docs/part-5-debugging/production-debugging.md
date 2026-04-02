---
title: "Production Debugging: When AI Goes Wrong Live"
description: How to debug AI systems in production when things go wrong
---

# Production Debugging: When AI Goes Wrong Live

Production debugging is hard. Production debugging of AI systems is harder. When an AI system produces incorrect, harmful, or unexpected output in production, you need to:

1. Detect the problem quickly
2. Understand what went wrong
3. Fix it without making things worse
4. Prevent it from happening again

Traditional debugging tools — breakpoints, stack traces, log files — are insufficient for AI systems. AI failures are often non-deterministic, context-dependent, and emergent.

This chapter teaches you to debug AI systems in production.

## The Production Debugging Framework

### Step 1: Detect

You can't fix what you don't know is broken. Detection requires:

**Monitoring:**
- Response quality scores (continuous evaluation)
- Error rates (exceptions, timeouts, failures)
- Latency (response time percentiles)
- User feedback (thumbs up/down, complaints)
- Business metrics (conversion rates, engagement)

**Alerting:**
- Quality score drops below threshold
- Error rate spikes
- Latency exceeds SLA
- Unusual patterns detected

```python
def monitor_quality():
    """Monitor AI system quality in production."""
    recent_scores = get_recent_quality_scores(window="1h")
    
    if np.mean(recent_scores) < QUALITY_THRESHOLD:
        alert(
            level="critical",
            message=f"Quality dropped to {np.mean(recent_scores):.2f}",
            context={"scores": recent_scores, "threshold": QUALITY_THRESHOLD},
        )
    
    if len(recent_scores) > 0 and np.std(recent_scores) > VARIANCE_THRESHOLD:
        alert(
            level="warning",
            message=f"Quality variance increased to {np.std(recent_scores):.2f}",
            context={"variance": np.std(recent_scores)},
        )
```

### Step 2: Triage

When an alert fires, determine:

**Severity:**
- Critical: System is producing harmful or completely wrong output
- High: System quality is significantly degraded
- Medium: System quality is slightly degraded
- Low: Edge case failure affecting few users

**Scope:**
- How many users are affected?
- Which features are affected?
- Is it a regression or a new issue?

**Urgency:**
- Does it need immediate action (roll back)?
- Can it wait for investigation?

### Step 3: Isolate

Find the root cause. For AI systems, this means checking:

**Input Analysis:**
- What inputs triggered the bad output?
- Are there patterns in the problematic inputs?
- Is it a specific type of query or user?

**Context Analysis:**
- What context was provided to the AI?
- Was the retrieved context relevant and accurate?
- Was the context stale or corrupted?

**Model Analysis:**
- Was there a model update?
- Is the model version correct?
- Are there known issues with this model version?

**System Analysis:**
- Are there infrastructure issues (network, database, cache)?
- Are there dependency issues (API changes, library updates)?
- Are there configuration issues (wrong parameters, missing env vars)?

```python
def investigate_incident(incident_id: str):
    """Investigate a production incident."""
    incident = get_incident(incident_id)
    
    # Analyze the problematic interaction
    interaction = get_interaction(incident.interaction_id)
    
    # Check input
    input_analysis = analyze_input(interaction.input)
    
    # Check context (for RAG systems)
    context_analysis = analyze_context(interaction.retrieved_context)
    
    # Check model
    model_analysis = check_model_version(interaction.model_version)
    
    # Check system health
    system_analysis = check_system_health(interaction.timestamp)
    
    return {
        "input_analysis": input_analysis,
        "context_analysis": context_analysis,
        "model_analysis": model_analysis,
        "system_analysis": system_analysis,
    }
```

### Step 4: Mitigate

Take immediate action to reduce impact:

**Rollback:**
- Revert to previous model version
- Revert to previous code deployment
- Disable the affected feature

**Circuit Breaker:**
- Stop sending traffic to the affected component
- Fall back to a simpler but reliable approach
- Enable human-in-the-loop mode

**Hotfix:**
- Patch the specific issue
- Update the prompt or context
- Add input filtering

```python
def mitigate_incident(incident: Incident):
    """Apply immediate mitigation."""
    if incident.severity == "critical":
        # Roll back to previous version
        rollback_model(incident.model_version)
        
        # Enable circuit breaker
        enable_circuit_breaker(incident.component)
        
        # Notify stakeholders
        notify_stakeholders(incident)
    
    elif incident.severity == "high":
        # Reduce traffic to affected component
        reduce_traffic(incident.component, percentage=50)
        
        # Enable enhanced monitoring
        enable_enhanced_monitoring(incident.component)
```

### Step 5: Fix

Implement a permanent fix:

1. **Root cause analysis:** Understand exactly what went wrong
2. **Fix implementation:** Address the root cause
3. **Testing:** Verify the fix in staging
4. **Deployment:** Deploy the fix with monitoring
5. **Verification:** Confirm the fix resolves the issue

### Step 6: Learn

Conduct a post-incident review:

1. **What happened?** Timeline of events
2. **Why did it happen?** Root cause analysis
3. **How was it detected?** Detection effectiveness
4. **How was it resolved?** Resolution effectiveness
5. **What can we prevent?** Action items for prevention

## Debugging Specific AI Failure Modes

### Hallucination in Production

**Symptoms:** AI produces factually incorrect information.

**Debugging steps:**
1. Check the retrieved context — was relevant information available?
2. Check the prompt — was the instruction clear about grounding in context?
3. Check the model — is this a known hallucination pattern?
4. Check the input — is the query ambiguous or misleading?

**Fixes:**
- Improve retrieval quality
- Strengthen prompt instructions
- Add fact-checking layer
- Implement confidence scoring

### Prompt Injection in Production

**Symptoms:** AI follows instructions embedded in user input.

**Debugging steps:**
1. Check the input — does it contain injection attempts?
2. Check the prompt — are instructions clearly separated from input?
3. Check the output — does it reveal system instructions or perform unauthorized actions?

**Fixes:**
- Improve input sanitization
- Strengthen prompt structure
- Add output filtering
- Implement tool access controls

### Quality Degradation

**Symptoms:** AI output quality gradually or suddenly drops.

**Debugging steps:**
1. Check for model updates — was the model changed?
2. Check for data drift — has the input distribution changed?
3. Check for context staleness — is the knowledge base outdated?
4. Check for dependency changes — have any dependencies been updated?

**Fixes:**
- Roll back model update
- Update knowledge base
- Retrain or fine-tune model
- Update dependency versions

## Production Debugging Tools

### Logging

```python
import logging
import json

def log_interaction(query: str, response: str, context: dict, metadata: dict):
    """Log every AI interaction for debugging."""
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "query": query,
        "response": response,
        "context_summary": summarize_context(context),
        "model_version": metadata.get("model_version"),
        "latency_ms": metadata.get("latency_ms"),
        "quality_score": metadata.get("quality_score"),
        "user_id": metadata.get("user_id"),
        "session_id": metadata.get("session_id"),
    }
    logging.info(json.dumps(log_entry))
```

### Tracing

```python
from opentelemetry import trace

tracer = trace.get_tracer("ai-system")

@tracer.start_as_current_span("ai.generate")
def generate_response(query: str) -> str:
    with tracer.start_as_current_span("retrieve_context") as span:
        context = retrieve_context(query)
        span.set_attribute("context_size", len(context))
    
    with tracer.start_as_current_span("llm.generate") as span:
        response = llm.generate(query, context)
        span.set_attribute("response_length", len(response))
    
    return response
```

### Replay

```python
def replay_interaction(interaction_id: str):
    """Replay a production interaction in staging."""
    interaction = get_interaction(interaction_id)
    
    # Replay with current system
    new_response = ai_system(interaction.query, interaction.context)
    
    # Compare with original
    comparison = compare_responses(
        original=interaction.response,
        new=new_response,
    )
    
    return comparison
```

## End-of-Chapter Checklist

- [ ] I follow the six-step production debugging framework (detect, triage, isolate, mitigate, fix, learn)
- [ ] I have monitoring and alerting for AI system quality
- [ ] I can investigate incidents by analyzing input, context, model, and system
- [ ] I know mitigation strategies: rollback, circuit breaker, hotfix
- [ ] I conduct post-incident reviews to prevent recurrence
- [ ] I can debug specific AI failure modes: hallucination, prompt injection, quality degradation
- [ ] I use logging, tracing, and replay tools for production debugging

## What's Next

Part 5 is complete. You now have the debugging skills to understand, evaluate, and fix AI-generated code. Part 6 dives deep into AI tools and agents — the practical mastery that defines 2026 development.

**Next:** [Cursor vs Copilot vs Claude Code: The 2026 Comparison](../part-6-ai-agents/cursor-vs-copilot-vs-claude)
