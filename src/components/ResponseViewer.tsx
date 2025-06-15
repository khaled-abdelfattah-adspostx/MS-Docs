import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { API_STATUS_CODES } from '../services/api';

const ResponseViewer: React.FC = () => {
  const { lastResponse, isDarkMode } = useStore();
  const [showRawResponse, setShowRawResponse] = React.useState(false);

  if (!lastResponse) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-moment-gray-100 dark:bg-moment-gray-700 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-moment-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-moment-gray-900 dark:text-white mb-2">
            No Response Yet
          </h3>
          <p className="text-moment-gray-500 dark:text-moment-gray-400">
            Run an API request to see the response here
          </p>
        </div>
      </div>
    );
  }

  const getStatusMessage = (status: number): string => {
    return API_STATUS_CODES[status as keyof typeof API_STATUS_CODES] || 'Unknown status code';
  };
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-yellow-500';
    if (status >= 500) return 'text-red-500';
    return 'text-moment-gray-500';
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status >= 400 && status < 500) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    if (status >= 500) return <XCircle className="w-5 h-5 text-red-500" />;
    return <Clock className="w-5 h-5 text-moment-gray-500" />;
  };

  const formatResponseData = (data: any) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    }
    return data;
  };

  const formattedData = formatResponseData(lastResponse.data);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getStatusIcon(lastResponse.status)}
          <div>
            <h3 className="text-lg font-semibold text-moment-gray-900 dark:text-white">
              API Response
            </h3>
            <p className="text-sm text-moment-gray-500 dark:text-moment-gray-400">
              Completed in {lastResponse.timestamp}ms
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowRawResponse(!showRawResponse)}
          className="btn-secondary text-sm flex items-center space-x-2"
        >
          {showRawResponse ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showRawResponse ? 'Formatted' : 'Raw'}</span>
        </motion.button>
      </div>

      {/* Status Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div className="p-4 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg">
          <div className="text-sm font-medium text-moment-gray-600 dark:text-moment-gray-300 mb-1">
            Status Code
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(lastResponse.status)}`}>
            {lastResponse.status}
          </div>
          <div className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
            {lastResponse.statusText}
          </div>
        </div>

        <div className="p-4 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg">
          <div className="text-sm font-medium text-moment-gray-600 dark:text-moment-gray-300 mb-1">
            Response Time
          </div>
          <div className="text-2xl font-bold text-moment-primary">
            {lastResponse.timestamp}
          </div>
          <div className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
            milliseconds
          </div>
        </div>

        <div className="p-4 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg">
          <div className="text-sm font-medium text-moment-gray-600 dark:text-moment-gray-300 mb-1">
            Response Size
          </div>
          <div className="text-2xl font-bold text-moment-accent">
            {JSON.stringify(formattedData).length}
          </div>
          <div className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
            characters
          </div>        </div>
      </motion.div>

      {/* Status Code Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          MomentScience API Status Code
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>{lastResponse.status}</strong>: {getStatusMessage(lastResponse.status)}
        </p>
      </motion.div>

      {/* Response Headers */}
      {Object.keys(lastResponse.headers).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h4 className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3">
            Response Headers
          </h4>
          <div className="bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg p-4 max-h-32 overflow-y-auto">
            {Object.entries(lastResponse.headers).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm py-1">
                <span className="font-mono text-moment-gray-600 dark:text-moment-gray-300">
                  {key}:
                </span>
                <span className="text-moment-gray-800 dark:text-moment-gray-100 ml-2 truncate">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Response Body */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3">
          Response Body
        </h4>
        
        <div className="border border-moment-gray-200 dark:border-moment-gray-600 rounded-lg overflow-hidden">
          {showRawResponse ? (
            <pre className="bg-moment-gray-900 text-moment-gray-100 p-4 overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto">
              {JSON.stringify(formattedData, null, 2)}
            </pre>
          ) : (
            <Editor
              height="400px"
              defaultLanguage="json"
              theme={isDarkMode ? 'vs-dark' : 'light'}
              value={JSON.stringify(formattedData, null, 2)}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on'
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResponseViewer;
