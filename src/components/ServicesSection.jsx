import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import { consultUrl } from '../data/consult';

// 展示顺序，以及每项在 copy.data.services 里的下标和带进咨询表单的主题。
const serviceEntries = [
  { index: 0, topic: 'solution' },
  { index: 1, topic: 'onsite' },
  { index: 3, topic: 'migration' },
  { index: 2, topic: 'support' },
];

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
          {serviceEntries.map(({ index: serviceIndex, topic }, index) => {
            const service = copy.data.services[serviceIndex];
            return (
              <li key={topic} className="storage-services__item">
                <Link to={consultUrl(topic)} className="storage-services__link">
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
