import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as CurrencyAction from '../../actions';
import { CREATE_CURRENCY_TYPE, CURRENCY_FORM } from '../../constants';
import { Currency } from '../../components/Currency';
import { hasValue } from '../../../../api/global';

const mapStateToProps = (state, { navigation }) => {

    const {
        global: { language },
        settings: {
            loading: { currencyLoading }
        }
    } = state

    let type = navigation.getParam('type', CREATE_CURRENCY_TYPE)
    let currency = navigation.getParam('currency', {})
    let id = currency ? currency.id : null

    return {
        currencyLoading,
        type,
        currency,
        id,
        language,
        formValues: getFormValues(CURRENCY_FORM)(state) || {},
        initialValues: type === CREATE_CURRENCY_TYPE ? {
            position: false
        } : {
                name: currency.name.toString(),
                code: currency.code.toString(),
                symbol: currency.symbol.toString(),
                precision: currency.precision.toString(),
                thousand_separator: currency.thousand_separator.toString(),
                decimal_separator: currency.decimal_separator.toString(),
                position: currency.swap_currency_symbol === 1
            }
    };
};

const mapDispatchToProps = {
    createCurrency: CurrencyAction.createCurrency,
    editCurrency: CurrencyAction.editCurrency,
    removeCurrency: CurrencyAction.removeCurrency
};

//  Redux Forms
const currencyReduxForm = reduxForm({
    form: CURRENCY_FORM,
    validate,
})(Currency);

//  connect
const CurrencyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(currencyReduxForm);

CurrencyContainer.navigationOptions = () => ({
    header: null,
});

export default CurrencyContainer;
