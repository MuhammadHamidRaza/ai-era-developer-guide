---
title: "Evaluation Frameworks: DeepEval, Ragas, and Production QA"
description: How to systematically evaluate AI system quality in production
---

# Evaluation Frameworks: DeepEval, Ragas, and Production QA

Traditional software testing is binary: the test passes or fails. AI system evaluation is probabilistic: the output is more or less accurate, more or less relevant, more or less safe.

This requires a fundamentally different approach to quality assurance. You can't write a unit test that checks if an AI-generated response is "good." You need evaluation frameworks that measure quality along multiple dimensions.

This chapter teaches you to build production QA systems for AI using DeepEval, Ragas, and custom evaluation pipelines.

## The Evaluation Challenge

### Traditional Testing vs. AI Evaluation

| Aspect | Traditional Testing | AI Evaluation |
|--------|-------------------|---------------|
| Output | Deterministic | Probabilistic |
| Criteria | Exact match | Quality dimensions |
| Method | Assertions | Scoring metrics |
| Result | Pass/Fail | Score distribution |
| Frequency | On change | Continuous |

### What to Evaluate

AI systems need evaluation across multiple dimensions:

1. **Accuracy:** Is the output factually correct?
2. **Relevance:** Does the output address the input?
3. **Faithfulness:** Is the output grounded in the provided context?
4. **Completeness:** Does the output cover all aspects of the question?
5. **Safety:** Is the output free from harmful content?
6. **Bias:** Does the output treat all groups fairly?
7. **Consistency:** Does the output remain stable across similar inputs?

## Ragas: RAG Assessment

Ragas is the leading framework for evaluating RAG systems. It measures four key metrics:

### Context Precision

How relevant is the retrieved context to the question?

```python
from ragas import evaluate
from ragas.metrics import context_precision
from datasets import Dataset

# Evaluation dataset
eval_dataset = Dataset.from_dict({
    "question": [
        "How do I reset my password?",
        "What is the refund policy?",
    ],
    "contexts": [
        ["To reset your password, go to Settings > Security > Reset Password."],
        ["Our refund policy allows returns within 30 days of purchase."],
    ],
    "ground_truth": [
        "Go to Settings > Security > Reset Password and follow the prompts.",
        "You can return products within 30 days for a full refund.",
    ],
    "answer": [
        "To reset your password, navigate to Settings, then Security, then click Reset Password.",
        "Products can be returned within 30 days for a full refund.",
    ],
})

# Evaluate
results = evaluate(
    dataset=eval_dataset,
    metrics=[context_precision],
)
print(results)
```

### Faithfulness

Is the answer grounded in the retrieved context (not hallucinated)?

```python
from ragas.metrics import faithfulness

results = evaluate(
    dataset=eval_dataset,
    metrics=[faithfulness],
)
```

### Answer Relevancy

How relevant is the answer to the question?

```python
from ragas.metrics import answer_relevancy

results = evaluate(
    dataset=eval_dataset,
    metrics=[answer_relevancy],
)
```

### Context Recall

How much of the ground truth is covered by the retrieved context?

```python
from ragas.metrics import context_recall

results = evaluate(
    dataset=eval_dataset,
    metrics=[context_recall],
)
```

## DeepEval: Comprehensive LLM Evaluation

DeepEval provides a broader set of evaluation metrics for any LLM application.

### Installation

```bash
pip install deeval
```

### Key Metrics

```python
from deeval.metrics import (
    AnswerRelevancyMetric,
    FaithfulnessMetric,
    ContextualRelevancyMetric,
    ToxicityMetric,
    BiasMetric,
    HallucinationMetric,
    SummarizationMetric,
)
from deeval import assert_test
from deeval.test_case import LLMTestCase, LLMTestCaseParams

# Define a test case
test_case = LLMTestCase(
    input="How do I reset my password?",
    actual_output="Go to Settings > Security > Reset Password.",
    expected_output="Navigate to Settings, then Security, then click Reset Password.",
    retrieval_context=["Password reset is available in Settings > Security."],
)

# Define metrics
relevancy_metric = AnswerRelevancyMetric(threshold=0.7)
faithfulness_metric = FaithfulnessMetric(threshold=0.8)
toxicity_metric = ToxicityMetric(threshold=0.1)

# Run evaluation
assert_test(test_case, [relevancy_metric, faithfulness_metric, toxicity_metric])
```

### Custom Metrics

```python
from deeval.metrics import BaseMetric
from deeval.test_case import LLMTestCase

class BrandVoiceMetric(BaseMetric):
    def __init__(self, threshold: float = 0.7):
        self.threshold = threshold
    
    def measure(self, test_case: LLMTestCase):
        # Use an LLM to evaluate brand voice alignment
        evaluation_prompt = f"""
        Evaluate if the following response matches our brand voice:
        - Professional but friendly
        - Clear and concise
        - No jargon
        
        Response: {test_case.actual_output}
        
        Score from 0-1:
        """
        score = llm.evaluate(evaluation_prompt)
        self.score = float(score)
        self.success = self.score >= self.threshold
        return self.score
    
    def is_successful(self):
        return self.success
    
    @property
    def __name__(self):
        return "Brand Voice"
```

## Building a Production QA Pipeline

### Continuous Evaluation

```python
import schedule
import time

def run_daily_evaluation():
    """Run evaluation on production data daily."""
    # Collect production interactions
    interactions = collect_production_interactions(date_range="yesterday")
    
    # Sample for evaluation
    sample = random.sample(interactions, min(100, len(interactions)))
    
    # Evaluate each interaction
    results = []
    for interaction in sample:
        test_case = LLMTestCase(
            input=interaction["query"],
            actual_output=interaction["response"],
            retrieval_context=interaction["context"],
        )
        result = evaluate_test_case(test_case, all_metrics)
        results.append(result)
    
    # Aggregate and alert
    avg_score = sum(r.score for r in results) / len(results)
    if avg_score < 0.8:
        alert_team(f"RAG quality dropped to {avg_score:.2f}")
    
    # Store results for trending
    store_evaluation_results(results)

# Schedule daily evaluation
schedule.every().day.at("02:00").do(run_daily_evaluation)
```

### A/B Testing

```python
def ab_test_rag_configs(queries: list[str]) -> dict:
    """Compare two RAG configurations."""
    config_a_results = []
    config_b_results = []
    
    for query in queries:
        result_a = rag_system_a(query)
        result_b = rag_system_b(query)
        
        config_a_results.append(evaluate_response(query, result_a))
        config_b_results.append(evaluate_response(query, result_b))
    
    return {
        "config_a": aggregate_scores(config_a_results),
        "config_b": aggregate_scores(config_b_results),
    }
```

### Regression Detection

```python
def detect_regression(current_scores: list[float], historical_scores: list[float]) -> bool:
    """Detect if current performance is significantly worse than historical."""
    from scipy import stats
    
    # Statistical test: is current mean significantly lower?
    t_stat, p_value = stats.ttest_ind(current_scores, historical_scores)
    
    if p_value < 0.05 and np.mean(current_scores) < np.mean(historical_scores):
        return True
    return False
```

## Evaluation Dataset Management

### Building Evaluation Datasets

```python
class EvaluationDataset:
    def __init__(self):
        self.cases = []
    
    def add_case(self, query: str, expected: str, contexts: list[str]):
        self.cases.append({
            "query": query,
            "expected": expected,
            "contexts": contexts,
            "category": self.categorize(query),
            "difficulty": self.assess_difficulty(query),
        })
    
    def categorize(self, query: str) -> str:
        """Categorize queries for balanced evaluation."""
        categories = ["factual", "procedural", "analytical", "creative"]
        # Use LLM or rules to categorize
        return "factual"
    
    def ensure_balance(self):
        """Ensure evaluation dataset covers all categories."""
        category_counts = {}
        for case in self.cases:
            cat = case["category"]
            category_counts[cat] = category_counts.get(cat, 0) + 1
        
        # Add more cases for underrepresented categories
        for cat, count in category_counts.items():
            if count < 10:
                self.generate_cases_for_category(cat, 10 - count)
```

### Golden Dataset

Maintain a "golden" evaluation dataset that represents your most important use cases:

```python
GOLDEN_DATASET = [
    {
        "query": "How do I reset my password?",
        "expected": "Go to Settings > Security > Reset Password.",
        "contexts": ["Password reset instructions..."],
        "category": "procedural",
        "priority": "high",
    },
    # ... more golden cases
]
```

## Monitoring in Production

### Real-Time Monitoring

```python
def monitor_production():
    """Monitor AI system quality in real-time."""
    # Track response latency
    latency = measure_latency()
    if latency > LATENCY_THRESHOLD:
        alert("High latency detected")
    
    # Track error rates
    error_rate = calculate_error_rate()
    if error_rate > ERROR_THRESHOLD:
        alert("High error rate detected")
    
    # Track user feedback
    satisfaction = calculate_satisfaction_score()
    if satisfaction < SATISFACTION_THRESHOLD:
        alert("Low user satisfaction detected")
    
    # Track hallucination rate
    hallucination_rate = estimate_hallucination_rate()
    if hallucination_rate > HALLUCINATION_THRESHOLD:
        alert("High hallucination rate detected")
```

### Dashboard Metrics

Key metrics for your evaluation dashboard:

- **Average quality score** across all metrics
- **Score distribution** (histogram of quality scores)
- **Trend over time** (is quality improving or degrading?)
- **Category breakdown** (which query types perform worst?)
- **Latency distribution** (response time percentiles)
- **Error rate** (percentage of failed or poor responses)
- **User satisfaction** (thumbs up/down, ratings)

## End-of-Chapter Checklist

- [ ] I understand the difference between traditional testing and AI evaluation
- [ ] I can use Ragas to evaluate RAG systems (context precision, faithfulness, answer relevancy, context recall)
- [ ] I can use DeepEval for comprehensive LLM evaluation
- [ ] I've built a production QA pipeline with continuous evaluation
- [ ] I manage evaluation datasets with balanced coverage
- [ ] I monitor AI system quality in production with real-time alerts
- [ ] I maintain a dashboard with key quality metrics

## What's Next

Quality evaluation is essential, but security is non-negotiable. The final Part 4 chapter covers security by design — the OWASP LLM Top 10 and how to build secure AI systems.

**Next:** [Security by Design: OWASP LLM Top 10](./security-by-design)
