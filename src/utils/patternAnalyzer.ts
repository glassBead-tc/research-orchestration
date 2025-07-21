import * as fs from 'fs';
import * as path from 'path';
import {
  OrchestrationPattern,
  PatternSimilarity,
  PatternScore,
  OrchestrationReasoningInput
} from '../types/orchestrationReasoning.js';

/**
 * Pattern analyzer for existing orchestrations
 * Scans and analyzes orchestration patterns for reuse and adaptation
 */
export class PatternAnalyzer {
  private orchestrationPath: string;
  private patterns: OrchestrationPattern[] = [];
  private patternCache: Map<string, OrchestrationPattern> = new Map();

  constructor(orchestrationPath: string = './src/resources/orchestrations') {
    this.orchestrationPath = orchestrationPath;
  }

  /**
   * Initialize pattern analysis by scanning existing orchestrations
   */
  public async initialize(): Promise<void> {
    await this.scanOrchestrations();
    this.buildPatternCache();
  }

  /**
   * Scan orchestration directories and extract patterns
   */
  private async scanOrchestrations(): Promise<void> {
    try {
      const categories = await this.getOrchestrationCategories();
      
      for (const category of categories) {
        const categoryPath = path.join(this.orchestrationPath, category);
        const files = await this.getMarkdownFiles(categoryPath);
        
        for (const file of files) {
          const pattern = await this.extractPattern(categoryPath, file, category);
          if (pattern) {
            this.patterns.push(pattern);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to scan orchestrations:', error);
      // Continue with empty patterns if scanning fails
    }
  }

  private async getOrchestrationCategories(): Promise<string[]> {
    try {
      const entries = await fs.promises.readdir(this.orchestrationPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(name => !name.startsWith('.'));
    } catch (error) {
      console.warn('Failed to read orchestration categories:', error);
      return [];
    }
  }

  private async getMarkdownFiles(categoryPath: string): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(categoryPath);
      return files.filter(file => file.endsWith('.md') && !file.startsWith('.'));
    } catch (error) {
      console.warn(`Failed to read files in ${categoryPath}:`, error);
      return [];
    }
  }

  /**
   * Extract orchestration pattern from markdown file
   */
  private async extractPattern(
    categoryPath: string, 
    filename: string, 
    category: string
  ): Promise<OrchestrationPattern | null> {
    try {
      const filePath = path.join(categoryPath, filename);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      
      const metadata = this.extractMetadata(content);
      const primitiveSequence = this.extractPrimitiveSequence(content);
      const complexity = this.assessComplexity(content, primitiveSequence);
      const successRate = this.estimateSuccessRate(metadata, complexity);
      const adaptabilityScore = this.calculateAdaptability(content, primitiveSequence);

      return {
        name: filename.replace('.md', ''),
        category,
        complexity,
        success_rate: successRate,
        primitive_sequence: primitiveSequence,
        adaptability_score: adaptabilityScore,
        metadata: {
          ...metadata,
          file_path: filePath,
          content_length: content.length,
          last_modified: (await fs.promises.stat(filePath)).mtime
        }
      };
    } catch (error) {
      console.warn(`Failed to extract pattern from ${filename}:`, error);
      return null;
    }
  }

  private extractMetadata(content: string): Record<string, any> {
    const metadata: Record<string, any> = {};
    
    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      metadata.title = titleMatch[1].trim();
    }

    // Extract description
    const descMatch = content.match(/^##?\s+(?:Description|Overview)\s*\n\n(.+?)(?=\n##|\n$)/ms);
    if (descMatch) {
      metadata.description = descMatch[1].trim();
    }

    // Extract complexity indicators
    const complexityKeywords = ['simple', 'basic', 'advanced', 'complex', 'comprehensive'];
    metadata.complexity_indicators = complexityKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    );

    // Extract domain keywords
    const domainKeywords = ['business', 'academic', 'research', 'competitive', 'market', 'technical'];
    metadata.domain_keywords = domainKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    );

    // Extract tool mentions
    const toolPattern = /(?:exa|search|crawl|linkedin|github|reddit|youtube)/gi;
    const toolMatches = content.match(toolPattern) || [];
    metadata.mentioned_tools = [...new Set(toolMatches.map(tool => tool.toLowerCase()))];

    return metadata;
  }

  private extractPrimitiveSequence(content: string): string[] {
    const primitives = ['querying', 'filtering', 'aggregation', 'reasoning'];
    const sequence: string[] = [];
    
    // Look for explicit primitive mentions in order
    const lines = content.split('\n');
    let currentPrimitive = '';
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      for (const primitive of primitives) {
        if (lowerLine.includes(primitive) || lowerLine.includes(primitive.slice(0, -3))) {
          if (currentPrimitive !== primitive) {
            sequence.push(primitive);
            currentPrimitive = primitive;
          }
          break;
        }
      }
    }

    // If no explicit sequence found, infer from content structure
    if (sequence.length === 0) {
      sequence.push(...this.inferPrimitiveSequence(content));
    }

    return sequence;
  }

  private inferPrimitiveSequence(content: string): string[] {
    const sequence: string[] = [];
    const lowerContent = content.toLowerCase();

    // Infer querying if search/data gathering is mentioned
    if (lowerContent.includes('search') || lowerContent.includes('gather') || lowerContent.includes('collect')) {
      sequence.push('querying');
    }

    // Infer filtering if quality/relevance is mentioned
    if (lowerContent.includes('filter') || lowerContent.includes('quality') || lowerContent.includes('relevant')) {
      sequence.push('filtering');
    }

    // Infer aggregation if synthesis/combination is mentioned
    if (lowerContent.includes('aggregate') || lowerContent.includes('combine') || lowerContent.includes('synthesize')) {
      sequence.push('aggregation');
    }

    // Infer reasoning if analysis/insights is mentioned
    if (lowerContent.includes('analyze') || lowerContent.includes('reason') || lowerContent.includes('insight')) {
      sequence.push('reasoning');
    }

    // Default sequence if nothing inferred
    if (sequence.length === 0) {
      sequence.push('querying', 'filtering', 'aggregation', 'reasoning');
    }

    return sequence;
  }

  private assessComplexity(content: string, primitiveSequence: string[]): 'low' | 'medium' | 'high' {
    let complexityScore = 0;

    // Factor 1: Content length
    if (content.length > 3000) complexityScore += 2;
    else if (content.length > 1500) complexityScore += 1;

    // Factor 2: Number of primitives
    if (primitiveSequence.length > 4) complexityScore += 2;
    else if (primitiveSequence.length > 2) complexityScore += 1;

    // Factor 3: Complexity keywords
    const complexKeywords = ['advanced', 'comprehensive', 'complex', 'sophisticated', 'multi-stage'];
    const complexMatches = complexKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length;
    complexityScore += complexMatches;

    // Factor 4: Number of tools mentioned
    const toolCount = (content.match(/(?:exa|search|crawl|linkedin|github|reddit|youtube)/gi) || []).length;
    if (toolCount > 5) complexityScore += 2;
    else if (toolCount > 2) complexityScore += 1;

    if (complexityScore >= 5) return 'high';
    if (complexityScore >= 2) return 'medium';
    return 'low';
  }

  private estimateSuccessRate(metadata: Record<string, any>, complexity: 'low' | 'medium' | 'high'): number {
    let successRate = 0.7; // Base success rate

    // Adjust based on complexity
    const complexityAdjustments = {
      low: 0.2,
      medium: 0.0,
      high: -0.1
    };
    successRate += complexityAdjustments[complexity];

    // Adjust based on domain maturity
    const matureDomains = ['business', 'market', 'competitive'];
    const hasMatureDomain = matureDomains.some(domain => 
      metadata.domain_keywords?.includes(domain)
    );
    if (hasMatureDomain) successRate += 0.1;

    // Adjust based on tool availability
    const toolCount = metadata.mentioned_tools?.length || 0;
    if (toolCount > 3) successRate += 0.1;
    else if (toolCount < 2) successRate -= 0.1;

    return Math.max(0.1, Math.min(0.95, successRate));
  }

  private calculateAdaptability(content: string, primitiveSequence: string[]): number {
    let adaptabilityScore = 0.5; // Base adaptability

    // Factor 1: Generic vs specific language
    const genericKeywords = ['general', 'flexible', 'adaptable', 'configurable'];
    const specificKeywords = ['specific', 'custom', 'specialized', 'particular'];
    
    const genericCount = genericKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length;
    const specificCount = specificKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length;
    
    adaptabilityScore += (genericCount - specificCount) * 0.1;

    // Factor 2: Parameter flexibility
    const parameterIndicators = ['parameter', 'config', 'option', 'setting'];
    const parameterCount = parameterIndicators.filter(indicator => 
      content.toLowerCase().includes(indicator)
    ).length;
    adaptabilityScore += parameterCount * 0.05;

    // Factor 3: Primitive sequence modularity
    if (primitiveSequence.length <= 4) adaptabilityScore += 0.2;
    if (primitiveSequence.length >= 6) adaptabilityScore -= 0.1;

    return Math.max(0.1, Math.min(0.9, adaptabilityScore));
  }

  private buildPatternCache(): void {
    this.patternCache.clear();
    for (const pattern of this.patterns) {
      this.patternCache.set(pattern.name, pattern);
    }
  }

  /**
   * Find patterns similar to the given input requirements
   */
  public findSimilarPatterns(input: OrchestrationReasoningInput): PatternSimilarity[] {
    const similarities: PatternSimilarity[] = [];

    for (const pattern of this.patterns) {
      const similarity = this.calculateSimilarity(pattern, input);
      similarities.push(similarity);
    }

    // Sort by overall similarity (highest first)
    similarities.sort((a, b) => b.overall_similarity - a.overall_similarity);

    return similarities.slice(0, 10); // Return top 10 matches
  }

  private calculateSimilarity(pattern: OrchestrationPattern, input: OrchestrationReasoningInput): PatternSimilarity {
    const semantic_similarity = this.calculateSemanticSimilarity(pattern, input);
    const structural_similarity = this.calculateStructuralSimilarity(pattern, input);
    const context_similarity = this.calculateContextSimilarity(pattern, input);
    const success_correlation = pattern.success_rate;

    // Weighted average
    const overall_similarity = (
      semantic_similarity * 0.4 +
      structural_similarity * 0.2 +
      context_similarity * 0.3 +
      success_correlation * 0.1
    );

    return {
      pattern,
      semantic_similarity,
      structural_similarity,
      context_similarity,
      success_correlation,
      overall_similarity
    };
  }

  private calculateSemanticSimilarity(pattern: OrchestrationPattern, input: OrchestrationReasoningInput): number {
    // Simple keyword-based semantic similarity
    const patternKeywords = [
      ...(pattern.metadata.domain_keywords || []),
      ...(pattern.metadata.complexity_indicators || []),
      pattern.name.toLowerCase().split('-')
    ].filter(Boolean);

    const inputKeywords = [
      input.information_need.toLowerCase().split(' '),
      input.context.domain.toLowerCase().split('-'),
      input.context.complexity
    ].flat().filter(Boolean);

    const intersection = patternKeywords.filter(keyword => 
      inputKeywords.some(inputKeyword => 
        inputKeyword.includes(keyword) || keyword.includes(inputKeyword)
      )
    );

    const union = [...new Set([...patternKeywords, ...inputKeywords])];
    
    return union.length > 0 ? intersection.length / union.length : 0;
  }

  private calculateStructuralSimilarity(pattern: OrchestrationPattern, input: OrchestrationReasoningInput): number {
    // Compare complexity levels
    const complexityMatch = pattern.complexity === input.context.complexity ? 1.0 : 0.5;
    
    // Compare primitive sequence length (prefer similar complexity)
    const expectedPrimitives = this.estimateRequiredPrimitives(input);
    const lengthDiff = Math.abs(pattern.primitive_sequence.length - expectedPrimitives);
    const lengthSimilarity = Math.max(0, 1 - (lengthDiff * 0.2));

    return (complexityMatch + lengthSimilarity) / 2;
  }

  private calculateContextSimilarity(pattern: OrchestrationPattern, input: OrchestrationReasoningInput): number {
    // Domain matching
    const domainMatch = pattern.category.includes(input.context.domain) || 
                       input.context.domain.includes(pattern.category) ? 1.0 : 0.3;

    // Tool availability matching
    const availableTools = input.context.available_tools || [];
    const patternTools = pattern.metadata.mentioned_tools || [];
    
    let toolMatch = 0.5; // Default if no tools specified
    if (availableTools.length > 0 && patternTools.length > 0) {
      const toolIntersection = patternTools.filter((tool: string) =>
        availableTools.some((available: string) => available.toLowerCase().includes(tool))
      );
      toolMatch = toolIntersection.length / Math.max(patternTools.length, 1);
    }

    return (domainMatch + toolMatch) / 2;
  }

  private estimateRequiredPrimitives(input: OrchestrationReasoningInput): number {
    const complexityMap = {
      low: 3,
      medium: 4,
      high: 5
    };
    return complexityMap[input.context.complexity];
  }

  /**
   * Score patterns for auction-style selection
   */
  public scorePatterns(similarities: PatternSimilarity[]): PatternScore[] {
    return similarities.map(sim => {
      const pattern = sim.pattern;
      const similarity = sim.overall_similarity;
      const success_rate = pattern.success_rate;
      const simplicity = this.calculateSimplicity(pattern);
      const adaptability = pattern.adaptability_score;

      // Calculate total score using the framework's formula
      const total_score = (similarity * 0.4) + (success_rate * 0.3) + (simplicity * 0.2) + (adaptability * 0.1);

      return {
        pattern_name: pattern.name,
        similarity,
        success_rate,
        simplicity,
        adaptability,
        total_score
      };
    });
  }

  private calculateSimplicity(pattern: OrchestrationPattern): number {
    // Inverse of complexity
    const complexityScores = {
      low: 0.9,
      medium: 0.6,
      high: 0.3
    };
    return complexityScores[pattern.complexity];
  }

  /**
   * Get all available patterns
   */
  public getAllPatterns(): OrchestrationPattern[] {
    return [...this.patterns];
  }

  /**
   * Get pattern by name
   */
  public getPattern(name: string): OrchestrationPattern | undefined {
    return this.patternCache.get(name);
  }

  /**
   * Get patterns by category
   */
  public getPatternsByCategory(category: string): OrchestrationPattern[] {
    return this.patterns.filter(pattern => pattern.category === category);
  }
}