import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  View as CtView,
  BaseLabel,
  BaseInput,
  Text,
  BaseButton
} from '@/components';
import {IProps} from './type.d.js';
import {keyboardType} from '@/helpers/keyboard.js';
import {Field} from 'redux-form';
import t from 'locales/use-translation';

export const ExchangeRateField = (parentProps: IProps) => {
  const {props, state} = parentProps;
  const baseCurrency = props?.currency?.code;
  const customerCurrency = state?.currency?.code;
  return (
    <View style={styles.emptyContainer}>
      <BaseLabel isRequired>{t('exchange_rate.label')}</BaseLabel>
      <CtView flex={1} flex-row>
        <CtView flex={0.28} justify-between>
          <Field
            name="currency_code"
            component={BaseInput}
            inputProps={{
              value: t('exchange_rate.base_currency', {baseCurrency})
            }}
            disabled
          />
        </CtView>
        <CtView flex={1} justify-between>
          <Field
            name="exchange_rate"
            component={BaseInput}
            rightSymbol={customerCurrency}
            keyboardType={keyboardType.DECIMAL}
          />
        </CtView>
        <CtView flex={0.3} height-10 mt-11 ml-15 justify-between>
          <BaseButton
            type="primary-btn-outline"
            onPress={() => setExchangeRate(state?.currency)}
            show={true}
            loading={false}
          >
            {t('button.refresh')}
          </BaseButton>
        </CtView>
      </CtView>
      <Text mt-2 darkGray>
        {t('exchange_rate.exchange_help_text', {
          baseCurrency,
          customerCurrency
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
