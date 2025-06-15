import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Moon, Sun, Home } from 'lucide-react';
import MomentScienceLogo from './MomentScienceLogo';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useStore();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-moment-gray-800 shadow-lg border-b border-moment-gray-200 dark:border-moment-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MomentScienceLogo />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent group-hover:from-red-600 group-hover:to-orange-600 transition-all">
                MomentScience
              </h1>              <p className="text-sm text-moment-gray-500 dark:text-moment-gray-400">
                Developer Hub
              </p>
            </div>
          </Link>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Home button (only show on non-home pages) */}
            {!isHomePage && (
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-moment-gray-100 dark:bg-moment-gray-700 text-moment-gray-600 dark:text-moment-gray-300 hover:bg-moment-gray-200 dark:hover:bg-moment-gray-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            )}            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white dark:bg-moment-gray-800 text-moment-gray-700 dark:text-moment-gray-200 hover:bg-moment-gray-50 dark:hover:bg-moment-gray-700 transition-all duration-200 shadow-md dark:shadow-lg border border-moment-gray-200 dark:border-moment-gray-600"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Version badge */}
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-moment-primary text-white">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
