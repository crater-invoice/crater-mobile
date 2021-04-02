import { formatMoney } from '@/constants';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles, SymbolStyle } from './styles';

type IProps = {
    style: Object,
    amount: String,
    currency: Object,
    preText: String,
    containerStyle: Object,
    currencyStyle: Object
};
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
            moneyStyle
        } = this.props;
        const { symbol, money, swap_currency_symbol } = formatMoney(amount, currency);
        const combinedSymbolStyle = [style && style, currencyStyle && currencyStyle, SymbolStyle];
        const combinedMoneyStyle = [style, moneyStyle];

        let firstComponent = (swap_currency_symbol ? money : symbol);
        let firstComponentStyle = (swap_currency_symbol ? combinedMoneyStyle : combinedSymbolStyle);
        let secondComponent = (swap_currency_symbol ? symbol : money);
        let secondComponentStyle = (swap_currency_symbol ? combinedSymbolStyle : combinedMoneyStyle);

        return (
            <View style={[styles.container, containerStyle && containerStyle]}>
                <Text numberOfLines={1} style={style && style}>
                    {preText && preText}
                </Text>
                <Text numberOfLines={1} style={firstComponentStyle}>
                    {firstComponent}
                </Text>
                <Text numberOfLines={1} style={secondComponentStyle}>
                    {secondComponent}
                </Text>
            </View>
        );
    }
}
