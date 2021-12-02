import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {fontSizes} from '@/styles';

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
    displayName={'title'}
    label={t('settings.preferences.retrospective_edits')}
    icon="calendar-alt"
    rightIcon="angle-right"
    placeholder={t('settings.preferences.retrospective_edits')}
    searchFields={['title']}
    compareField="title"
    headerProps={{title: t('retrospective_edits.title'), rightIconPress: null}}
    emptyContentProps={{contentType: 'retrospective_edits'}}
    listViewProps={{leftTitleStyle: {fontSize: fontSizes.h4}}}
    isInternalSearch
    isRequired
  />
);
