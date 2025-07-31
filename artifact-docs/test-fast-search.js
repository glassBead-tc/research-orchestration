import axios from 'axios';

const API_KEY = process.env.EXA_API_KEY;
const BASE_URL = 'https://api.exa.ai';

async function testPureSearchSpeed() {
  console.log('Testing pure search speed (no content retrieval)...\n');
  
  const queries = [
    'OpenAI GPT-5 launch',
    'artificial intelligence news',
    'machine learning trends 2025'
  ];
  
  for (const query of queries) {
    const start = Date.now();
    
    try {
      const response = await axios.post(`${BASE_URL}/search`, {
        query: query,
        type: 'fast',
        numResults: 10,
        contents: false  // No content retrieval
      }, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-api-key': API_KEY
        },
        timeout: 5000
      });
      
      const elapsed = Date.now() - start;
      
      console.log(`Query: "${query}"`);
      console.log(`Total time: ${elapsed}ms`);
      console.log(`API search time: ${response.data.searchTime?.toFixed(2) || 'N/A'}ms`);
      console.log(`Resolved type: ${response.data.resolvedSearchType}`);
      console.log(`Results: ${response.data.results.length}`);
      console.log('---\n');
      
    } catch (error) {
      console.error(`Error with query "${query}":`, error.response?.data || error.message);
    }
  }
}

testPureSearchSpeed();