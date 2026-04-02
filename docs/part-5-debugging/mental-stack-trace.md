---
title: "The Mental Stack Trace: Understanding AI-Generated Code"
description: How to build a mental model of code you didn't write and trace execution flow through AI-generated systems
---

# The Mental Stack Trace: Understanding AI-Generated Code

When you write code, you have a mental model of how it works. You know why each function exists, how data flows, and where things might break. When AI generates code, you don't have that mental model — and that's the root cause of most AI-related bugs.

The mental stack trace is a technique for building understanding of code you didn't write. It's like a debugger's call stack, but in your head. You trace through the code, building a mental model of execution flow, data transformations, and potential failure points.

This chapter teaches you to rapidly understand AI-generated code through systematic mental tracing.

## The Mental Stack Trace Technique

### Step 1: Identify the Entry Point

Where does execution begin? For a web application, it's the route handler. For a script, it's the main function. For a library, it's the public API.

```python
# Entry point: this is where execution starts
@app.post("/api/process")
async def process_data(request: ProcessRequest):
    data = await fetch_data(request.source)
    result = await transform(data)
    return await store(result)
```

### Step 2: Trace Each Function Call

For each function call, ask:
- What does this function do?
- What does it return?
- What could go wrong?

```python
# Trace: fetch_data
async def fetch_data(source: str) -> dict:
    """Fetches data from the source URL."""
    # What could go wrong? Network error, invalid URL, timeout
    response = await httpx.AsyncClient().get(source, timeout=30)
    response.raise_for_status()
    return response.json()

# Trace: transform
async def transform(data: dict) -> ProcessedData:
    """Transforms raw data into processed format."""
    # What could go wrong? Missing keys, type errors, validation failures
    return ProcessedData(
        id=uuid4(),
        values=[v * 2 for v in data["values"]],  # KeyError if "values" missing
        timestamp=datetime.utcnow(),
    )

# Trace: store
async def store(data: ProcessedData) -> dict:
    """Stores processed data in the database."""
    # What could go wrong? Database connection error, constraint violation
    await db.insert(data)
    return {"id": data.id, "status": "stored"}
```

### Step 3: Map Data Flow

Track how data transforms at each step:

```
HTTP Request → ProcessRequest (validated)
    ↓
fetch_data() → dict (raw JSON from API)
    ↓
transform() → ProcessedData (validated, transformed)
    ↓
store() → dict (confirmation with ID and status)
    ↓
HTTP Response → JSON to client
```

### Step 4: Identify Failure Points

At each step, identify what could fail:

| Step | Failure Mode | Likelihood | Impact |
|------|-------------|------------|--------|
| fetch_data | Network timeout | Medium | High |
| fetch_data | Invalid JSON response | Low | High |
| transform | Missing "values" key | Medium | High |
| transform | Non-numeric values | Low | Medium |
| store | Database unavailable | Low | High |
| store | Duplicate ID | Low | Medium |

### Step 5: Verify Error Handling

Check whether each failure mode is handled:

```python
# Does the code handle network errors?
# No! httpx.get() can raise exceptions that aren't caught.

# Does the code handle missing keys?
# No! data["values"] will raise KeyError if "values" is missing.

# Does the code handle database errors?
# No! db.insert() can raise exceptions that aren't caught.
```

This AI-generated code has no error handling. Every failure point is unhandled.

## Practical Example: Tracing AI-Generated Authentication

```python
# AI-generated authentication code
def authenticate(username, password):
    user = db.query(User).filter(User.username == username).first()
    if user and bcrypt.checkpw(password.encode(), user.password_hash):
        token = jwt.encode({"user_id": user.id}, SECRET_KEY, algorithm="HS256")
        return token
    return None
```

### Mental Stack Trace

**Entry point:** `authenticate(username, password)`

**Step 1: Database query**
- What it does: Finds user by username
- Returns: User object or None
- Failure modes: Database connection error, SQL injection (if username is not parameterized)

**Step 2: Password check**
- What it does: Compares password with stored hash
- Returns: True/False
- Failure modes: Encoding error if password is not a string, bcrypt error if hash is malformed

**Step 3: Token generation**
- What it does: Creates JWT with user ID
- Returns: Encoded token string
- Failure modes: Missing SECRET_KEY, algorithm mismatch, encoding error

**Step 4: Return**
- Returns: Token string or None
- Failure modes: None (simple return)

### Issues Found

1. **No error handling** — database errors will crash the function
2. **Timing attack** — the function takes different time for valid vs. invalid usernames (information leakage)
3. **No rate limiting** — brute force attacks are possible
4. **No token expiration** — tokens never expire
5. **None return** — returning None makes it hard to distinguish between "wrong password" and "system error"

## The Code Comprehension Checklist

When reviewing AI-generated code, systematically check:

### Control Flow
- [ ] Can I trace the execution path from entry to exit?
- [ ] Are there conditional branches I need to understand?
- [ ] Are there loops that could be infinite?
- [ ] Are there early returns that skip important cleanup?

### Data Flow
- [ ] Do I know what data enters the system?
- [ ] Do I know how data transforms at each step?
- [ ] Do I know what data leaves the system?
- [ ] Are there implicit type conversions?

### Error Flow
- [ ] What errors can occur at each step?
- [ ] Are all errors handled?
- [ ] Are errors handled appropriately (not silently swallowed)?
- [ ] Are error messages informative?

### Resource Flow
- [ ] What resources are allocated (memory, connections, files)?
- [ ] Are all resources properly released?
- [ ] Are there resource leaks?
- [ ] Are there race conditions?

## Building Comprehension Speed

### Practice 1: Time-Boxed Tracing

Give yourself 5 minutes to trace through a function. This forces you to focus on the important parts.

### Practice 2: Rubber Duck Explanation

Explain the code to a rubber duck (or a colleague). If you stumble, you've found a gap in your understanding.

### Practice 3: Mutation Testing

Mentally mutate the code (change a condition, remove a line) and predict the effect. This tests your understanding of the code's logic.

### Practice 4: Boundary Analysis

Identify the boundary conditions for each function. What happens with empty input? Maximum input? Invalid input?

## The AI Code Review Pattern

When reviewing AI-generated code at scale, use this pattern:

1. **Scan for structure** — Does the overall architecture make sense?
2. **Trace critical paths** — Trace the most important execution flows
3. **Check error handling** — Are errors handled at every external boundary?
4. **Verify security** — Are inputs validated? Are outputs sanitized?
5. **Assess performance** — Are there obvious performance issues?
6. **Test mentally** — Walk through test cases in your head

## End-of-Chapter Checklist

- [ ] I can apply the five-step mental stack trace technique
- [ ] I systematically map data flow, control flow, error flow, and resource flow
- [ ] I use the code comprehension checklist for all AI-generated code
- [ ] I practice comprehension speed through time-boxed tracing and mutation testing
- [ ] I follow the AI code review pattern for systematic review
- [ ] I can identify common AI code issues: missing error handling, security gaps, performance problems

## What's Next

Understanding AI-generated code is the first step. The next chapter teaches you to test non-deterministic systems — where the same input can produce different outputs.

**Next:** [Probabilistic QA: Testing Non-Deterministic Systems](./probabilistic-qa)
