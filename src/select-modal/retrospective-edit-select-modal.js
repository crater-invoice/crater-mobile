import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each retrospective-edit.
   */
  retrospectiveEdits?: Array<any>;
}

export const RetrospectiveEditSelectModal = (props: IProps) => (
  <SelectField
    {...props}
    items={props?.retrospectiveEdits ?? []}
    displayName="key"
    label={t('settings.preferences.retrospective_edits')}
    icon="calendar-alt"
    rightIcon="angle-right"
    placeholder={t('settings.preferences.retrospective_edits')}
    searchFields={['key']}
    compareField="value"
    headerProps={{title: t('retrospective_edits.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'retrospective_edits'}}
    isInternalSearch
    isRequired
  />
);
