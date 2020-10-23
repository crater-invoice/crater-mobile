import React from 'react';
import { connect } from 'react-redux';
import { Customers } from '../../components/Customers';
import * as CustomersAction from '../../actions';
import { reduxForm, getFormValues } from 'redux-form';
import { CUSTOMER_SEARCH } from '../../constants';
import { colors } from '@/styles';
import { getTitleByLanguage } from '@/utils';
import { CUSTOMERS_ICON } from '@/assets';
import AssetSvg from '@/components/AssetSvg';

const mapStateToProps = state => {
    const {
        customers: { customers, loading },
        global: { locale }
    } = state;

    return {
        customers,
        locale,
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
        <AssetSvg 
            name={CUSTOMERS_ICON}
            fill={focused ? colors.primary : colors.darkGray}
        />
    )
});

export default CustomersContainer;
