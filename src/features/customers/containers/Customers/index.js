import React from 'react';
import { connect } from 'react-redux';
import { Customers } from '../../components/Customers';
import * as CustomersAction from '../../actions';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_SEARCH } from '../../constants';
import { colors } from '../../../../styles/colors';
import { SvgXml } from 'react-native-svg';
import { CUSTOMERS } from '../../../../assets/svg';
import { getTitleByLanguage } from '../../../../navigation/actions';
import { withNavigationFocus } from 'react-navigation';

const mapStateToProps = state => {
    const {
        customers: { customers, loading },
        global: { language }
    } = state;

    return {
        customers,
        language,
        formValues: getFormValues(CUSTOMER_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getCustomer: CustomersAction.getCustomers
};

//  Redux Forms
const customerSearchReduxForm = reduxForm({
    form: CUSTOMER_SEARCH
})(Customers);

//  connect
const CustomersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(customerSearchReduxForm);

CustomersContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.customers'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={CUSTOMERS}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    )
});

export default withNavigationFocus(CustomersContainer);
