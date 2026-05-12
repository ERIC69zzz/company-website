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

  return (
    <div className={className}>
      {!imgError ? (
        <img
          src={product.image}
          alt={product.name}
          className={imageClassName}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-dark-800 text-zinc-600">
          <ImageOff className={fallbackIconClassName} />
          <span className="text-xs">{product.brand}</span>
          <span className="text-sm font-medium mt-1">{product.name}</span>
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
