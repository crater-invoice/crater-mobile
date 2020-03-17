import React from 'react';
import { connect } from 'react-redux';
import { Invoices } from '../../components/Invoices';
import { reduxForm, getFormValues } from 'redux-form';
import * as InvoicesAction from '../../actions';
import { colors } from '../../../../styles/colors';
import { INVOICE_SEARCH } from '../../constants';
import { SvgXml } from 'react-native-svg';
import { INVOICES } from '../../../../assets/svg';
import { getCustomers } from '../../../customers/actions';
import { getTitleByLanguage, navigateToMainTabs } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';
import { withNavigationFocus } from 'react-navigation';
import {
    getDueInvoicesState,
    getDraftInvoicesState,
    getAllInvoicesState
} from '../../selectors';

const mapStateToProps = (state) => {

    const {
        global: { language },
        customers: { customers },
        invoices: {
            invoices,
            loading: { invoicesLoading }
        }
    } = state;

    return {
        invoices,
        dueInvoices: getDueInvoicesState(invoices ?? []),
        draftInvoices: getDraftInvoicesState(invoices ?? []),
        allInvoices: getAllInvoicesState(invoices ?? []),
        loading: invoicesLoading,
        language,
        customers,
        formValues: getFormValues(INVOICE_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getInvoices: InvoicesAction.getInvoices,
    getCustomers: getCustomers
};

//  Redux Forms
const invoiceSearchReduxForm = reduxForm({
    form: INVOICE_SEARCH,
})(Invoices);

//  connect
const InvoicesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(invoiceSearchReduxForm);

InvoicesContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.invoices'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={INVOICES}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    ),
    tabBarOnPress: ({ defaultHandler }) => {
        if (navigation.isFocused()) {
            return;
        }

        navigateToMainTabs(navigation, ROUTES.MAIN_INVOICES)
    }
});

export default withNavigationFocus(InvoicesContainer);

