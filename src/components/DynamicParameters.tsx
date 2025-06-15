import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface KeyValuePair {
  key: string;
  value: string;
  id: string;
}

interface DynamicParametersProps {
  title: string;
  parameters: KeyValuePair[];
  onChange: (parameters: KeyValuePair[]) => void;
  placeholder?: {
    key: string;
    value: string;
  };
}

const DynamicParameters: React.FC<DynamicParametersProps> = ({
  title,
  parameters,
  onChange,
  placeholder = { key: 'Parameter name', value: 'Parameter value' }
}) => {
  const addParameter = () => {
    const newParam: KeyValuePair = {
      id: Date.now().toString(),
      key: '',
      value: ''
    };
    onChange([...parameters, newParam]);
  };

  const removeParameter = (id: string) => {
    onChange(parameters.filter(param => param.id !== id));
  };

  const updateParameter = (id: string, field: 'key' | 'value', newValue: string) => {
    onChange(
      parameters.map(param =>
        param.id === id ? { ...param, [field]: newValue } : param
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 uppercase tracking-wide">
          {title}
        </h4>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addParameter}
          className="flex items-center space-x-1 text-sm bg-moment-primary hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Parameter</span>
        </motion.button>
      </div>

      {parameters.length === 0 ? (
        <div className="text-center py-8 text-moment-gray-500 dark:text-moment-gray-400">
          <p className="text-sm">No parameters added yet</p>
          <p className="text-xs mt-1">Click "Add Parameter" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {parameters.map((param) => (
            <motion.div
              key={param.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 p-3 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={param.key}
                  onChange={(e) => updateParameter(param.id, 'key', e.target.value)}
                  placeholder={placeholder.key}
                  className="w-full input-field text-sm"
                />
              </div>
              <div className="text-moment-gray-400 px-2">:</div>
              <div className="flex-1">
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => updateParameter(param.id, 'value', e.target.value)}
                  placeholder={placeholder.value}
                  className="w-full input-field text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeParameter(param.id)}
                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicParameters;
