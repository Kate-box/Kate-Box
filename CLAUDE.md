# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Uses Vite to serve the app with hot reload
- **Build for production**: `npm run build` - Creates optimized production build
- **Preview production build**: `npm run preview` - Serves the production build locally
- **Lint code**: `npm run lint` - Runs ESLint on TypeScript and TSX files

## Project Architecture

This is a React + TypeScript application built with Vite, focused on HR/people strategy ROI calculations.

### Core Architecture
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom gradients and responsive design
- **Icons**: Lucide React for consistent iconography
- **State Management**: Local React state (useState) for calculator inputs and results

### Application Structure
The app follows a component-based architecture with a single-page layout:

1. **Main App Component** (`src/App.tsx`): Simple layout with header, hero, calculator grid, results dashboard, and footer
2. **Calculator System** (`src/components/CalculatorGrid.tsx`): 
   - Manages 6 different HR/finance calculators
   - Uses state to track active calculator and results
   - Each calculator is a separate component with its own logic
3. **Individual Calculators** (`src/components/calculators/`):
   - Self-contained components with input validation
   - Use useEffect to auto-calculate results when inputs change
   - Call parent callback (`onResultUpdate`) to update global results state

### Key Design Patterns
- **Calculator Pattern**: Each calculator component accepts `onResultUpdate` callback and manages its own input state
- **Result Aggregation**: Results from individual calculators are collected in CalculatorGrid and displayed in ResultsDashboard
- **Responsive Design**: Uses Tailwind's responsive classes (md:, lg:) for mobile-first design
- **Gradient Theming**: Each calculator has a unique color gradient theme for visual distinction

### Component Categories
- **Layout Components**: Header, Footer, Hero - provide structure and branding
- **Interactive Components**: Calculator components with real-time calculations
- **Display Components**: ResultsDashboard shows aggregated results with charts and insights
- **Content Components**: About, Programs, Testimonials, etc. - static informational content

The application is designed for HR professionals to calculate financial impact of people-related issues (turnover, engagement, communication, etc.) and present business cases for HR initiatives.