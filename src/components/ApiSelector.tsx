import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { API_ENDPOINTS } from '../config/api';
import { ChevronDown, Database, BookOpen } from 'lucide-react';
import DocumentationPanel from './DocumentationPanel';

const ApiSelector: React.FC = () => {
  const { selectedEndpoint, setSelectedEndpoint, apiKey, setApiKey } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDocsOpen, setIsDocsOpen] = React.useState(false);

  const selectedApi = API_ENDPOINTS.find(api => api.id === selectedEndpoint);

  return (
    <div className="card space-y-6">
      {/* API Key Input */}
      <div>
        <label className="label">
          API Key <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="input-field"
        />
        <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400 mt-1">
          Your API key is stored locally and never sent to our servers
        </p>
      </div>      {/* API Endpoint Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label">
            API Endpoint <span className="text-red-500">*</span>
          </label>
          {selectedApi && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDocsOpen(true)}
              className="flex items-center space-x-1 text-sm bg-moment-primary hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>📘 View Docs</span>
            </motion.button>
          )}
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full input-field flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Database className="w-4 h-4 text-moment-gray-400" />
              <div className="text-left">
                {selectedApi ? (
                  <>
                    <div className="font-medium">{selectedApi.name}</div>
                    <div className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
                      {selectedApi.method} {selectedApi.url.split('/').slice(-1)[0]}
                    </div>
                  </>
                ) : (
                  <span className="text-moment-gray-500">Select an API endpoint</span>
                )}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Dropdown */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-moment-gray-700 border border-moment-gray-200 dark:border-moment-gray-600 rounded-lg shadow-lg overflow-hidden"
            >
              {API_ENDPOINTS.map((endpoint) => (
                <motion.button
                  key={endpoint.id}
                  whileHover={{ backgroundColor: 'rgba(0, 102, 255, 0.1)' }}
                  onClick={() => {
                    setSelectedEndpoint(endpoint.id);
                    setIsOpen(false);
                  }}
                  className="w-full p-4 text-left hover:bg-moment-gray-50 dark:hover:bg-moment-gray-600 border-b border-moment-gray-100 dark:border-moment-gray-600 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-moment-gray-900 dark:text-white">
                        {endpoint.name}
                      </div>
                      <div className="text-sm text-moment-gray-500 dark:text-moment-gray-400">
                        {endpoint.description}
                      </div>
                      <div className="text-xs text-moment-gray-400 dark:text-moment-gray-500 mt-1">
                        {endpoint.method} {endpoint.url}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      endpoint.method === 'POST' 
                        ? 'bg-moment-secondary text-white' 
                        : 'bg-moment-accent text-white'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Selected API Info */}
      {selectedApi && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg"
        >
          <h4 className="font-medium text-moment-gray-900 dark:text-white mb-2">
            Endpoint Details
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-moment-gray-600 dark:text-moment-gray-300">Method:</span>
              <span className="ml-2 text-moment-gray-800 dark:text-moment-gray-100">{selectedApi.method}</span>
            </div>
            <div>
              <span className="font-medium text-moment-gray-600 dark:text-moment-gray-300">URL:</span>
              <span className="ml-2 text-moment-gray-800 dark:text-moment-gray-100 font-mono text-xs break-all">
                {selectedApi.url}
              </span>
            </div>
            <div>
              <span className="font-medium text-moment-gray-600 dark:text-moment-gray-300">Description:</span>
              <span className="ml-2 text-moment-gray-800 dark:text-moment-gray-100">{selectedApi.description}</span>
            </div>          </div>
        </motion.div>
      )}

      {/* Documentation Panel */}
      <DocumentationPanel
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        apiType={selectedEndpoint}
      />
    </div>
  );
};

export default ApiSelector;
