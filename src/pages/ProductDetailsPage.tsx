import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, ShoppingCart, Loader2 } from "lucide-react";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useAddToCart } from "@/hooks/useAddToCart";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useProductDetails(id);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  // Derived State: We avoid using useEffect to set default values, which is an anti-pattern in React 18+.
  // If the user hasn't selected manually, and there's only 1 option, we select it by default.
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
      <div className="flex-1 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Device not found</h2>
        <p className="text-gray-500">
          The mobile phone you are looking for doesn't exist or there was a
          network error.
        </p>
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  // Format array fields from API defensively
  const formatArrayField = (field: string | string[] | undefined) => {
    if (!field) return "-";
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
      .join(" | ") || "-";

  return (
    <div className="w-full pb-12 animate-in fade-in duration-500">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to list
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-12">
          {/* Left Column: Image */}
          <div className="relative p-8 md:p-12 lg:p-16 flex items-center justify-center bg-gray-50/50">
            <img
              src={product.imgUrl}
              alt={`${product.brand} ${product.model}`}
              className="max-w-full h-auto max-h-[500px] object-contain drop-shadow-2xl mix-blend-multiply"
            />
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-8 md:p-12 lg:pr-16 flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-1 mb-2">
                {product.model}
              </h1>
              <p className="text-2xl font-medium text-gray-900">
                {product.price ? `${product.price}€` : "-"}
              </p>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* Specifications */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Technical Specifications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-8">
              <li className="flex flex-col">
                <span className="text-gray-500">CPU</span>{" "}
                <span className="font-medium text-gray-900">
                  {product.cpu || "-"}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">RAM</span>{" "}
                <span className="font-medium text-gray-900">
                  {product.ram || "-"}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">OS</span>{" "}
                <span className="font-medium text-gray-900">
                  {product.os || "-"}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">Resolution</span>{" "}
                <span className="font-medium text-gray-900">
                  {product.displayResolution || "-"}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">Battery</span>{" "}
                <span className="font-medium text-gray-900">
                  {product.battery || "-"}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">Cameras</span>{" "}
                <span className="font-medium text-gray-900 text-xs mt-0.5">
                  {formattedCameras}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">Dimensions</span>{" "}
                <span className="font-medium text-gray-900 text-xs mt-0.5">
                  {product.dimentions || "-"}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500">Weight</span>{" "}
                <span className="font-medium text-gray-900">
                  {product.weight ? `${product.weight}g` : "-"}
                </span>
              </li>
            </ul>

            {/* Actions (Selectors) */}
            <div className="mt-auto space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              {/* Storage Selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-3">
                  Storage Capacity
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.options.storages.map((storage) => {
                    const isSelected = selectedStorage === storage.code;
                    return (
                      <button
                        key={storage.code}
                        onClick={() => setUserSelectedStorage(storage.code)}
                        className={`relative px-4 py-2 text-sm font-medium rounded-xl border transition-all ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {storage.name}
                        {isSelected && (
                          <Check className="absolute -top-2 -right-2 h-4 w-4 bg-blue-600 text-white rounded-full p-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-3">
                  Color
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.options.colors.map((color) => {
                    const isSelected = selectedColor === color.code;
                    return (
                      <button
                        key={color.code}
                        onClick={() => setUserSelectedColor(color.code)}
                        className={`relative px-4 py-2 text-sm font-medium rounded-xl border transition-all ${
                          isSelected
                            ? "border-gray-900 bg-gray-900 text-white shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {color.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Cart Action */}
              <button
                onClick={handleAddToCart}
                disabled={isAddDisabled}
                className={`w-full flex items-center justify-center gap-2 py-4 px-8 mt-4 rounded-xl text-base font-semibold shadow-sm transition-all duration-300 ${
                  isAddDisabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {isAdding ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
