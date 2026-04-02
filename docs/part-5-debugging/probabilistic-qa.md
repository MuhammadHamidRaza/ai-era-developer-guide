---
title: "Probabilistic QA: Testing Non-Deterministic Systems"
description: How to test AI systems that don't produce the same output every time — the new quality assurance paradigm
---

# Probabilistic QA: Testing Non-Deterministic Systems

Traditional unit tests assume deterministic output: given input X, expect output Y. AI systems break this assumption — the same input can produce different outputs. Probabilistic QA is the practice of testing non-deterministic systems, and it's one of the most valuable skills in 2026.

## The Problem With Traditional Testing

```python
# Traditional test — works for deterministic code
def test_add():
    assert add(2, 3) == 5  # Always passes

# AI test — this approach fails for non-deterministic output
def test_ai_summary():
    result = ai_summarize("Some text")
    assert result == "Expected summary"  # Will fail randomly!
```

## Probabilistic Testing Approaches

### 1. Statistical Testing

Run the AI multiple times and measure aggregate behavior:

```python
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric

def test_ai_summarization():
    metric = AnswerRelevancyMetric(threshold=0.7)
    
    test_cases = [
        {
            "input": "Summarize this article about AI...",
            "actual_output": ai_summarize(article),
            "expected_output": "AI is transforming software development...",
            "retrieval_context": [article]
        }
    ]
    
    evaluate(test_cases, [metric])
```

### 2. Constraint-Based Testing

Define constraints the output must satisfy, not exact values:

```python
def test_ai_code_generation():
    code = ai_generate("Sort a list of numbers")
    
    # Constraints, not exact output
    assert "def sort" in code or "def sorted" in code
    assert len(code) < 500  # Not excessively long
    assert execute_code(code, [3, 1, 2]) == [1, 2, 3]  # Actually works
```

### 3. Evaluation Frameworks

| Framework | Best For | Key Metrics | Integration |
|-----------|----------|-------------|-------------|
| DeepEval | Production RAG/agents | Answer relevancy, faithfulness, contextual precision | CI/CD, Python |
| Ragas | RAG experimentation | Context precision, recall, faithfulness | Python, notebooks |
| G-Eval | General LLM evaluation | Custom criteria via GPT-4 scoring | API-based |
| LangSmith | LangChain apps | Trace analysis, latency, cost | LangChain ecosystem |

### DeepEval vs Ragas

| Aspect | DeepEval | Ragas |
|--------|----------|-------|
| Approach | Full evaluation ecosystem | Lightweight experimentation |
| CI/CD | Built-in support | Manual setup |
| Tracing | Full LLM tracing | Limited |
| Best For | Production workflows | Quick validation |
| Analogy | pytest + coverage | pandas for quick analysis |

## The 15-25% Wage Premium

Developers who can implement probabilistic QA command a 15-25% wage premium in 2026. This is because traditional QA engineers cannot test non-deterministic systems — it requires a fundamentally different mindset.

## Setting Up CI/CD for AI Evaluation

```yaml
# .github/workflows/ai-eval.yml
name: AI Evaluation
on: [push, pull_request]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install deepeval
      - run: deepeval test run tests/test_ai_outputs.py
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

:::warning Key Insight

**You cannot ship AI-generated code without probabilistic QA.** The same way you wouldn't ship database code without testing data integrity, you shouldn't ship AI output without testing its quality constraints.

## Checklist

- [ ] Replace exact-match assertions with constraint-based tests for AI output
- [ ] Set up statistical testing with DeepEval or Ragas
- [ ] Define quality thresholds (relevancy, faithfulness, toxicity)
- [ ] Integrate AI evaluation into your CI/CD pipeline
- [ ] Monitor AI output quality in production with automated evals

---

**Next:** [AI Error Patterns →](./ai-error-patterns.md)
