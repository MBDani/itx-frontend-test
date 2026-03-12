# ITX Frontend Test - Mobile Shop

A modern Single Page Application (SPA) built to browse and purchase mobile phones, developed as a technical assessment.

## 🚀 Tech Stack

This project was bootstrapped with [Vite](https://vitejs.dev/) to provide an exceptionally fast and modern development experience without the overhead of Create React App.

- **Core**: React 18, TypeScript, Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 (native integration) + Lucide React (Icons)
- **Data Fetching & Caching**: TanStack Query (React Query v5)
- **Global State**: Zustand (for a lightweight Cart implementation)
- **Testing**: Vitest + React Testing Library

## 🎯 Key Architectural Decisions

1. **Client-Side Caching Strategy (Critical Requirement):**
   - The test specifies exactly a 1-hour expiration cache for `GET` requests.
   - TanStack Query is configured with `staleTime` and `gcTime` set to 3600000ms (1 hour). We utilize its official persister plugin hooking into `localStorage` to ensure the cache survives page reloads and browser sessions, avoiding redundant API calls.
2. **State Management (Cart):**
   - **Zustand** was chosen over Redux Context to manage the Shopping Cart. It provides a tiny footprint, zero boilerplate, and allows ultra-simple hooks. It's connected to `localStorage` to persist the cart items count across visits.
3. **No SSR/MPA:**
   - Adhering strictly to the "No SSR" constraint, frameworks like Next.js were deliberately avoided in favor of a pure Vite SPA.
4. **Tailwind CSS v4:**
   - Used for zero-runtime performance stylesheets, enabling consistent and scalable rapid UI development.

## 🛠️ Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (v18+ recommended).

## 🏁 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd itx-frontend-test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application (Development mode):**
   ```bash
   npm run start
   ```
   > The application will be running at `http://localhost:5173`.

## 📜 Available Scripts

According to the technical requirements, the following scripts are strictly configured:

- `npm run start` - Starts the development server.
- `npm run build` - Builds the app for production.
- `npm run test` - Runs the unit and integration test suites using Vitest.
- `npm run lint` - Runs ESLint to check for code quality and formatting issues.

*(Additional scripts: `npm run format` (Prettier) and `npm run test:watch` are available for development convenience).*

## 📂 Project Structure

A clean, feature-driven architecture approach:

```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared components
│   ├── layout/      # Structural UI (Header, Breadcrumbs, Layout)
│   └── ui/          # Dumb/Reusable UI components (Buttons, Cards)
├── hooks/           # Reusable custom React hooks
├── pages/           # Smart components / Feature Views (PLP, PDP)
├── services/        # API configurations, fetchers and data layer
├── store/           # Global state management (Zustand stores)
├── types/           # Global TypeScript interfaces & types
└── utils/           # Pure, stateless helper functions
```
