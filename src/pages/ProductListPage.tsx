import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ui/ProductCard";

export const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchTerm.trim()) return products;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return products.filter((product) => {
      const brandMatch = product.brand.toLowerCase().includes(lowerCaseSearch);
      const modelMatch = product.model.toLowerCase().includes(lowerCaseSearch);
      return brandMatch || modelMatch;
    });
  }, [products, searchTerm]);

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Header section of the PLP */}
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Smartphones
          </h1>
          <p className="text-gray-500 mt-1">
            {filteredProducts.length} devices available
          </p>
        </div>

        {/* Real-time Search Input */}
        <div className="relative w-full sm:w-72 md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            placeholder="Search by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading Skeleton Space */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

      {/* Grid: Responsive setup complying with "Maximum 4 items per row" (lg:grid-cols-4) */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              <Search className="h-10 w-10 mx-auto text-gray-300 mb-4" />
              <p className="text-lg">
                No smartphones found matching{" "}
                <span className="font-semibold text-gray-900">
                  "{searchTerm}"
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
