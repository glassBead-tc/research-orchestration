-- Create agent_sessions table
CREATE TABLE IF NOT EXISTS agent_sessions (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  experience_count INTEGER DEFAULT 0,
  average_quality NUMERIC(3,2) DEFAULT 0,
  insights_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create agent_experiences table
CREATE TABLE IF NOT EXISTS agent_experiences (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL,
  primitive TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  quality_metrics JSONB,
  insights TEXT[],
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create discovered_patterns table
CREATE TABLE IF NOT EXISTS discovered_patterns (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  confidence NUMERIC(3,2) NOT NULL,
  occurrences INTEGER DEFAULT 1,
  contexts TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create agent_insights table
CREATE TABLE IF NOT EXISTS agent_insights (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  experience_id TEXT REFERENCES agent_experiences(id) ON DELETE CASCADE,
  insight_text TEXT NOT NULL,
  insight_type TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_agent_sessions_agent_id ON agent_sessions(agent_id);
CREATE INDEX idx_agent_sessions_created_at ON agent_sessions(created_at);
CREATE INDEX idx_agent_experiences_session_id ON agent_experiences(session_id);
CREATE INDEX idx_agent_experiences_primitive ON agent_experiences(primitive);
CREATE INDEX idx_agent_experiences_timestamp ON agent_experiences(timestamp);
CREATE INDEX idx_discovered_patterns_session_id ON discovered_patterns(session_id);
CREATE INDEX idx_discovered_patterns_confidence ON discovered_patterns(confidence);
CREATE INDEX idx_agent_insights_session_id ON agent_insights(session_id);
CREATE INDEX idx_agent_insights_experience_id ON agent_insights(experience_id);

-- Enable Row Level Security
ALTER TABLE agent_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovered_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your auth requirements)
CREATE POLICY "Enable all operations for public" ON agent_sessions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for public" ON agent_experiences
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for public" ON discovered_patterns
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for public" ON agent_insights
  FOR ALL USING (true) WITH CHECK (true);