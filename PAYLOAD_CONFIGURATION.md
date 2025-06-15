# Custom Payload Configuration for MomentScience SDK

## Overview
The MomentScience API Explorer now supports dynamic configuration of all SDK initialization parameters and custom payload properties through an interactive sidebar interface.

## Features

### SDK Configuration Parameters
The sidebar allows you to configure all standard MomentScience SDK initialization parameters:

#### Required Parameters
- **Account ID**: Your unique MomentScience account identifier (SDK ID)

#### Optional Parameters
- **Auto Load**: Automatically fetch available offers when SDK is ready (default: true)
- **Auto Show**: Automatically display offers overlay when ready (default: true)
- **Development Mode**: Enable testing mode with sample offers (default: false)

#### Display Settings
- **Position**: Where the offers overlay appears (bottom-right, bottom-left, top-right, top-left, center)
- **Theme**: Visual appearance (light, dark, auto)
- **Close Button**: Whether to show a close button on the overlay

#### Styling Options
- **Border Radius**: Roundness of corners (none, small, medium, large, extra large)
- **Shadow**: Drop shadow intensity (none, small, medium, large, extra large)
- **Animation**: Entry animation type (none, fade, slide, bounce, zoom)

### Custom Payload Properties

#### What are Payload Properties?
Payload properties are custom key-value pairs passed to the MomentScience SDK through the `window.AdpxUser` object. These properties enable:

- **Offer Personalization**: Customize offer messaging based on user attributes
- **Enhanced Targeting**: Improve offer relevance through detailed user data
- **Custom Reporting**: Track performance with business-specific metrics
- **LoyaltyBoost Support**: Enable partner engagement rewards

#### Data Types
Each payload property supports three data types:
- **String**: Text values (e.g., "post_transaction", "US")
- **Number**: Numeric values (e.g., 12345, 199.99)
- **Boolean**: True/false values (e.g., true, false)

#### Common Examples
- `placement`: "post_transaction" - Indicates where the offer appears
- `theme_id`: "moment_post_transaction" - Custom theme identifier
- `country`: "US" - User's country code
- `zipcode`: "12345" - User's postal code
- `loyalty_program_id`: "23445665393" - Loyalty program identifier
- `firstname`: "John" - User's first name for personalization

## Usage

### Opening the Configuration Sidebar
1. Navigate to the Moments Showcase page
2. Click the gear (⚙️) icon in the top-right corner
3. The sidebar will slide in from the right

### Configuring SDK Parameters
1. Modify any of the SDK configuration options in the sidebar
2. Changes are stored temporarily until you save
3. Click "Save Configuration" to apply changes
4. Click "Reset to Saved" to revert unsaved changes

### Managing Custom Payload
1. Scroll to the "Custom Payload Properties" section
2. Add new properties by clicking "+ Add Payload Property"
3. Fill in the key, value, and select the appropriate data type
4. Remove properties by clicking the X button
5. Properties are automatically included when the SDK initializes

### Testing Your Configuration
1. Complete the demo purchase flow to reach the "success" step
2. The SDK will initialize with your custom configuration and payload
3. Monitor the SDK status in the sidebar to see when it's active

## Implementation Details

### SDK Hook Integration
The `useMomentScienceSDK` hook has been enhanced to support:
- Full configuration parameter passing
- Custom payload property processing
- Type conversion for numeric and boolean values

### State Management
The component maintains separate state for:
- Current configuration (applied)
- Temporary configuration (being edited)
- Custom payload properties
- Temporary payload properties (being edited)

### TypeScript Support
All payload properties are properly typed with the `PayloadProperty` interface:
```typescript
interface PayloadProperty {
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
}
```

## Best Practices

### Payload Property Naming
- Use lowercase with underscores (e.g., `loyalty_program_id`)
- Keep keys concise but descriptive
- Follow MomentScience documentation for standard properties

### Data Type Selection
- Use `string` for text identifiers and codes
- Use `number` for quantities, prices, and numeric IDs
- Use `boolean` for feature flags and yes/no values

### Testing Recommendations
1. Test with development mode enabled first
2. Verify payload properties appear in browser console
3. Test different configurations to ensure offers display correctly
4. Use real account ID for production testing

## Troubleshooting

### SDK Not Initializing
- Verify account ID is correct
- Check that auto load is enabled
- Ensure you've reached the "success" step in the demo

### Payload Not Applied
- Confirm properties are saved before completing purchase
- Check property keys for typos
- Verify data types match expected values

### Configuration Not Persisting
- Click "Save Configuration" to apply changes
- Browser refresh will reset to default values
- Use "Reset to Saved" to revert unsaved changes

## API Reference

### SDK Configuration Object
```typescript
interface AdpxConfig {
  accountId: string;
  autoLoad?: boolean;
  autoShow?: boolean;
  dev?: boolean;
  settings?: {
    position?: string;
    theme?: string;
    closeButton?: boolean;
  };
  styles?: {
    borderRadius?: string;
    shadow?: string;
    animation?: string;
  };
}
```

### Payload Property Structure
```typescript
interface PayloadProperty {
  key: string;      // Property name
  value: string;    // Property value (as string)
  type: 'string' | 'number' | 'boolean';  // Data type
}
```

This enhanced configuration system provides complete control over the MomentScience SDK initialization while maintaining an intuitive user interface for testing and development.
