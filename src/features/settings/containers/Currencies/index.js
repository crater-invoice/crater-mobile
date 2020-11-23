import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { CURRENCIES_FORM } from '../../constants';
import { Currencies } from '../../components/Currencies';
import * as CurrenciesAction from '../../actions'

const mapStateToProps = (state) => {

    const {
        global,
        settings: {
            currencies,
            loading: { currenciesLoading }
        }
    } = state;

    return {
        locale: global.locale,
        globalCurrencies: global.currencies,
        loading: currenciesLoading,
        currencies,
        formValues: getFormValues(CURRENCIES_FORM)(state) || {},
    };
};

const mapDispatchToProps = {
    getCurrencies: CurrenciesAction.getCurrencies
};
//  Redux Forms
const CurrenciesSearchReduxForm = reduxForm({
    form: CURRENCIES_FORM
})(Currencies);

//  connect
const CurrenciesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CurrenciesSearchReduxForm);

CurrenciesContainer.navigationOptions = () => ({
    header: null,
});

export default CurrenciesContainer;
