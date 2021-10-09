import t from 'locales/use-translation';

export const LIMIT_TYPES = [
  {label: t('recurring_invoices.limit_types.date'), value: 'DATE'},
  {label: t('recurring_invoices.limit_types.count'), value: 'COUNT'}
];

export const frequencies = [
  {label: t('recurring_invoices.frequencies.every_minute'), value: '* * * * *'},
  {
    label: t('recurring_invoices.frequencies.every_30_minute'),
    value: '*/30 * * * *'
  },
  {label: t('recurring_invoices.frequencies.every_hour'), value: '0 * * * *'},
  {
    label: t('recurring_invoices.frequencies.every_2_hour'),
    value: '0 */2 * * *'
  },
  {
    label: t('recurring_invoices.frequencies.twice_a_day'),
    value: '0 13-15 * * *'
  },
  {label: t('recurring_invoices.frequencies.every_week'), value: '0 0 * * 0'},
  {
    label: t('recurring_invoices.frequencies.every_15_days'),
    value: '0 5 */15 * *'
  },
  {
    label: t('recurring_invoices.frequencies.first_day_of_month'),
    value: '0 0 1 * *'
  },
  {
    label: t('recurring_invoices.frequencies.every_6_month'),
    value: '0 0 1 */6 *'
  },
  {label: t('recurring_invoices.frequencies.every_year'), value: '0 0 1 1 *'}
];
