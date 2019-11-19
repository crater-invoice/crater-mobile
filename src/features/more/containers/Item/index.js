import React from 'react';
import { connect } from 'react-redux';
import { Item } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as MoreAction from '../../actions';
import { ITEM_FORM, EDIT_ITEM } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        more: { loading, item },
        settings: { taxByItems },
        global: { language, currency, taxTypes },
    } = state;

    const itemId = navigation.getParam('id', {});

    const type = navigation.getParam('type');

    const isLoading = loading.itemLoading || (type === EDIT_ITEM && !item)

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId,
        taxTypes,
        taxByItems,
        language,
        type,
        currency,
        initialValues: !isLoading ? {
            price: 0,
            taxes: [],
            ...item
        } : null,
    };
};

const mapDispatchToProps = {
    addItem: MoreAction.addItem,
    editItem: MoreAction.editItem,
    getEditItem: MoreAction.getEditItem,
    removeItem: MoreAction.removeItem,
    clearItem: MoreAction.clearItem,
};

//  Redux Forms
const ItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate,
})(Item);

//  connect
const ItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemReduxForm);

ItemContainer.navigationOptions = () => ({
    header: null,
});

export default ItemContainer;
