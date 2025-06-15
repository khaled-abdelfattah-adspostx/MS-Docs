<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MomentScience API Explorer - Copilot Instructions

## Project Overview
This is a React-based API Explorer application for testing MomentScience APIs. The application provides an interactive interface for building API requests, previewing cURL commands, and analyzing responses.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom MomentScience design system
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios

## Code Style Guidelines
- Use TypeScript for all components and services
- Follow React functional components with hooks
- Use Tailwind CSS classes for styling with custom moment-* color palette
- Implement proper error handling and loading states
- Use motion components from Framer Motion for smooth animations
- Follow responsive design principles (mobile-first)

## MomentScience Design System
- Primary color: `moment-primary` (#0066FF)
- Secondary color: `moment-secondary` (#FF6B35) 
- Accent color: `moment-accent` (#00D4AA)
- Use Inter font for text and JetBrains Mono for code
- Implement dark/light mode support

## API Endpoints to Support
1. Offers API - POST /native/v2/offers.json
2. Perkswall API - POST /native/v4/perkswall.json  
3. Offer Catalog API - GET /native/v3/catalog.json
4. Reporting API - GET /native/activity.json

## Key Features
- API endpoint selection dropdown
- Form and JSON editor views for request building
- Live cURL command generation
- API request execution with response visualization
- Dark/light mode toggle
- Responsive design for mobile and desktop

Please maintain consistency with the established patterns and ensure all new code follows the project's TypeScript and React best practices.
