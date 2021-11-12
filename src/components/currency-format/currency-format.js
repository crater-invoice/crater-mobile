import React, {Component} from 'react';
import {Text} from '../text';
import {View, StyleSheet} from 'react-native';
import {formatMoney} from '@/constants';
import {isIosPlatform, definePlatformParam} from '@/helpers/platform';
import {IProps} from './type.d';

export class CurrencyFormat extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      style,
      amount,
      currency,
      preText,
      containerStyle,
      currencyStyle,
      moneyStyle,
      symbolStyle,
      currencySymbolStyle
    } = this.props;
    const {symbol, money, swap_currency_symbol} = formatMoney(amount, currency);
    const combinedSymbolStyle = [
      style && style,
      currencyStyle && currencyStyle,
      SymbolStyle
    ];
    const combinedMoneyStyle = [style, moneyStyle];

    let firstComponent = swap_currency_symbol ? money : symbol;
    let firstComponentStyle = swap_currency_symbol
      ? combinedMoneyStyle
      : combinedSymbolStyle;
    let secondComponent = swap_currency_symbol ? symbol : money;
    let secondComponentStyle = swap_currency_symbol
      ? combinedSymbolStyle
      : combinedMoneyStyle;

    return (
      <View style={[styles.container, containerStyle && containerStyle]}>
        <Text numberOfLines={1} style={style && style}>
          {preText && preText}
        </Text>
        <Text
          numberOfLines={1}
          style={[firstComponentStyle, styles.symbol, symbolStyle]}
        >
          {`${firstComponent} `}
        </Text>
        <Text
          numberOfLines={1}
          style={[secondComponentStyle, currencySymbolStyle]}
        >
          {secondComponent}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  symbol: {
    ...(isIosPlatform && {marginBottom: -2})
  }
});

export const SymbolStyle = {
  fontFamily: definePlatformParam('Arial', 'sans-serif')
};
