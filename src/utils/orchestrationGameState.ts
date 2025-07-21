import {
  OrchestrationReasoningState,
  ReasoningPlayers,
  SpiralDetection,
  CommitmentDevice,
  AuctionBid,
  ConsensusVotes,
  OrchestrationReasoningInput
} from '../types/orchestrationReasoning.js';

/**
 * Game state management for orchestration reasoning
 * Adapted from the refactoring game pattern with anti-spiral mechanisms
 */
export class OrchestrationGameState {
  private state: OrchestrationReasoningState;
  private improvements: any[] = [];
  private auction_bids: AuctionBid[] = [];
  private commitment_devices: CommitmentDevice[] = [];

  constructor(input: OrchestrationReasoningInput) {
    this.state = this.initializeState(input);
    this.initializeCommitmentDevices();
  }

  private initializeState(input: OrchestrationReasoningInput): OrchestrationReasoningState {
    const complexityBudget = this.calculateComplexityBudget(input.context.complexity);
    
    return {
      reasoning_round: 0,
      complexity_budget: complexityBudget,
      time_constraint: input.context.time_constraint || '2 hours',
      quality_threshold: this.parseQualityThreshold(input.context.quality_requirements),
      spiral_detections: [],
      commitment_level: 0,
      reasoning_players: {
        efficiency_advocate: { urgency: 0.7, weight: 0.9 },
        quality_guardian: { standards: 0.8, weight: 0.8 },
        complexity_manager: { simplicity_bias: 0.6, weight: 0.7 },
        user_representative: { satisfaction: 0.0, weight: 1.0 }
      },
      session_id: this.generateSessionId(),
      created_at: new Date().toISOString()
    };
  }

  private calculateComplexityBudget(complexity: 'low' | 'medium' | 'high'): number {
    const budgets = {
      low: 50,
      medium: 100,
      high: 200
    };
    return budgets[complexity];
  }

  private parseQualityThreshold(requirements?: string): number {
    if (!requirements) return 0.8;
    
    // Parse quality requirements to extract threshold
    if (requirements.toLowerCase().includes('investment-grade')) return 0.95;
    if (requirements.toLowerCase().includes('academic')) return 0.9;
    if (requirements.toLowerCase().includes('market-ready')) return 0.85;
    
    return 0.8; // Default threshold
  }

  private generateSessionId(): string {
    return `orch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeCommitmentDevices(): void {
    this.commitment_devices = [
      {
        level: 0,
        description: "No constraints (exploration phase)",
        constraints: [],
        enforced: false
      },
      {
        level: 1,
        description: "Soft time box (2-hour limit)",
        constraints: ["time_limit_2h"],
        enforced: false
      },
      {
        level: 2,
        description: "Hard iteration limit (max 5 reasoning rounds)",
        constraints: ["max_iterations_5"],
        enforced: false
      },
      {
        level: 3,
        description: "Scope lock (only modify existing primitive sequence)",
        constraints: ["scope_locked"],
        enforced: false
      },
      {
        level: 4,
        description: "Pattern lock (must use existing orchestration patterns)",
        constraints: ["pattern_locked"],
        enforced: false
      },
      {
        level: 5,
        description: "FORCED SHIP (output current best plan)",
        constraints: ["forced_ship"],
        enforced: false
      }
    ];
  }

  // Anti-spiral detection mechanisms
  public detectSpirals(): SpiralDetection[] {
    const detections: SpiralDetection[] = [];

    // Oscillation detection (A→B→A pattern)
    const oscillation = this.detectOscillation();
    if (oscillation) {
      detections.push(oscillation);
    }

    // Scope creep detection
    const scopeCreep = this.detectScopeCreep();
    if (scopeCreep) {
      detections.push(scopeCreep);
    }

    // Diminishing returns detection
    const diminishingReturns = this.detectDiminishingReturns();
    if (diminishingReturns) {
      detections.push(diminishingReturns);
    }

    // Update state with new detections
    this.state.spiral_detections.push(...detections);

    // Increase commitment level if spirals detected
    if (detections.length > 0) {
      this.increaseCommitmentLevel();
    }

    return detections;
  }

  private detectOscillation(): SpiralDetection | null {
    if (this.improvements.length < 3) return null;

    const recentChanges = this.improvements.slice(-5);
    const componentCounts = new Map<string, number>();

    recentChanges.forEach(change => {
      const count = componentCounts.get(change.component) || 0;
      componentCounts.set(change.component, count + 1);
    });

    // Check if any component was modified more than twice
    for (const [component, count] of componentCounts) {
      if (count > 2) {
        return {
          type: 'oscillation',
          detected_at: this.state.reasoning_round,
          description: `Oscillation detected in component: ${component}`,
          severity: 0.8
        };
      }
    }

    return null;
  }

  private detectScopeCreep(): SpiralDetection | null {
    if (this.improvements.length < 2) return null;

    const initialEstimate = this.improvements[0]?.primitive_count || 3;
    const currentCount = this.getCurrentPrimitiveCount();

    if (currentCount > initialEstimate * 1.5) {
      return {
        type: 'scope_creep',
        detected_at: this.state.reasoning_round,
        description: `Scope creep detected: ${currentCount} primitives vs ${initialEstimate} estimated`,
        severity: 0.7
      };
    }

    return null;
  }

  private detectDiminishingReturns(): SpiralDetection | null {
    if (this.state.reasoning_round < 3) return null;

    const recentImprovements = this.improvements.slice(-3);
    const averageValue = recentImprovements.reduce((sum, imp) => sum + (imp.value || 0), 0) / recentImprovements.length;

    if (averageValue < 0.5) {
      return {
        type: 'diminishing_returns',
        detected_at: this.state.reasoning_round,
        description: `Diminishing returns detected: average value ${averageValue.toFixed(2)}`,
        severity: 0.6
      };
    }

    return null;
  }

  private getCurrentPrimitiveCount(): number {
    // This would be calculated based on current orchestration design
    return this.improvements.length; // Simplified for now
  }

  private increaseCommitmentLevel(): void {
    if (this.state.commitment_level < 5) {
      this.state.commitment_level++;
      this.enforceCommitmentDevice(this.state.commitment_level);
    }
  }

  private enforceCommitmentDevice(level: number): void {
    const device = this.commitment_devices.find(d => d.level === level);
    if (device) {
      device.enforced = true;
      console.log(`🔒 Commitment Level ${level}: ${device.description}`);
    }
  }

  // Information need auction analysis
  public runInformationAuction(components: string[]): AuctionBid[] {
    this.auction_bids = components.map(component => {
      const urgency = this.calculateUrgency(component);
      const impact = this.calculateImpact(component);
      const complexity = this.calculateComplexity(component);
      const confidence = this.calculateConfidence(component);

      const bid_score = (urgency * 0.3) + (impact * 0.4) + (complexity * 0.2) + (confidence * 0.1);

      return {
        component,
        urgency,
        impact,
        complexity,
        confidence,
        bid_score
      };
    });

    // Sort by bid score (highest first)
    this.auction_bids.sort((a, b) => b.bid_score - a.bid_score);
    
    return this.auction_bids;
  }

  private calculateUrgency(component: string): number {
    // Time sensitivity analysis
    const timeConstraint = this.state.time_constraint.toLowerCase();
    if (timeConstraint.includes('hour') || timeConstraint.includes('urgent')) return 0.9;
    if (timeConstraint.includes('day')) return 0.6;
    return 0.3;
  }

  private calculateImpact(component: string): number {
    // Business/research value assessment
    const highImpactKeywords = ['financial', 'investment', 'competitive', 'strategic'];
    const hasHighImpact = highImpactKeywords.some(keyword => 
      component.toLowerCase().includes(keyword)
    );
    return hasHighImpact ? 0.9 : 0.6;
  }

  private calculateComplexity(component: string): number {
    // Difficulty to obtain information
    const complexKeywords = ['analysis', 'synthesis', 'prediction', 'modeling'];
    const hasComplexity = complexKeywords.some(keyword => 
      component.toLowerCase().includes(keyword)
    );
    return hasComplexity ? 0.8 : 0.4;
  }

  private calculateConfidence(component: string): number {
    // Likelihood of success
    const availableTools = this.state.reasoning_players.user_representative.satisfaction;
    return Math.min(0.9, 0.5 + availableTools * 0.4);
  }

  // Multi-agent consensus mechanism
  public calculateConsensus(
    estimatedTime: number,
    predictedQuality: number,
    primitiveCount: number,
    addressesCoreNeeds: boolean
  ): ConsensusVotes {
    const timeLimit = this.parseTimeConstraint(this.state.time_constraint);
    
    const efficiency_vote = estimatedTime <= timeLimit;
    const quality_vote = predictedQuality >= this.state.quality_threshold;
    const complexity_vote = primitiveCount * 25 <= this.state.complexity_budget; // 25 units per primitive
    const user_vote = addressesCoreNeeds;

    const votes = [efficiency_vote, quality_vote, complexity_vote, user_vote];
    const weights = [
      this.state.reasoning_players.efficiency_advocate.weight,
      this.state.reasoning_players.quality_guardian.weight,
      this.state.reasoning_players.complexity_manager.weight,
      this.state.reasoning_players.user_representative.weight
    ];

    const consensus_score = votes.reduce((sum, vote, index) => {
      return sum + (vote ? weights[index] : 0);
    }, 0) / weights.reduce((sum, weight) => sum + weight, 0);

    return {
      efficiency_vote,
      quality_vote,
      complexity_vote,
      user_vote,
      consensus_score
    };
  }

  private parseTimeConstraint(constraint: string): number {
    // Parse time constraint to minutes
    const hourMatch = constraint.match(/(\d+)\s*hour/i);
    if (hourMatch) return parseInt(hourMatch[1]) * 60;
    
    const minuteMatch = constraint.match(/(\d+)\s*min/i);
    if (minuteMatch) return parseInt(minuteMatch[1]);
    
    return 120; // Default 2 hours
  }

  // State management methods
  public getState(): OrchestrationReasoningState {
    return { ...this.state };
  }

  public incrementRound(): void {
    this.state.reasoning_round++;
  }

  public consumeBudget(amount: number): boolean {
    if (this.state.complexity_budget >= amount) {
      this.state.complexity_budget -= amount;
      return true;
    }
    return false;
  }

  public addImprovement(improvement: any): void {
    this.improvements.push({
      ...improvement,
      round: this.state.reasoning_round,
      timestamp: new Date().toISOString()
    });
  }

  public getCommitmentLevel(): number {
    return this.state.commitment_level;
  }

  public isCommitmentEnforced(level: number): boolean {
    const device = this.commitment_devices.find(d => d.level === level);
    return device?.enforced || false;
  }

  public shouldForceShip(): boolean {
    return this.state.commitment_level >= 5 || this.state.reasoning_round >= 5;
  }

  public getGameMetrics() {
    return {
      rounds_played: this.state.reasoning_round,
      budget_used: this.calculateComplexityBudget(this.state.complexity_budget > 100 ? 'high' : 'medium') - this.state.complexity_budget,
      spiral_detections: this.state.spiral_detections.length,
      commitment_level: this.state.commitment_level,
      player_satisfaction: {
        efficiency_advocate: this.state.reasoning_players.efficiency_advocate.urgency,
        quality_guardian: this.state.reasoning_players.quality_guardian.standards,
        complexity_manager: this.state.reasoning_players.complexity_manager.simplicity_bias,
        user_representative: this.state.reasoning_players.user_representative.satisfaction
      }
    };
  }
}