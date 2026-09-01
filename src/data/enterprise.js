// Series-level information from the supplied Exascend introduction, pp. 18–19.
// Do not treat these as individual purchasable SKUs or guaranteed inventory.
export const enterpriseSeries = [
  { id: 'SE4', copyKey: 'se4', interface: 'SATA', formFactors: '2.5″ / mSATA / M.2' },
  { id: 'PE4', copyKey: 'pe4', interface: 'PCIe Gen4', formFactors: 'U.2 / E1.S / M.2' },
];

export function enterpriseInquiryUrl(series) {
  const params = new URLSearchParams({ topic: 'enterprise' });
  if (enterpriseSeries.some((item) => item.id === series)) params.set('series', series);
  return `/consult?${params}`;
}

export function getEnterpriseInquiry(searchParams, template) {
  if (searchParams.get('topic') !== 'enterprise') return null;
  const series = enterpriseSeries.find((item) => item.id === searchParams.get('series'));
  return {
    type: '方案定制',
    content: template.replace('{series}', series ? `Exascend ${series.id} ` : ''),
  };
}
