# MomentScience SDK Settings and Styles Override Guide

This document explains the comprehensive settings and styles override options available in the MomentScience API Explorer.

## Overview

The SDK configuration sidebar now includes advanced Settings and Styles override options that allow you to customize the appearance and behavior of the MomentScience Offers Unit at runtime.

## Display Settings Override

### Ad Position
Controls where the offer unit appears on the screen:
- **Center**: Default center position
- **Bottom Center/Left/Right**: Bottom edge positions
- **Top Center/Left/Right**: Top edge positions

### Darken Background
When enabled, darkens the background behind the offer unit for better visibility.

### Display Delay
Sets a delay (in seconds) between fetching offers and displaying the unit. Useful for timing control.

### Screen Margin
Defines the margin (in pixels) between the offer unit and screen edges.

### Show Disclaimer
Controls whether to display disclaimer text in the footer of the offer unit.

### Show Close Button
Determines if the close (X) button appears in the top-right corner.

### Multi Offer Unit (MOU)
Enables display of multiple offers instead of a single offer unit.

## Styling Override Options

### Header Styling
- **Background Color**: Custom hex color for header background
- **Header Text**: Customizable header message (default: "Your order is complete")
- **Text Color**: Header text color
- **Font Size**: Header text size in pixels (10-24px)

### Offer Text Styling
- **Font Family**: Choose from popular Google Fonts (Roboto, Open Sans, Lato, etc.)
- **Font Size**: Text size in pixels (10-20px)
- **Text Color**: Main text color for offer content

## Configuration Workflow

1. **Open Configuration**: Click the settings icon in the top-right corner
2. **Modify Settings**: Adjust display settings as needed
3. **Customize Styles**: Set colors, fonts, and text preferences
4. **Add Custom Payload**: Include personalization data
5. **Save Configuration**: Apply all changes
6. **Test Integration**: Complete the demo purchase flow to see the SDK in action

## Technical Implementation

The settings and styles are passed to the MomentScience SDK via the `window.AdpxConfig` object:

```javascript
window.AdpxConfig = {
  accountId: 'YOUR_SDK_ID',
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
};
```

## Advanced Features

### Real-time Preview
All configuration changes are applied in real-time when the SDK initializes during the order completion step.

### Reset Functionality
Use the "Reset to Saved" button to revert any temporary changes back to the last saved configuration.

### Default Values
Sensible defaults are provided for all settings to ensure optimal user experience out of the box.

## Integration Notes

- Settings and styles only take effect when the SDK initializes (on purchase completion)
- All configuration options are optional - the SDK will use defaults for any missing values
- Color inputs provide visual color pickers for easy customization
- Numeric inputs have appropriate min/max constraints for usability

## Support for Additional Options

The current implementation includes the most commonly used settings and styles. The underlying system supports the full range of MomentScience SDK configuration options as documented in the official MomentScience documentation.
