---
title: "Agent Orchestration: Managing Multiple AI Workers"
description: How to coordinate multiple AI agents to solve complex problems efficiently
---

# Agent Orchestration: Managing Multiple AI Workers

A single AI agent can handle many tasks. But the most powerful AI systems coordinate multiple agents, each with specialized capabilities, working together toward a common goal.

Orchestration is the art and science of managing these multi-agent systems — deciding which agent does what, when, and how they communicate. It's the difference between a chaotic swarm and a coordinated team.

This chapter teaches you to orchestrate multiple AI agents effectively.

## The Orchestration Challenge

Managing multiple AI agents introduces challenges that single-agent systems don't have:

1. **Task allocation:** Which agent handles which task?
2. **Communication:** How do agents share information?
3. **Conflict resolution:** What happens when agents disagree?
4. **Resource management:** How do you control costs and prevent runaway agents?
5. **Quality control:** How do you ensure the collective output meets standards?
6. **Error handling:** What happens when one agent fails?

## Orchestration Architectures

### Architecture 1: Centralized Orchestrator

A single orchestrator agent manages all worker agents.

```
                    ┌──────────────┐
                    │  Orchestrator │
                    │    Agent      │
                    └───────┬───────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
      ┌─────┴─────┐   ┌────┴─────┐   ┌─────┴─────┐
      │ Researcher │   │ Analyst  │   │  Writer   │
      │   Agent    │   │  Agent   │   │  Agent    │
      └───────────┘   └──────────┘   └───────────┘
```

**How it works:**
1. Orchestrator receives the goal
2. Orchestrator breaks the goal into sub-tasks
3. Orchestrator assigns sub-tasks to worker agents
4. Worker agents complete their tasks and report back
5. Orchestrator combines results and produces final output

**Best for:** Complex projects requiring coordination across domains.

**Implementation with LangGraph:**

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class OrchestratorState(TypedDict):
    goal: str
    research_results: str
    analysis_results: str
    final_output: str
    current_step: str

def orchestrator_node(state):
    goal = state["goal"]
    # Decide next step
    if not state.get("research_results"):
        return {"current_step": "research"}
    elif not state.get("analysis_results"):
        return {"current_step": "analysis"}
    else:
        return {"current_step": "synthesize"}

def researcher_node(state):
    result = researcher_agent.invoke(state["goal"])
    return {"research_results": result.content}

def analyst_node(state):
    result = analyst_agent.invoke(state["research_results"])
    return {"analysis_results": result.content}

def synthesizer_node(state):
    result = writer_agent.invoke({
        "research": state["research_results"],
        "analysis": state["analysis_results"],
    })
    return {"final_output": result.content}

graph = StateGraph(OrchestratorState)
graph.add_node("orchestrator", orchestrator_node)
graph.add_node("research", researcher_node)
graph.add_node("analyze", analyst_node)
graph.add_node("synthesize", synthesizer_node)

graph.add_edge("__start__", "orchestrator")
graph.add_conditional_edges("orchestrator", 
    lambda s: s["current_step"],
    {"research": "research", "analysis": "analyze", "synthesize": "synthesize"}
)
graph.add_edge("research", "orchestrator")
graph.add_edge("analyze", "orchestrator")
graph.add_edge("synthesize", END)

app = graph.compile()
```

### Architecture 2: Peer-to-Peer

Agents communicate directly with each other without a central orchestrator.

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│Researcher│◀──▶│ Analyst  │◀──▶│  Writer  │
│  Agent   │    │  Agent   │    │  Agent   │
└──────────┘    └──────────┘    └──────────┘
```

**How it works:**
1. Each agent knows its role and when to act
2. Agents pass results directly to the next agent
3. No central coordination needed

**Best for:** Well-defined pipelines where the sequence is fixed.

### Architecture 3: Blackboard

Agents share a common workspace (the "blackboard") and contribute independently.

```
┌──────────────────────────────────────────┐
│              Blackboard                   │
│  (Shared state / message queue)           │
│  - Task queue                             │
│  - Results store                          │
│  - Status tracking                        │
└────────────┬─────────────────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
  Agent    Agent    Agent
```

**How it works:**
1. Tasks are posted to the blackboard
2. Agents pick up tasks they can handle
3. Agents post results back to the blackboard
4. A supervisor monitors progress and combines results

**Best for:** Flexible workloads where agents have overlapping capabilities.

## Communication Patterns

### Pattern 1: Sequential Handoff

Agent A completes its work and passes results to Agent B.

```python
def sequential_handoff():
    research = researcher.invoke(goal)
    analysis = analyst.invoke(research.output)
    report = writer.invoke(analysis.output)
    return report
```

### Pattern 2: Parallel Execution

Multiple agents work simultaneously on independent sub-tasks.

```python
import asyncio

async def parallel_execution():
    research_task = asyncio.create_task(researcher.ainvoke(goal))
    market_task = asyncio.create_task(market_analyst.ainvoke(goal))
    
    research, market = await asyncio.gather(research_task, market_task)
    
    synthesis = await synthesizer.ainvoke({
        "research": research.output,
        "market": market.output,
    })
    return synthesis
```

### Pattern 3: Iterative Refinement

Agents cycle through refinement until quality criteria are met.

```python
def iterative_refinement(max_iterations=5):
    draft = writer.invoke(goal)
    
    for i in range(max_iterations):
        review = reviewer.invoke(draft.output)
        
        if review.quality_score >= 0.9:
            break
        
        draft = writer.invoke({
            "goal": goal,
            "previous_draft": draft.output,
            "feedback": review.feedback,
        })
    
    return draft
```

### Pattern 4: Debate and Consensus

Multiple agents independently produce outputs, then a judge selects the best.

```python
def debate_and_consensus():
    outputs = [agent.invoke(goal) for agent in agents]
    
    # Judge evaluates all outputs
    best = judge.invoke({
        "goal": goal,
        "candidates": [o.output for o in outputs],
    })
    
    return best.selected_output
```

## Resource Management

### Cost Control

```python
class BudgetManager:
    def __init__(self, daily_budget: float):
        self.daily_budget = daily_budget
        self.spent = 0
    
    def check_budget(self, estimated_cost: float) -> bool:
        return self.spent + estimated_cost <= self.daily_budget
    
    def record_usage(self, cost: float):
        self.spent += cost
    
    def get_remaining(self) -> float:
        return self.daily_budget - self.spent
```

### Rate Limiting

```python
from collections import deque
import time

class RateLimiter:
    def __init__(self, max_calls: int, window_seconds: int):
        self.max_calls = max_calls
        self.window = window_seconds
        self.calls = deque()
    
    def allow(self) -> bool:
        now = time.time()
        # Remove old calls
        while self.calls and self.calls[0] < now - self.window:
            self.calls.popleft()
        
        if len(self.calls) >= self.max_calls:
            return False
        
        self.calls.append(now)
        return True
```

### Timeout Management

```python
import signal

class TimeoutError(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutError("Agent execution timed out")

def run_with_timeout(agent, input_data, timeout_seconds=60):
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout_seconds)
    
    try:
        result = agent.invoke(input_data)
        signal.alarm(0)  # Cancel the alarm
        return result
    except TimeoutError:
        return {"error": f"Agent timed out after {timeout_seconds}s"}
```

## Error Handling in Multi-Agent Systems

### Agent Failure Recovery

```python
def execute_with_fallback(agent, backup_agent, input_data):
    """Try primary agent, fall back to backup on failure."""
    try:
        result = agent.invoke(input_data)
        if result.quality_score < 0.5:
            raise ValueError("Low quality output")
        return result
    except Exception:
        return backup_agent.invoke(input_data)
```

### Circuit Breaker

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_count = 0
        self.threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.last_failure_time = 0
        self.state = "closed"  # closed, open, half-open
    
    def allow_request(self) -> bool:
        if self.state == "closed":
            return True
        elif self.state == "open":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "half-open"
                return True
            return False
        else:  # half-open
            return True
    
    def record_success(self):
        self.failure_count = 0
        self.state = "closed"
    
    def record_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.threshold:
            self.state = "open"
```

## Monitoring Multi-Agent Systems

```python
class AgentMonitor:
    def __init__(self):
        self.metrics = {}
    
    def record_execution(self, agent_name: str, duration: float, 
                         cost: float, quality: float, success: bool):
        if agent_name not in self.metrics:
            self.metrics[agent_name] = {
                "executions": 0,
                "total_duration": 0,
                "total_cost": 0,
                "quality_scores": [],
                "successes": 0,
                "failures": 0,
            }
        
        m = self.metrics[agent_name]
        m["executions"] += 1
        m["total_duration"] += duration
        m["total_cost"] += cost
        m["quality_scores"].append(quality)
        m["successes" if success else "failures"] += 1
    
    def get_agent_health(self, agent_name: str) -> dict:
        m = self.metrics[agent_name]
        return {
            "success_rate": m["successes"] / m["executions"],
            "avg_quality": np.mean(m["quality_scores"]),
            "avg_duration": m["total_duration"] / m["executions"],
            "total_cost": m["total_cost"],
        }
```

## End-of-Chapter Checklist

- [ ] I understand the orchestration challenges in multi-agent systems
- [ ] I can implement the three orchestration architectures (centralized, peer-to-peer, blackboard)
- [ ] I know the four communication patterns (sequential, parallel, iterative, debate)
- [ ] I implement resource management: cost control, rate limiting, timeout management
- [ ] I handle errors with fallbacks and circuit breakers
- [ ] I monitor multi-agent system health with comprehensive metrics

## What's Next

Agent orchestration manages AI workers. But AI can also automate entire workflows. The final Part 6 chapter covers AI workflow automation with n8n, Zapier, and beyond.

**Next:** [AI Workflow Automation: n8n, Zapier, and Beyond](./ai-workflow-automation)
