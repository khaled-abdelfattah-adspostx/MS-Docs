interface AdpxUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  customerId?: string;
  orderValue?: number;
  orderId?: string;
  currency?: string;
  items?: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  [key: string]: any; // Allow custom properties
}

interface AdpxConfig {
  accountId: string;
  autoShow: boolean;
}

declare global {
  interface Window {
    AdpxConfig?: AdpxConfig;
    AdpxUser?: AdpxUser;
    Adpx?: {
      init: (config: AdpxConfig) => void;
    };
  }
}

export const useMomentScienceSDK = () => {
  const initializeSDK = (userData?: AdpxUser) => {
    // Set up MomentScience configuration
    window.AdpxConfig = {
      accountId: 'ffa59da09972e55e',
      autoShow: true
    };

    // Set user data if provided
    if (userData) {
      window.AdpxUser = {
        ...userData
      };
    } else {
      window.AdpxUser = {};
    }

    // Load and initialize the SDK
    loadSDKScript();
  };

  const loadSDKScript = async () => {
    // Check if script is already loaded
    if (document.getElementById('adpx-launcher')) {
      if (window.Adpx && window.AdpxConfig) {
        window.Adpx.init(window.AdpxConfig);
      }
      return;
    }

    const target = document.head || document.body;    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.pubtailer.com/launcher.min.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.id = 'adpx-launcher';
    
    target.appendChild(script);

    // Wait for script to load and initialize
    await new Promise<void>((resolve) => {
      if (window.Adpx) {
        resolve();
      } else {
        script.addEventListener('load', () => {
          resolve();
        });
      }
    });

    if (window.Adpx && window.AdpxConfig) {
      window.Adpx.init(window.AdpxConfig);
    }
  };

  const trackConversion = (conversionData: AdpxUser) => {
    // Update user data with conversion information
    window.AdpxUser = {
      ...window.AdpxUser,
      ...conversionData
    };

    // Re-initialize if SDK is loaded
    if (window.Adpx && window.AdpxConfig) {
      window.Adpx.init(window.AdpxConfig);
    }
  };

  return {
    initializeSDK,
    trackConversion
  };
};

export default useMomentScienceSDK;
