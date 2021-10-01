import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each language.
   */
  languages?: Array<any>;
}

export const LanguageSelectModal = (props: IProps) => (
  <SelectField
    {...props}
    items={props?.languages ?? []}
    label={t('settings.preferences.language')}
    icon="language"
    rightIcon="angle-right"
    displayName="name"
    searchFields={['name']}
    compareField="code"
    isInternalSearch
    placeholder={t('settings.preferences.languagePlaceholder')}
    headerProps={{title: t('languages.title'), rightIconPress: null}}
    listViewProps={{hasAvatar: true}}
    emptyContentProps={{contentType: 'languages'}}
    fakeInputProps={{
      valueStyle: {paddingLeft: 47},
      placeholderStyle: {paddingLeft: 47}
    }}
  />
);
