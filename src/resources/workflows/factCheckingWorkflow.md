# Fact-Checking Workflow with Exa AI

This guide demonstrates a three-step workflow for detecting and verifying claims in text using Exa AI's search capabilities. This approach helps identify potential hallucinations or inaccuracies in AI-generated content or any text that requires fact-checking.

## Overview

The fact-checking workflow consists of three main steps:

1. **Extract Claims** - Identify verifiable statements from the input text
2. **Search for Evidence** - Use Exa AI to find relevant sources for each claim
3. **Verify Claims** - Analyze sources to determine if they support or refute each claim

## Step 1: Extract Claims

First, use an LLM to identify all verifiable statements in the text. The goal is to extract specific claims that can be fact-checked.

### Implementation Approach:
- Parse the input text to identify factual statements
- Exclude opinions, subjective statements, or unverifiable claims
- Return claims as a structured list (e.g., JSON array)

### Example Prompt for Claim Extraction:
```
Identify and list all verifiable claims present in the following text. 
Focus on factual statements that can be verified through external sources.
Return the claims as a JSON array of strings.
```

### Sample Output:
```json
[
  "Company X was founded in 2020",
  "The product has over 1 million users",
  "The technology uses quantum computing"
]
```

## Step 2: Search for Evidence

For each extracted claim, use Exa AI's search capabilities to find relevant sources that could verify or refute the claim.

### Using Exa Tools:
- **web_search_exa**: For general web searches about recent claims
- **research_paper_search_exa**: For academic or scientific claims
- **company_research_exa**: For business-related claims
- **wikipedia_search_exa**: For established facts and historical information

### Implementation Example:
```javascript
// For each claim, perform a targeted search
const claimEvidence = await Promise.all(claims.map(async (claim) => {
  const searchResults = await exaSearch({
    query: claim,
    numResults: 5,  // Get top 5 most relevant sources
    type: "auto"
  });
  
  return {
    claim: claim,
    sources: searchResults
  };
}));
```

### Best Practices:
- Use 3-5 sources per claim for balanced verification
- Include the claim text in the search query for better relevance
- Consider using multiple Exa tools for comprehensive coverage

## Step 3: Verify Claims

Analyze the retrieved sources to determine whether they support, refute, or provide insufficient evidence for each claim.

### Verification Process:
1. Feed each claim and its associated sources to an LLM
2. Ask the LLM to analyze whether sources support or contradict the claim
3. Request a confidence score and explanation

### Example Verification Prompt:
```
Given the following claim and sources, determine if the claim is:
- SUPPORTED: Sources clearly confirm the claim
- REFUTED: Sources contradict the claim
- INSUFFICIENT: Not enough evidence to verify

Claim: [INSERT CLAIM]

Sources:
[INSERT FORMATTED SOURCES]

Provide your assessment with a confidence score (0-100) and brief explanation.
```

### Output Format:
```json
{
  "claim": "Company X was founded in 2020",
  "assessment": "REFUTED",
  "confidence": 95,
  "explanation": "Multiple sources indicate Company X was founded in 2018, not 2020",
  "supporting_sources": [],
  "refuting_sources": ["source1_url", "source2_url"]
}
```

## Complete Workflow Example

Here's how to implement the complete fact-checking workflow:

```javascript
async function factCheckText(inputText) {
  // Step 1: Extract claims
  const claims = await extractClaims(inputText);
  
  // Step 2: Search for evidence for each claim
  const claimsWithEvidence = await Promise.all(
    claims.map(async (claim) => {
      const evidence = await searchForEvidence(claim);
      return { claim, evidence };
    })
  );
  
  // Step 3: Verify each claim against evidence
  const verificationResults = await Promise.all(
    claimsWithEvidence.map(async ({ claim, evidence }) => {
      return await verifyClaim(claim, evidence);
    })
  );
  
  return {
    totalClaims: claims.length,
    verified: verificationResults.filter(r => r.assessment === 'SUPPORTED').length,
    refuted: verificationResults.filter(r => r.assessment === 'REFUTED').length,
    insufficient: verificationResults.filter(r => r.assessment === 'INSUFFICIENT').length,
    details: verificationResults
  };
}
```

## Tips for Effective Fact-Checking

1. **Claim Granularity**: Break complex statements into atomic claims for more accurate verification
2. **Source Quality**: Prioritize authoritative sources (academic papers, official websites, established news outlets)
3. **Temporal Relevance**: Consider the recency of sources, especially for time-sensitive claims
4. **Multiple Perspectives**: Look for sources that both support and contradict claims
5. **Context Matters**: Ensure claims are verified within their proper context

## Integration with MCP Tools

When using this workflow with MCP-enabled assistants:

1. Use `web_search_exa` for recent events and general facts
2. Use `research_paper_search_exa` for scientific claims
3. Use `company_research_exa` for business-related facts
4. Use `wikipedia_search_exa` for established historical facts
5. Combine multiple tools for comprehensive verification

## Example Use Cases

- **AI Content Verification**: Check AI-generated articles for factual accuracy
- **Research Validation**: Verify claims in research papers or reports
- **News Fact-Checking**: Validate statements in news articles
- **Educational Content**: Ensure accuracy in educational materials
- **Business Intelligence**: Verify claims about companies or markets

This workflow provides a systematic approach to fact-checking that leverages Exa AI's powerful search capabilities to ensure accuracy and reliability in any content requiring verification.