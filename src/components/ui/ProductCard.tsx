import { Link } from "react-router-dom";
import type { ApiProduct } from "@/types";

interface ProductCardProps {
  product: ApiProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] bg-gray-50 p-6 flex items-center justify-center overflow-hidden">
        <img
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 will-change-transform mix-blend-multiply"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {product.model}
          </h3>
          <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
            {product.price ? `${product.price}€` : "-"}
          </span>
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mt-auto">
          {product.brand}
        </p>
      </div>
    </Link>
  );
};
