import React from 'react';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';
import {find} from 'lodash';
import {isEmpty} from '@/constants';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each country.
   */
  countries?: Array<any>;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * An Object of Props of input.
   */
  input?: Object;
}

export const CountrySelectModal = (props: IProps) => {
  const {countries, disabled, input, theme} = props;

  const getSelectedCountryTitle = () => {
    if (isEmpty(countries) || !input?.value) {
      return ' ';
    }

    const country = find(countries, {
      fullItem: {id: Number(input?.value)}
    });

    return country?.title;
  };

  const getSelectedCountrySymbol = () => {
    if (isEmpty(countries) || !input?.value) {
      return ' ';
    }

    const country = find(countries, {
      fullItem: {id: Number(input?.value)}
    });

    return country?.fullItem?.code;
  };

  return (
    <InternalPagination
      {...props}
      items={countries ?? []}
      label={t('customers.address.country')}
      placeholder={getSelectedCountryTitle()}
      displayName="name"
      rightIcon="angle-right"
      searchFields={['name']}
      compareField="id"
      isInternalSearch
      headerProps={{
        title: t('header.country'),
        rightIconPress: null
      }}
      listViewProps={{contentContainerStyle: {flex: 7}}}
      emptyContentProps={{contentType: 'countries'}}
      baseSelectProps={{
        leftSymbol: getSelectedCountrySymbol(),
        leftSymbolStyle: {color: theme?.icons?.secondaryColor},
        disabled
      }}
      isAllowToSelect={!disabled}
    />
  );
};
