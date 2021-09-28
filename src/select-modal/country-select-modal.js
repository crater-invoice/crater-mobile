import React from 'react';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each country.
   */
  countries?: Array;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;
}

export const CountrySelectModal = (props: IProps) => {
  const {countries, disabled} = props;

  return (
    <InternalPagination
      {...props}
      items={countries ?? []}
      label={t('customers.address.country')}
      placeholder={' '}
      displayName="name"
      rightIcon="angle-right"
      searchFields={['name']}
      compareField="id"
      isInternalSearch
      headerProps={{
        title: t('header.country'),
        rightIconPress: null
      }}
      listViewProps={{
        contentContainerStyle: {flex: 7}
      }}
      emptyContentProps={{
        contentType: 'countries'
      }}
      fakeInputProps={{disabled}}
      isAllowToSelect={!disabled}
    />
  );
};
