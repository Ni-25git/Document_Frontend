import React, { useState } from 'react';
import { X, Copy, ExternalLink } from 'lucide-react';

const CorsTroubleshooting = ({ isVisible, onClose }) => {
  const [copied, setCopied] = useState(false);

  const corsConfig = `// Express.js CORS Configuration
const cors = require('cors');

app.use(cors({
  origin: [
    'https://document-frontend-b1881wmjg-nipun-sehrawat-projects.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(corsConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginTop: 0, color: '#333' }}>🔧 CORS Configuration Fix</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>What is CORS?</h3>
          <p>
            CORS (Cross-Origin Resource Sharing) is a security feature that prevents web pages from making requests to a different domain than the one that served the web page.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Current Issue:</h3>
          <p>
            Your backend at <strong>document-backend-4.onrender.com</strong> is not configured to allow requests from your frontend at <strong>document-frontend-b1881wmjg-nipun-sehrawat-projects.vercel.app</strong>
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Solution:</h3>
          <p>Add this CORS configuration to your backend server:</p>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '5px',
            padding: '15px',
            position: 'relative'
          }}>
            <button
              onClick={copyToClipboard}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {copied ? 'Copied!' : <Copy size={14} />}
            </button>
            <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>
              {corsConfig}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Alternative Solutions:</h3>
          <ul>
            <li>
              <strong>For Node.js/Express:</strong> Install and use the <code>cors</code> package
            </li>
            <li>
              <strong>For Python/Flask:</strong> Use <code>flask-cors</code> extension
            </li>
            <li>
              <strong>For Python/Django:</strong> Use <code>django-cors-headers</code>
            </li>
            <li>
              <strong>For any backend:</strong> Add the required headers manually
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Required Headers:</h3>
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '5px',
            padding: '15px'
          }}>
            <code>
              Access-Control-Allow-Origin: https://document-frontend-b1881wmjg-nipun-sehrawat-projects.vercel.app<br/>
              Access-Control-Allow-Credentials: true<br/>
              Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS<br/>
              Access-Control-Allow-Headers: Content-Type, Authorization
            </code>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Testing:</h3>
          <p>
            After implementing the CORS fix, test your backend by visiting:
            <br/>
            <a 
              href="https://document-backend-4.onrender.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              https://document-backend-4.onrender.com
              <ExternalLink size={14} style={{ marginLeft: '5px' }} />
            </a>
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#e7f3ff', 
          border: '1px solid #b3d9ff', 
          borderRadius: '5px', 
          padding: '15px',
          marginTop: '20px'
        }}>
          <strong>💡 Pro Tip:</strong> For development, you can temporarily allow all origins with <code>origin: '*'</code>, but always use specific origins in production for security.
        </div>
      </div>
    </div>
  );
};

export default CorsTroubleshooting; 