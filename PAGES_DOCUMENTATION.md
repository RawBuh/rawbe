# Rawbe Facades - Pages Documentation

## 📄 Overview

This document provides comprehensive documentation for all pages in the Rawbe Facades application.

---

## 🏠 Main Navigation Pages

### 1. **Dashboard** (Default Page)
- **Route ID**: `default` (when `activeSection` is not set or is 'quote')
- **Component**: `DashboardView`
- **Location**: `src/components/MainContent.js`
- **Description**: Main dashboard with statistics and quick access to management features
- **Features**:
  - Stat Dashboard with metrics (chat sessions, durations, CSI, offer requests)
  - Period filtering (Last Week, Last Month, Last Quarter)
  - Main search interface
  - Quick access buttons:
    - Manage users
    - Manage dealers
    - Manage products
    - Manage solutions

---

### 2. **New Chat**
- **Route ID**: `new-chat`
- **Component**: `ChatView`
- **Location**: `src/components/MainContent.js`
- **Description**: AI-powered chat interface for façade system inquiries
- **Features**:
  - Large text input for questions
  - Category chips:
    - Panel-System Matcher
    - Get Quote (links to Get Project Quote)
    - Q-VENT systems (links to Systems)
    - Terracotta (links to Keratwin)

---

### 3. **My Projects**
- **Route ID**: `my-projects`
- **Component**: `MyProjectsView`
- **Location**: `src/components/MainContent.js`
- **Description**: Project management dashboard
- **Features**:
  - Project management interface (placeholder for future implementation)

---

## 📋 Quote Pages

### 4. **Get Project Quote**
- **Route ID**: `get-project-quote`
- **Component**: `GetProjectQuote`
- **Location**: `src/pages/GetProjectQuote.jsx`
- **Description**: Comprehensive quote form for façade projects with unit conversion system
- **Features**:
  - **Global Unit System**: Metric/Imperial selector (top-right)
  - **Form Sections**:
    - Facade Panel Material selection
    - Cladding thickness
    - Brand selection with search
    - Layout selection with image previews
    - Panel dimensions (Panel 1 & Panel 2)
    - Project location
    - Building parameters (floor-to-floor distance, wall-to-panel distance)
    - Insulation thickness
    - Wall type
    - Bracket material types
    - Building dimensions (height, total area)
    - Engineering services checkboxes
    - Contact information
  - **AI Assistant Panel**: Expandable AI help panel
  - **Unit Conversion**: Dynamic unit display in input suffixes
  - **Layout Images**: Fixed-height containers with proper scaling

---

### 5. **Apple Calculator** (Get Quote 2)
- **Route ID**: `get-quote-2`
- **Component**: `GetQuote2`
- **Location**: `src/pages/GetQuote2.jsx`
- **Description**: Alternative quote form with different structure
- **Features**:
  - Project information fields
  - Building parameters
  - Wind load calculations
  - Cladding type selection
  - QV Systems selection
  - Vertical profile configuration
  - AI Assistant Panel
  - Navigation to Apple Quote page

---

### 6. **Apple Draft**
- **Route ID**: `draft`
- **Component**: `Draft`
- **Location**: `src/pages/Draft.jsx`
- **Description**: Draft version of quote form
- **Features**:
  - Similar structure to GetQuote2
  - Project information
  - Building parameters
  - Wind load with site address
  - Cladding configuration
  - QV Systems
  - Vertical profile settings
  - AI Assistant Panel

---

### 7. **Apple Quote** (Results/Summary)
- **Route ID**: `quote`
- **Component**: `Quote`
- **Location**: `src/pages/Quote.jsx`
- **Description**: Display quote results and summary
- **Features**:
  - **Quote Summary Display**:
    - Building height, cladding type, cladding weight, substrate type
    - Profile length and horizontal spacing
    - Zone-specific data (center, corner, funneling):
      - Span max
      - Cantilever max
      - Wall bracket types (fixed and sliding points)
    - Wind load information
    - Project details
    - Contact information
  - **Print-friendly**: Uses `quote-page-active` class for print styling
  - **Data Source**: Uses `QuoteContext` to access quote data

---

## 🔧 Q-VENT Section Pages

### 8. **Attachment Systems** (Q-VENT Systems)
- **Route ID**: `systems`
- **Component**: `SystemsView`
- **Location**: `src/components/MainContent.js`
- **Description**: Q-VENT system exploration and information
- **Features**:
  - **Main Search**: "Get to know Q-VENT" search interface
  - **Category Tags**:
    - Standard Components Product list
    - Installation Guides
    - Systems Details
    - Engineering Services
    - Manufacturing Info
    - Logistics
  - **System Cards** (8 systems):
    1. **QV1 - Visible Fixing**: For flat panels with brackets and horizontal rails
    2. **QV2 - Concealed Adhesive Fixing**: Structural adhesive attachment
    3. **QV3 - AGROB BUCHTAL**: For KerraTwin K20 terracotta panels
    4. **Q-CLOUD - Glass Panel Off-Site Adhesive**: For opaque glass panels
    5. **QV6 - Concealed Undercut Fixing**: For flat and 3D panels
    6. **QV7 - Terracotta Panels**: Mechanical attachment using clips
    7. **QV9 - Metal Panels**: For formed and extruded metal panels
    8. **AIO - Bespoke Slab to Slab**: Spans story heights without intermediate fixings

---

### 9. **My Prices (QV Distributors)**
- **Route ID**: `my-prices-dealers`
- **Component**: `PriceCheckView`
- **Location**: `src/components/MainContent.js`
- **Description**: Personalized distributor pricing interface
- **Features**:
  - **Distributor Portal Header**: Search for products by name or Art No
  - **File Actions**:
    - Upload price list
    - Download in XLS
  - **Display Options**:
    - Show commission if any
    - Show product weights
    - Apply import tax
  - **Category Tags**:
    - Category pricing
    - Specifications
    - Transportation
    - Special price

---

### 10. **Our Prices (QV Team)**
- **Route ID**: `our-prices-sales`
- **Component**: `OurPricesSalesView`
- **Location**: `src/components/MainContent.js`
- **Description**: Internal sales team pricing dashboard
- **Features**:
  - **Internal Hub**: Search products for prices, margins, distributor levels, drawings
  - **File Actions**: Upload/Download price lists
  - **Display Options**:
    - Show cost and margin breakdown
    - Compare distributor price levels
    - Highlight top-margin products
  - **Quick Actions Tags**:
    - Product Drawings
    - Technical Specs
    - Distributor Tiers
    - Cost Overview
  - **Dashboard Cards**:
    - Price Lists: Active customer lists count
    - Quote Requests: Weekly requests count

---

### 11. **Admin (QV Team)**
- **Route ID**: `admin-sales`
- **Component**: `AdminView`
- **Location**: `src/components/MainContent.js`
- **Description**: Q-VENT team administration and analytics dashboard
- **Features**:
  - **Chat Usage Dashboard**:
    - Total Sessions (2,849 this month)
    - Avg Duration (12.3min per session)
    - Active Users (156 this week)
    - Success Rate (94.2% resolution)
  - **Period Filtering**: Last Week, Last Month, Last Quarter
  - **Search**: Search chat logs, users, or topics
  - **Management Sections**:
    - Manage users
    - Manage dealers
    - Manage products
    - Manage prices

---

## 🏛️ AGROB BUCHTAL Section Pages

### 12. **Terracotta Panels**
- **Route ID**: `keratwin`
- **Component**: `KeratwinView`
- **Location**: `src/components/MainContent.js`
- **Description**: AGROB BUCHTAL terracotta solutions exploration
- **Features**:
  - Terracotta panels information (placeholder for future implementation)

---

### 13. **My Prices (AB Distributors)**
- **Route ID**: `my-prices-agrob`
- **Component**: `MyPricesAgrobView`
- **Location**: `src/components/MainContent.js`
- **Description**: AGROB BUCHTAL distributor pricing
- **Features**:
  - AGROB BUCHTAL pricing interface (placeholder for future implementation)

---

### 14. **Admin (AB Team)**
- **Route ID**: `admin-ab`
- **Component**: `AdminAbView`
- **Location**: `src/components/MainContent.js`
- **Description**: AGROB BUCHTAL team administration
- **Features**:
  - AGROB BUCHTAL team admin interface (placeholder for future implementation)

---

## 🔄 Navigation Flow

### Quote Workflow
1. **New Chat** → Select "Get Quote" → **Get Project Quote**
2. **Get Project Quote** → Fill form → Submit → **Apple Quote** (results page)
3. Alternative: **Apple Calculator** → Fill form → Navigate to **Apple Quote**
4. Alternative: **Apple Draft** → Draft version of quote form

### Q-VENT Workflow
1. **New Chat** → Select "Q-VENT systems" → **Attachment Systems**
2. **Attachment Systems** → Browse/Select system
3. **My Prices (QV distr)** → View distributor pricing
4. **Our Prices (QV team)** → View internal pricing and margins
5. **Admin (QV team)** → Manage users, dealers, products, prices

---

## 📁 File Structure

```
src/
├── pages/
│   ├── GetProjectQuote.jsx    # Main quote form
│   ├── GetQuote2.jsx           # Alternative quote form
│   ├── Draft.jsx               # Draft quote form
│   └── Quote.jsx               # Quote results display
├── components/
│   ├── MainContent.js          # Contains all view components
│   └── Sidebar.js              # Navigation sidebar
└── context/
    └── QuoteContext.jsx        # Quote data state management
```

---

## 🎨 Design Consistency

All pages follow the design system defined in `DESIGN_SYSTEM.md`:
- **Typography**: Consistent font hierarchy (24px titles, 18px headers, 14px labels)
- **Spacing**: Compact spacing scale (8px, 16px, 24px)
- **Colors**: Monochrome grayscale palette
- **Components**: Standardized input fields, buttons, cards
- **Layout**: Responsive grid layouts with consistent padding

---

## 🔧 Technical Details

### State Management
- **Quote Data**: Managed via `QuoteContext` (React Context API)
- **Active Section**: Managed in `App.js` via `useState`
- **Form Data**: Local state in each page component

### Routing
- **Client-side routing**: Uses conditional rendering based on `activeSection` state
- **No React Router**: Simple state-based navigation
- **URLs**: Currently not reflected in browser URL (single-page app)

### Data Flow
1. User fills form in `GetProjectQuote` or `GetQuote2`
2. Data stored in `QuoteContext` via `setQuoteData`
3. Navigation to `Apple Quote` page
4. `Quote` component reads data from `QuoteContext` via `useQuote` hook

---

## 📝 Notes

- **AGROB BUCHTAL Section**: Currently has placeholder pages (not fully implemented)
- **My Projects**: Placeholder for future project management features
- **Print Functionality**: Apple Quote page has print-friendly styling
- **Mobile Responsive**: All pages support mobile layouts with collapsible sidebar
- **AI Assistant**: Available in quote forms (expandable panel)

---

*Last Updated: Based on current codebase structure*
