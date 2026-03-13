import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import clsx from "clsx";
import { useProductDetails } from "@/hooks/useProductDetails";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isProductRoute = pathnames[0] === "product" && pathnames.length === 2;
  const productId = isProductRoute ? pathnames[1] : undefined;

  const { data: product } = useProductDetails(productId);

  if (pathnames.length === 0) return null;

  return (
    <nav
      className="w-full bg-white border-b border-slate-200 mb-6"
      aria-label="Breadcrumb"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          <li className="flex items-center text-slate-400">
            <ChevronRight className="w-4 h-4" />
          </li>

          {isProductRoute ? (
            <>
              <li>
                <Link
                  to="/"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  Smartphones
                </Link>
              </li>
              <li className="flex items-center text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                <span
                  className={clsx(
                    "text-primary font-semibold animate-in fade-in slide-in-from-left-2",
                  )}
                  aria-current="page"
                >
                  {product ? `${product.brand} ${product.model}` : "Loading..."}
                </span>
              </li>
            </>
          ) : (
            pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const formattedValue =
                value.charAt(0).toUpperCase() + value.slice(1);

              return (
                <li key={to} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                  {isLast ? (
                    <span
                      className="text-primary font-semibold"
                      aria-current="page"
                    >
                      {formattedValue}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="text-slate-500 hover:text-primary transition-colors"
                    >
                      {formattedValue}
                    </Link>
                  )}
                </li>
              );
            })
          )}
        </ol>
      </div>
    </nav>
  );
};
