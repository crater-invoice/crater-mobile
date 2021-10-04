import React from 'react';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each time-zone.
   */
  timezones?: Array<any>;
}

export const TimeZoneSelectModal = (props: IProps) => (
  <InternalPagination
    {...props}
    items={props?.timezones ?? []}
    displayName="key"
    label={t('settings.preferences.timeZone')}
    placeholder={t('settings.preferences.timeZonePlaceholder')}
    icon="clock"
    rightIcon="angle-right"
    searchFields={['key']}
    compareField="value"
    headerProps={{title: t('timeZones.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'timeZones'}}
    isRequired
  />
);
