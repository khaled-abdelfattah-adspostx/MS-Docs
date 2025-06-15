import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { 
  ChevronRight, 
  Zap, 
  Target, 
  BarChart3, 
  Shield,
  Globe,
  Users,
  TrendingUp,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import MomentScienceLogo from '../components/MomentScienceLogo';

const HomePage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useStore();
  
  const solutions = [
    {
      id: 'api-explorer',
      title: 'API Explorer',
      description: 'Interactive testing tool for all MomentScience APIs. Build requests, preview cURL commands, and analyze responses in real-time.',
      icon: <Zap className="w-8 h-8" />,
      path: '/api-explorer',
      status: 'Available',
      features: ['Live API Testing', 'cURL Generation', 'Response Analysis', 'Documentation']
    },    {
      id: 'moments-showcase',
      title: 'Moments Showcase',
      description: 'Interactive demo showcasing MomentScience solutions in action. Experience our offer engine in a real shopping environment.',
      icon: <BarChart3 className="w-8 h-8" />,
      path: '/moments-showcase',
      status: 'Available',
      features: ['Live Demo', 'Real-time Offers', 'Shopping Experience', 'Interactive Examples']
    },
    {
      id: 'perks-manager',
      title: 'Perks Manager',
      description: 'Centralized platform for managing and configuring perks catalog, offers, and customer rewards programs.',
      icon: <Target className="w-8 h-8" />,
      path: '/perks-manager',
      status: 'Coming Soon',
      features: ['Catalog Management', 'Offer Configuration', 'Reward Programs', 'Partner Integration']
    },
    {
      id: 'security-center',
      title: 'Security Center',
      description: 'Advanced security monitoring and fraud prevention tools to protect your APIs and customer data.',
      icon: <Shield className="w-8 h-8" />,
      path: '/security',
      status: 'Coming Soon',
      features: ['Fraud Detection', 'API Security', 'Compliance Tools', 'Risk Assessment']
    }
  ];
  const stats = [
    { label: 'Public APIs', value: '5+', icon: <Globe className="w-5 h-5" /> },
    { label: 'Partners', value: '100+', icon: <Users className="w-5 h-5" /> },
    { label: 'Moments Served', value: '130M+', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Customer Satisfaction', value: '97%', icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-moment-light via-white to-blue-50 dark:from-moment-dark dark:via-moment-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      >        <div className="max-w-7xl mx-auto text-center">
          {/* Logo and Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <MomentScienceLogo size="lg" className="w-24 h-24" />
          </motion.div>

          {/* Brand Name - Subtle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-lg md:text-xl font-medium text-moment-gray-700 dark:text-moment-gray-300 tracking-wide">
              MomentScience
            </span>
          </motion.div>

          {/* Developer Hub - Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8"
          >
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-moment-primary via-purple-600 to-moment-secondary leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
            >
              Developer
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-moment-secondary via-red-500 to-moment-primary leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
            >
              Hub
            </motion.span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-moment-gray-900 dark:text-white mb-6 leading-tight">
              Monetizing Key Customer Moments
            </h2>
            <p className="text-xl md:text-2xl text-moment-gray-600 dark:text-moment-gray-300 max-w-5xl mx-auto leading-relaxed">
              Transform every customer interaction into revenue opportunities with intelligent, 
              real-time offers that delight users at precisely the right moment.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/api-explorer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-moment-primary to-blue-600 hover:from-blue-600 hover:to-moment-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-6 h-6" />
                <span>Explore APIs</span>
              </Link>
              <Link
                to="/moments-showcase"
                className="inline-flex items-center space-x-3 bg-white dark:bg-moment-gray-800 text-moment-gray-900 dark:text-white border-2 border-moment-gray-300 dark:border-moment-gray-600 hover:border-moment-primary dark:hover:border-moment-accent px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <BarChart3 className="w-6 h-6" />
                <span>Live Demo</span>
              </Link>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-sm text-moment-gray-500 dark:text-moment-gray-400 mt-6"
            >
              Join 100+ partners delivering 130M+ moments with 97% customer satisfaction
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="bg-white/60 dark:bg-moment-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-moment-gray-700/20"
              >
                <div className="flex items-center justify-center mb-3 text-moment-primary dark:text-moment-accent">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-moment-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-moment-gray-600 dark:text-moment-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>        </div>
      </motion.section>

      {/* Why MomentScience Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-moment-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Why MomentScience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-moment-gray-900 dark:text-white mb-6">
                🚀 Why MomentScience?
              </h2>              <p className="text-lg text-moment-gray-600 dark:text-moment-gray-300 mb-6 leading-relaxed">
                Your customers have key moments—browsing, shopping, signing up. We help you turn these moments into revenue with the right offers at the right time.
              </p>
              <p className="text-lg text-moment-gray-600 dark:text-moment-gray-300 leading-relaxed">
                Simple to integrate, powerful results. Our APIs and SDK make it easy to boost conversions without the complexity.
              </p>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-moment-gray-900 dark:text-white mb-6">
                💡 What We Do
              </h2>              <p className="text-lg text-moment-gray-600 dark:text-moment-gray-300 mb-6 leading-relaxed">
                We deliver smart, personalized offers that:
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-semibold">✅</span>
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Increase sales and keep customers coming back</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-semibold">✅</span>
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Feel natural and relevant to each user</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-semibold">✅</span>
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Work across your apps, websites, and emails</span>
                </div>
              </div>
              <p className="text-lg text-moment-gray-600 dark:text-moment-gray-300 leading-relaxed">
                Turn every customer interaction into a revenue opportunity.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Customer Studies Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-3xl font-bold text-moment-gray-900 dark:text-white mb-12"
          >
            Customer Impact Studies
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
            >
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                3 out of 4
              </div>
              <p className="text-lg text-blue-800 dark:text-blue-300 mb-2">
                Say moment perks improve their experience
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                MomentScience Custom Study
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800"
            >
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                97%
              </div>
              <p className="text-lg text-green-800 dark:text-green-300 mb-2">
                More likely to return to an online store after receiving a moment perk
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                MomentScience Custom Study
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solutions Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-moment-gray-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-moment-gray-900 dark:text-white mb-4">
              Developer Solutions
            </h2>
            <p className="text-xl text-moment-gray-600 dark:text-moment-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive toolkit designed to accelerate your development workflow and maximize engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-moment-primary/10 to-moment-secondary/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                
                <div className="relative bg-white/80 dark:bg-moment-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-moment-gray-700/20 hover:border-moment-primary/30 dark:hover:border-moment-accent/30 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-moment-primary/10">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3 text-moment-primary dark:text-moment-accent">
                      {solution.icon}
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        solution.status === 'Available' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                      }`}>
                        {solution.status}
                      </span>
                    </div>
                    {solution.status === 'Available' && (
                      <ChevronRight className="w-5 h-5 text-moment-gray-400 group-hover:text-moment-primary dark:group-hover:text-moment-accent transition-colors" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-moment-gray-900 dark:text-white mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="text-moment-gray-600 dark:text-moment-gray-300 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-moment-gray-600 dark:text-moment-gray-400">
                        <div className="w-1.5 h-1.5 bg-moment-primary dark:bg-moment-accent rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  {solution.status === 'Available' ? (
                    <Link
                      to={solution.path}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-moment-primary to-blue-600 dark:from-moment-accent dark:to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-moment-primary/25 dark:hover:shadow-moment-accent/25 transition-all duration-300 group-hover:scale-105"
                    >
                      <span>Open {solution.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center space-x-2 bg-moment-gray-200 dark:bg-moment-gray-700 text-moment-gray-500 dark:text-moment-gray-400 px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      <span>Coming Soon</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="mt-24 py-16 border-t border-moment-gray-200 dark:border-moment-gray-800 bg-moment-gray-50 dark:bg-moment-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Story */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <MomentScienceLogo size="sm" />
            </div>
            <p className="text-lg text-moment-gray-600 dark:text-moment-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
              MomentScience was founded by ad-tech and mar-tech veterans who believe in delivering value beyond traditional advertising. 
              Our platform is designed to present the right offer to the right customer at the right moment, delivering value throughout the customer journey.
            </p>
            <p className="text-moment-gray-600 dark:text-moment-gray-400 mb-8">
              © 2025 MomentScience. Building the future of contextual engagement.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#" className="text-moment-gray-500 hover:text-moment-primary dark:text-moment-gray-400 dark:hover:text-moment-accent transition-colors">
              Documentation
            </a>
            <a href="#" className="text-moment-gray-500 hover:text-moment-primary dark:text-moment-gray-400 dark:hover:text-moment-accent transition-colors">
              Support
            </a>
            <a href="#" className="text-moment-gray-500 hover:text-moment-primary dark:text-moment-gray-400 dark:hover:text-moment-accent transition-colors">
              API Status
            </a>
            <a href="#" className="text-moment-gray-500 hover:text-moment-primary dark:text-moment-gray-400 dark:hover:text-moment-accent transition-colors">
              Partners
            </a>          </div>
        </div>
      </motion.footer>

      {/* Floating Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 p-4 bg-white dark:bg-moment-gray-800 text-moment-gray-700 dark:text-moment-gray-200 rounded-full shadow-lg dark:shadow-xl border border-moment-gray-200 dark:border-moment-gray-600 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 z-50"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default HomePage;
