---
title: ""Intent-Driven Design: Defining What, Not How""
description: How to design systems by specifying desired outcomes rather than implementation details
---

# Intent-Driven Design: Defining What, Not How

Traditional software design specifies how things should be done: this function calls that function, this component renders that component, this service talks to that service.

Intent-driven design specifies what should be achieved: the system should authenticate users, process payments, and send notifications. How it achieves these goals is left to the implementation — which may be human-written code, AI-generated code, or a combination.

In the AI era, intent-driven design is essential. AI can figure out the "how" if you clearly specify the "what." But if your "what" is vague, the "how" will be wrong.

This chapter teaches you to design systems by defining intent precisely.

## The Intent Spectrum

### Level 1: Implementation Specification (Traditional)

```
Create a function that:
1. Connects to PostgreSQL using psycopg2
2. Executes SELECT * FROM users WHERE email = $1
3. Returns the first result as a dictionary
4. Handles connection errors with a retry (max 3 attempts)
```

This is how, not what. It's detailed but inflexible. If the database changes, the specification is wrong.

### Level 2: Behavioral Specification

```
The system should retrieve user data by email address.
- Input: email string
- Output: user data or null if not found
- Performance: < 100ms response time
- Reliability: 99.9% availability
```

This specifies behavior without implementation. It's flexible but still constrains the interface.

### Level 3: Intent Specification

```
The system should allow users to access their account information using their email address.
- Users should be able to find their account quickly
- The system should handle cases where the email doesn't exist
- Access should be secure and audited
- Performance should feel instant to users
```

This specifies intent — the desired outcome — without constraining implementation. AI can generate appropriate implementations from this level of specification.

:::info
**The AI-Era Principle:** The better you define intent, the better AI can implement it. Vague intent produces vague implementations. Precise intent produces precise implementations.
:::

## The Intent Definition Framework

### Step 1: Define the Goal

What is the system trying to achieve? Be specific about the outcome, not the approach.

**Bad:** "Build a REST API with Express."
**Good:** "Enable clients to retrieve, create, update, and delete user records over HTTP."

### Step 2: Define Constraints

What boundaries must the solution operate within?

- **Technical constraints:** Must work with existing infrastructure, must support 10,000 concurrent users
- **Business constraints:** Must comply with GDPR, must be operational within 3 months
- **Quality constraints:** Must have 99.9% uptime, must respond within 200ms

### Step 3: Define Success Criteria

How will we know the intent has been achieved?

- Functional criteria: The system correctly processes user requests
- Performance criteria: 95th percentile response time < 200ms
- Reliability criteria: 99.9% uptime over a 30-day period
- Security criteria: No PII data exposed in logs

### Step 4: Define Edge Cases

What situations should the system handle?

- Empty inputs, null values, malformed data
- Concurrent access, race conditions
- Network failures, timeout scenarios
- Unauthorized access attempts

### Step 5: Define Non-Goals

What is explicitly out of scope?

- "This system does not handle payment processing."
- "This system does not provide real-time notifications."
- "This system does not support internationalization."

Defining non-goals prevents scope creep and helps AI focus on the right implementation.

## Intent-Driven API Design

### Traditional API Design

```
POST /api/users
Body: { "name": "string", "email": "string", "password": "string" }
Response: 201 with user object
```

This specifies the interface but not the intent.

### Intent-Driven API Design

```
Intent: Allow clients to register new user accounts.

Requirements:
- Client provides user information (name, email, password)
- System validates input (email format, password strength)
- System checks for duplicate email addresses
- System creates user record with unique ID
- System returns created user data (excluding password)
- System sends welcome email to user
- System logs the registration event

Error conditions:
- Invalid input → 400 with specific field errors
- Duplicate email → 409 with message
- System error → 500 with generic message
```

This specifies the intent completely. An AI can generate a correct implementation from this specification.

## Intent-Driven Database Design

### Traditional

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Intent-Driven

```
Intent: Store user account information securely and efficiently.

Requirements:
- Each user has a unique identifier
- User emails must be unique
- Passwords must be stored securely (hashed, not plaintext)
- Record creation time must be tracked
- Support efficient lookup by email
- Support efficient listing by creation date (newest first)
- Support soft deletion (mark as deleted, don't remove)

Data to store:
- User identity: name, email
- Security: password hash
- Metadata: creation time, deletion status
```

## Intent-Driven Agent Design

### Traditional Agent Prompt

```
Write a Python script that uses the requests library to fetch data from the API,
parses the JSON response, filters for items with status 'active', and writes
them to a CSV file.
```

### Intent-Driven Agent Prompt

```
Intent: Export active items from the API to a CSV file for analysis.

Requirements:
- Fetch all items from the API endpoint
- Filter to only include items with status 'active'
- Export to CSV with columns: id, name, status, created_date
- Handle API pagination (fetch all pages)
- Handle API errors gracefully (retry up to 3 times)
- Log the number of items exported
- The CSV should be saved to the output directory

Constraints:
- Must handle APIs with up to 100,000 items
- Must complete within 5 minutes
- Must not crash on malformed API responses
```

## Intent Documentation Template

Use this template for intent documentation:

```markdown
# [Feature/System Name] Intent

## Goal
[What is this trying to achieve?]

## Users
[Who uses this? Who benefits?]

## Requirements
- [Functional requirement]
- [Performance requirement]
- [Reliability requirement]
- [Security requirement]

## Constraints
- [Technical constraint]
- [Business constraint]

## Success Criteria
- [How we measure success]

## Edge Cases
- [Edge case and expected behavior]

## Non-Goals
- [What this explicitly does not do]

## Dependencies
- [What this depends on]

## Open Questions
- [Unresolved decisions]
```

## Benefits of Intent-Driven Design

1. **AI-friendly:** AI can generate implementations from intent specifications.
2. **Flexible:** Implementation can change without updating the intent.
3. **Testable:** Success criteria define what tests should verify.
4. **Communicable:** Non-technical stakeholders can understand intent specifications.
5. **Maintainable:** When implementation needs to change, the intent remains valid.

## Common Mistakes

### Mistake 1: Vague Intent

"Make it fast" is not an intent. "Respond within 200ms at the 95th percentile" is.

### Mistake 2: Missing Constraints

Without constraints, AI may generate implementations that don't fit your environment.

### Mistake 3: No Success Criteria

Without measurable success criteria, you can't evaluate whether the implementation meets the intent.

### Mistake 4: Including Implementation Details

Intent specifications should not specify libraries, frameworks, or algorithms unless they're genuine constraints.

### Mistake 5: No Non-Goals

Without non-goals, scope creeps and implementations become over-engineered.

## End-of-Chapter Checklist

- [ ] I understand the intent spectrum from implementation specification to intent specification
- [ ] I can apply the five-step intent definition framework
- [ ] I write intent-driven specifications for APIs, databases, and agent workflows
- [ ] I use the intent documentation template for all significant features
- [ ] I avoid the five common intent-driven design mistakes
- [ ] I understand that precise intent produces precise AI implementations

## What's Next

Intent-driven design defines what to build. The next chapter covers where and how to deploy it — using a hybrid approach across Vercel, Render, and Northflank.

**Next:** [Hybrid Deployment: Vercel + Render + Northflank](./hybrid-deployment)
