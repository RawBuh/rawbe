# Rawbe - Façade Project Management Interface

A modern and lightweight web interface prototype for façade system configuration, price checking, and user/dealer/product management. Built with React and TailwindCSS.

## Features

- **Modern Design**: Clean, minimalist interface inspired by Perplexity.ai and q-vent.com
- **Responsive Layout**: Fixed sidebar navigation with dynamic main content area
- **Dashboard Analytics**: Statistics dashboard with filtering and data visualization
- **Price Checking**: Component price lookup with advanced search capabilities
- **System Management**: Q-VENT systems exploration and configuration
- **User Management**: Admin interface for managing users, dealers, and products
- **Chat Interface**: AI-powered chat for façade system inquiries

## Design Highlights

- **Typography**: Inter font family for clean, professional appearance
- **Color Scheme**: Neutral gray palette with subtle shadows and rounded corners
- **Layout**: Desktop-first responsive design with elegant spacing
- **Icons**: Lucide React icons for consistent visual language
- **Interactions**: Smooth hover effects and transitions

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Removes the single build dependency

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Navigation sidebar component
│   └── MainContent.js      # Dynamic main content area
├── index.css               # Global styles and TailwindCSS
├── index.js                # React entry point
└── App.js                  # Main application component
```

## Components Overview

### Sidebar Navigation
- App branding and tagline
- Main navigation links (Chat, Projects)
- Q-VENT system sections
- Agrob Buchtal sections
- Active state management

### Main Content Areas
- **Dashboard**: Statistics overview with filtering
- **Systems**: Q-VENT system exploration
- **Price Check**: Component pricing tools
- **Chat**: AI-powered façade consultation

## Technologies Used

- **React** - Frontend framework
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS** - CSS processing
- **React Scripts** - Build tools

## Customization

The interface is highly customizable through TailwindCSS classes. Key design tokens:

- **Colors**: Neutral gray palette with accent colors
- **Spacing**: Consistent padding and margins using Tailwind utilities
- **Typography**: Inter font with various weights and sizes
- **Shadows**: Subtle elevation effects for depth
- **Borders**: Rounded corners and clean lines

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 