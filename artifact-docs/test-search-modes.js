import axios from 'axios';

const API_KEY = process.env.EXA_API_KEY;
const BASE_URL = 'https://api.exa.ai';

async function testSearchMode(type, query) {
  const start = Date.now();
  
  try {
    const response = await axios.post(`${BASE_URL}/search`, {
      query: query,
      type: type,
      numResults: 5,
      contents: {
        text: {
          maxCharacters: 3000
        },
        livecrawl: 'preferred'
      }
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-key': API_KEY
      },
      timeout: 25000
    });
    
    const elapsed = Date.now() - start;
    
    console.log(`\n=== ${type.toUpperCase()} SEARCH ===`);
    console.log(`Query: "${query}"`);
    console.log(`Time: ${elapsed}ms`);
    console.log(`Resolved Type: ${response.data.resolvedSearchType}`);
    console.log(`Search Time (API): ${response.data.searchTime}ms`);
    console.log(`Results: ${response.data.results.length}`);
    
    return { type, elapsed, apiTime: response.data.searchTime };
  } catch (error) {
    console.error(`Error with ${type} search:`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return { type, error: error.message };
  }
}

async function runComparison() {
  console.log('Starting search mode comparison...\n');
  
  const query = 'OpenAI GPT-5 launch date August 2025';
  
  // Test all three modes
  const results = await Promise.all([
    testSearchMode('fast', query),
    testSearchMode('neural', query),
    testSearchMode('keyword', query)
  ]);
  
  console.log('\n=== SUMMARY ===');
  results.forEach(r => {
    if (r.error) {
      console.log(`${r.type}: ERROR - ${r.error}`);
    } else {
      console.log(`${r.type}: ${r.elapsed}ms total, ${r.apiTime}ms API time`);
    }
  });
}

runComparison();