import React, {Component} from 'react';
import {Text} from '../text';
import {View, StyleSheet} from 'react-native';
import {formatMoney} from '@/constants';
import {definePlatformParam} from '@/helpers/platform';
import {IProps} from './type.d';

export class CurrencyFormat extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, amount, currency, preText, containerStyle} = this.props;
    const {symbol, money, swap_currency_symbol} = formatMoney(amount, currency);
    const combinedSymbolStyle = [style && style, SymbolStyle];

    let firstComponent = swap_currency_symbol ? money : symbol;
    let firstComponentStyle = swap_currency_symbol
      ? style
      : combinedSymbolStyle;
    let secondComponent = swap_currency_symbol ? symbol : money;
    let secondComponentStyle = swap_currency_symbol
      ? combinedSymbolStyle
      : style;
    return (
      <View style={[styles.container, containerStyle && containerStyle]}>
        <Text numberOfLines={1} style={{...style, ...addingFalse}}>
          {preText && preText}
        </Text>
        <Text numberOfLines={1} style={[firstComponentStyle, addingFalse]}>
          {`${firstComponent} `}
        </Text>
        <Text numberOfLines={1} style={[secondComponentStyle, addingFalse]}>
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
    flexDirection: 'row',
    textAlignVertical: 'center'
  },
  addingFalse: {
    includeFontPadding: false
  }
});

export const SymbolStyle = {
  fontFamily: definePlatformParam('Arial', 'sans-serif')
};
