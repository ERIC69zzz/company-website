import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import StorageVisual from './StorageVisual';

const scenarios = [
  { key: 'home', visual: 'nas', href: '/products?category=nas' },
  { key: 'creator', visual: 'ssd', href: '/products?category=ssd' },
  { key: 'team', visual: 'nas', href: '/products?category=nas' },
  { key: 'enterprise', visual: 'enterprise', href: '/enterprise' },
];

export default function ScenarioSection() {
  const { copy } = useLanguage();
  const [activeKey, setActiveKey] = useState(scenarios[0].key);
  const s = copy.business.scenarios;
  const active = scenarios.find((item) => item.key === activeKey);
  const content = s.items[active.key];

  return (
    <section id="scenarios" className="scenario-selector" aria-labelledby="scenario-title">
      <div className="scenario-selector__inner">
        <header className="scenario-selector__heading">
          <h2 id="scenario-title">{s.title}</h2>
          <p>{s.description}</p>
        </header>

        <div className="scenario-selector__tabs" role="group" aria-label={s.tabLabel}>
          {scenarios.map((scenario) => {
            const selected = scenario.key === activeKey;
            return (
              <button
                key={scenario.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveKey(scenario.key)}
                className={selected ? 'is-active' : undefined}
              >
                {s.items[scenario.key].label}
              </button>
            );
          })}
        </div>

        <div className="scenario-selector__panel" aria-live="polite">
          <div key={`copy-${active.key}`} className="scenario-selector__copy">
            <h3>{content.title}</h3>
            <p className="scenario-selector__summary">{content.description}</p>
            <p className="scenario-selector__recommendations">
              <span>{s.recommended}</span>
              <strong>{content.products.join(' · ')}</strong>
            </p>
            <Link to={active.href} className="storage-text-link">
              {content.cta || s.cta}<ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div key={`visual-${active.key}`} className="scenario-selector__visual" aria-hidden="true">
            <StorageVisual kind={active.visual} />
          </div>
        </div>
      </div>
    </section>
  );
}
