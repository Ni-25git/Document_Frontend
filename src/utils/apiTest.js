import api from '../api/axios';

// Test common API endpoints to see which ones are working
export const testApiEndpoints = async () => {
  const endpoints = [
    { path: '/', method: 'GET', name: 'Root' },
    { path: '/user/login', method: 'POST', name: 'Login' },
    { path: '/user/register', method: 'POST', name: 'Register' },
    { path: '/doc/list', method: 'GET', name: 'Document List' },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      let response;
      if (endpoint.method === 'GET') {
        response = await api.get(endpoint.path);
      } else if (endpoint.method === 'POST') {
        response = await api.post(endpoint.path, {});
      }
      
      results.push({
        endpoint: endpoint.name,
        path: endpoint.path,
        status: response.status,
        working: true
      });
    } catch (error) {
      results.push({
        endpoint: endpoint.name,
        path: endpoint.path,
        status: error.response?.status || 'Network Error',
        working: false,
        error: error.message
      });
    }
  }

  return results;
};

// Log API test results to console for debugging
export const logApiTestResults = async () => {
  console.log('🔍 Testing API endpoints...');
  const results = await testApiEndpoints();
  
  console.table(results);
  
  const workingEndpoints = results.filter(r => r.working);
  const brokenEndpoints = results.filter(r => !r.working);
  
  console.log(`✅ Working endpoints: ${workingEndpoints.length}`);
  console.log(`❌ Broken endpoints: ${brokenEndpoints.length}`);
  
  if (brokenEndpoints.length > 0) {
    console.log('Broken endpoints:', brokenEndpoints);
  }
  
  return results;
}; 