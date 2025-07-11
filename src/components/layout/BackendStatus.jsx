import React, { useState, useEffect } from 'react';
import { checkBackendHealth } from '../../api/axios';
import { logApiTestResults } from '../../utils/apiTest';
import { AlertCircle, CheckCircle, Bug, Globe, Settings } from 'lucide-react';
import CorsTroubleshooting from './CorsTroubleshooting';

const BackendStatus = () => {
  const [backendStatus, setBackendStatus] = useState({
    available: true,
    loading: true,
    lastChecked: null,
    corsError: false
  });
  const [showCorsGuide, setShowCorsGuide] = useState(false);

  const checkStatus = async () => {
    setBackendStatus(prev => ({ ...prev, loading: true }));
    try {
      const isAvailable = await checkBackendHealth();
      setBackendStatus({
        available: isAvailable,
        loading: false,
        lastChecked: new Date(),
        corsError: false
      });
      
      // If backend is available but we want to test endpoints, uncomment this:
      // if (isAvailable) {
      //   logApiTestResults();
      // }
    } catch (error) {
      const isCorsError = error.message.includes('CORS') || error.message.includes('Access-Control-Allow-Origin');
      setBackendStatus({
        available: false,
        loading: false,
        lastChecked: new Date(),
        corsError: isCorsError
      });
    }
  };

  const handleDebugClick = () => {
    logApiTestResults();
  };

  const handleCorsFixClick = () => {
    setShowCorsGuide(true);
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
      <>
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '10px 15px',
          backgroundColor: backendStatus.corsError ? '#fff3cd' : '#f8d7da',
          color: backendStatus.corsError ? '#856404' : '#721c24',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          maxWidth: '350px'
        }}>
          {backendStatus.corsError ? <Globe size={16} /> : <AlertCircle size={16} />}
          <div>
            <strong>
              {backendStatus.corsError ? 'CORS Configuration Error' : 'Backend Unavailable'}
            </strong>
            <br />
            {backendStatus.corsError ? (
              <>
                Backend server needs to allow requests from this domain.
                <br />
                <strong>Frontend:</strong> document-frontend-b1881wmjg-nipun-sehrawat-projects.vercel.app
                <br />
                <strong>Backend:</strong> document-backend-4.onrender.com
              </>
            ) : (
              'Some features may not work. Please try again later.'
            )}
            <br />
            <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={handleDebugClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: backendStatus.corsError ? '#856404' : '#721c24',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                <Bug size={12} style={{ marginRight: '3px' }} />
                Debug API
              </button>
              {backendStatus.corsError && (
                <button 
                  onClick={handleCorsFixClick}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#856404',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                >
                  <Settings size={12} style={{ marginRight: '3px' }} />
                  Fix CORS
                </button>
              )}
            </div>
          </div>
        </div>
        
        <CorsTroubleshooting 
          isVisible={showCorsGuide} 
          onClose={() => setShowCorsGuide(false)} 
        />
      </>
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