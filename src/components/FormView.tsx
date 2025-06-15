import React from 'react';
import { useStore } from '../store';
import { ApiEndpoint } from '../types';
import { motion } from 'framer-motion';
import DynamicParameters from './DynamicParameters';

interface FormViewProps {
  endpoint: ApiEndpoint;
}

const FormView: React.FC<FormViewProps> = ({ endpoint }) => {  const { 
    formData, 
    updateFormData, 
    dynamicQueryParams, 
    setDynamicQueryParams,
    dynamicHeaders,
    setDynamicHeaders,
    dynamicBodyParams,
    setDynamicBodyParams,
    enabledBodyParams,
    toggleBodyParam
  } = useStore();

  const handleInputChange = (key: string, value: string) => {
    updateFormData({ [key]: value });
  };

  const getFieldValue = (key: string): string => {
    return formData[key] || endpoint.bodySchema[key] || '';
  };

  const renderFormField = (key: string, _value: any, index: number) => {
    const fieldValue = getFieldValue(key);
    
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="space-y-2"
      >
        <label className="label">
          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        
        {key === 'ua' ? (
          <textarea
            value={fieldValue}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder="User-Agent string"
            rows={2}
            className="input-field resize-none"
          />        ) : (
          <input
            type={key.includes('password') || key.includes('key') ? 'password' : 'text'}
            value={fieldValue}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={`Enter ${key.replace(/_/g, ' ')}`}
            className="input-field"
          />
        )}
        
        {key === 'ip' && (
          <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
            Client IP address for geo-targeting
          </p>
        )}
        
        {key === 'membershipID' && (
          <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
            Unique identifier for the user's membership
          </p>
        )}
        
        {key === 'adpx_fp' && (
          <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
            Device fingerprint for fraud prevention
          </p>
        )}
      </motion.div>
    );
  };
  return (
    <div className="space-y-6">
      {/* Query Parameters Section */}
      {Object.keys(endpoint.queryParams).length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3 uppercase tracking-wide">
            Query Parameters
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(endpoint.queryParams).map(([key, value], index) => 
              renderFormField(key, value, index)
            )}
          </div>
        </div>
      )}

      {/* Dynamic Query Parameters Section */}
      <DynamicParameters
        title="Additional Query Parameters"
        parameters={dynamicQueryParams}
        onChange={setDynamicQueryParams}
        placeholder={{
          key: "Parameter name",
          value: "Parameter value"
        }}
      />

      {/* Custom Headers Section */}
      <DynamicParameters
        title="Custom Headers"
        parameters={dynamicHeaders}
        onChange={setDynamicHeaders}
        placeholder={{
          key: "Header name",
          value: "Header value"
        }}
      />      {/* Body Parameters Section */}
      {endpoint.requiresBody && Object.keys(endpoint.bodySchema).length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3 uppercase tracking-wide">
            Request Body Parameters
          </h4>
          <div className="space-y-3">
            {Object.entries(endpoint.bodySchema).map(([key, _value], index) => {
              const isEnabled = enabledBodyParams[key] !== false; // Default to enabled
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-3 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => toggleBodyParam(key, e.target.checked)}
                    className="w-4 h-4 text-moment-primary focus:ring-moment-primary focus:ring-2 rounded"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300">
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                    {isEnabled && (
                      <input
                        type={key.includes('password') || key.includes('key') ? 'password' : 'text'}
                        value={getFieldValue(key)}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                        className="w-full mt-1 input-field text-sm"
                      />
                    )}
                    {/* Help text for specific parameters */}
                    {key === 'ip' && (
                      <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400 mt-1">
                        Client IP address for geo-targeting
                      </p>
                    )}
                    {key === 'membershipID' && (
                      <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400 mt-1">
                        Unique identifier for the user's membership
                      </p>
                    )}
                    {key === 'adpx_fp' && (
                      <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400 mt-1">
                        Device fingerprint for fraud prevention
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}      {/* Dynamic Body Parameters Section */}
      {endpoint.requiresBody && (
        <DynamicParameters
          title="Additional Body Parameters"
          parameters={dynamicBodyParams}
          onChange={setDynamicBodyParams}
          placeholder={{
            key: "Body parameter name",
            value: "Body parameter value"
          }}
        />
      )}

      {/* Info section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Request Information
        </h5>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Fill in the required fields to build your API request</li>
          <li>• Switch to JSON view to see the raw request payload</li>
          <li>• Use the cURL preview to copy the command for terminal use</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default FormView;
