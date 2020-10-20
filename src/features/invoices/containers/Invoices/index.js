import React from 'react';
import { connect } from 'react-redux';
import { Invoices } from '../../components/Invoices';
import { reduxForm, getFormValues } from 'redux-form';
import * as InvoicesAction from '../../actions';
import { colors } from '@/styles';
import { INVOICE_SEARCH } from '../../constants';
import { SvgXml } from 'react-native-svg';
import { INVOICES_ICON } from '@/assets';
import { getCustomers } from '../../../customers/actions';
import { getTitleByLanguage } from '@/utils';
import {
    getDueInvoicesState,
    getDraftInvoicesState,
    getAllInvoicesState
} from '../../selectors';

const mapStateToProps = state => {
    const {
        global: { locale },
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
        locale,
        customers,
        formValues: getFormValues(INVOICE_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getInvoices: InvoicesAction.getInvoices,
    getCustomers: getCustomers
};

//  Redux Forms
const invoiceSearchReduxForm = reduxForm({
    form: INVOICE_SEARCH
})(Invoices);

//  connect
const InvoicesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(invoiceSearchReduxForm);

InvoicesContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.invoices'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={INVOICES_ICON}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    )
});

export default InvoicesContainer;
