import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each company.
   */
  companies?: Array<any>;

  /**
   * An array of objects with data for each selected company.
   */
  multiSelectedItems?: Array<any>;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}

export const CompanySelectModal = (props: IProps) => {
  const {companies, disabled = false, multiSelectedItems} = props;
  return (
    <SelectField
      input={{value: null}}
      isInternalSearch
      {...props}
      items={companies ?? []}
      multiSelectedItems={multiSelectedItems}
      searchFields={['name']}
      isMultiSelect
      concurrentMultiSelect
      onlyPlaceholder
      compareField="id"
      valueCompareField="id"
      isRequired
      headerProps={{title: t('header.companies'), rightIconPress: null}}
      emptyContentProps={{contentType: 'companies'}}
      displayName="name"
      listViewProps={{contentContainerStyle: {flex: 2}}}
      isEditable={!disabled}
      baseSelectProps={{
        disabled,
        label: t('header.companies')
      }}
    />
  );
};
