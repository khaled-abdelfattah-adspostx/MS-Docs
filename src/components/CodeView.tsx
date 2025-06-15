import React from 'react';
import { useStore } from '../store';
import { ApiEndpoint } from '../types';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';

interface CodeViewProps {
  endpoint: ApiEndpoint;
}

const CodeView: React.FC<CodeViewProps> = ({ endpoint }) => {
  const { formData, updateFormData, isDarkMode } = useStore();

  // Build the complete request payload
  const buildRequestPayload = () => {
    const payload: any = {};
    
    // Add query parameters
    Object.keys(endpoint.queryParams).forEach(key => {
      if (formData[key]) {
        payload[key] = formData[key];
      }
    });
    
    // Add body parameters
    if (endpoint.requiresBody) {
      const bodyData = { ...endpoint.bodySchema };
      Object.keys(bodyData).forEach(key => {
        if (formData[key] !== undefined) {
          bodyData[key] = formData[key];
        }
      });
      payload.body = bodyData;
    }
    
    return payload;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    
    try {
      const parsed = JSON.parse(value);
      const newFormData: Record<string, any> = {};
      
      // Extract query parameters
      Object.keys(endpoint.queryParams).forEach(key => {
        if (parsed[key]) {
          newFormData[key] = parsed[key];
        }
      });
      
      // Extract body parameters
      if (parsed.body && typeof parsed.body === 'object') {
        Object.keys(endpoint.bodySchema).forEach(key => {
          if (parsed.body[key] !== undefined) {
            newFormData[key] = parsed.body[key];
          }
        });
      }
      
      updateFormData(newFormData);
    } catch (error) {
      // Invalid JSON, ignore
      console.warn('Invalid JSON in editor');
    }
  };

  const requestPayload = buildRequestPayload();

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3">
          Request Payload (JSON)
        </h4>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-moment-gray-200 dark:border-moment-gray-600 rounded-lg overflow-hidden"
        >
          <Editor
            height="400px"
            defaultLanguage="json"
            theme={isDarkMode ? 'vs-dark' : 'light'}
            value={JSON.stringify(requestPayload, null, 2)}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto'
              },
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true
            }}
          />
        </motion.div>
      </div>

      {/* Request structure info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg"
      >
        <h5 className="font-medium text-moment-gray-900 dark:text-white mb-3">
          Request Structure
        </h5>
        
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-moment-gray-600 dark:text-moment-gray-300">
              Method:
            </span>
            <span className="ml-2 px-2 py-0.5 bg-moment-primary text-white text-xs rounded font-mono">
              {endpoint.method}
            </span>
          </div>
          
          <div>
            <span className="font-medium text-moment-gray-600 dark:text-moment-gray-300">
              Endpoint:
            </span>
            <code className="ml-2 text-xs bg-moment-gray-200 dark:bg-moment-gray-600 px-2 py-1 rounded">
              {endpoint.url}
            </code>
          </div>
          
          {Object.keys(endpoint.headers).length > 0 && (
            <div>
              <span className="font-medium text-moment-gray-600 dark:text-moment-gray-300">
                Headers:
              </span>
              <div className="mt-1 space-y-1">
                {Object.entries(endpoint.headers).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <code className="bg-moment-gray-200 dark:bg-moment-gray-600 px-2 py-1 rounded mr-2">
                      {key}
                    </code>
                    <span className="text-moment-gray-600 dark:text-moment-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CodeView;
