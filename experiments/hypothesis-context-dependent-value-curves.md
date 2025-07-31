# Hypothesis: Context-Dependent Value Curves for Exa Fast

## Core Thesis
**425ms represents a local optimum for human-in-the-loop single-threaded agent workflows**, but the value curve shape depends entirely on the task architecture.

## Expected Results by Experiment Type

### Experiment 1: Breaking News Cascade (Breadth-First)
- **Value curve**: Stays near-quadratic longer than expected
- **Why**: Enormous search space, low redundancy in early layers
- **Prediction**: n^1.8 through first 100 searches, then n^1.3
- **Cognitive ceiling**: Won't hit it - will hit index coverage limits first
- **Expected bottleneck**: Index completeness around search 150-200

### Experiment 2: Competitive Intel Blitz (Depth-First) 
- **Value curve**: Sharp quadratic start, rapid transition to linear
- **Why**: Limited competitor set, high-value early hits
- **Prediction**: n^2 for first 20 searches, n^1.2 by search 50, linear after 100
- **Expected bottleneck**: Relevance fall-off after exhausting obvious sources

### Experiment 3: Fact-Check Network (Convergent)
- **Value curve**: Stepped function - plateaus at each confidence threshold
- **Why**: Binary outcome (true/false) with diminishing confidence gains
- **Prediction**: Massive value until 80% confidence, marginal after 95%
- **Expected bottleneck**: Problem space exhaustion around 100-150 searches

### Experiment 4: Swarm Research (Parallel)
- **Value curve**: Near-linear throughout due to parallelism
- **Why**: O3's point about parallel dispatch - latency amortized
- **Prediction**: Consistent n^1.1 growth, no quadratic phase
- **Expected bottleneck**: Agent coordination overhead, not search speed

## Key Insight: Task Architecture Determines Everything

The 425ms latency is optimal specifically for:
- Sequential reasoning chains
- Human cognitive tempo matching  
- Single-threaded exploration

But shifts dramatically for:
- Parallel architectures (latency less critical)
- Exhaustive tasks (stays valuable longer)
- Narrow domains (saturates faster)

## What We're Actually Measuring

Not "is 425ms optimal?" but rather:
1. **Which task architectures benefit most from sub-500ms search?**
2. **Where do different bottlenecks emerge?**
3. **How does value curve shape predict optimal system design?**

## Success Metrics

- ✅ Demonstrate 3+ distinct value curve shapes
- ✅ Identify the bottleneck type for each experiment  
- ✅ Show that 425ms enables 2+ "impossible at 1s" workflows
- ✅ Prove task-architecture fit matters more than raw speed
- ✅ Generate actionable insights about when to invest in speed vs. quality

## The Real Deliverable

**A map showing which customer use cases live in the "quadratic value" zone where 425ms delivers maximum ROI**.

## Value Curve Visualization

```
Value
  ^
  |     Zone 1: Quadratic Growth
  |    /
  |   /  Zone 2: Sub-quadratic Transition
  |  /  /
  | /  /   Zone 3: Linear/Plateau
  |/__/____/________________
  +-----------------------> # Searches
  0   20   50   100   200
```

## Experiment Schedule

1. **Breaking News Cascade** - Test breadth-first exploration limits
2. **Competitive Intel Blitz** - Test depth-first value extraction
3. **Fact-Check Network** - Test convergent truth-seeking
4. **Swarm Research** - Test parallel architecture benefits

Each experiment will run for exactly 2 minutes, with metrics tracked for:
- Searches per second
- Cumulative insight value
- Time to bottleneck
- Value curve shape

Ready to validate these hypotheses with real data!