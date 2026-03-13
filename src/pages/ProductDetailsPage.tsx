import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  Loader2,
  Cpu,
  Zap,
  BatteryCharging,
  Camera,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useAddToCart } from "@/hooks/useAddToCart";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useProductDetails(id);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  // Derived State: avoid useEffect anti-pattern — auto-select when only 1 option.
  const [userSelectedColor, setUserSelectedColor] = useState<number | null>(
    null,
  );
  const [userSelectedStorage, setUserSelectedStorage] = useState<number | null>(
    null,
  );

  const selectedColor =
    userSelectedColor ??
    (product?.options?.colors?.length === 1
      ? product.options.colors[0].code
      : null);

  const selectedStorage =
    userSelectedStorage ??
    (product?.options?.storages?.length === 1
      ? product.options.storages[0].code
      : null);

  const handleAddToCart = () => {
    if (!id || selectedColor === null || selectedStorage === null) return;
    addToCart({ id, colorCode: selectedColor, storageCode: selectedStorage });
  };

  const isAddDisabled =
    selectedColor === null || selectedStorage === null || isAdding;

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center py-32">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Device not found</h2>
        <p className="text-slate-500">
          The mobile phone you are looking for doesn&apos;t exist or there was a
          network error.
        </p>
        <Link to="/" className="text-primary font-semibold hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  // Format array fields from API defensively
  const formatArrayField = (field: string | string[] | undefined) => {
    if (!field) return "—";
    return Array.isArray(field) ? field.join(", ") : field;
  };

  const formattedCameras =
    [
      product.primaryCamera
        ? `Main: ${formatArrayField(product.primaryCamera)}`
        : null,
      product.secondaryCmera
        ? `Front: ${formatArrayField(product.secondaryCmera)}`
        : null, // API typo secondaryCmera
    ]
      .filter(Boolean)
      .join(" | ") || "—";

  return (
    <div className="w-full pb-12 animate-in fade-in duration-500">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to list
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ──────────── Left: Gallery ──────────── */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center p-8">
            <img
              src={product.imgUrl}
              alt={`${product.brand} ${product.model}`}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            />
          </div>

          {/* Thumbnail strip (static UI — single image available from API) */}
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={`aspect-square rounded-xl overflow-hidden border-2 p-2 bg-white transition-all ${
                  i === 0
                    ? "border-primary"
                    : "border-transparent hover:border-slate-200"
                }`}
              >
                <img
                  src={product.imgUrl}
                  alt={`${product.brand} ${product.model} view ${i + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply opacity-70"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ──────────── Right: Info ──────────── */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              {product.brand}
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              {product.model}
            </h1>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-slate-900">
                {product.price ? `${product.price}€` : "—"}
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full mb-6" />

          {/* Specifications Grid */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
              Key Specifications
            </h3>
            <div className="flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-100 bg-white overflow-hidden">
              {[
                {
                  icon: <Cpu className="w-4 h-4" />,
                  label: "Processor",
                  value: product.cpu || "—",
                },
                {
                  icon: <Zap className="w-4 h-4" />,
                  label: "RAM",
                  value: product.ram || "—",
                },
                {
                  icon: <BatteryCharging className="w-4 h-4" />,
                  label: "Battery",
                  value: product.battery || "—",
                },
                {
                  icon: <Camera className="w-4 h-4" />,
                  label: "Camera",
                  value: formattedCameras,
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 px-4 py-3">
                  {/* Icon pill */}
                  <span className="mt-0.5 flex-shrink-0 text-primary bg-primary/10 p-1.5 rounded-lg">
                    {icon}
                  </span>

                  {/* Label + value — value can wrap freely */}
                  <div className="flex flex-1 items-baseline justify-between gap-4 flex-wrap">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest whitespace-nowrap">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 text-right leading-snug">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
              Select Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.options.colors.map((color) => {
                const isSelected = selectedColor === color.code;
                return (
                  <button
                    key={color.code}
                    onClick={() => setUserSelectedColor(color.code)}
                    className={`relative px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/50"
                    }`}
                  >
                    {color.name}
                    {isSelected && (
                      <Check className="absolute -top-2 -right-2 h-4 w-4 bg-primary text-white rounded-full p-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storage Selector */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
              Storage Capacity
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.options.storages.map((storage) => {
                const isSelected = selectedStorage === storage.code;
                return (
                  <button
                    key={storage.code}
                    onClick={() => setUserSelectedStorage(storage.code)}
                    className={`px-6 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-200 text-slate-600 hover:border-primary/50"
                    }`}
                  >
                    {storage.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Actions */}
          <div className="mt-auto space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isAddDisabled}
              className={`w-full py-5 text-white font-bold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                isAddDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-primary hover:bg-primary/90 shadow-primary/25"
              }`}
            >
              {isAdding ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 mt-6">
              {[
                { icon: <Truck className="w-4 h-4" />, label: "Free Delivery" },
                {
                  icon: <ShieldCheck className="w-4 h-4" />,
                  label: "2-Year Warranty",
                },
                {
                  icon: <RotateCcw className="w-4 h-4" />,
                  label: "30-Day Returns",
                },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-primary">{icon}</span>
                  <span className="text-xs font-medium text-slate-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Specifications Table */}
      <section className="mt-16 bg-white rounded-2xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          {[
            { label: "CPU", value: product.cpu },
            { label: "RAM", value: product.ram },
            { label: "OS", value: product.os },
            { label: "Display", value: product.displayResolution },
            { label: "Battery", value: product.battery },
            { label: "Cameras", value: formattedCameras },
            { label: "Dimensions", value: product.dimentions },
            {
              label: "Weight",
              value: product.weight ? `${product.weight}g` : null,
            },
          ]
            .filter(({ value }) => value)
            .map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between border-b border-slate-100 pb-3"
              >
                <span className="text-slate-500 font-medium">{label}</span>
                <span className="font-semibold text-slate-900 text-right max-w-[60%]">
                  {value}
                </span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
