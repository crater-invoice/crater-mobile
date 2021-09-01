import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_ADDRESS } from '../../constants';
import { Address } from '../../components/Address';
import { getStateCountries } from '../../selectors';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    formValues: getFormValues(CUSTOMER_ADDRESS)(state) || {},
    countries: getStateCountries(state.customers.countries),
    ...commonSelector(state)
});

const addressReduxForm = reduxForm({
    form: CUSTOMER_ADDRESS
})(Address);

const AddressContainer = connect(mapStateToProps)(addressReduxForm);

AddressContainer.navigationOptions = () => ({
    header: null
});

export default AddressContainer;
