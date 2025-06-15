import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, CheckCircle, Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useMomentScienceSDK, PayloadProperty } from '../hooks/useMomentScienceSDK';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

const MomentsShowcasePage = () => {
  const { initializeSDK, trackConversion } = useMomentScienceSDK();
  const [currentStep, setCurrentStep] = useState<'browsing' | 'cart' | 'checkout' | 'payment' | 'success'>('browsing');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
    // Custom Payload State
  const [customPayload, setCustomPayload] = useState<PayloadProperty[]>([
    { key: 'placement', value: 'post_transaction', type: 'string' },
    { key: 'theme_id', value: 'moment_post_transaction', type: 'string' },
    { key: 'country', value: 'US', type: 'string' }
  ]);
  const [tempPayload, setTempPayload] = useState<PayloadProperty[]>(customPayload);
  // SDK Configuration State
  const [sdkConfig, setSdkConfig] = useState({
    accountId: 'ffa59da09972e55e', // Default MomentScience account ID
    autoLoad: true,
    autoShow: true,
    dev: false,
    settings: {
      ad_position: 'center',
      darken_bg: true,
      delay: 0,
      screen_margin: 20,
      show_disclaimer: true,
      show_close: true,
      multi_offer_unit: false
    },
    styles: {
      offerText: {
        font: 'Roboto',
        fontSize: 14,
        textColor: '#000000'
      },
      header: {
        background: '#0b1937',
        text: 'Your order is complete',
        textColor: '#ffffff',
        fontSize: 16
      }
    }
  });
  
  // Temporary state for sidebar form (allows editing without immediate apply)
  const [tempConfig, setTempConfig] = useState(sdkConfig);
  
  const [customerData, setCustomerData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Demo products
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
      rating: 4.8,
      reviews: 2847
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center',
      rating: 4.6,
      reviews: 1923
    },
    {
      id: '3',
      name: 'Portable Power Bank',
      price: 49.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop&crop=center',
      rating: 4.7,
      reviews: 856    }
  ];  // Initialize and track conversion when reaching success step
  useEffect(() => {
    if (currentStep === 'success' && cartItems.length > 0) {
      // Initialize SDK with full configuration
      initializeSDK({
        customerId: 'demo-user-123',
        email: customerData.email || 'demo@example.com',
        firstName: customerData.firstName || 'Demo',
        lastName: customerData.lastName || 'User'      }, {
        accountId: sdkConfig.accountId,
        autoLoad: sdkConfig.autoLoad,
        autoShow: sdkConfig.autoShow,
        dev: sdkConfig.dev,
        settings: sdkConfig.settings,
        styles: sdkConfig.styles
      }, customPayload);
      
      // Track conversion
      const orderId = `order-${Date.now()}`;
      const orderValue = calculateTotal();
      
      trackConversion({
        email: customerData.email || 'demo@example.com',
        firstName: customerData.firstName || 'Demo',
        lastName: customerData.lastName || 'User',
        customerId: 'demo-user-123',
        orderId: orderId,
        orderValue: orderValue,
        currency: 'USD',
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: 1
        })),
        // Custom properties for MomentScience
        totalSavings: calculateSavings(),
        conversionStep: 'purchase_complete',
        timestamp: new Date().toISOString()
      });
    }
  }, [currentStep, cartItems, customerData, sdkConfig, customPayload, initializeSDK, trackConversion]);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    if (currentStep === 'browsing') {
      setCurrentStep('cart');
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };
  const calculateSavings = () => {
    // Calculate savings from original prices
    return cartItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + (item.originalPrice - item.price);
      }
      return sum;
    }, 0);
  };

  const nextStep = () => {
    const steps: Array<typeof currentStep> = ['browsing', 'cart', 'checkout', 'payment', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  const resetDemo = () => {
    setCurrentStep('browsing');
    setCartItems([]);
    setCustomerData({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-moment-light via-white to-blue-50 dark:from-moment-gray-900 dark:via-moment-gray-800 dark:to-moment-gray-900">
      <Header />
        {/* SDK Configuration Sidebar */}
      <div className={`fixed top-20 right-0 h-full bg-white dark:bg-moment-gray-800 shadow-2xl transform transition-transform duration-300 z-40 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '420px' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-moment-gray-900 dark:text-white">SDK Configuration</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-moment-gray-600 dark:text-moment-gray-300 hover:text-moment-primary dark:hover:text-moment-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Account ID */}
            <div>
              <label className="block text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-2">
                Account ID *
              </label>
              <input
                type="text"
                value={tempConfig.accountId}
                onChange={(e) => setTempConfig({...tempConfig, accountId: e.target.value})}
                placeholder="Enter your SDK Account ID"
                className="w-full px-3 py-2 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
              />
              <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400 mt-1">
                Your unique MomentScience account identifier
              </p>
            </div>

            {/* Auto Load */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={tempConfig.autoLoad}
                  onChange={(e) => setTempConfig({...tempConfig, autoLoad: e.target.checked})}
                  className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                />
                <div>
                  <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                    Auto Load
                  </span>
                  <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
                    Automatically fetch available offers when SDK is ready
                  </p>
                </div>
              </label>
            </div>

            {/* Auto Show */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={tempConfig.autoShow}
                  onChange={(e) => setTempConfig({...tempConfig, autoShow: e.target.checked})}
                  className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                />
                <div>
                  <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                    Auto Show
                  </span>
                  <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
                    Automatically display offers overlay when ready
                  </p>
                </div>
              </label>
            </div>

            {/* Development Mode */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={tempConfig.dev}
                  onChange={(e) => setTempConfig({...tempConfig, dev: e.target.checked})}
                  className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                />
                <div>
                  <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                    Development Mode
                  </span>
                  <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
                    Enable testing mode with sample offers (no activity recorded)
                  </p>
                </div>
              </label>
            </div>

            {/* Settings Override Section */}
            <div>
              <h4 className="text-lg font-semibold text-moment-gray-800 dark:text-white mb-3">
                Display Settings Override
              </h4>
              
              {/* Ad Position */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-2">
                  Ad Position
                </label>
                <select
                  value={tempConfig.settings?.ad_position || 'center'}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    settings: {...(tempConfig.settings || {}), ad_position: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                >
                  <option value="center">Center</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                </select>
              </div>

              {/* Darken Background */}
              <div className="mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={tempConfig.settings?.darken_bg ?? true}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      settings: {...(tempConfig.settings || {}), darken_bg: e.target.checked}
                    })}
                    className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                  />
                  <div>
                    <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                      Darken Background
                    </span>
                    <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
                      Darkens the background behind the offer unit
                    </p>
                  </div>
                </label>
              </div>

              {/* Display Delay */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-2">
                  Display Delay (seconds)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={tempConfig.settings?.delay || 0}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    settings: {...(tempConfig.settings || {}), delay: parseInt(e.target.value) || 0}
                  })}
                  className="w-full px-3 py-2 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                />
              </div>

              {/* Screen Margin */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-2">
                  Screen Margin (pixels)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={tempConfig.settings?.screen_margin || 20}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    settings: {...(tempConfig.settings || {}), screen_margin: parseInt(e.target.value) || 20}
                  })}
                  className="w-full px-3 py-2 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                />
              </div>

              {/* Show Disclaimer */}
              <div className="mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={tempConfig.settings?.show_disclaimer ?? true}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      settings: {...(tempConfig.settings || {}), show_disclaimer: e.target.checked}
                    })}
                    className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                  />
                  <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                    Show Disclaimer
                  </span>
                </label>
              </div>

              {/* Show Close Button */}
              <div className="mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={tempConfig.settings?.show_close ?? true}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      settings: {...(tempConfig.settings || {}), show_close: e.target.checked}
                    })}
                    className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                  />
                  <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                    Show Close Button
                  </span>
                </label>
              </div>

              {/* Multi Offer Unit */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={tempConfig.settings?.multi_offer_unit ?? false}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      settings: {...(tempConfig.settings || {}), multi_offer_unit: e.target.checked}
                    })}
                    className="w-4 h-4 text-moment-primary border-moment-gray-300 rounded focus:ring-moment-primary"
                  />
                  <div>
                    <span className="text-sm font-semibold text-moment-gray-700 dark:text-moment-gray-300">
                      Multi Offer Unit (MOU)
                    </span>
                    <p className="text-xs text-moment-gray-500 dark:text-moment-gray-400">
                      Enable multiple offers display instead of single offer
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Styles Override Section */}
            <div>
              <h4 className="text-lg font-semibold text-moment-gray-800 dark:text-white mb-3">
                Styling Override Options
              </h4>
              
              {/* Header Styles */}
              <div className="mb-4">
                <h5 className="text-md font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3">Header Styling</h5>
                
                {/* Header Background */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={tempConfig.styles?.header?.background || '#0b1937'}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        header: {...(tempConfig.styles?.header || {}), background: e.target.value}
                      }
                    })}
                    className="w-full h-10 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg"
                  />
                </div>

                {/* Header Text */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Header Text
                  </label>
                  <input
                    type="text"
                    value={tempConfig.styles?.header?.text || 'Your order is complete'}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        header: {...(tempConfig.styles?.header || {}), text: e.target.value}
                      }
                    })}
                    className="w-full px-3 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                  />
                </div>

                {/* Header Text Color */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={tempConfig.styles?.header?.textColor || '#ffffff'}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        header: {...(tempConfig.styles?.header || {}), textColor: e.target.value}
                      }
                    })}
                    className="w-full h-10 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg"
                  />
                </div>

                {/* Header Font Size */}
                <div>
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Font Size (px)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="24"
                    value={tempConfig.styles?.header?.fontSize || 16}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        header: {...(tempConfig.styles?.header || {}), fontSize: parseInt(e.target.value) || 16}
                      }
                    })}
                    className="w-full px-3 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Offer Text Styles */}
              <div>
                <h5 className="text-md font-semibold text-moment-gray-700 dark:text-moment-gray-300 mb-3">Offer Text Styling</h5>
                
                {/* Font Family */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Font Family
                  </label>
                  <select
                    value={tempConfig.styles?.offerText?.font || 'Roboto'}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        offerText: {...(tempConfig.styles?.offerText || {}), font: e.target.value}
                      }
                    })}
                    className="w-full px-3 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                  >
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Inter">Inter</option>
                  </select>
                </div>

                {/* Font Size */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Font Size (px)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="20"
                    value={tempConfig.styles?.offerText?.fontSize || 14}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        offerText: {...(tempConfig.styles?.offerText || {}), fontSize: parseInt(e.target.value) || 14}
                      }
                    })}
                    className="w-full px-3 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                  />
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-moment-gray-700 dark:text-moment-gray-300 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={tempConfig.styles?.offerText?.textColor || '#000000'}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      styles: {
                        ...(tempConfig.styles || {}),
                        offerText: {...(tempConfig.styles?.offerText || {}), textColor: e.target.value}
                      }
                    })}
                    className="w-full h-10 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Custom Payload Section */}
            <div>
              <h4 className="text-lg font-semibold text-moment-gray-800 dark:text-white mb-3">
                Custom Payload Properties
              </h4>
              <p className="text-sm text-moment-gray-600 dark:text-moment-gray-400 mb-4">
                Add custom key-value pairs to be passed to the MomentScience SDK for offer personalization and enhanced targeting.
              </p>
              
              {/* Payload List */}
              <div className="space-y-3 mb-4">
                {tempPayload.map((payload, index) => (
                  <div key={index} className="flex space-x-2 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Key (e.g., placement)"
                        value={payload.key}
                        onChange={(e) => {
                          const newPayload = [...tempPayload];
                          newPayload[index] = { ...payload, key: e.target.value };
                          setTempPayload(newPayload);
                        }}
                        className="w-full px-3 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Value"
                        value={payload.value}
                        onChange={(e) => {
                          const newPayload = [...tempPayload];
                          newPayload[index] = { ...payload, value: e.target.value };
                          setTempPayload(newPayload);
                        }}
                        className="w-full px-3 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                      />
                    </div>
                    <div className="w-20">
                      <select
                        value={payload.type}
                        onChange={(e) => {
                          const newPayload = [...tempPayload];
                          newPayload[index] = { ...payload, type: e.target.value as 'string' | 'number' | 'boolean' };
                          setTempPayload(newPayload);
                        }}
                        className="w-full px-2 py-2 text-sm border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white focus:ring-2 focus:ring-moment-primary focus:border-transparent"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        const newPayload = tempPayload.filter((_, i) => i !== index);
                        setTempPayload(newPayload);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      title="Remove payload property"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Add New Payload Button */}
              <button
                onClick={() => {
                  setTempPayload([...tempPayload, { key: '', value: '', type: 'string' }]);
                }}
                className="w-full px-3 py-2 border-2 border-dashed border-moment-gray-300 dark:border-moment-gray-600 rounded-lg text-moment-gray-600 dark:text-moment-gray-400 hover:border-moment-primary hover:text-moment-primary transition-colors"
              >
                + Add Payload Property
              </button>
              
              {/* Payload Examples */}
              <div className="mt-4 p-3 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg">
                <h6 className="text-sm font-semibold text-moment-gray-800 dark:text-white mb-2">Common Examples:</h6>
                <div className="text-xs text-moment-gray-600 dark:text-moment-gray-400 space-y-1">
                  <div><strong>placement:</strong> post_transaction</div>
                  <div><strong>theme_id:</strong> moment_post_transaction</div>
                  <div><strong>country:</strong> US</div>
                  <div><strong>zipcode:</strong> 12345</div>
                  <div><strong>loyalty_program_id:</strong> 23445665393</div>
                </div>
              </div>
            </div>            {/* Save Button */}
            <div className="pt-4 border-t border-moment-gray-200 dark:border-moment-gray-600">
              <button
                onClick={() => {
                  setSdkConfig(tempConfig);
                  setCustomPayload(tempPayload);
                  setSidebarOpen(false);
                }}
                className="w-full bg-gradient-to-r from-moment-primary to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Save Configuration
              </button>
              
              <button
                onClick={() => {
                  setTempConfig(sdkConfig);
                  setTempPayload(customPayload);
                }}
                className="w-full mt-2 bg-moment-gray-200 dark:bg-moment-gray-600 text-moment-gray-700 dark:text-moment-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-moment-gray-300 dark:hover:bg-moment-gray-500 transition-colors"
              >
                Reset to Saved
              </button>
            </div>            {/* Current Status */}
            <div className="bg-moment-gray-50 dark:bg-moment-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-moment-gray-800 dark:text-white mb-2">SDK Status</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Account ID:</span>
                  <span className="font-mono text-xs text-moment-gray-900 dark:text-white">
                    {sdkConfig.accountId.substring(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Initialization:</span>
                  <span className="text-orange-600 dark:text-orange-400">
                    {currentStep === 'success' ? 'Active' : 'Pending Purchase'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Mode:</span>
                  <span className={sdkConfig.dev ? "text-yellow-600" : "text-green-600"}>
                    {sdkConfig.dev ? 'Development' : 'Production'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-moment-gray-600 dark:text-moment-gray-300">Custom Payload:</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {customPayload.length} properties
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-24 right-4 p-3 bg-moment-primary text-white rounded-full shadow-lg hover:bg-moment-primary/90 transition-all duration-300 z-30 ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Settings className="w-5 h-5" />
      </button>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Hero Section */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-moment-gray-600 dark:text-moment-gray-300 hover:text-moment-primary dark:hover:text-moment-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-moment-gray-200 dark:bg-moment-gray-700 text-moment-gray-700 dark:text-moment-gray-300 rounded-lg hover:bg-moment-gray-300 dark:hover:bg-moment-gray-600 transition-colors"
            >
              Reset Demo
            </button>
              {/* MomentScience SDK Status Indicator */}
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              currentStep === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentStep === 'success' 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-orange-500'
              }`}></div>
              <span>
                {currentStep === 'success' ? 'MomentScience SDK Active' : 'MomentScience SDK Ready'}
              </span>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-moment-gray-900 dark:text-white mb-4">
              Moments Showcase
            </h1>
            <p className="text-xl text-moment-gray-600 dark:text-moment-gray-300 max-w-3xl mx-auto">
              Experience MomentScience in action. Watch how our intelligent offer engine delivers personalized offers at key moments in the customer journey.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {['browsing', 'cart', 'checkout', 'payment', 'success'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === step 
                      ? 'bg-moment-primary text-white' 
                      : index < ['browsing', 'cart', 'checkout', 'payment', 'success'].indexOf(currentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-moment-gray-200 text-moment-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      index < ['browsing', 'cart', 'checkout', 'payment', 'success'].indexOf(currentStep)
                        ? 'bg-green-500'
                        : 'bg-moment-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Browsing Step */}
            {currentStep === 'browsing' && (
              <motion.div
                key="browsing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white/80 dark:bg-moment-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-moment-gray-700/20 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-square mb-4 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-moment-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-moment-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-moment-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-moment-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-moment-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-moment-primary to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Cart Step */}
            {currentStep === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white/80 dark:bg-moment-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-moment-gray-700/20">
                  <h2 className="text-2xl font-bold text-moment-gray-900 dark:text-white mb-6">
                    Shopping Cart
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-moment-gray-50 dark:bg-moment-gray-700 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div>
                            <h3 className="font-semibold text-moment-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-moment-primary dark:text-moment-accent font-bold">${item.price}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-moment-gray-200 dark:border-moment-gray-600 pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold text-moment-gray-900 dark:text-white">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-moment-primary to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </motion.div>
            )}

            {/* Checkout & Payment Steps */}
            {(currentStep === 'checkout' || currentStep === 'payment') && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Form */}
                <div className="bg-white/80 dark:bg-moment-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-moment-gray-700/20">
                  <h2 className="text-2xl font-bold text-moment-gray-900 dark:text-white mb-6">
                    {currentStep === 'checkout' ? 'Shipping Information' : 'Payment Details'}
                  </h2>
                  
                  <div className="space-y-4">
                    {currentStep === 'checkout' ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={customerData.firstName}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={customerData.lastName}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={customerData.email}
                          onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder="Address"
                          value={customerData.address}
                          onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={customerData.city}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            value={customerData.zipCode}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, zipCode: e.target.value }))}
                            className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={customerData.cardNumber}
                          onChange={(e) => setCustomerData(prev => ({ ...prev, cardNumber: e.target.value }))}
                          className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={customerData.expiry}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, expiry: e.target.value }))}
                            className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={customerData.cvv}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, cvv: e.target.value }))}
                            className="w-full p-3 border border-moment-gray-300 dark:border-moment-gray-600 rounded-lg bg-white dark:bg-moment-gray-700 text-moment-gray-900 dark:text-white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={nextStep}
                    className="w-full mt-6 bg-gradient-to-r from-moment-primary to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    {currentStep === 'checkout' ? 'Continue to Payment' : 'Complete Order'}
                  </button>
                </div>
                
                {/* Order Summary */}
                <div className="bg-white/80 dark:bg-moment-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-moment-gray-700/20">
                  <h3 className="text-xl font-bold text-moment-gray-900 dark:text-white mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">{item.name}</span>
                        <span className="font-semibold text-moment-gray-900 dark:text-white">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-moment-gray-200 dark:border-moment-gray-600 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-moment-gray-600 dark:text-moment-gray-300">Subtotal:</span>
                      <span className="font-semibold text-moment-gray-900 dark:text-white">${calculateTotal().toFixed(2)}</span>                    </div>
                    {calculateSavings() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings:</span>
                        <span>-${calculateSavings().toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-moment-gray-900 dark:text-white pt-2 border-t border-moment-gray-200 dark:border-moment-gray-600">
                      <span>Total:</span>
                      <span>${(calculateTotal() - calculateSavings()).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success Step */}
            {currentStep === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-white/80 dark:bg-moment-gray-800/80 backdrop-blur-sm rounded-2xl p-12 border border-white/20 dark:border-moment-gray-700/20">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-moment-gray-900 dark:text-white mb-4">
                    Order Complete!
                  </h2>
                  
                  <p className="text-lg text-moment-gray-600 dark:text-moment-gray-300 mb-8">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                  </p>
                    <div className="bg-moment-gray-50 dark:bg-moment-gray-700 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-moment-gray-900 dark:text-white mb-4">
                      MomentScience Features Demonstrated:
                    </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Customer data captured</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Behavioral tracking active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Conversion data sent</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Total value: ${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* MomentScience Conversion Tracking Information */}
                  <div className="bg-moment-primary/10 dark:bg-moment-primary/20 rounded-xl p-6 mb-8 border border-moment-primary/20">
                    <h3 className="text-lg font-semibold text-moment-primary dark:text-moment-primary-light mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      MomentScience Conversion Tracked
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Order Value:</span>
                          <span className="font-semibold text-moment-gray-900 dark:text-white">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Items Count:</span>
                          <span className="font-semibold text-moment-gray-900 dark:text-white">{cartItems.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Currency:</span>
                          <span className="font-semibold text-moment-gray-900 dark:text-white">USD</span>
                        </div>
                      </div>                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Customer ID:</span>
                          <span className="font-semibold text-moment-gray-900 dark:text-white">demo-user-123</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Account ID:</span>
                          <span className="font-semibold text-moment-gray-900 dark:text-white font-mono text-xs">{sdkConfig.accountId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">SDK Status:</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Data Sent:</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">✓ Success</span>
                        </div>
                      </div>
                    </div>
                      <div className="mt-4 p-3 bg-white/50 dark:bg-moment-gray-800/50 rounded-lg">
                      <p className="text-xs text-moment-gray-600 dark:text-moment-gray-400">
                        <strong>Integration Note:</strong> This conversion data has been automatically sent to MomentScience using the configured account ID from the settings panel. 
                        Use the settings button (⚙️) to customize SDK parameters including account ID, auto-show options, and test mode.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={resetDemo}
                    className="bg-gradient-to-r from-moment-primary to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>        </div>
      </div>
    </div>
  );
};

export default MomentsShowcasePage;
