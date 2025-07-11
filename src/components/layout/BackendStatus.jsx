import React, { useState, useEffect } from 'react';
import { checkBackendHealth } from '../../api/axios';
import { logApiTestResults } from '../../utils/apiTest';
import { AlertCircle, CheckCircle, Bug } from 'lucide-react';

const BackendStatus = () => {
  const [backendStatus, setBackendStatus] = useState({
    available: true,
    loading: true,
    lastChecked: null
  });

  const checkStatus = async () => {
    setBackendStatus(prev => ({ ...prev, loading: true }));
    try {
      const isAvailable = await checkBackendHealth();
      setBackendStatus({
        available: isAvailable,
        loading: false,
        lastChecked: new Date()
      });
      
      // If backend is available but we want to test endpoints, uncomment this:
      // if (isAvailable) {
      //   logApiTestResults();
      // }
    } catch (error) {
      setBackendStatus({
        available: false,
        loading: false,
        lastChecked: new Date()
      });
    }
  };

  const handleDebugClick = () => {
    logApiTestResults();
  };

  useEffect(() => {
    checkStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (backendStatus.loading) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '8px 12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        Checking backend status...
      </div>
    );
  }

  if (!backendStatus.available) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px 15px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        maxWidth: '300px'
      }}>
        <AlertCircle size={16} />
        <div>
          <strong>Backend Unavailable</strong>
          <br />
          Some features may not work. Please try again later.
          <br />
          <button 
            onClick={handleDebugClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#721c24',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '10px',
              marginTop: '5px'
            }}
          >
            <Bug size={12} style={{ marginRight: '3px' }} />
            Debug API
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '8px 12px',
      backgroundColor: '#d4edda',
      color: '#155724',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }}>
      <CheckCircle size={16} />
      Backend Online
    </div>
  );
};

export default BackendStatus; 