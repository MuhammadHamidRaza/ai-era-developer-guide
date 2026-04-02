---
title: "Multi-Agent Patterns: CrewAI, LangGraph, and Beyond"
description: Practical patterns for building systems with multiple collaborating AI agents
---

# Multi-Agent Patterns: CrewAI, LangGraph, and Beyond

A single agent can handle many tasks. But complex problems often require multiple agents with specialized roles, working together in coordinated ways.

Multi-agent systems are the frontier of AI application development in 2026. Frameworks like CrewAI, LangGraph, AutoGen, and LangChain's multi-agent patterns make building these systems accessible — but using them effectively requires understanding the patterns that work and the pitfalls to avoid.

This chapter teaches you the practical patterns for multi-agent systems, with code examples and architectural guidance.

## Why Multi-Agent?

### Specialization

Different agents can specialize in different tasks, just like a team of humans. A research agent, a writing agent, and an editing agent will produce better content than a single general-purpose agent.

### Parallelism

Multiple agents can work on different parts of a problem simultaneously, reducing overall completion time.

### Robustness

Multiple agents can cross-validate each other's work, catching errors that a single agent might miss.

### Scalability

Adding more agents is easier than making a single agent handle more complexity.

## Pattern 1: Sequential Pipeline

Agents process data in a fixed sequence, each adding value.

```python
from crewai import Agent, Task, Crew

# Define specialized agents
researcher = Agent(
    role="Research Analyst",
    goal="Gather comprehensive information on the topic",
    backstory="Expert researcher with access to multiple data sources",
    tools=[search_tool, scrape_tool],
    verbose=True,
)

analyst = Agent(
    role="Data Analyst",
    goal="Analyze research findings and identify key insights",
    backstory="Senior analyst skilled in pattern recognition and synthesis",
    tools=[analysis_tool],
    verbose=True,
)

writer = Agent(
    role="Content Writer",
    goal="Write a clear, engaging report based on analysis",
    backstory="Experienced writer who transforms complex data into readable content",
    tools=[writing_tool],
    verbose=True,
)

# Define tasks
research_task = Task(
    description="Research the topic: {topic}",
    expected_output="Comprehensive research notes",
    agent=researcher,
)

analysis_task = Task(
    description="Analyze the research findings",
    expected_output="Key insights and recommendations",
    agent=analyst,
)

writing_task = Task(
    description="Write the final report",
    expected_output="Polished report document",
    agent=writer,
)

# Create crew with sequential process
crew = Crew(
    agents=[researcher, analyst, writer],
    tasks=[research_task, analysis_task, writing_task],
    process="sequential",  # Each task runs in order
    verbose=True,
)

result = crew.kickoff(inputs={"topic": "AI trends in 2026"})
```

**When to use:** Content creation, data processing pipelines, report generation.

**Pros:** Simple, predictable, easy to debug.

**Cons:** No parallelism, each step depends on the previous one.

## Pattern 2: Hierarchical Management

A manager agent delegates tasks to worker agents and coordinates their work.

```python
from crewai import Agent, Task, Crew

manager = Agent(
    role="Project Manager",
    goal="Coordinate the team to deliver the best result",
    backstory="Experienced manager who knows how to delegate effectively",
    allow_delegation=True,
    verbose=True,
)

developer = Agent(
    role="Senior Developer",
    goal="Write clean, efficient code",
    backstory="Expert developer with deep knowledge of best practices",
    tools=[code_tool, test_tool],
    verbose=True,
)

reviewer = Agent(
    role="Code Reviewer",
    goal="Ensure code quality and security",
    backstory="Senior reviewer with expertise in security and performance",
    tools=[review_tool, security_tool],
    verbose=True,
)

crew = Crew(
    agents=[manager, developer, reviewer],
    tasks=[
        Task(description="Build the feature: {feature}", agent=developer),
        Task(description="Review the code", agent=reviewer),
    ],
    process="hierarchical",  # Manager coordinates
    manager_agent=manager,
    verbose=True,
)
```

**When to use:** Complex projects requiring coordination, quality control, and dynamic task assignment.

**Pros:** Flexible, quality-controlled, adaptable.

**Cons:** Manager adds overhead, can become a bottleneck.

## Pattern 3: Consensus and Voting

Multiple agents independently solve the same problem, then their outputs are compared and the best (or consensus) is selected.

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    question: str
    answers: list
    final_answer: str

def agent1(state):
    return {"answers": [llm.invoke(state["question"])]}

def agent2(state):
    return {"answers": state["answers"] + [llm.invoke(state["question"])]}

def agent3(state):
    return {"answers": state["answers"] + [llm.invoke(state["question"])]}

def consensus(state):
    # Select the most common answer or use a judge LLM
    answers = state["answers"]
    final = judge_llm.invoke(f"Choose the best answer: {answers}")
    return {"final_answer": final}

graph = StateGraph(AgentState)
graph.add_node("agent1", agent1)
graph.add_node("agent2", agent2)
graph.add_node("agent3", agent3)
graph.add_node("consensus", consensus)

# Parallel execution
graph.add_edge("__start__", "agent1")
graph.add_edge("__start__", "agent2")
graph.add_edge("__start__", "agent3")
graph.add_edge("agent1", "consensus")
graph.add_edge("agent2", "consensus")
graph.add_edge("agent3", "consensus")
graph.add_edge("consensus", END)

app = graph.compile()
result = app.invoke({"question": "What is the best architecture for our use case?"})
```

**When to use:** High-stakes decisions, fact-checking, quality-critical outputs.

**Pros:** Reduces individual agent errors, provides confidence through agreement.

**Cons:** Higher cost (multiple LLM calls), slower.

## Pattern 4: Debate and Refinement

Agents debate a topic, refining their positions based on counterarguments.

```python
def debate_round(state):
    pro_argument = pro_agent.invoke(state["topic"])
    con_argument = con_agent.invoke(state["topic"])
    
    # Each agent responds to the other's argument
    pro_rebuttal = pro_agent.invoke(f"Respond to: {con_argument}")
    con_rebuttal = con_agent.invoke(f"Respond to: {pro_argument}")
    
    return {
        "arguments": state["arguments"] + [
            pro_argument, con_argument, pro_rebuttal, con_rebuttal
        ]
    }

def judge(state):
    return {
        "conclusion": judge_agent.invoke(
            f"Based on this debate, what is the most balanced conclusion? {state['arguments']}"
        )
    }
```

**When to use:** Complex decisions with multiple valid perspectives, policy analysis, risk assessment.

**Pros:** Explores multiple viewpoints, produces nuanced conclusions.

**Cons:** Can be circular, requires a good judge agent.

## Pattern 5: Specialized Tool Agents

Each agent has access to a specific set of tools, creating natural specialization.

```python
# Database agent - only has database tools
db_agent = Agent(
    role="Database Specialist",
    tools=[query_tool, migrate_tool, backup_tool],
    # Cannot access web or file tools
)

# Web agent - only has web tools
web_agent = Agent(
    role="Web Specialist",
    tools=[search_tool, scrape_tool, api_tool],
    # Cannot access database tools
)

# File agent - only has file tools
file_agent = Agent(
    role="File Specialist",
    tools=[read_tool, write_tool, transform_tool],
    # Cannot access database or web tools
)
```

**When to use:** Security-sensitive applications, systems requiring clear separation of concerns.

**Pros:** Natural security boundaries, clear responsibilities.

**Cons:** Requires coordination between agents.

## LangGraph: State Machine Approach

LangGraph provides a state machine approach to multi-agent workflows, giving you fine-grained control over agent interactions.

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class GraphState(TypedDict):
    messages: Annotated[list, operator.add]
    current_agent: str
    result: str
    iterations: int

def research_node(state):
    result = research_agent.invoke(state["messages"])
    return {"messages": [result], "current_agent": "analyst", "iterations": state["iterations"] + 1}

def analysis_node(state):
    result = analysis_agent.invoke(state["messages"])
    return {"messages": [result], "current_agent": "writer", "iterations": state["iterations"] + 1}

def writing_node(state):
    result = writing_agent.invoke(state["messages"])
    return {"messages": [result], "result": result, "iterations": state["iterations"] + 1}

def should_continue(state):
    if state["iterations"] >= 3:
        return END
    if "needs_revision" in state["messages"][-1].content:
        return "research"
    return END

graph = StateGraph(GraphState)
graph.add_node("research", research_node)
graph.add_node("analyze", analysis_node)
graph.add_node("write", writing_node)

graph.add_edge("__start__", "research")
graph.add_edge("research", "analyze")
graph.add_edge("analyze", "write")
graph.add_conditional_edges("write", should_continue)

app = graph.compile()
```

**When to use:** Complex workflows with conditional logic, loops, and dynamic routing.

**Pros:** Fine-grained control, visualizable workflows, supports loops and conditionals.

**Cons:** More complex setup, requires understanding of state machines.

## Common Multi-Agent Pitfalls

### Pitfall 1: Agent Communication Overhead

Agents spending more time communicating with each other than doing actual work.

**Fix:** Minimize inter-agent communication. Use structured data formats instead of natural language for agent-to-agent communication.

### Pitfall 2: Infinite Loops

Agents cycling between states without making progress.

**Fix:** Implement iteration limits, progress checks, and timeout mechanisms.

### Pitfall 3: Contradictory Outputs

Agents producing conflicting results without resolution.

**Fix:** Implement a judge or arbitrator agent that resolves conflicts.

### Pitfall 4: Cost Explosion

Multiple agents making multiple LLM calls, causing costs to spiral.

**Fix:** Implement budget limits, cache responses, and use smaller models for simpler tasks.

### Pitfall 5: Blame Ambiguity

When something goes wrong, it's unclear which agent is responsible.

**Fix:** Implement comprehensive logging with agent identification and decision tracking.

## End-of-Chapter Checklist

- [ ] I understand why multi-agent systems are valuable (specialization, parallelism, robustness, scalability)
- [ ] I can implement the five multi-agent patterns (sequential, hierarchical, consensus, debate, specialized tools)
- [ ] I can use LangGraph for state machine-based agent workflows
- [ ] I avoid the five common multi-agent pitfalls
- [ ] I implement cost controls and iteration limits in multi-agent systems
- [ ] I use structured data for agent-to-agent communication

## What's Next

Multi-agent systems need clear intent definition. The next chapter teaches intent-driven design — defining what needs to be done, not how to do it.

**Next:** [Intent-Driven Design: Defining What, Not How](./intent-driven-design)
