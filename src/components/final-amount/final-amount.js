import React, {FC} from 'react';
import {View} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './final-amount-styles';
import {routes} from '@/navigation';
import {colors} from '@/styles';
import t from 'locales/use-translation';
import {DISCOUNT_OPTION} from 'stores/common/types';
import {isBooleanTrue} from '@/constants';
import {isIosPlatform, definePlatformParam} from '@/helpers/platform';
import {keyboardType} from '@/helpers/keyboard';
import {TaxSelectModal} from '@/select-modal';
import {IProps} from './final-amount-types';
import {
  BaseInput,
  BaseDivider,
  CurrencyFormat,
  Text,
  View as BaseView,
  AssetIcon,
  BaseDropdownPicker,
  taxList
} from '@/components';
import {
  total,
  getCompoundTaxValue,
  itemTotalTaxes,
  getTaxValue,
  getTaxName,
  finalAmount
} from '@/components/final-amount/final-amount-calculation';

export const FinalAmount: FC<IProps> = props => {
  const {
    taxTypes,
    navigation,
    discount_per_item,
    tax_per_item,
    formValues,
    fetchTaxes,
    isAllowToEdit,
    theme,
    currency,
    dispatch,
    form
  } = props;

  const disabled = !isAllowToEdit;
  let taxes = formValues?.taxes;
  let taxPerItem = isBooleanTrue(tax_per_item);
  let discountPerItem = isBooleanTrue(discount_per_item);
  const setFormField = (field, value) => {
    dispatch(change(form, field, value));
  };

  return (
    <View style={styles.amountContainer(theme)}>
      <View style={styles.subContainer}>
        <View>
          <Text
            darkGray
            h5
            medium={theme?.mode === 'light'}
            bold2={theme?.mode === 'dark'}
            style={{marginTop: 6}}
          >
            {t('invoices.subtotal')}
          </Text>
        </View>
        <View style={{marginTop: definePlatformParam(6, 4)}}>
          <CurrencyFormat
            amount={total()}
            currency={currency}
            style={styles.subAmount(theme)}
            symbolStyle={styles.currencySymbol}
            currencySymbolStyle={styles.symbol(currency)}
          />
        </View>
      </View>

      {!discountPerItem && (
        <View style={[styles.subContainer, styles.discount]}>
          <Text
            darkGray
            h5
            medium={theme?.mode === 'light'}
            bold2={theme?.mode === 'dark'}
            style={{marginTop: 6}}
          >
            {t('invoices.discount')}
          </Text>
          <View style={styles.discountField(theme)}>
            <Field
              name="discount"
              component={BaseInput}
              keyboardType={keyboardType.DECIMAL}
              fieldStyle={styles.discountInput(disabled, theme)}
              inputContainerStyle={styles.discountInputContainer}
              disabled={disabled}
              inputProps={{selectTextOnFocus: true}}
            />
            <Field
              name="discount_type"
              component={BaseDropdownPicker}
              items={DISCOUNT_OPTION}
              onChangeCallback={val => setFormField('discount_type', val)}
              defaultPickerOptions={{
                label: 'Fixed',
                value: 'fixed',
                color: colors.secondary,
                displayLabel: currency?.symbol ?? '$'
              }}
              disabled={disabled}
              customView={({placeholderText, valuesText}) => (
                <BaseView
                  class="height=44 justify-center"
                  background-color={theme.backgroundColor}
                  style={styles.discountTypeContainer(theme)}
                >
                  <BaseView class="flex-row justify-center items-center">
                    <Text
                      h4
                      color={theme.text.darkGray}
                      style={styles.discountType(disabled)}
                    >
                      {valuesText ?? placeholderText}
                    </Text>
                    {!disabled && (
                      <AssetIcon
                        name="caret-down"
                        size={15}
                        color={colors.darkGray}
                        style={{paddingRight: 10}}
                      />
                    )}
                  </BaseView>
                </BaseView>
              )}
            />
          </View>
        </View>
      )}

      {taxes &&
        taxes.map(tax => {
          if (tax.compound_tax) return;
          return taxList({
            key: tax.id,
            currency,
            theme,
            label: `${getTaxName(tax)} ${tax.percent} %`,
            amount: getTaxValue(tax.percent)
          });
        })}

      {taxes &&
        taxes.map(tax => {
          if (!tax.compound_tax) return;
          return taxList({
            key: tax.id,
            currency,
            theme,
            label: `${getTaxName(tax)} ${tax.percent} %`,
            amount: getCompoundTaxValue(tax.percent)
          });
        })}

      {itemTotalTaxes().map(tax =>
        taxList({
          key: tax.id,
          currency,
          theme,
          label: `${getTaxName(tax)} ${tax.percent} %`,
          amount: tax.amount,
          withCurrencySymbolStyle: false
        })
      )}

      {!taxPerItem && (
        <Field
          name="taxes"
          taxTypes={taxTypes}
          fetchTaxes={fetchTaxes}
          component={TaxSelectModal}
          custom-view
          disabled={disabled}
          theme={theme}
          rightIconPress={() =>
            navigation.navigate(routes.CREATE_TAX, {
              type: 'ADD',
              onSelect: val => {
                setFormField('taxes', [...val, ...taxes]);
              }
            })
          }
        />
      )}

      <BaseDivider dividerStyle={styles.divider(theme)} />

      <View style={[styles.subContainer]}>
        <View>
          <Text
            darkGray
            h5
            medium={theme?.mode === 'light'}
            bold2={theme?.mode === 'dark'}
            style={{marginTop: 6}}
          >
            {t('invoices.total_amount')}:
          </Text>
        </View>
        <View style={{marginTop: definePlatformParam(4, 3)}}>
          <CurrencyFormat
            amount={finalAmount()}
            currency={currency}
            style={styles.finalAmount(theme)}
            currencyStyle={{
              marginTop: definePlatformParam(-1.5, -6)
            }}
            {...(isIosPlatform && {
              currencySymbolStyle: styles.symbol(currency)
            })}
          />
        </View>
      </View>
    </View>
  );
};
