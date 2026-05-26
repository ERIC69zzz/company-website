import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function ProductImage({
  product,
  className = '',
  imageClassName = 'w-full h-full object-cover',
  fallbackIconClassName = 'w-10 h-10 mb-2',
  showBrandBadge = false,
}) {
  const [imgError, setImgError] = useState(false);
  const useProductImages = import.meta.env.VITE_USE_PRODUCT_IMAGES === 'true';
  const showImage = useProductImages && product.image && !imgError;

  return (
    <div className={className}>
      {showImage ? (
        <img
          src={product.image}
          alt={product.name}
          className={imageClassName}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-700 text-zinc-500 p-4 text-center">
          <ImageOff className={`${fallbackIconClassName} text-zinc-600`} />
          <span className="text-xs text-brand-300">{product.brand}</span>
          <span className="text-sm font-medium text-zinc-300 mt-1">{product.name}</span>
          <span className="text-[10px] text-zinc-600 mt-2">图片待更新</span>
        </div>
      )}

      {showBrandBadge && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-dark-900/80 backdrop-blur text-xs text-zinc-300 border border-white/5">
          {product.brand}
        </div>
      )}
    </div>
  );
}
