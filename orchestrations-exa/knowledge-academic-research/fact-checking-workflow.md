# Fact-Checking Workflow Orchestration

This workflow verifies factual claims and statistics by cross-referencing multiple authoritative sources including Wikipedia, academic papers, and reliable web sources to determine accuracy and provide corrected information when needed.

## Overview

In an era of information abundance and misinformation, systematic fact-checking is essential for establishing truth and correcting false claims. This orchestration implements a rigorous verification process that examines claims from multiple angles, traces original sources, and provides transparency in the fact-checking methodology.

## Required Tools

- `wikipedia_search_exa` - Encyclopedia verification
- `web_search_exa` - Primary source discovery
- `research_paper_search_exa` - Academic validation
- `company_research_exa` - Corporate claim verification

## Workflow Steps

### Phase 1: Claim Analysis

```
1. Claim Decomposition
   Break down the claim:
   - Core assertion
   - Specific details
   - Quantitative elements
   - Temporal aspects
   - Geographic scope
   - Causal relationships
   - Implicit assumptions
   - Testable components

2. Claim Categorization
   Classify claim type:
   - Statistical claim
   - Historical fact
   - Scientific assertion
   - Economic data
   - Attribution claim
   - Causal claim
   - Predictive claim
   - Comparative claim

3. Verification Strategy
   Plan approach:
   - Primary source needs
   - Authority identification
   - Search parameters
   - Verification criteria
   - Evidence standards
   - Conflicting source handling
   - Confidence thresholds
   - Update requirements
```

### Phase 2: Source Discovery

```
4. Wikipedia Foundation
   Use `wikipedia_search_exa`:
   - Direct topic search
   - Related articles
   - Citation sources
   - Talk page discussions
   - Revision history
   - Disputed content flags
   - Reliable source lists
   - External links

5. Primary Source Hunt
   Use `web_search_exa`:
   - Original studies
   - Government databases
   - Official statistics
   - Press releases
   - Legal documents
   - Archive materials
   - Expert statements
   - Raw datasets

6. Academic Validation
   Use `research_paper_search_exa`:
   - Peer-reviewed studies
   - Meta-analyses
   - Systematic reviews
   - Replication studies
   - Methodology papers
   - Critical responses
   - Update papers
   - Correction notices
```

### Phase 3: Evidence Evaluation

```
7. Source Credibility Assessment
   Evaluate reliability:
   - Author expertise
   - Institutional affiliation
   - Publication venue
   - Peer review status
   - Citation count
   - Methodology quality
   - Conflict of interest
   - Update recency

8. Data Extraction
   Gather evidence:
   - Exact quotes
   - Statistical figures
   - Methodology notes
   - Sample sizes
   - Confidence intervals
   - Date of data
   - Geographic scope
   - Limitations noted

9. Cross-Source Comparison
   Analyze consistency:
   - Agreement levels
   - Variation ranges
   - Outlier identification
   - Trend consistency
   - Methodology differences
   - Temporal changes
   - Regional variations
   - Interpretation differences
```

### Phase 4: Fact Verification

```
10. Claim Component Testing
    Verify each element:
    - Number accuracy
    - Date correctness
    - Attribution validity
    - Context appropriateness
    - Scope accuracy
    - Relationship validity
    - Implication soundness
    - Conclusion support

11. Statistical Validation
    For numerical claims:
    - Original data source
    - Calculation methods
    - Margin of error
    - Statistical significance
    - Sample representativeness
    - Time period validity
    - Geographic applicability
    - Comparative baseline

12. Context Verification
    Check full picture:
    - Selective quotation
    - Cherry-picked data
    - Temporal context
    - Comparison fairness
    - Omitted information
    - Alternative interpretations
    - Confounding factors
    - Updated information
```

### Phase 5: Discrepancy Resolution

```
13. Conflict Analysis
    When sources disagree:
    - Identify variations
    - Trace source chains
    - Assess methodologies
    - Check for updates
    - Find expert consensus
    - Weight evidence
    - Consider biases
    - Determine most credible

14. Expert Consultation
    Seek authoritative input:
    - Domain experts
    - Fact-checking organizations
    - Academic specialists
    - Industry authorities
    - Government agencies
    - International bodies
    - Professional associations
    - Think tanks

15. Uncertainty Handling
    Address unknowns:
    - Acknowledge limits
    - Specify confidence levels
    - Note assumptions
    - Identify gaps
    - Suggest further research
    - Provide ranges
    - Mark disputes
    - Update mechanisms
```

### Phase 6: Result Compilation

```
16. Verdict Formulation
    Determine outcome:
   - True (fully supported)
   - Mostly true (minor issues)
   - Half true (partially correct)
   - Mostly false (major issues)
   - False (unsupported)
   - Unverifiable (insufficient evidence)
   - Outdated (was true)
   - Misleading (technically true but deceptive)

17. Evidence Summary
    Document findings:
    - Supporting evidence
    - Contradicting evidence
    - Source quality
    - Confidence level
    - Key documents
    - Expert opinions
    - Remaining questions
    - Update triggers

18. Correction Provision
    When claim is false:
    - Accurate information
    - Proper context
    - Original source
    - Common misconceptions
    - Related facts
    - Prevention tips
    - Further reading
    - Monitoring plan
```

## Output Format

```markdown
# Fact-Check Report: [Claim Summary]
## Date: [Current Date]
## Claim Source: [Where claim appeared]

### Claim Being Checked
> "[Full exact claim as stated]"

**Claim Type**: [Statistical/Historical/Scientific/etc.]
**Claimant**: [Person/Organization making claim]
**Date of Claim**: [When made]
**Context**: [Where/why claim was made]

### Quick Verdict

## ⚠️ [VERDICT: TRUE/MOSTLY TRUE/HALF TRUE/MOSTLY FALSE/FALSE/UNVERIFIABLE]

**Summary**: [One-sentence explanation of verdict]

### Detailed Analysis

#### Claim Breakdown
The claim contains the following testable elements:
1. **[Element 1]**: [What needs verification]
2. **[Element 2]**: [What needs verification]
3. **[Element 3]**: [What needs verification]

#### Verification Process

##### Element 1: [Specific claim component]

**Finding**: [TRUE/FALSE/PARTIALLY TRUE]

**Evidence**:
- **Wikipedia**: [What Wikipedia says] [[Source]](URL)
  - Relevance: [How this relates to claim]
  - Reliability: [Assessment of this source]

- **Primary Source**: [Original data/study] [[Source]](URL)
  - Quote: "[Exact relevant quote]"
  - Context: [Important context]
  - Date: [When published/updated]

- **Academic Validation**: [Research findings] [[Paper]](URL)
  - Authors: [Credentials]
  - Methodology: [Brief description]
  - Finding: "[Key finding]"

**Assessment**: [Detailed explanation of why true/false]

##### Element 2: [Specific claim component]

[Repeat structure for each element]

### Source Quality Analysis

#### Primary Sources Used
| Source | Type | Reliability | Last Updated | Relevance |
|--------|------|------------|--------------|-----------|
| [Source 1] | [Government/Academic/News] | High/Medium/Low | [Date] | Direct/Indirect |
| [Source 2] | [Type] | [Rating] | [Date] | [Relevance] |
| [Source 3] | [Type] | [Rating] | [Date] | [Relevance] |

#### Source Agreement Level
```
Consensus    ████████████ 80% (4 of 5 sources agree)
Minor Variation ████ 20% (1 source differs slightly)
Major Conflict ░░░░ 0% (No fundamental disagreements)
```

### Context & Nuance

#### What's True
- [Accurate element 1]
- [Accurate element 2]
- [Accurate element 3]

#### What's False or Misleading
- [Inaccurate element 1]
- [Misleading element 2]
- [False element 3]

#### Important Context Missing from Claim
- [Contextual information that changes interpretation]
- [Relevant limitations not mentioned]
- [Important caveats omitted]

### The Correct Information

**Accurate Statement**: [How the claim should be stated correctly]

**Supporting Data**:
- [Key statistic] (Source: [Authority], [Date])
- [Key fact] (Source: [Authority], [Date])
- [Key context] (Source: [Authority], [Date])

### Historical Accuracy
*For claims involving change over time*

| Time Period | Value/Status | Source | Notes |
|-------------|--------------|--------|-------|
| [Historical] | [Data] | [Source] | [Context] |
| [Previous] | [Data] | [Source] | [Change] |
| [Current] | [Data] | [Source] | [Current status] |

### Geographic Variations
*For claims with regional differences*

| Region | Value/Status | Source | Variation from Claim |
|--------|--------------|--------|---------------------|
| [Global] | [Data] | [Source] | [How differs] |
| [Region A] | [Data] | [Source] | [How differs] |
| [Region B] | [Data] | [Source] | [How differs] |

### Expert Opinions

#### Supporting Experts
- **[Expert Name]**, [Title/Institution]: "[Quote supporting corrected version]"
- **[Expert Name]**, [Title/Institution]: "[Quote providing context]"

#### Fact-Checking Organizations
- **[Organization]**: [Their verdict] [[Link]](URL)
- **[Organization]**: [Their verdict] [[Link]](URL)

### Common Misconceptions

This claim is often confused with:
1. **[Related but different claim]**: [Why confused]
2. **[Similar statistic]**: [Key difference]
3. **[Historical version]**: [What changed]

### Claim Origin Tracking

**First Appearance**: [Where/when claim first appeared]
**Spread Pattern**: [How claim propagated]
**Mutations**: [How claim changed over time]
**Amplifiers**: [Who spread the claim]

### Statistical Details
*For numerical claims*

```
Original Claim: [Number/percentage]
Actual Figure: [Number/percentage]
Margin of Error: ±[Amount]
Confidence Level: [X]%
Sample Size: [N]
Time Period: [Dates]
Population: [Who/what measured]
Methodology: [How measured]
```

### Related Facts

To provide full context, consider these related verified facts:
1. [Related fact that provides context]
2. [Related fact that shows trends]
3. [Related fact that explains variations]

### Verification Limitations

**Could Not Verify**:
- [Aspect that lacks sufficient evidence]
- [Data that is not publicly available]

**Caveats**:
- [Limitation of available data]
- [Potential bias in sources]
- [Time-sensitive nature of data]

### Bottom Line

**Simple Explanation**: [Plain language summary for general audience]

**Why This Matters**: [Importance of getting this fact right]

**How to Verify Yourself**: 
1. Check [specific source type]
2. Look for [specific indicators]
3. Compare [specific data points]

### Updates & Corrections

**Last Verified**: [Date]
**Next Review**: [Date - for time-sensitive claims]
**Update History**:
- [Date]: [What changed]
- [Date]: [What updated]

**Report a Correction**: [Contact method]

### Methodology Note

This fact-check followed standard verification procedures:
- ✓ Multiple source verification (minimum 3 sources)
- ✓ Primary source identification
- ✓ Expert consultation where applicable
- ✓ Bias assessment of sources
- ✓ Temporal relevance check
- ✓ Geographic applicability verification
- ✓ Statistical validation where applicable
- ✓ Context completeness review

### Share This Fact-Check

**Shareable Summary**: 
"[Claim]" is [VERDICT]. The actual fact is [correct information]. Verified by [number] sources on [date].

**Citation**: [How to cite this fact-check]

---

**Fact-Check Metadata**
- Checker: [Name/Organization]
- Review: [Reviewer if applicable]
- Standards: [Fact-checking standards followed]
- Disclosure: [Any conflicts of interest]
- License: [Usage rights]
```

## Best Practices

1. **Multiple Source Rule**: Never verify based on single source
2. **Primary Source Priority**: Always seek original data
3. **Context Inclusion**: Facts without context can mislead
4. **Transparency**: Show your work and sources
5. **Update Commitment**: Facts change; checks should too

## Advanced Techniques

### Claim Pattern Analysis
- Identify recurring false claims
- Track claim mutations
- Map disinformation networks
- Predict claim spread
- Develop prebuttals

### Statistical Forensics
- Reverse-engineer statistics
- Verify calculation methods
- Check sampling techniques
- Assess significance claims
- Detect data manipulation

### Source Network Mapping
- Trace citation chains
- Identify echo chambers
- Find original sources
- Map influence networks
- Detect coordinated campaigns

### Temporal Fact Analysis
- Track fact evolution
- Identify when facts changed
- Predict fact obsolescence
- Monitor emerging facts
- Archive fact states

## Common Pitfalls to Avoid

1. **Single Source Syndrome**: Even reliable sources make mistakes
2. **Recency Bias**: Newer isn't always more accurate
3. **Authority Bias**: Experts can be wrong too
4. **Binary Thinking**: Many claims are partially true
5. **Context Stripping**: Facts need their full context

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Professional-Fact-Checker
motivation: Verify claims objectively using multiple authoritative sources
constraints: Require multiple source verification, maintain political neutrality, acknowledge uncertainties
output_format: Comprehensive fact-check report with clear verdict, evidence, and corrections
-->

When deploying task agents for fact-checking:
1. Decompose complex claims into verifiable components
2. Prioritize primary sources over secondary reporting
3. Always check for updates or corrections to sources
4. Include context that affects claim interpretation
5. Provide correct information, not just verification

## Customization Options

### Check Depth
- **Quick Check**: Basic verification (30 minutes)
- **Standard Check**: Full verification (2-4 hours)
- **Deep Dive**: Exhaustive verification (4-8 hours)
- **Investigative**: Original research (days)

### Claim Types
- **Statistical Claims**: Number and data focused
- **Historical Claims**: Event and date focused
- **Scientific Claims**: Research and evidence focused
- **Attribution Claims**: Quote and source focused
- **Predictive Claims**: Forecast and projection focused

### Output Formats
- **Quick Verdict**: Simple true/false with source
- **Full Report**: Comprehensive analysis
- **Academic Format**: Scholarly apparatus
- **Social Media**: Shareable summary
- **Legal Format**: Court-ready documentation