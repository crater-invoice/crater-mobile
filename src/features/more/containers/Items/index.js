import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as ItemsAction from '../../actions'
import { Items } from '../../components/Items';
import { ITEM_SEARCH } from '../../constants';


const mapStateToProps = (state) => {

    const {
        more: { items, filterItems, loading },
        global: { currency, language }
    } = state;

    return {
        items,
        filterItems,
        loading: loading.itemsLoading,
        language,
        currency,
        formValues: getFormValues(ITEM_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getItems: ItemsAction.getItems,
};
//  Redux Forms
const ItemsSearchReduxForm = reduxForm({
    form: ITEM_SEARCH
})(Items);

//  connect
const ItemsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemsSearchReduxForm);

ItemsContainer.navigationOptions = () => ({
    header: null,
});

export default ItemsContainer;
