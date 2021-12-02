import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each fiscal-year.
   */
  fiscalYears?: Array<any>;
}

export const FiscalYearSelectModal = (props: IProps) => (
  <SelectField
    {...props}
    items={props?.fiscalYears ?? []}
    displayName="key"
    label={t('settings.preferences.fiscal_year')}
    icon="calendar-alt"
    rightIcon="angle-right"
    placeholder={t('settings.preferences.fiscal_year_placeholder')}
    searchFields={['key']}
    compareField="value"
    headerProps={{title: t('fiscal_years.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'fiscal_years'}}
    isInternalSearch
    isRequired
  />
);
