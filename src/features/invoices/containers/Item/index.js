import React from 'react';
import { connect } from 'react-redux';
import { InvoiceItem } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as InvoicesAction from '../../actions';
import { ITEM_FORM } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        invoices: { loading },
        global: { language, taxTypes },
    } = state;

    const item = navigation.getParam('item', {});

    const type = navigation.getParam('type');
    const discountPerItem = navigation.getParam('discount_per_item');
    const taxPerItem = navigation.getParam('tax_per_item');

    const isLoading = loading.editItemLoading || loading.removeItemLoading

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId: item && (item.item_id || item.id),
        taxTypes,
        currency: navigation.getParam('currency'),
        language: language,
        discountPerItem,
        taxPerItem,
        type,
        initialValues: {
            price: null,
            quantity: 1,
            discount_type: 'none',
            discount: 0,
            taxes: [],
            ...item
        },
    };
};

const mapDispatchToProps = {
    addItem: InvoicesAction.addItem,
    setInvoiceItems: InvoicesAction.setInvoiceItems,
    removeInvoiceItem: InvoicesAction.removeInvoiceItem,
};

//  Redux Forms
const addItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate,
})(InvoiceItem);

//  connect
const InvoiceItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addItemReduxForm);

InvoiceItemContainer.navigationOptions = () => ({
    header: null,
});

export default InvoiceItemContainer;
