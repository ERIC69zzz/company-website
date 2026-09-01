import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import { enterpriseInquiryUrl, enterpriseSeries } from '../data/enterprise';
import StorageVisual from '../components/StorageVisual';

export default function EnterprisePage() {
  const { copy } = useLanguage();
  const e = copy.business.enterprise;

  return (
    <main className="enterprise-page">
      <section className="enterprise-hero" aria-labelledby="enterprise-title">
        <div className="enterprise-container enterprise-hero__layout">
          <div>
            <p className="enterprise-eyebrow">{e.eyebrow}</p>
            <h1 id="enterprise-title">{e.title}</h1>
            <p className="enterprise-hero__description">{e.description}</p>
            <div className="enterprise-hero__actions">
              <Link to={enterpriseInquiryUrl()} className="storage-button">{e.inquiry}<ArrowRight aria-hidden="true" /></Link>
              <a href="#enterprise-series" className="storage-text-link">{e.browse}<ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="enterprise-hero__visual">
            <StorageVisual kind="enterprise" />
            <p>{e.partner}</p>
          </div>
        </div>
      </section>

      <section id="enterprise-series" className="enterprise-container enterprise-series" aria-labelledby="enterprise-series-title">
        <h2 id="enterprise-series-title">{e.seriesTitle}</h2>
        <p className="enterprise-series__intro">{e.seriesIntro}</p>
        <div className="enterprise-series__grid">
          {enterpriseSeries.map((series) => (
            <article key={series.id} className="enterprise-series__card">
              <p className="enterprise-series__code" lang="en">{series.id}</p>
              <h3>{e[series.copyKey]}</h3>
              <p className="enterprise-series__description">{e[`${series.copyKey}Desc`]}</p>
              <dl>
                <div><dt>{e.interface}</dt><dd>{series.interface}</dd></div>
                <div><dt>{e.formFactors}</dt><dd>{series.formFactors}</dd></div>
              </dl>
              <Link to={enterpriseInquiryUrl(series.id)} className="storage-text-link" aria-label={`${series.id} · ${e.askSeries}`}>
                {e.askSeries}<ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className="enterprise-series__note">{e.specNote}</p>
      </section>

      <section className="enterprise-container enterprise-process" aria-labelledby="enterprise-process-title">
        <h2 id="enterprise-process-title">{e.processTitle}</h2>
        <ol className="enterprise-process__steps">
          {e.steps.map((step, index) => (
            <li key={step.title} className="enterprise-process__step">
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="enterprise-container">
        <section className="enterprise-cta" aria-labelledby="enterprise-cta-title">
          <div>
            <h2 id="enterprise-cta-title">{e.ctaTitle}</h2>
            <p>{e.ctaDescription}</p>
          </div>
          <Link to={enterpriseInquiryUrl()} className="storage-button">{e.inquiry}<ArrowRight aria-hidden="true" /></Link>
        </section>
        <div className="enterprise-personal-link">
          <span>{e.personalHint}</span>
          <Link to="/products" className="storage-text-link">{e.personalLink}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
