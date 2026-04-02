---
title: "Problem Decomposition: Breaking Down the Impossible"
description: How to break complex problems into manageable pieces that can be solved systematically
---

# Problem Decomposition: Breaking Down the Impossible

Every complex problem is just a collection of simple problems stuck together. The skill that separates great developers from good ones is not solving hard problems — it's breaking hard problems into easy ones.

This is problem decomposition: the art of taking something that seems impossible and dividing it into pieces that are individually solvable.

In the AI era, decomposition is even more important. AI excels at solving well-defined sub-problems but struggles with ambiguous, multi-faceted challenges. Your job is to decompose the ambiguous challenge into well-defined sub-problems that AI can solve.

This chapter teaches you systematic decomposition techniques.

## The Decomposition Framework

### Step 1: Understand the Whole

Before breaking something down, understand what it is.

- What is the ultimate goal?
- What does success look like?
- What are the constraints?
- What are the dependencies?

### Step 2: Identify Natural Boundaries

Look for natural divisions in the problem:

- **Functional boundaries:** Different features or capabilities
- **Data boundaries:** Different data types or flows
- **Temporal boundaries:** Different phases or stages
- **Technical boundaries:** Different technologies or systems
- **Organizational boundaries:** Different teams or stakeholders

### Step 3: Break Into Sub-Problems

Divide the problem along the natural boundaries you identified.

### Step 4: Verify the Decomposition

Check that your decomposition is:

- **Complete:** All aspects of the original problem are covered
- **Independent:** Sub-problems can be solved independently (as much as possible)
- **Manageable:** Each sub-problem is small enough to solve
- **Ordered:** You know which sub-problems must be solved first

### Step 5: Solve and Integrate

Solve each sub-problem, then integrate the solutions.

## Decomposition Techniques

### Technique 1: Functional Decomposition

Break the problem by what the system needs to do.

**Problem:** Build an e-commerce platform.

**Decomposition:**
1. User management (registration, authentication, profiles)
2. Product catalog (listing, search, filtering)
3. Shopping cart (add, remove, update quantities)
4. Checkout (payment, shipping, tax calculation)
5. Order management (tracking, history, returns)
6. Admin dashboard (inventory, analytics, user management)

Each function can be further decomposed:

**Checkout decomposition:**
1. Cart validation (items available, prices current)
2. Shipping calculation (address validation, rate lookup)
3. Tax calculation (jurisdiction detection, rate application)
4. Payment processing (card validation, authorization, capture)
5. Order confirmation (email, receipt, inventory update)

### Technique 2: Data Flow Decomposition

Break the problem by how data moves through the system.

**Problem:** Build a real-time analytics dashboard.

**Decomposition:**
1. Data collection (event tracking, log aggregation)
2. Data ingestion (streaming, batching, validation)
3. Data processing (aggregation, transformation, enrichment)
4. Data storage (time-series database, caching)
5. Data serving (API, WebSocket, GraphQL)
6. Data visualization (charts, tables, filters)

### Technique 3: Layer Decomposition

Break the problem by architectural layers.

**Problem:** Build a web application.

**Decomposition:**
1. Presentation layer (UI components, routing, state management)
2. Application layer (business logic, workflows, validation)
3. Service layer (APIs, external integrations, message queues)
4. Data layer (database, cache, search index)
5. Infrastructure layer (deployment, monitoring, security)

### Technique 4: Temporal Decomposition

Break the problem by time phases.

**Problem:** Migrate a legacy system to a new architecture.

**Decomposition:**
1. Phase 1: Assessment (audit current system, define target architecture)
2. Phase 2: Foundation (set up new infrastructure, CI/CD, monitoring)
3. Phase 3: Migration (move components one by one)
4. Phase 4: Validation (test, verify, optimize)
5. Phase 5: Cutover (switch traffic, decommission old system)

### Technique 5: Constraint-Based Decomposition

Break the problem by constraints that create natural divisions.

**Problem:** Build a globally distributed application.

**Decomposition by constraint:**
1. Latency constraint → Edge computing layer
2. Data sovereignty constraint → Regional data stores
3. Availability constraint → Multi-region redundancy
4. Consistency constraint → Conflict resolution strategy

## Decomposition and AI

AI changes how you decompose problems:

### AI-Friendly Decomposition

Decompose problems into pieces that AI can solve effectively:

- **Well-defined inputs and outputs:** AI needs clear specifications
- **Single responsibility:** Each sub-problem should do one thing
- **Testable:** Each sub-problem should have clear success criteria
- **Context-independent:** Each sub-problem should require minimal external context

### Example: AI-Assisted Decomposition

**Problem:** Build a customer support chatbot.

**Human decomposition:**
1. Intent classification (what does the user want?)
2. Knowledge retrieval (find relevant information)
3. Response generation (craft appropriate response)
4. Escalation handling (when to involve a human)
5. Conversation management (maintain context across turns)

**AI-assisted implementation:**
- Sub-problem 1: Use an LLM for intent classification
- Sub-problem 2: Use RAG for knowledge retrieval
- Sub-problem 3: Use an LLM with context for response generation
- Sub-problem 4: Use rule-based logic for escalation thresholds
- Sub-problem 5: Use conversation memory (vector store or session state)

Each sub-problem is well-defined and AI-solvable.

## Common Decomposition Mistakes

### Mistake 1: Too Granular

Breaking problems into pieces that are too small creates integration overhead.

**Fix:** Each sub-problem should be meaningful on its own.

### Mistake 2: Not Granular Enough

Leaving sub-problems too large makes them hard to solve.

**Fix:** If a sub-problem takes more than a day to solve, break it down further.

### Mistake 3: Ignoring Dependencies

Not identifying which sub-problems depend on others.

**Fix:** Map dependencies before starting. Solve foundational sub-problems first.

### Mistake 4: Overlapping Sub-Problems

Sub-problems that share responsibilities create confusion and duplication.

**Fix:** Ensure each sub-problem has a single, clear responsibility.

### Mistake 5: Forgetting Integration

Focusing on sub-problems without planning how they'll integrate.

**Fix:** Define interfaces between sub-problems before solving them.

## The Decomposition Checklist

When decomposing a problem, verify:

- [ ] The ultimate goal is clearly defined
- [ ] Natural boundaries have been identified
- [ ] Sub-problems are complete (cover the whole problem)
- [ ] Sub-problems are independent (minimal coupling)
- [ ] Sub-problems are manageable (small enough to solve)
- [ ] Dependencies between sub-problems are mapped
- [ ] Interfaces between sub-problems are defined
- [ ] Integration plan is in place
- [ ] Each sub-problem has clear success criteria

## End-of-Chapter Checklist

- [ ] I understand the five-step decomposition framework
- [ ] I can apply five decomposition techniques (functional, data flow, layer, temporal, constraint-based)
- [ ] I decompose problems into AI-friendly sub-problems
- [ ] I avoid the five common decomposition mistakes
- [ ] I use the decomposition checklist for systematic breakdown

## What's Next

Decomposition breaks problems into pieces. But you still need to make decisions about each piece — often with incomplete information. The next chapter teaches decision frameworks for uncertain situations.

**Next:** [Decision Frameworks: Making Calls With Incomplete Data](./decision-frameworks)
