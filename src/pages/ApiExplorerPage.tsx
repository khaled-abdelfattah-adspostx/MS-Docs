import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import Header from '../components/Header';
import ApiSelector from '../components/ApiSelector';
import RequestEditor from '../components/RequestEditor';
import CurlPreview from '../components/CurlPreview';
import ResponseViewer from '../components/ResponseViewer';

function ApiExplorerPage() {
  const { isDarkMode } = useStore();

  // Apply theme on mount and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-moment-light dark:bg-moment-dark transition-colors duration-300">
      <Header />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-moment-gray-900 dark:text-white mb-4">
            MomentScience API Explorer
          </h1>
          <p className="text-xl text-moment-gray-600 dark:text-moment-gray-300 max-w-3xl mx-auto">
            Explore and test MomentScience APIs to deliver relevant perks at key customer journey moments. 
            Boost loyalty, drive engagement, and create new revenue streams with our comprehensive API suite.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-8">
            {/* API Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ApiSelector />
            </motion.div>

            {/* Request Editor */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RequestEditor />
            </motion.div>
          </div>

          {/* Right Column - Preview & Response */}
          <div className="space-y-8">
            {/* cURL Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CurlPreview />
            </motion.div>

            {/* Response Viewer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ResponseViewer />
            </motion.div>
          </div>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🚀 Real-time Testing
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Test your API requests in real-time with immediate response feedback and detailed error handling.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              💻 cURL Generation
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Automatically generate cURL commands for easy integration into your development workflow.
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              📚 Integrated Docs
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Access comprehensive documentation with examples and best practices directly in the interface.
            </p>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}

export default ApiExplorerPage;
