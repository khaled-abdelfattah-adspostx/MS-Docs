# MomentScience SDK Integration

## Overview

The MomentScience SDK has been successfully integrated into the Moments Showcase page to demonstrate real-time conversion tracking and personalized offer delivery.

## Integration Details

### SDK Configuration

The SDK is configured with the following settings:

```javascript
window.AdpxConfig = {
  accountId: 'ffa59da09972e55e',
  autoShow: true
};
```

### Customer Data Tracking

The integration tracks comprehensive customer data including:

- **Customer Information**: Email, first name, last name, customer ID
- **Order Details**: Order value, order ID, currency, item details
- **Custom Properties**: Total savings, conversion step, timestamp
- **Behavioral Data**: Cart items, checkout progression, payment completion

### Conversion Tracking

Conversion tracking is automatically triggered when customers reach the success page after completing a purchase. The tracked data includes:

- Order value and currency
- Individual product details (ID, name, price, quantity)
- Customer identification
- Custom conversion metrics

### Features Demonstrated

1. **SDK Initialization**: Automatic loading and configuration on page load
2. **User Data Collection**: Capturing customer information throughout the journey
3. **Conversion Tracking**: Real-time data transmission on purchase completion
4. **Visual Feedback**: SDK status indicator and conversion confirmation

### Technical Implementation

The integration uses a custom React hook (`useMomentScienceSDK`) that provides:

- `initializeSDK(userData)`: Initialize the SDK with user data
- `trackConversion(conversionData)`: Send conversion data to MomentScience

### Code Location

- **Hook**: `src/hooks/useMomentScienceSDK.ts`
- **Implementation**: `src/pages/MomentsShowcasePage.tsx`
- **Integration Points**: Component mount (initialization) and success step (conversion)

### SDK Script Loading

The SDK is dynamically loaded from `https://cdn.pubtailer.com/launcher.min.js` and automatically initialized with the provided configuration.

### Data Privacy

All customer data is handled securely and only demo data is used in this showcase environment.

## Testing the Integration

1. Navigate to the Moments Showcase page
2. Add products to cart
3. Complete the checkout process
4. Reach the success page to trigger conversion tracking
5. Observe the SDK status indicator and conversion confirmation

The integration demonstrates how MomentScience can be seamlessly embedded into e-commerce workflows to capture valuable conversion data and deliver personalized offers.
