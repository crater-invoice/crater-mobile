import React from 'react';
import {View, StyleSheet} from 'react-native';
import {fonts} from '@/styles';
import {Text, CurrencyFormat} from '@/components';

export const taxList = ({key, currency, theme, label, amount}) => {
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
  amount: theme => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 16,
    ...(theme?.mode === 'dark' && {
      fontFamily: fonts.medium
    })
  })
});
