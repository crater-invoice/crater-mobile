import React from 'react';
import {find} from 'lodash';
import {InternalPagination} from '@/components';
import t from 'locales/use-translation';
import {isEmpty} from '@/constants';
import {SymbolStyle} from '@/components/currency-format';
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
  baseSelectProps?: any;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export const CurrencySelectModal = (props: IProps) => {
  const {currencies, input, baseSelectProps, disabled, theme} = props;

  const getSelectedCurrencySymbol = () => {
    if (isEmpty(currencies) || !input?.value) {
      return null;
    }

    const currency = find(currencies, {
      fullItem: {id: Number(input?.value)}
    });

    return currency?.fullItem?.code;
  };

  const getSelectedCurrencyTitle = () => {
    if (isEmpty(currencies) || !input?.value) {
      return t('settings.preferences.currency_placeholder');
    }

    const currency = find(currencies, {
      fullItem: {id: Number(input?.value)}
    });

    return currency?.title;
  };

  return (
    <InternalPagination
      placeholder={getSelectedCurrencyTitle()}
      {...props}
      items={currencies ?? []}
      displayName="name"
      searchFields={['name']}
      compareField="id"
      headerProps={{title: t('currencies.title'), rightIconPress: null}}
      emptyContentProps={{contentType: 'currencies'}}
      isAllowToSelect={!disabled}
      baseSelectProps={{
        leftSymbol: getSelectedCurrencySymbol(),
        leftSymbolStyle: {color: theme?.icons?.primaryColor},
        disabled,
        ...baseSelectProps
      }}
      listViewProps={{
        contentContainerStyle: {flex: 5},
        rightTitleStyle: SymbolStyle
      }}
    />
  );
};
