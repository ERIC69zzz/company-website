import { useState } from 'react';
import { ArrowRight, Building2, House, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import StorageVisual from './StorageVisual';

const scenarios = [
  { key: 'home', icon: House, visual: 'nas', href: '/products?category=nas' },
  { key: 'creator', icon: Palette, visual: 'ssd', href: '/products?category=ssd' },
  { key: 'team', icon: Users, visual: 'nas', href: '/products?category=nas' },
  { key: 'enterprise', icon: Building2, visual: 'enterprise', href: '/enterprise' },
];

export default function ScenarioSection() {
  const { copy } = useLanguage();
  const [activeKey, setActiveKey] = useState(scenarios[0].key);
  const s = copy.business.scenarios;
  const activeIndex = scenarios.findIndex((item) => item.key === activeKey);
  const active = scenarios[activeIndex];
  const content = s.items[active.key];

  return (
    <section className="scenario-selector" aria-labelledby="scenario-title">
      <div className="scenario-selector__inner">
        <header className="scenario-selector__heading">
          <p>{s.eyebrow}</p>
          <h2 id="scenario-title">{s.title}</h2>
          <span>{s.description}</span>
        </header>

        <div className="scenario-selector__tabs" aria-label={s.tabLabel}>
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const selected = scenario.key === activeKey;
            return (
              <button
                key={scenario.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveKey(scenario.key)}
                className={selected ? 'is-active' : undefined}
              >
                <span className="scenario-selector__tab-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <strong>{s.items[scenario.key].label}</strong>
              </button>
            );
          })}
        </div>

        <div className="scenario-selector__panel" aria-live="polite">
          <div key={`copy-${active.key}`} className="scenario-selector__copy">
            <p className="scenario-selector__current">0{activeIndex + 1} / 04 · {content.label}</p>
            <h3>{content.title}</h3>
            <p className="scenario-selector__summary">{content.description}</p>
            <ul>
              {content.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className="scenario-selector__recommendations">
              <span>{s.recommended}</span>
              {content.products.map((product) => <strong key={product}>{product}</strong>)}
            </div>
            <Link to={active.href} className="storage-text-link">
              {content.cta || s.cta}<ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div key={`visual-${active.key}`} className="scenario-selector__visual" aria-hidden="true">
            <div className="scenario-selector__visual-grid" />
            <span className="scenario-selector__status">{s.status}</span>
            <StorageVisual kind={active.visual} />
            <div className="scenario-selector__signal scenario-selector__signal--one" />
            <div className="scenario-selector__signal scenario-selector__signal--two" />
            <p>{content.visualCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
