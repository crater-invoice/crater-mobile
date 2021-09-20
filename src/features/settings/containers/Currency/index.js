import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as CurrencyAction from '../../actions';
import {CREATE_CURRENCY_TYPE, CURRENCY_FORM} from '../../constants';
import {Currency} from '../../components/Currency';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const type = route?.params?.type;
  const currency = route?.params?.currency ?? {};
  const id = currency ? currency.id : null;

  return {
    currencyLoading: state.settings.loading.currencyLoading,
    type,
    currency,
    id,
    formValues: getFormValues(CURRENCY_FORM)(state) || {},
    ...commonSelector(state),
    initialValues:
      type === CREATE_CURRENCY_TYPE
        ? {
            position: false
          }
        : {
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

const currencyReduxForm = reduxForm({
  form: CURRENCY_FORM,
  validate
})(Currency);

const CurrencyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(currencyReduxForm);

export default CurrencyContainer;
