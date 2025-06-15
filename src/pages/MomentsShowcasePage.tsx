import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useMomentScienceSDK } from '../hooks/useMomentScienceSDK';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

const MomentsShowcasePage = () => {  const { initializeSDK, trackConversion } = useMomentScienceSDK();
  const [currentStep, setCurrentStep] = useState<'browsing' | 'cart' | 'checkout' | 'payment' | 'success'>('browsing');
  const [cartItems, setCartItems] = useState<Product[]>([]);
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
  ];

  // Initialize MomentScience SDK on component mount
  useEffect(() => {
    initializeSDK({
      customerId: 'demo-user-123',
      email: customerData.email || 'demo@example.com',
      firstName: customerData.firstName || 'Demo',
      lastName: customerData.lastName || 'User'
    });
  }, []);

  // Track conversion when reaching success step
  useEffect(() => {
    if (currentStep === 'success' && cartItems.length > 0) {
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
  }, [currentStep, cartItems, customerData]);

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
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>MomentScience SDK Active</span>
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
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-moment-gray-600 dark:text-moment-gray-300">Customer ID:</span>
                          <span className="font-semibold text-moment-gray-900 dark:text-white">demo-user-123</span>
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
                        <strong>Integration Note:</strong> This conversion data has been automatically sent to MomentScience using the JS SDK. 
                        The data includes customer information, order details, and custom properties for personalized offer delivery.
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
