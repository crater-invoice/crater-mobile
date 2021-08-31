import { connect } from 'react-redux';
import { Customers } from '../../components/Customers';
import * as CustomersAction from '../../actions';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_SEARCH } from '../../constants';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = state => ({
    customers: state.customers?.customers,
    formValues: getFormValues(CUSTOMER_SEARCH)(state) || {},
    ...commonSelector(state)
});

const mapDispatchToProps = {
    getCustomer: CustomersAction.getCustomers
};

const customerSearchReduxForm = reduxForm({
    form: CUSTOMER_SEARCH
})(Customers);

const CustomersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customerSearchReduxForm);

CustomersContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false
});

export default CustomersContainer;
