import React from 'react';
import {View, StyleSheet} from 'react-native';
import {fonts} from '@/styles';
import {Text, CurrencyFormat} from '@/components';
import {isAndroidPlatform, isIosPlatform} from '@/helpers/platform';

export const taxList = ({
  key,
  currency,
  theme,
  label,
  amount,
  withCurrencySymbolStyle = true
}) => {
  return (
    <View style={styles.container} key={key}>
      <View>
        <Text darkGray medium style={{marginTop: 6}}>
          {label}
        </Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <CurrencyFormat
          amount={amount}
          currency={currency}
          style={styles.amount(theme)}
          symbolStyle={styles.symbol}
          currencySymbolStyle={
            withCurrencySymbolStyle && styles.currency(currency)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  symbol: {
    ...(isAndroidPlatform && {
      marginTop: -5
    })
  },
  amount: theme => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 16,
    ...(theme?.mode === 'dark' && {
      fontFamily: fonts.medium
    })
  }),
  currency: currency => ({
    ...(isIosPlatform && {marginTop: 2}),
    ...(isAndroidPlatform &&
      currency?.swap_currency_symbol && {
        marginTop: -9
      })
  })
});
