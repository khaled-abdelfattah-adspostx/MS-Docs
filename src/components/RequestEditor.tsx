import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { getEndpointById } from '../config/api';
import { Code, Edit3 } from 'lucide-react';
import FormView from './FormView';
import CodeView from './CodeView';

const RequestEditor: React.FC = () => {
  const { selectedEndpoint, viewMode, setViewMode } = useStore();
  
  const endpoint = selectedEndpoint ? getEndpointById(selectedEndpoint) : null;

  if (!endpoint) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-moment-gray-100 dark:bg-moment-gray-700 rounded-full flex items-center justify-center mb-4">
            <Edit3 className="w-8 h-8 text-moment-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-moment-gray-900 dark:text-white mb-2">
            Select an API Endpoint
          </h3>
          <p className="text-moment-gray-500 dark:text-moment-gray-400">
            Choose an API endpoint from the dropdown above to start building your request
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-moment-gray-900 dark:text-white">
          Request Configuration
        </h3>
        
        <div className="flex items-center space-x-1 bg-moment-gray-100 dark:bg-moment-gray-700 rounded-lg p-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('form')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'form'
                ? 'bg-white dark:bg-moment-gray-600 text-moment-primary dark:text-moment-accent shadow-sm'
                : 'text-moment-gray-600 dark:text-moment-gray-300 hover:text-moment-gray-900 dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Form</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('code')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'code'
                ? 'bg-white dark:bg-moment-gray-600 text-moment-primary dark:text-moment-accent shadow-sm'
                : 'text-moment-gray-600 dark:text-moment-gray-300 hover:text-moment-gray-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>JSON</span>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {viewMode === 'form' ? <FormView endpoint={endpoint} /> : <CodeView endpoint={endpoint} />}
      </motion.div>
    </div>
  );
};

export default RequestEditor;
