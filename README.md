# MomentScience Developer Hub

A modern, interactive platform showcasing MomentScience solutions for monetizing key customer moments. Features customer impact studies, comprehensive solution explanations, and a powerful API Explorer for testing MomentScience APIs. Built with TypeScript, Tailwind CSS, and the MomentScience design system.

![Developer Hub Preview](https://via.placeholder.com/800x400/0066FF/FFFFFF?text=MomentScience+Developer+Hub)

## 🚀 Live Demo

Visit the live application: **[https://yourusername.github.io/MS-Docs/](https://yourusername.github.io/MS-Docs/)**

## 📦 Quick Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Fork or clone this repository**
2. **Update the repository name** in `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/', // Replace with your actual repo name
   ```
3. **Push to GitHub** - The GitHub Actions workflow will automatically deploy to GitHub Pages
4. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save

### Option 2: Manual Deployment

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Option 3: Deploy to Vercel/Netlify

This project works seamlessly with:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via GitHub

## ✨ Features

- **🏠 Beautiful Homepage** - Modern landing page showcasing all MomentScience developer solutions
- **🚀 Interactive API Testing** - Test MomentScience APIs directly in your browser
- **📝 Dual View Modes** - Switch between form-based and JSON editor interfaces  
- **💻 Live cURL Generation** - Copy-paste ready cURL commands for terminal use
- **🎨 Beautiful UI** - MomentScience-branded interface with smooth animations and custom favicon
- **🌙 Dark/Light Mode** - Toggle between themes for comfortable viewing
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Real-time Response** - View formatted API responses with syntax highlighting
- **🔧 Dynamic Parameters** - Add/remove custom query parameters, headers, and body parameters
- **✅ Optional Body Parameters** - Enable/disable default request body parameters as needed
- **📚 Integrated Documentation** - Quick access webview and external links to official API docs
- **🧭 Smart Navigation** - React Router-based navigation between solutions

## 🎯 Supported APIs

| API Endpoint | Method | Description |
|-------------|--------|-------------|
| **Moments API** | POST | Deliver relevant perks at key customer journey moments to boost loyalty and engagement |
| **Perkswall API** | POST | Access curated perks in a central location - your unique destination to reward and retain customers |
| **Offer Catalog API** | GET | Browse the complete catalog of available offers and perks from major brands across all verticals |
| **Reporting API** | GET | Access comprehensive analytics and activity reports for tracking performance and conversions |

## 📊 HTTP Status Codes

MomentScience Native Ads API uses standard HTTP status codes:

- **200 OK**: The request was successful
- **400 Bad Request**: The request was malformed or invalid  
- **401 Unauthorized**: The request requires authentication
- **403 Forbidden**: The request is not authorized to access the requested resource
- **404 Not Found**: The requested resource was not found
- **422 Unprocessable Entity**: The request sent invalid inputs

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd momentscience-api-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Homepage Navigation
- Visit the homepage to see all available MomentScience developer solutions
- Click on the "API Explorer" tile to access the interactive API testing tool
- Additional solution tiles show upcoming features (Dashboard, Perks Manager, Security Center)
- Use the MomentScience logo to return to the homepage from any page

### API Explorer Usage

### 1. Enter Your API Key
- Input your MomentScience API key in the secure field
- The key is stored locally and never sent to external servers

### 2. Select an API Endpoint
- Choose from the dropdown list of available APIs
- Each endpoint shows method, URL, and description

### 3. Configure Request Parameters
- **Form View**: Fill out user-friendly form fields
- **JSON View**: Edit the raw JSON payload directly

### 4. Preview cURL Command
- View the generated cURL command
- Copy to clipboard for terminal use

### 5. Execute Request
- Click "Run Request" to execute the API call
- View formatted response with status codes and timing

## 🔧 Advanced Features

### Dynamic Parameters
- **Query Parameters**: Add custom query parameters beyond the defaults
- **Custom Headers**: Include additional headers for specialized requests
- **Body Parameters**: Add extra body parameters for POST requests

### Optional Body Parameters
- Use checkboxes to enable/disable default request body parameters
- Only enabled parameters are included in the final request
- Helps test different parameter combinations

### Documentation Integration
- **Quick View**: Embedded webview showing official API documentation
- **External Access**: Direct links to open full documentation in new tabs
- **Context-Aware**: Documentation updates based on selected API endpoint

## 🎨 Design System

The application uses the MomentScience design system with:

- **Colors**: Custom moment-* palette matching brand guidelines (#FF4A16 primary)
- **Typography**: Inter for UI text, JetBrains Mono for code
- **Branding**: Custom MomentScience logo and favicon with consistent visual identity
- **Components**: Consistent button styles, form elements, and cards
- **Animations**: Smooth transitions using Framer Motion

## 🔧 Configuration

### API Endpoints
Edit `src/config/api.ts` to modify or add new API endpoints:

```typescript
export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'custom-api',
    name: 'Custom API',
    method: 'POST',
    url: 'https://api.example.com/endpoint',
    description: 'Custom API description',
    // ... additional configuration
  }
];
```

### Styling
Customize the design system in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      moment: {
        primary: '#0066FF',
        secondary: '#FF6B35',
        accent: '#00D4AA',
        // ... more colors
      }
    }
  }
}
```

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MomentScience team for API specifications
- React community for excellent tooling
- Tailwind CSS for the utility-first approach
- Monaco Editor for the excellent code editing experience

---

Built with ❤️ for the MomentScience team
