import React from 'react';
import {find} from 'lodash';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';
import {isEmpty} from '@/constants';
import {SymbolStyle} from '@/components/CurrencyFormat/styles';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each currency.
   */
  currencies?: Array<any>;

  /**
   * An Object of Props of input.
   */
  input?: Object;

  /**
   * Props of Fake-Input.
   */
  fakeInputProps?: any;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export const CurrencySelectModal = (props: IProps) => {
  const {currencies, input, fakeInputProps, disabled, theme} = props;
  const currency = currencies[(input?.value)]?.title;
  const getSelectedCurrencySymbol = () => {
    if (isEmpty(currencies) || !input?.value) {
      return null;
    }

    const currency = find(currencies, {
      fullItem: {id: Number(input?.value)}
    });

    return currency?.fullItem?.symbol;
  };

  return (
    <InternalPagination
      placeholder={currency ?? t('settings.preferences.currencyPlaceholder')}
      {...props}
      items={currencies ?? []}
      displayName="name"
      searchFields={['name']}
      compareField="id"
      headerProps={{title: t('currencies.title'), rightIconPress: null}}
      emptyContentProps={{contentType: 'currencies'}}
      isAllowToSelect={!disabled}
      fakeInputProps={{
        leftSymbol: getSelectedCurrencySymbol(),
        leftSymbolStyle: {color: theme?.icons?.secondaryColor},
        disabled,
        ...fakeInputProps
      }}
      listViewProps={{
        contentContainerStyle: {flex: 5},
        rightTitleStyle: SymbolStyle
      }}
    />
  );
};
