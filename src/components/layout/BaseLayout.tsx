import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';

export const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <Breadcrumbs />
        
        <div className="flex-1 flex flex-col w-full h-full animate-in fade-in duration-500">
          <Outlet />
          {/* Dynamic routes injection (PLP / PDP) */}
        </div>
      </main>
      
      {/* Minimalist footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>© {new Date().getFullYear()} MobiStore - ITX Tech Test</p>
      </footer>
    </div>
  );
};
