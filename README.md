# Maze | Luxury Activewear & Performance Gear

Maze is a premium headless e-commerce storefront built with modern technologies, delivering a high-performance shopping experience for luxury activewear.

## Technologies

- **Frontend**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Commerce**: Storefront API (Powered by Shopify)
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd maze
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   VITE_STORE_DOMAIN=your-store.myshopify.com
   VITE_STORE_TOKEN=your-storefront-access-token
   ```

4. Run the development server:
   ```sh
   npm run dev
   ```

## Project Structure

- `src/api`: API integration and queries.
- `src/components`: Reusable UI components.
- `src/hooks`: Custom React hooks for data fetching and logic.
- `src/lib`: Core libraries and configurations.
- `src/pages`: Main application pages.
- `src/store`: Global state management.

## License

All rights reserved. Maze Brand.
