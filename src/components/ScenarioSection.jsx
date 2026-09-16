import { useId, useRef, useState } from 'react';
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
  const baseId = useId();
  const tabRefs = useRef({});
  const s = copy.business.scenarios;
  const active = scenarios.find((item) => item.key === activeKey);
  const content = s.items[active.key];
  const tabId = (key) => `${baseId}-tab-${key}`;
  const panelId = `${baseId}-panel`;

  // tablist 承诺了方向键切换，光有 role 不实现键盘操作反而比普通按钮更糟
  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    const jump = { Home: 0, End: scenarios.length - 1 }[event.key];
    if (step === undefined && jump === undefined) return;

    event.preventDefault();
    const current = scenarios.findIndex((item) => item.key === activeKey);
    const next = step === undefined
      ? jump
      : (current + step + scenarios.length) % scenarios.length;
    const nextKey = scenarios[next].key;
    setActiveKey(nextKey);
    tabRefs.current[nextKey]?.focus();
  };

  return (
    <section id="scenarios" className="scenario-selector" aria-labelledby="scenario-title">
      <div className="scenario-selector__inner">
        <header className="scenario-selector__heading">
          <h2 id="scenario-title">{s.title}</h2>
          <p>{s.description}</p>
        </header>

        <div
          className="scenario-selector__tabs"
          role="tablist"
          aria-label={s.tabLabel}
          onKeyDown={handleKeyDown}
        >
          {scenarios.map((scenario) => {
            const selected = scenario.key === activeKey;
            return (
              <button
                key={scenario.key}
                ref={(node) => { tabRefs.current[scenario.key] = node; }}
                type="button"
                role="tab"
                id={tabId(scenario.key)}
                aria-selected={selected}
                aria-controls={panelId}
                // 未选中的标签退出 Tab 序列，由方向键在标签之间移动
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveKey(scenario.key)}
                className={selected ? 'is-active' : undefined}
              >
                {s.items[scenario.key].label}
              </button>
            );
          })}
        </div>

        {/* tabpanel 的选中状态本身就会被读出，不需要再套 aria-live
            把整块内容重复朗读一遍 */}
        <div
          className="scenario-selector__panel"
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active.key)}
          tabIndex={-1}
        >
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
