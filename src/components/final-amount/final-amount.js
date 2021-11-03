import React, {FC} from 'react';
import {View} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './final-amount-styles';
import {
  BaseInput,
  BaseDivider,
  CurrencyFormat,
  Text,
  View as BaseView,
  AssetIcon,
  BaseDropdownPicker
} from '@/components';
import {routes} from '@/navigation';
import {colors} from '@/styles';
import t from 'locales/use-translation';
import {DISCOUNT_OPTION} from 'stores/common/types';
import {
  total,
  getCompoundTaxValue,
  itemTotalTaxes,
  getTaxValue,
  getTaxName,
  finalAmount
} from '@/components/final-amount/final-amount-calculation';
import {
  definePlatformParam,
  isBooleanTrue,
  isIosPlatform,
  keyboardType
} from '@/constants';
import {TaxSelectModal} from '@/select-modal';
import {IProps} from './final-amount-types';

const DISPLAY_ITEM_TAX: FC<IProps> = props => {
  const {currency, theme} = props;
  let taxes = itemTotalTaxes();

  return taxes
    ? taxes.map((val, index) => (
        <View style={styles.subContainer} key={index}>
          <View>
            <Text darkGray medium style={{marginTop: 6}}>
              {getTaxName(val)} ({val.percent} %)
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <CurrencyFormat
              amount={val.amount}
              currency={currency}
              style={styles.subAmount(theme)}
              symbolStyle={styles.currencySymbol}
            />
          </View>
        </View>
      ))
    : null;
};

export const FinalAmount: FC<IProps> = props => {
  const {
    taxTypes,
    navigation,
    discount_per_item,
    tax_per_item,
    formValues,
    getTaxes,
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
        taxes.map((val, index) =>
          !val.compound_tax ? (
            <View style={styles.subContainer} key={index}>
              <View>
                <Text darkGray h5 medium style={{marginTop: 6}}>
                  {getTaxName(val)} ({val.percent} %)
                </Text>
              </View>
              <View>
                <CurrencyFormat
                  amount={getTaxValue(val.percent)}
                  currency={currency}
                  style={styles.taxAmount(theme)}
                  symbolStyle={styles.currencySymbol}
                  currencySymbolStyle={styles.symbol(currency)}
                />
              </View>
            </View>
          ) : null
        )}

      {taxes &&
        taxes.map((val, index) =>
          val.compound_tax ? (
            <View style={styles.subContainer} key={index}>
              <View>
                <Text darkGray h5 medium style={{marginTop: 6}}>
                  {getTaxName(val)} ({val.percent} %)
                </Text>
              </View>
              <View>
                <CurrencyFormat
                  amount={getCompoundTaxValue(val.percent)}
                  currency={currency}
                  style={styles.taxAmount(theme)}
                  symbolStyle={styles.currencySymbol}
                  currencySymbolStyle={styles.symbol(currency)}
                />
              </View>
            </View>
          ) : null
        )}

      {DISPLAY_ITEM_TAX(props)}

      {!taxPerItem && (
        <Field
          name="taxes"
          taxTypes={taxTypes}
          getTaxes={getTaxes}
          component={TaxSelectModal}
          custom-view
          disabled={disabled}
          theme={theme}
          rightIconPress={() =>
            navigation.navigate(routes.TAX, {
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
