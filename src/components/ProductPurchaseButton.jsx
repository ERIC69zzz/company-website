import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../i18n/language';

export default function ProductPurchaseButton({ href }) {
  const { copy } = useLanguage();
  const { buy, buyHint } = copy.productDetail;

  return (
    <a
      href={href}
      className="storage-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${buy} · ${buyHint}`}
    >
      <ShoppingCart aria-hidden="true" />{buy}<ExternalLink aria-hidden="true" />
    </a>
  );
}
