import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { getEndpointById } from '../config/api';
import { ApiService } from '../services/api';
import { Copy, Terminal, Play, Loader2 } from 'lucide-react';

const CurlPreview: React.FC = () => {  const { 
    selectedEndpoint, 
    apiKey, 
    formData, 
    dynamicQueryParams,
    dynamicHeaders,
    dynamicBodyParams,
    enabledBodyParams,
    isLoading, 
    setLoading, 
    setLastResponse 
  } = useStore();
  const [copied, setCopied] = React.useState(false);
  
  const endpoint = selectedEndpoint ? getEndpointById(selectedEndpoint) : null;

  if (!endpoint) {
    return null;
  }  const curlCommand = ApiService.generateCurlCommand(
    endpoint, 
    apiKey, 
    formData, 
    dynamicQueryParams, 
    dynamicHeaders,
    dynamicBodyParams,
    enabledBodyParams
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  const handleRunRequest = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your API key first');
      return;
    }

    if (!endpoint) {
      alert('Please select an API endpoint first');
      return;
    }    console.log('Making request with:', {
      endpoint: endpoint.name,
      apiKey: apiKey.substring(0, 10) + '...',
      formData,
      dynamicQueryParams,
      dynamicHeaders,
      dynamicBodyParams
    });

    setLoading(true);
    try {      const response = await ApiService.makeRequest(
        endpoint, 
        apiKey, 
        formData, 
        dynamicQueryParams, 
        dynamicHeaders,
        dynamicBodyParams,
        enabledBodyParams
      );
      console.log('API Response:', response);
      setLastResponse(response);
      
      // Show user-friendly message for common issues
      if (response.status === 0 && response.data.error === 'CORS_OR_NETWORK_ERROR') {
        alert('⚠️ CORS Error: The request was blocked by your browser. Try using the cURL command in your terminal instead.');
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Request failed. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-moment-gray-600 dark:text-moment-gray-400" />
          <h3 className="text-lg font-semibold text-moment-gray-900 dark:text-white">
            cURL Command
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="btn-secondary text-sm flex items-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            onClick={handleRunRequest}
            disabled={isLoading || !apiKey.trim()}
            className={`btn-primary text-sm flex items-center space-x-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Running...' : 'Run Request'}</span>
          </motion.button>
        </div>
      </div>

      {/* cURL Command Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <pre className="bg-moment-gray-900 dark:bg-black text-moment-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed border">
          <code>{curlCommand}</code>
        </pre>
        
        {/* Copy indicator */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded"
          >
            Copied!
          </motion.div>
        )}
      </motion.div>      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 space-y-3"
      >        <div className="p-3 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg">
          <p className="text-sm text-moment-gray-600 dark:text-moment-gray-300">
            <strong>Tip:</strong> You can copy this cURL command and run it in your terminal, 
            or click "Run Request" to execute it directly in the browser.
          </p>
        </div>
        
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>⚠️ CORS Notice:</strong> MomentScience APIs may block browser requests due to CORS policy. 
            If the "Run Request" button doesn't work, use the cURL command in your terminal for best results.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CurlPreview;
