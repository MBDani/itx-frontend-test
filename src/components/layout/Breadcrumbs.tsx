import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import clsx from 'clsx';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we are at root (PLP), don't show complex breadcrumbs
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-sm font-medium text-gray-500 mb-6 py-2 pb-4 border-b border-gray-200/50">
      <Link
        to="/"
        className="flex items-center hover:text-blue-600 transition-colors duration-200"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={to} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            {isLast ? (
              <span
                className={clsx(
                  "text-gray-900 font-semibold tracking-tight transition-all",
                  "animate-in fade-in slide-in-from-left-2"
                )}
                aria-current="page"
              >
                {formattedValue}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {formattedValue}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
