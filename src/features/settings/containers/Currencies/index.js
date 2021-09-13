import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {CURRENCIES_FORM} from '../../constants';
import {Currencies} from '../../components/Currencies';
import * as CurrenciesAction from '../../actions';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  globalCurrencies: state.global?.currencies,
  loading: state.settings.loading.currenciesLoading,
  currencies: state.settings?.currencies,
  formValues: getFormValues(CURRENCIES_FORM)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getCurrencies: CurrenciesAction.getCurrencies
};

const CurrenciesSearchReduxForm = reduxForm({
  form: CURRENCIES_FORM
})(Currencies);

const CurrenciesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesSearchReduxForm);

export default CurrenciesContainer;
