/**
 * Simple in-memory session store for agent experiences
 * Designed for quality over complexity
 */

export interface Experience {
  id: string;
  timestamp: number;
  primitive: string;
  input: any;
  output: any;
  quality: QualityMetrics;
  insights: string[];
  patterns: Pattern[];
  duration_ms: number;
}

export interface QualityMetrics {
  relevance: number;      // 0-1: How relevant were the results?
  completeness: number;   // 0-1: How complete was the information?
  confidence: number;     // 0-1: How confident is the agent?
  efficiency: number;     // 0-1: How efficient was the execution?
}

export interface Pattern {
  id: string;
  description: string;
  confidence: number;
  occurrences: number;
  context: string[];
}

export interface ToolPreference {
  tool: string;
  context: string;
  effectiveness: number;
  uses: number;
  last_used: number;
}

/**
 * In-memory session store for a single agent session
 */
export class SessionStore {
  private sessionId: string;
  private agentId: string;
  private experiences: Map<string, Experience> = new Map();
  private patterns: Map<string, Pattern> = new Map();
  private toolPreferences: Map<string, ToolPreference> = new Map();
  private sessionStart: number;
  
  constructor(agentId: string) {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.agentId = agentId;
    this.sessionStart = Date.now();
  }
  
  /**
   * Record a new experience
   */
  recordExperience(experience: Omit<Experience, 'id' | 'timestamp'>): string {
    const id = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const fullExperience: Experience = {
      id,
      timestamp: Date.now(),
      ...experience
    };
    
    this.experiences.set(id, fullExperience);
    
    // Extract and update patterns
    experience.patterns.forEach(pattern => {
      const existing = this.patterns.get(pattern.id);
      if (existing) {
        existing.occurrences++;
        existing.confidence = (existing.confidence + pattern.confidence) / 2;
        existing.context = [...new Set([...existing.context, ...pattern.context])];
      } else {
        this.patterns.set(pattern.id, { ...pattern, occurrences: 1 });
      }
    });
    
    // Update tool preferences if this was a querying primitive
    if (experience.primitive === 'querying' && experience.output?.metadata?.tools_used) {
      this.updateToolPreferences(
        experience.output.metadata.tools_used,
        experience.input.context || 'general',
        experience.quality.effectiveness
      );
    }
    
    return id;
  }
  
  /**
   * Get experiences by primitive type
   */
  getExperiencesByPrimitive(primitive: string): Experience[] {
    return Array.from(this.experiences.values())
      .filter(exp => exp.primitive === primitive)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
  
  /**
   * Get patterns above confidence threshold
   */
  getHighConfidencePatterns(minConfidence: number = 0.7): Pattern[] {
    return Array.from(this.patterns.values())
      .filter(p => p.confidence >= minConfidence)
      .sort((a, b) => b.confidence - a.confidence);
  }
  
  /**
   * Get tool preferences for a context
   */
  getToolPreferences(context: string): ToolPreference[] {
    return Array.from(this.toolPreferences.values())
      .filter(pref => pref.context === context)
      .sort((a, b) => b.effectiveness - a.effectiveness);
  }
  
  /**
   * Calculate session statistics
   */
  getSessionStats() {
    const experiences = Array.from(this.experiences.values());
    const avgQuality = experiences.reduce((acc, exp) => ({
      relevance: acc.relevance + exp.quality.relevance,
      completeness: acc.completeness + exp.quality.completeness,
      confidence: acc.confidence + exp.quality.confidence,
      efficiency: acc.efficiency + exp.quality.efficiency
    }), { relevance: 0, completeness: 0, confidence: 0, efficiency: 0 });
    
    const count = experiences.length || 1;
    Object.keys(avgQuality).forEach(key => {
      avgQuality[key as keyof QualityMetrics] /= count;
    });
    
    return {
      sessionId: this.sessionId,
      agentId: this.agentId,
      duration_ms: Date.now() - this.sessionStart,
      experience_count: experiences.length,
      pattern_count: this.patterns.size,
      average_quality: avgQuality,
      insights_generated: experiences.flatMap(e => e.insights).length,
      primitives_used: [...new Set(experiences.map(e => e.primitive))]
    };
  }
  
  /**
   * Export session data for persistence
   */
  exportSession() {
    return {
      metadata: {
        sessionId: this.sessionId,
        agentId: this.agentId,
        startTime: this.sessionStart,
        endTime: Date.now()
      },
      experiences: Array.from(this.experiences.values()),
      patterns: Array.from(this.patterns.values()),
      toolPreferences: Array.from(this.toolPreferences.values()),
      statistics: this.getSessionStats()
    };
  }
  
  /**
   * Get insights from the session
   */
  getSessionInsights(): string[] {
    const insights: string[] = [];
    const stats = this.getSessionStats();
    
    // Quality insights
    if (stats.average_quality.relevance > 0.8) {
      insights.push('High relevance achieved - search strategies are well-aligned');
    }
    if (stats.average_quality.efficiency < 0.5) {
      insights.push('Low efficiency detected - consider optimizing primitive sequences');
    }
    
    // Pattern insights
    const topPatterns = this.getHighConfidencePatterns(0.8);
    if (topPatterns.length > 0) {
      insights.push(`Discovered ${topPatterns.length} high-confidence patterns`);
      topPatterns.slice(0, 3).forEach(p => {
        insights.push(`Pattern: ${p.description} (${p.occurrences} occurrences)`);
      });
    }
    
    // Tool insights
    const toolStats = this.analyzeToolUsage();
    if (toolStats.mostEffective) {
      insights.push(`Most effective tool: ${toolStats.mostEffective.tool} (${toolStats.mostEffective.effectiveness.toFixed(2)} effectiveness)`);
    }
    
    return insights;
  }
  
  private updateToolPreferences(tools: string[], context: string, effectiveness: number) {
    tools.forEach(tool => {
      const key = `${tool}_${context}`;
      const existing = this.toolPreferences.get(key);
      
      if (existing) {
        // Weighted average favoring recent experiences
        existing.effectiveness = (existing.effectiveness * existing.uses + effectiveness) / (existing.uses + 1);
        existing.uses++;
        existing.last_used = Date.now();
      } else {
        this.toolPreferences.set(key, {
          tool,
          context,
          effectiveness,
          uses: 1,
          last_used: Date.now()
        });
      }
    });
  }
  
  private analyzeToolUsage() {
    const tools = Array.from(this.toolPreferences.values());
    if (tools.length === 0) return {};
    
    const mostEffective = tools.reduce((best, current) => 
      current.effectiveness > best.effectiveness ? current : best
    );
    
    const mostUsed = tools.reduce((most, current) => 
      current.uses > most.uses ? current : most
    );
    
    return { mostEffective, mostUsed };
  }
}

/**
 * Global session manager for multiple agents
 */
export class SessionManager {
  private sessions: Map<string, SessionStore> = new Map();
  
  createSession(agentId: string): SessionStore {
    const session = new SessionStore(agentId);
    this.sessions.set(session['sessionId'], session);
    return session;
  }
  
  getSession(sessionId: string): SessionStore | undefined {
    return this.sessions.get(sessionId);
  }
  
  getAllSessions(): SessionStore[] {
    return Array.from(this.sessions.values());
  }
  
  exportAllSessions() {
    return Array.from(this.sessions.values()).map(session => session.exportSession());
  }
  
  /**
   * Get collective insights across all sessions
   */
  getCollectiveInsights() {
    const allPatterns = new Map<string, Pattern>();
    const allToolPrefs = new Map<string, { total: number, count: number }>();
    
    this.sessions.forEach(session => {
      // Aggregate patterns
      session['patterns'].forEach((pattern, id) => {
        const existing = allPatterns.get(id);
        if (existing) {
          existing.occurrences += pattern.occurrences;
          existing.confidence = (existing.confidence + pattern.confidence) / 2;
        } else {
          allPatterns.set(id, { ...pattern });
        }
      });
      
      // Aggregate tool preferences
      session['toolPreferences'].forEach(pref => {
        const key = `${pref.tool}_${pref.context}`;
        const existing = allToolPrefs.get(key);
        if (existing) {
          existing.total += pref.effectiveness * pref.uses;
          existing.count += pref.uses;
        } else {
          allToolPrefs.set(key, { 
            total: pref.effectiveness * pref.uses, 
            count: pref.uses 
          });
        }
      });
    });
    
    // Calculate collective tool effectiveness
    const toolEffectiveness = Array.from(allToolPrefs.entries()).map(([key, stats]) => ({
      key,
      effectiveness: stats.total / stats.count,
      total_uses: stats.count
    })).sort((a, b) => b.effectiveness - a.effectiveness);
    
    return {
      session_count: this.sessions.size,
      collective_patterns: Array.from(allPatterns.values())
        .sort((a, b) => b.occurrences - a.occurrences),
      tool_effectiveness: toolEffectiveness,
      total_experiences: Array.from(this.sessions.values())
        .reduce((sum, session) => sum + session['experiences'].size, 0)
    };
  }
}