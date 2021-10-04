import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each date-format.
   */
  dateFormats?: Array<any>;
}

export const DateFormatSelectModal = (props: IProps) => (
  <SelectField
    {...props}
    items={props?.dateFormats ?? []}
    displayName="display_date"
    label={t('settings.preferences.dateFormat')}
    icon="calendar-alt"
    rightIcon="angle-right"
    placeholder={t('settings.preferences.dateFormatPlaceholder')}
    searchFields={['display_date']}
    compareField="moment_format_value"
    headerProps={{title: t('dateFormats.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'dateFormats'}}
    isRequired
    isInternalSearch
  />
);
