import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { ApiProduct } from "@/types";

interface ProductCardProps {
  product: ApiProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-50 p-8 flex items-center justify-center">
        <img
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-2 pb-2">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {product.brand}
        </span>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {product.model}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-black text-primary">
            {product.price ? `${product.price}€` : "—"}
          </span>
          <div className="rounded-full bg-slate-100 p-2 text-slate-600 group-hover:bg-primary group-hover:text-white transition-all duration-200">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
