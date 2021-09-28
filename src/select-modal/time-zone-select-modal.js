import React from 'react';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each time-zone.
   */
  timezone?: Array;
}

export const TimeZoneSelectModal = (props: IProps) => {
  const {timezone} = props;
  return (
    <InternalPagination
      {...props}
      items={timezone ?? []}
      displayName="key"
      label={t('settings.preferences.timeZone')}
      icon="clock"
      rightIcon="angle-right"
      searchFields={['key']}
      compareField="value"
      headerProps={{
        title: t('timeZones.title'),
        rightIconPress: null
      }}
      emptyContentProps={{
        contentType: 'timeZones'
      }}
      isRequired
    />
  );
};
