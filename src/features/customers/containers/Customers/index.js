import React from 'react';
import { connect } from 'react-redux';
import { Customers } from '../../components/Customers';
import * as CustomersAction from '../../actions';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_SEARCH } from '../../constants';
import { colors } from '../../../../styles/colors';
import { SvgXml } from 'react-native-svg';
import { CUSTOMERS } from '../../../../assets/svg';
import { getTitleByLanguage, tabBarOnPress, navigateRoute, navigateTabRoutes } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';

const mapStateToProps = (state) => {

    const {
        customers: { customers, filterCustomers, loading },
        global: { language }
    } = state;

    return {
        customers,
        filterCustomers,
        loading: loading.customersLoading,
        language,
        formValues: getFormValues(CUSTOMER_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getCustomer: CustomersAction.getCustomers
};

//  Redux Forms
const customerSearchReduxForm = reduxForm({
    form: CUSTOMER_SEARCH,
})(Customers);

//  connect
const CustomersContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
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
    ),
    tabBarOnPress: () => {

        navigateTabRoutes(ROUTES.MAIN_CUSTOMERS, { apiCall: false })

        let apiCall = navigation.getParam('apiCall', false)

        apiCall ? navigateRoute(ROUTES.MAIN_CUSTOMERS) : tabBarOnPress(
            ROUTES.MAIN_CUSTOMERS,
            CustomersAction.getCustomers,
            navigation
        )

    }
});

export default CustomersContainer;
