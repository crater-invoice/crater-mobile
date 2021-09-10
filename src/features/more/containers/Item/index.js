import { connect } from 'react-redux';
import { Item } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as MoreAction from '../../actions';
import { ITEM_FORM } from '../../constants';
import { unitsSelector } from '../../selectors';
import { commonSelector, permissionSelector } from 'stores/common/selectors';
import { getSettingInfo, getTaxes } from '@/features/settings/actions';
import { fetchItemUnits } from 'stores/item-units/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        more: { loading, item },
        settings: {
            taxByItems
        },
        itemUnits: { units },
        common: { currency, taxTypes }
    } = state;

    const itemId = navigation.getParam('id', {});
    const permissions = permissionSelector(navigation);
    const isEditScreen = permissions.isEditScreen;

    const isLoading =
        loading?.itemLoading || (isEditScreen && !item);

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId,
        taxTypes,
        taxByItems,
        currency,
        units: unitsSelector(units),
        ...permissions,
        ...commonSelector(state),
        initialValues: !isLoading
            ? {
                  taxes: [],
                  ...item
              }
            : null
    };
};

const mapDispatchToProps = {
    addItem: MoreAction.addItem,
    editItem: MoreAction.editItem,
    getEditItem: MoreAction.getEditItem,
    removeItem: MoreAction.removeItem,
    clearItem: MoreAction.clearItem,
    fetchItemUnits: fetchItemUnits,
    getTaxes,
    getSettingInfo
};

const ItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate
})(Item);

const ItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemReduxForm);

ItemContainer.navigationOptions = () => ({
    header: null
});

export default ItemContainer;
