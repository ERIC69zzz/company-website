import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { useLanguage } from '../i18n/language';

export default function ProductImage({
  product,
  className = '',
  imageClassName = 'w-full h-full object-cover',
  fallbackIconClassName = 'w-10 h-10 mb-2',
  showBrandBadge = false,
}) {
  const [imgError, setImgError] = useState(false);
  const { copy } = useLanguage();
  const showImage = product.image && !imgError;

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
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-700 text-ink-3 p-4 text-center">
          <ImageOff className={`${fallbackIconClassName} text-ink-3`} />
          <span className="text-xs text-brand-700">{product.brand}</span>
          <span className="text-sm font-medium text-ink-2 mt-1">{product.name}</span>
          <span className="text-[10px] text-ink-3 mt-2">{copy.common.imagePending}</span>
        </div>
      )}

      {showBrandBadge && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-surface/80 backdrop-blur text-xs text-ink-2 border border-line">
          {product.brand}
        </div>
      )}
    </div>
  );
}
