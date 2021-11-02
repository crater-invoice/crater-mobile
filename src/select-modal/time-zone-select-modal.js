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
    label={t('settings.preferences.time_zone')}
    placeholder={t('settings.preferences.time_zone_placeholder')}
    icon="clock"
    rightIcon="angle-right"
    searchFields={['key']}
    compareField="value"
    headerProps={{title: t('time_zones.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'time_zones'}}
    isRequired
  />
);
