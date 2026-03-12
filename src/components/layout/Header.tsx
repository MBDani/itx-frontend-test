import { Link } from 'react-router-dom';
import { ShoppingBag, Smartphone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export const Header = () => {
  const cartCount = useCartStore((state) => state.count);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Home Link */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg rounded-tl-none rounded-bl-none p-1"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 group-active:scale-95">
              <Smartphone className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              MobiStore
            </span>
          </Link>

          {/* Cart Status */}
          <div className="flex items-center">
            <div className="relative flex items-center gap-2 px-3 py-2 bg-gray-100/80 rounded-full border border-gray-200/50 hover:bg-gray-200/80 transition-colors cursor-default">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-semibold text-gray-900 tabular-nums">
                {cartCount}
              </span>
              
              {/* Badge dot if cart has items */}
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};
