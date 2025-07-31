/**
 * Persistence utility workflow for storing session data in external systems
 * Supports Supabase (structured data), mem0 (vector memory), and Neo4j (graph relationships)
 */

import { SessionStore, Experience, Pattern, ToolPreference } from './sessionStore';

export interface PersistenceConfig {
  supabase?: {
    url: string;
    key: string;
    tables: {
      sessions: string;
      experiences: string;
      patterns: string;
      insights: string;
    };
  };
  mem0?: {
    apiKey: string;
    userId: string;
    endpoint?: string;
  };
  neo4j?: {
    uri: string;
    user: string;
    password: string;
    database?: string;
  };
}

/**
 * Persistence workflow for agent memory
 */
export class PersistenceWorkflow {
  constructor(private config: PersistenceConfig) {}
  
  /**
   * Persist session to all configured stores
   */
  async persistSession(session: SessionStore): Promise<PersistenceResult> {
    const sessionData = session.exportSession();
    const results: PersistenceResult = {
      sessionId: sessionData.metadata.sessionId,
      supabase: false,
      mem0: false,
      neo4j: false,
      errors: []
    };
    
    // Parallel persistence to all stores
    const persistencePromises = [];
    
    if (this.config.supabase) {
      persistencePromises.push(
        this.persistToSupabase(sessionData)
          .then(() => { results.supabase = true; })
          .catch(err => results.errors.push({ store: 'supabase', error: err.message }))
      );
    }
    
    if (this.config.mem0) {
      persistencePromises.push(
        this.persistToMem0(sessionData)
          .then(() => { results.mem0 = true; })
          .catch(err => results.errors.push({ store: 'mem0', error: err.message }))
      );
    }
    
    if (this.config.neo4j) {
      persistencePromises.push(
        this.persistToNeo4j(sessionData)
          .then(() => { results.neo4j = true; })
          .catch(err => results.errors.push({ store: 'neo4j', error: err.message }))
      );
    }
    
    await Promise.allSettled(persistencePromises);
    return results;
  }
  
  /**
   * Persist to Supabase (structured relational data)
   */
  private async persistToSupabase(sessionData: any): Promise<void> {
    // This would use the Supabase client in a real implementation
    // For now, we'll show the data structure
    
    const sessionRecord = {
      id: sessionData.metadata.sessionId,
      agent_id: sessionData.metadata.agentId,
      start_time: new Date(sessionData.metadata.startTime),
      end_time: new Date(sessionData.metadata.endTime),
      experience_count: sessionData.statistics.experience_count,
      average_quality: sessionData.statistics.average_quality,
      insights_count: sessionData.statistics.insights_generated
    };
    
    const experienceRecords = sessionData.experiences.map((exp: Experience) => ({
      id: exp.id,
      session_id: sessionData.metadata.sessionId,
      timestamp: new Date(exp.timestamp),
      primitive: exp.primitive,
      input_data: exp.input,
      output_data: exp.output,
      quality_metrics: exp.quality,
      insights: exp.insights,
      duration_ms: exp.duration_ms
    }));
    
    const patternRecords = sessionData.patterns.map((pattern: Pattern) => ({
      id: pattern.id,
      session_id: sessionData.metadata.sessionId,
      description: pattern.description,
      confidence: pattern.confidence,
      occurrences: pattern.occurrences,
      contexts: pattern.context
    }));
    
    console.log('Supabase persistence structure:', {
      session: sessionRecord,
      experiences: experienceRecords.length,
      patterns: patternRecords.length
    });
    
    // In real implementation:
    // await supabase.from(this.config.supabase.tables.sessions).insert(sessionRecord);
    // await supabase.from(this.config.supabase.tables.experiences).insert(experienceRecords);
    // await supabase.from(this.config.supabase.tables.patterns).insert(patternRecords);
  }
  
  /**
   * Persist to mem0 (vector memory for semantic search)
   */
  private async persistToMem0(sessionData: any): Promise<void> {
    // mem0 is optimized for semantic memory storage
    
    const memories = [];
    
    // Convert experiences to memories
    sessionData.experiences.forEach((exp: Experience) => {
      // Create a memory for each significant insight
      exp.insights.forEach(insight => {
        memories.push({
          text: insight,
          metadata: {
            session_id: sessionData.metadata.sessionId,
            agent_id: sessionData.metadata.agentId,
            primitive: exp.primitive,
            quality_score: exp.quality.confidence,
            timestamp: exp.timestamp,
            context: exp.input.context || 'general'
          }
        });
      });
      
      // Create memories for high-quality outputs
      if (exp.quality.relevance > 0.8) {
        memories.push({
          text: `${exp.primitive} execution: ${JSON.stringify(exp.input)} resulted in high-quality output`,
          metadata: {
            session_id: sessionData.metadata.sessionId,
            type: 'execution_success',
            primitive: exp.primitive,
            quality_metrics: exp.quality
          }
        });
      }
    });
    
    // Convert patterns to memories
    sessionData.patterns.forEach((pattern: Pattern) => {
      if (pattern.confidence > 0.7) {
        memories.push({
          text: `Pattern discovered: ${pattern.description}`,
          metadata: {
            session_id: sessionData.metadata.sessionId,
            type: 'pattern',
            confidence: pattern.confidence,
            occurrences: pattern.occurrences,
            contexts: pattern.context
          }
        });
      }
    });
    
    console.log(`mem0 persistence: ${memories.length} memories to store`);
    
    // In real implementation:
    // for (const memory of memories) {
    //   await mem0.add(memory.text, memory.metadata, { user_id: this.config.mem0.userId });
    // }
  }
  
  /**
   * Persist to Neo4j (graph relationships)
   */
  private async persistToNeo4j(sessionData: any): Promise<void> {
    // Neo4j is perfect for storing relationships between concepts
    
    const cypher = [];
    
    // Create session node
    cypher.push(`
      CREATE (s:Session {
        id: $sessionId,
        agent_id: $agentId,
        start_time: datetime($startTime),
        end_time: datetime($endTime),
        quality_avg: $qualityAvg
      })
    `);
    
    // Create primitive execution chain
    let prevExpId = null;
    sessionData.experiences.forEach((exp: Experience, idx: number) => {
      // Create experience node
      cypher.push(`
        CREATE (e${idx}:Experience {
          id: '${exp.id}',
          primitive: '${exp.primitive}',
          timestamp: datetime(${exp.timestamp}),
          quality_score: ${exp.quality.confidence}
        })
      `);
      
      // Link to session
      cypher.push(`
        MATCH (s:Session {id: $sessionId}), (e:Experience {id: '${exp.id}'})
        CREATE (s)-[:CONTAINS]->(e)
      `);
      
      // Create execution chain
      if (prevExpId) {
        cypher.push(`
          MATCH (e1:Experience {id: '${prevExpId}'}), (e2:Experience {id: '${exp.id}'})
          CREATE (e1)-[:FOLLOWED_BY]->(e2)
        `);
      }
      prevExpId = exp.id;
      
      // Create pattern relationships
      exp.patterns.forEach(pattern => {
        cypher.push(`
          MERGE (p:Pattern {id: '${pattern.id}', description: '${pattern.description}'})
          WITH p
          MATCH (e:Experience {id: '${exp.id}'})
          CREATE (e)-[:DISCOVERED]->(p)
        `);
      });
    });
    
    // Create tool effectiveness relationships
    sessionData.toolPreferences.forEach((pref: ToolPreference) => {
      cypher.push(`
        MERGE (t:Tool {name: '${pref.tool}'})
        MERGE (c:Context {name: '${pref.context}'})
        MERGE (t)-[r:EFFECTIVE_IN]->(c)
        SET r.effectiveness = ${pref.effectiveness}, r.uses = ${pref.uses}
      `);
    });
    
    console.log(`Neo4j persistence: ${cypher.length} Cypher statements generated`);
    
    // In real implementation:
    // const session = driver.session();
    // for (const statement of cypher) {
    //   await session.run(statement, { sessionId, agentId, ... });
    // }
    // await session.close();
  }
  
  /**
   * Query patterns across all stores
   */
  async queryPatterns(criteria: PatternQueryCriteria): Promise<QueriedPatterns> {
    const results: QueriedPatterns = {
      supabase: [],
      mem0: [],
      neo4j: []
    };
    
    const queries = [];
    
    if (this.config.supabase) {
      queries.push(this.querySupabasePatterns(criteria)
        .then(patterns => { results.supabase = patterns; })
        .catch(() => { /* handle error */ }));
    }
    
    if (this.config.mem0) {
      queries.push(this.queryMem0Patterns(criteria)
        .then(patterns => { results.mem0 = patterns; })
        .catch(() => { /* handle error */ }));
    }
    
    if (this.config.neo4j) {
      queries.push(this.queryNeo4jPatterns(criteria)
        .then(patterns => { results.neo4j = patterns; })
        .catch(() => { /* handle error */ }));
    }
    
    await Promise.allSettled(queries);
    return results;
  }
  
  private async querySupabasePatterns(criteria: PatternQueryCriteria): Promise<Pattern[]> {
    // Query structured pattern data
    console.log('Querying Supabase for patterns:', criteria);
    return [];
  }
  
  private async queryMem0Patterns(criteria: PatternQueryCriteria): Promise<Pattern[]> {
    // Semantic search for similar patterns
    console.log('Querying mem0 for patterns:', criteria);
    return [];
  }
  
  private async queryNeo4jPatterns(criteria: PatternQueryCriteria): Promise<Pattern[]> {
    // Graph traversal for connected patterns
    console.log('Querying Neo4j for patterns:', criteria);
    return [];
  }
}

// Type definitions
export interface PersistenceResult {
  sessionId: string;
  supabase: boolean;
  mem0: boolean;
  neo4j: boolean;
  errors: Array<{ store: string; error: string }>;
}

export interface PatternQueryCriteria {
  minConfidence?: number;
  context?: string;
  agentId?: string;
  timeRange?: { start: Date; end: Date };
  limit?: number;
}

export interface QueriedPatterns {
  supabase: Pattern[];
  mem0: Pattern[];
  neo4j: Pattern[];
}

/**
 * Utility function to create optimized persistence config
 */
export function createOptimizedPersistenceConfig(): PersistenceConfig {
  return {
    supabase: {
      url: process.env.SUPABASE_URL || '',
      key: process.env.SUPABASE_ANON_KEY || '',
      tables: {
        sessions: 'agent_sessions',
        experiences: 'agent_experiences',
        patterns: 'discovered_patterns',
        insights: 'agent_insights'
      }
    },
    mem0: {
      apiKey: process.env.MEM0_API_KEY || '',
      userId: process.env.MEM0_USER_ID || 'research-agent'
    },
    neo4j: {
      uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
      user: process.env.NEO4J_USER || 'neo4j',
      password: process.env.NEO4J_PASSWORD || ''
    }
  };
}