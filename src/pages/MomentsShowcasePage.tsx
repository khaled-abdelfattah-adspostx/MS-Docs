import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Tag, Clock, CreditCard, Gift, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
}

interface Offer {
  id: string;
  type: 'discount' | 'freeShipping' | 'bundle' | 'cashback';
  title: string;
  description: string;
  value: string;
  trigger: 'cart' | 'checkout' | 'payment';
  icon: React.ReactNode;
  color: string;
}

const MomentsShowcasePage = () => {
  const [currentStep, setCurrentStep] = useState<'browsing' | 'cart' | 'checkout' | 'payment' | 'success'>('browsing');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showOffer, setShowOffer] = useState<Offer | null>(null);
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
      reviews: 856
    }
  ];

  // Dynamic offers based on moments
  const offers: Offer[] = [
    {
      id: 'cart-discount',
      type: 'discount',
      title: '15% Off Your Order',
      description: 'Complete your purchase in the next 10 minutes',
      value: '15% OFF',
      trigger: 'cart',
      icon: <Tag className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-red-500 to-pink-500'
    },
    {
      id: 'free-shipping',
      type: 'freeShipping',
      title: 'Free Express Shipping',
      description: 'On orders over $150 - Limited time offer',
      value: 'FREE SHIPPING',
      trigger: 'checkout',
      icon: <Gift className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      id: 'bundle-deal',
      type: 'bundle',
      title: 'Bundle & Save 25%',
      description: 'Add 2 more items and save even more',
      value: '25% OFF',
      trigger: 'cart',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      id: 'cashback',
      type: 'cashback',
      title: '10% Cashback',
      description: 'Earn cashback on your first purchase',
      value: '10% BACK',
      trigger: 'payment',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500'
    }
  ];

  // Trigger offers based on user actions
  useEffect(() => {
    const triggerOffer = () => {
      const relevantOffers = offers.filter(offer => offer.trigger === currentStep);
      if (relevantOffers.length > 0 && !showOffer) {
        const randomOffer = relevantOffers[Math.floor(Math.random() * relevantOffers.length)];
        setTimeout(() => setShowOffer(randomOffer), 1000);
      }
    };

    if (currentStep === 'cart' && cartItems.length > 0) {
      triggerOffer();
    } else if (currentStep === 'checkout' || currentStep === 'payment') {
      triggerOffer();
    }
  }, [currentStep, cartItems, showOffer]);

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
    if (showOffer?.type === 'discount') {
      return calculateTotal() * 0.15;
    }
    return 0;
  };

  const nextStep = () => {
    const steps: Array<typeof currentStep> = ['browsing', 'cart', 'checkout', 'payment', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setShowOffer(null);
    }
  };

  const resetDemo = () => {
    setCurrentStep('browsing');
    setCartItems([]);
    setShowOffer(null);
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
                      <span className="font-semibold text-moment-gray-900 dark:text-white">${calculateTotal().toFixed(2)}</span>
                    </div>
                    {showOffer && showOffer.type === 'discount' && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (15%):</span>
                        <span>-${calculateSavings().toFixed(2)}</span>
                      </div>
                    )}
                    {showOffer && showOffer.type === 'freeShipping' && (
                      <div className="flex justify-between text-green-600">
                        <span>Shipping:</span>
                        <span>FREE</span>
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
                      MomentScience Offers Delivered:
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Cart abandonment offer triggered</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Checkout incentive applied</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Payment completion bonus</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-moment-gray-600 dark:text-moment-gray-300">Total savings: ${calculateSavings().toFixed(2)}</span>
                      </div>
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
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Offer Banner */}
      <AnimatePresence>
        {showOffer && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 z-50"
          >
            <div className={`${showOffer.color} rounded-2xl p-6 shadow-2xl max-w-md mx-auto`}>
              <div className="flex items-start justify-between text-white">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {showOffer.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{showOffer.title}</h4>
                    <p className="text-white/90 text-sm mb-3">{showOffer.description}</p>
                    <div className="flex items-center space-x-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        {showOffer.value}
                      </span>
                      <div className="flex items-center space-x-1 text-white/80">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Limited time</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowOffer(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MomentsShowcasePage;
