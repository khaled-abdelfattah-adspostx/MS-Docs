interface PayloadProperty {
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
}

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
  autoLoad?: boolean;
  autoShow?: boolean;
  dev?: boolean;
  settings?: {
    ad_position?: string;
    darken_bg?: boolean;
    darken_bg_non_centered?: boolean;
    delay?: number;
    privacy_policy?: string;
    screen_margin?: number;
    show_disclaimer?: boolean;
    button_order?: string;
    enable_vertical_offset?: boolean;
    mobile_vertical_offset?: number;
    multi_offer_unit?: boolean;
    show_ads_on_exit?: boolean;
    close_ad_on_click_outside?: boolean;
    ad_animation?: string;
    show_close?: boolean;
    enable_close_delay?: boolean;
    close_delay?: number;
    embedded?: {
      enabled?: boolean;
      fill_container?: boolean;
      showBorder?: boolean;
      showHeader?: boolean;
      showFooter?: boolean;
      targetElement?: string;
    };
    enable_effect_shimmer_pos_cta?: boolean;
    enable_offerwall?: boolean;
    fixed_progress_bar?: boolean;
    open_offerwall?: boolean;
    open_overlay_offerwall?: boolean;
    offerText?: {
      font?: string;
      textColor?: string;
      tileTextAlignment?: string;
      buttonRadius?: string;
      fontSizeTitle?: string;
      fontSizeDescription?: string;
    };
    [key: string]: any;
  };
  styles?: {
    offerText?: {
      buttonNo?: {
        background?: string;
        color?: string;
        hover?: string;
        stroke?: string;
      };
      buttonYes?: {
        background?: string;
        color?: string;
        hover?: string;
        stroke?: string;
      };
      font?: string;
      fontSize?: number;
      textColor?: string;
      offerwall_mou_button_radius?: number;
      show_image?: boolean;
    };
    header?: {
      background?: string;
      fontSize?: number;
      lead_in_text?: string;
      lead_in_text_color?: string;
      headLineAndLeadInFontSize?: number;
      text?: string;
      textColor?: string;
    };
    [key: string]: any;
  };
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
  const initializeSDK = (userData?: AdpxUser, config?: Partial<AdpxConfig>, customPayload?: PayloadProperty[]) => {
    // Set up MomentScience configuration with custom or default values
    window.AdpxConfig = {
      accountId: config?.accountId || 'ffa59da09972e55e',
      autoLoad: config?.autoLoad ?? true,
      autoShow: config?.autoShow ?? true,
      dev: config?.dev ?? false,
      settings: config?.settings ?? {},
      styles: config?.styles ?? {}
    };

    // Set user data if provided
    if (userData) {
      window.AdpxUser = {
        ...userData
      };
    } else {
      window.AdpxUser = {};
    }    // Add custom payload properties if provided
    if (customPayload && customPayload.length > 0) {
      // Ensure AdpxUser exists
      if (!window.AdpxUser) {
        window.AdpxUser = {};
      }
      
      customPayload.forEach(prop => {
        if (prop.key && prop.value && window.AdpxUser) {
          let processedValue: any = prop.value;
          
          // Convert value based on type
          if (prop.type === 'number') {
            processedValue = parseFloat(prop.value) || 0;
          } else if (prop.type === 'boolean') {
            processedValue = prop.value.toLowerCase() === 'true';
          }
          
          // Add to AdpxUser object
          window.AdpxUser[prop.key] = processedValue;
        }
      });
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

export type { PayloadProperty };
export default useMomentScienceSDK;
