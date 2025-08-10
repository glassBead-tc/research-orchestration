#!/usr/bin/env node

/**
 * Test script for Supabase persistence functionality
 */

import { SessionStore } from './src/memory/sessionStore.js';
import { PersistenceWorkflow, createOptimizedPersistenceConfig } from './src/memory/persistenceUtility.js';
import { testSupabaseConnection } from './src/memory/supabaseClient.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testSupabasePersistence() {
  console.log('🧪 Testing Supabase Persistence Implementation\n');
  
  // Test 1: Connection test
  console.log('1️⃣  Testing Supabase connection...');
  const connected = await testSupabaseConnection();
  if (!connected) {
    console.error('❌ Failed to connect to Supabase. Check your SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    process.exit(1);
  }
  console.log('✅ Successfully connected to Supabase\n');
  
  // Test 2: Create test session
  console.log('2️⃣  Creating test session...');
  const sessionStore = new SessionStore('test-agent-001');
  
  // Add test experience
  const testExperience = {
    primitive: 'querying',
    input: {
      query: 'test query',
      context: 'testing'
    },
    output: {
      results: ['result1', 'result2'],
      metadata: { source: 'test' }
    },
    quality: {
      relevance: 0.95,
      confidence: 0.88,
      completeness: 0.92
    },
    insights: [
      'Test insight 1: High quality results achieved',
      'Test insight 2: Query optimization successful'
    ],
    duration_ms: 1234
  };
  
  sessionStore.addExperience(testExperience);
  
  // Add test pattern
  sessionStore.recordPattern({
    description: 'Test pattern: Successful query execution',
    confidence: 0.9,
    context: ['testing', 'validation']
  });
  
  console.log('✅ Test session created with sample data\n');
  
  // Test 3: Persist to Supabase
  console.log('3️⃣  Persisting session to Supabase...');
  const config = createOptimizedPersistenceConfig();
  
  if (!config.supabase?.url || !config.supabase?.key) {
    console.error('❌ Supabase configuration missing. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    process.exit(1);
  }
  
  const persistence = new PersistenceWorkflow(config);
  
  try {
    const result = await persistence.persistSession(sessionStore);
    
    if (result.supabase) {
      console.log('✅ Successfully persisted to Supabase');
      console.log(`   Session ID: ${result.sessionId}`);
    } else {
      console.error('❌ Failed to persist to Supabase');
      if (result.errors.length > 0) {
        console.error('   Errors:', result.errors);
      }
    }
  } catch (error) {
    console.error('❌ Error during persistence:', error.message);
    process.exit(1);
  }
  
  // Test 4: Query patterns
  console.log('\n4️⃣  Querying patterns from Supabase...');
  try {
    const patterns = await persistence.queryPatterns({
      minConfidence: 0.8,
      limit: 10
    });
    
    console.log(`✅ Retrieved ${patterns.supabase.length} patterns from Supabase`);
    if (patterns.supabase.length > 0) {
      console.log('   Sample pattern:', patterns.supabase[0]);
    }
  } catch (error) {
    console.error('❌ Error querying patterns:', error.message);
  }
  
  console.log('\n🎉 All tests completed successfully!');
  console.log('\nℹ️  Note: To use this in production:');
  console.log('1. Run the migration file in your Supabase project');
  console.log('2. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables');
  console.log('3. Adjust Row Level Security policies as needed');
}

// Run the test
testSupabasePersistence().catch(console.error);