import api from '../api/axios';

// Test common API endpoints to see which ones are working
export const testApiEndpoints = async () => {
  const endpoints = [
    { path: '/', method: 'GET', name: 'Root' },
    { path: '/user/login', method: 'POST', name: 'Login' },
    { path: '/user/register', method: 'POST', name: 'Register' },
    { path: '/user/verify-email/test', method: 'GET', name: 'Email Verification' },
    { path: '/user/resend-verification', method: 'POST', name: 'Resend Verification' },
    { path: '/user/change-password', method: 'POST', name: 'Change Password' },
    { path: '/doc/list', method: 'GET', name: 'Document List' },
    { path: '/doc/create', method: 'POST', name: 'Create Document' },
    { path: '/doc/get/test', method: 'GET', name: 'Get Document' },
    { path: '/doc/versions/test', method: 'GET', name: 'Document Versions' },
    { path: '/doc/search', method: 'GET', name: 'Search Documents' },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      let response;
      if (endpoint.method === 'GET') {
        response = await api.get(endpoint.path);
      } else if (endpoint.method === 'POST') {
        response = await api.post(endpoint.path, {});
      } else if (endpoint.method === 'DELETE') {
        response = await api.delete(endpoint.path);
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
  console.log('Base URL:', 'https://document-backend-4.onrender.com/api');
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