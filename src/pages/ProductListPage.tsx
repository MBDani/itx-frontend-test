import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ui/ProductCard";

export const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        !searchTerm.trim() ||
        product.brand.toLowerCase().includes(lowerSearch) ||
        product.model.toLowerCase().includes(lowerSearch)
      );
    });
  }, [products, searchTerm]);

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Hero Section */}
      <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Smartphones
          </h1>
          <p className="text-lg font-medium text-slate-500">
            {isLoading
              ? "Loading..."
              : `${filteredProducts.length} premium devices available`}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="group relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
            <input
              type="text"
              id="product-search"
              className="w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-12 pr-4 text-base font-medium shadow-sm outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 placeholder:text-slate-400"
              placeholder="Search for your next phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 text-center animate-in fade-in">
          <p className="font-semibold text-lg">Failed to load products.</p>
          <p className="text-sm mt-2 opacity-80">
            Check your internet connection or try again later.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-in fade-in duration-500">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              <Search className="h-10 w-10 mx-auto text-slate-300 mb-4" />
              <p className="text-lg">
                No smartphones found matching{" "}
                <span className="font-semibold text-slate-900">
                  &ldquo;{searchTerm}&rdquo;
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
