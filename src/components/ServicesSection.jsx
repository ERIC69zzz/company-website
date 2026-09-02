import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';

const serviceOrder = [0, 1, 3, 2];

export default function ServicesSection() {
  const { copy } = useLanguage();
  const content = copy.servicesSection;

  return (
    <section id="services" className="storage-services" aria-labelledby="services-title">
      <div className="storage-services__inner">
        <header className="storage-services__intro">
          <p className="storage-services__eyebrow">{content.badge}</p>
          <h2 id="services-title">{content.title}</h2>
          <p className="storage-services__description">{content.description}</p>
          <Link to="/consult" className="storage-button">
            {content.cta}
            <ArrowRight aria-hidden="true" />
          </Link>
        </header>

        <ol className="storage-services__list" role="list">
          {serviceOrder.map((serviceIndex, index) => {
            const service = copy.data.services[serviceIndex];
            return (
              <li key={serviceIndex} className="storage-services__item">
                <Link to="/consult" className="storage-services__link">
                  <span className="storage-services__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="storage-services__detail">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                  <ArrowRight className="storage-services__arrow" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
