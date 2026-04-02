---
title: "AI Error Patterns: Hallucinations, Security Bugs, and Inefficiency"
description: Recognizing the most common error patterns in AI-generated code and how to fix them
---

# AI Error Patterns: Hallucinations, Security Bugs, and Inefficiency

AI makes mistakes. Not random mistakes — patterned mistakes. The same errors appear again and again across different AI tools and different codebases.

Recognizing these patterns is a superpower. When you know what to look for, you can spot AI errors in seconds that would take hours to debug in production.

This chapter catalogs the most common AI error patterns with examples and fixes.

## Pattern 1: Hallucinated APIs and Libraries

AI invents functions, methods, and libraries that don't exist.

```python
# AI-generated code
import pandas as pd

df = pd.read_csv("data.csv")
df.fill_missing_values()  # Hallucinated method - doesn't exist
df.normalize_columns()    # Hallucinated method - doesn't exist
```

**The real code:**
```python
df = df.fillna(0)  # Correct method
df = (df - df.mean()) / df.std()  # Manual normalization
```

**How to spot it:** If a method name sounds like what it does but you've never seen it before, verify it exists in the documentation.

## Pattern 2: Incorrect Import Paths

AI uses wrong import paths, especially for newer libraries.

```python
# AI-generated code
from langchain.llms import OpenAI  # Old path (LangChain v0.0.x)
from langchain.chat_models import ChatOpenAI  # Old path
```

**The real code (LangChain v0.1+):**
```python
from langchain_openai import OpenAI
from langchain_openai import ChatOpenAI
```

**How to spot it:** Check the library version and verify import paths against the current documentation.

## Pattern 3: Missing Error Handling

AI generates the happy path and forgets error handling.

```python
# AI-generated code
response = requests.get(url)
data = response.json()  # What if the request fails? What if the response isn't JSON?
```

**The real code:**
```python
try:
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.Timeout:
    logger.error(f"Request to {url} timed out")
    raise
except requests.exceptions.HTTPError as e:
    logger.error(f"HTTP error for {url}: {e}")
    raise
except json.JSONDecodeError:
    logger.error(f"Invalid JSON response from {url}")
    raise
```

**How to spot it:** Look for any external call (HTTP, database, file system) without try/except.

## Pattern 4: Security Vulnerabilities

### SQL Injection

```python
# AI-generated code
query = f"SELECT * FROM users WHERE email = '{email}'"  # SQL injection!
cursor.execute(query)
```

**The real code:**
```python
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
```

### Hardcoded Secrets

```python
# AI-generated code
API_KEY = "sk-1234567890abcdef"  # Hardcoded secret!
```

**The real code:**
```python
API_KEY = os.environ["OPENAI_API_KEY"]
```

### Missing Input Validation

```python
# AI-generated code
@app.post("/api/users")
def create_user(request):
    user = User(name=request.name, email=request.email)  # No validation!
    db.add(user)
```

**The real code:**
```python
@app.post("/api/users")
def create_user(request: CreateUserRequest):
    # Pydantic validates the request automatically
    user = User(name=request.name, email=request.email)
    db.add(user)
```

## Pattern 5: Performance Anti-Patterns

### N+1 Query

```python
# AI-generated code
users = db.query(User).all()
for user in users:
    print(user.profile.bio)  # N+1 query: one query per user
```

**The real code:**
```python
users = db.query(User).options(joinedload(User.profile)).all()
for user in users:
    print(user.profile.bio)  # Single query with join
```

### Inefficient Loops

```python
# AI-generated code
result = []
for item in large_list:
    result.append(process(item))  # Python loop is slow
```

**The real code:**
```python
result = [process(item) for item in large_list]  # List comprehension is faster
# Or for numerical data:
result = np.array(list(map(process, large_list)))  # NumPy vectorization
```

### Missing Pagination

```python
# AI-generated code
all_records = db.query(Record).all()  # Loads ALL records into memory
```

**The real code:**
```python
page_size = 100
offset = 0
while True:
    records = db.query(Record).offset(offset).limit(page_size).all()
    if not records:
        break
    process(records)
    offset += page_size
```

## Pattern 6: Race Conditions

```python
# AI-generated code
counter = 0

def increment():
    global counter
    counter += 1  # Race condition: not atomic
```

**The real code:**
```python
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    with lock:
        counter += 1  # Thread-safe
```

## Pattern 7: Resource Leaks

```python
# AI-generated code
file = open("data.txt", "r")
content = file.read()
# File is never closed if an exception occurs
```

**The real code:**
```python
with open("data.txt", "r") as file:
    content = file.read()
# File is automatically closed, even if an exception occurs
```

## Pattern 8: Incorrect Async Usage

```python
# AI-generated code
async def fetch_all(urls):
    results = []
    for url in urls:
        result = await fetch(url)  # Sequential, not parallel!
        results.append(result)
    return results
```

**The real code:**
```python
async def fetch_all(urls):
    tasks = [fetch(url) for url in urls]
    results = await asyncio.gather(*tasks)  # Parallel
    return results
```

## Pattern 9: Over-Engineering

AI sometimes generates unnecessarily complex solutions.

```python
# AI-generated code (over-engineered)
class DataProcessorFactory:
    @staticmethod
    def create_processor(data_type):
        if data_type == "csv":
            return CSVDataProcessor()
        elif data_type == "json":
            return JSONDataProcessor()
        # ... 10 more types

# When this would suffice:
import pandas as pd
df = pd.read_csv("data.csv")  # or pd.read_json("data.json")
```

**How to spot it:** If the solution seems more complex than the problem warrants, it probably is.

## Pattern 10: Version Incompatibility

AI generates code that works with one version of a library but not another.

```python
# AI-generated code (Pydantic v1 syntax)
from pydantic import BaseModel

class User(BaseModel):
    name: str
    
    class Config:
        orm_mode = True  # Pydantic v1
```

**The real code (Pydantic v2):**
```python
from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    name: str
    model_config = ConfigDict(from_attributes=True)  # Pydantic v2
```

## The Error Pattern Checklist

When reviewing AI-generated code, check for these patterns:

- [ ] Hallucinated APIs and libraries (verify against documentation)
- [ ] Incorrect import paths (check library version)
- [ ] Missing error handling (check all external calls)
- [ ] Security vulnerabilities (SQL injection, XSS, hardcoded secrets, missing validation)
- [ ] Performance anti-patterns (N+1 queries, inefficient loops, missing pagination)
- [ ] Race conditions (shared state without synchronization)
- [ ] Resource leaks (unclosed files, connections, locks)
- [ ] Incorrect async usage (sequential instead of parallel)
- [ ] Over-engineering (unnecessary complexity)
- [ ] Version incompatibility (check library versions)

## End-of-Chapter Checklist

- [ ] I can recognize all 10 common AI error patterns
- [ ] I verify API calls against documentation before accepting AI-generated code
- [ ] I check all external calls for error handling
- [ ] I review AI-generated code for security vulnerabilities
- [ ] I check for performance anti-patterns
- [ ] I verify library version compatibility
- [ ] I use the error pattern checklist for systematic review

## What's Next

AI errors are not just about individual bugs — they can cause system-level failures. The next chapter covers debugging race conditions and memory leaks in AI-generated code.

**Next:** [Debugging What AI Breaks: Race Conditions and Memory Leaks](./debugging-ai-breaks)
