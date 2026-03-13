import { Link } from "react-router-dom";
import { Smartphone, Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export const Header = () => {
  const cartCount = useCartStore((state: { count: number }) => state.count);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Smartphone className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              MobiStore
            </span>
          </Link>
        </div>

        {/* Right: Search + Cart */}
        <div className="flex items-center gap-4">
          {/* Search icon (mobile) */}
          <button
            className="sm:hidden flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-primary/10 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart with badge */}
          <div className="relative">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-primary/20 transition-colors cursor-default"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-background-light">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
