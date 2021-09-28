import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each retrospective-edit.
   */
  retrospectiveEditsList?: Array;
}

export const RetrospectiveEditSelectModal = (props: IProps) => {
  const {retrospectiveEditsList} = props;
  return (
    <SelectField
      {...props}
      items={retrospectiveEditsList ?? []}
      displayName="key"
      label={t('settings.preferences.retrospectiveEdits')}
      icon="calendar-alt"
      rightIcon="angle-right"
      placeholder={t('settings.preferences.retrospectiveEdits')}
      searchFields={['key']}
      compareField="value"
      headerProps={{
        title: t('retrospectiveEdits.title'),
        rightIconPress: null
      }}
      emptyContentProps={{
        contentType: 'retrospectiveEdits'
      }}
      isInternalSearch
      isRequired
    />
  );
};
