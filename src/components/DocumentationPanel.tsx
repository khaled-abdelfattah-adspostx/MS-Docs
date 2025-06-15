import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe } from 'lucide-react';

interface DocumentationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  apiType: string | null;
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({
  isOpen,
  onClose,
  apiType
}) => {
  const [viewMode, setViewMode] = useState<'webview' | 'external'>('webview');

  const getDocumentationUrl = (type: string | null): string => {
    const baseUrl = 'https://docs.momentscience.com';
    switch (type) {
      case 'moments':
        return `${baseUrl}/moments-api`;
      case 'perkswall':
        return `${baseUrl}/perkswall-api`;
      case 'catalog':
        return `${baseUrl}/offer-catalog-api`;
      case 'reporting':
        return `${baseUrl}/reporting-api`;
      default:
        return `${baseUrl}`;
    }
  };

  const getApiTitle = (type: string | null): string => {
    switch (type) {
      case 'moments':
        return 'Moments API';
      case 'perkswall':
        return 'Perkswall API';
      case 'catalog':
        return 'Offer Catalog API';
      case 'reporting':
        return 'Reporting API';
      default:
        return 'MomentScience API';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white dark:bg-moment-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-moment-gray-200 dark:border-moment-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-moment-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📘</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-moment-gray-900 dark:text-white">
                    {getApiTitle(apiType)} Documentation
                  </h2>
                  <p className="text-sm text-moment-gray-500 dark:text-moment-gray-400">
                    Official API reference and examples
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-moment-gray-100 dark:bg-moment-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('webview')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      viewMode === 'webview'
                        ? 'bg-white dark:bg-moment-gray-600 text-moment-gray-900 dark:text-white shadow-sm'
                        : 'text-moment-gray-600 dark:text-moment-gray-400 hover:text-moment-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3 mr-1 inline" />
                    Quick View
                  </button>
                  <button
                    onClick={() => setViewMode('external')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      viewMode === 'external'
                        ? 'bg-white dark:bg-moment-gray-600 text-moment-gray-900 dark:text-white shadow-sm'
                        : 'text-moment-gray-600 dark:text-moment-gray-400 hover:text-moment-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <ExternalLink className="w-3 h-3 mr-1 inline" />
                    External
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 text-moment-gray-500 hover:text-moment-gray-700 dark:text-moment-gray-400 dark:hover:text-moment-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {viewMode === 'webview' ? (
                apiType ? (
                  <div className="h-full">
                    <iframe
                      src={getDocumentationUrl(apiType)}
                      className="w-full h-full border-0"
                      title={`${getApiTitle(apiType)} Documentation`}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-moment-gray-300 dark:text-moment-gray-600 mx-auto mb-4" />
                      <p className="text-moment-gray-500 dark:text-moment-gray-400">
                        Select an API endpoint to view its documentation
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="p-6 h-full overflow-auto">
                  <div className="text-center py-12">
                    <ExternalLink className="w-16 h-16 text-moment-gray-300 dark:text-moment-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-moment-gray-900 dark:text-white mb-2">
                      Open Documentation in New Tab
                    </h3>
                    <p className="text-moment-gray-500 dark:text-moment-gray-400 mb-6">
                      Access the full documentation experience in a separate browser tab
                    </p>
                    {apiType && (
                      <a
                        href={getDocumentationUrl(apiType)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-moment-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Open {getApiTitle(apiType)} Docs
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DocumentationPanel;
