import { connect } from 'react-redux';
import { Item } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as MoreAction from '../../actions';
import { ITEM_FORM, EDIT_ITEM } from '../../constants';
import {
    getItemUnits,
    getSettingInfo,
    getTaxes
} from '@/features/settings/actions';
import { getUnitState } from '../../selectors';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        more: { loading, item },
        settings: {
            taxByItems,
            units,
            loading: { itemUnitsLoading }
        },
        global: { currency, taxTypes }
    } = state;

    const itemId = navigation.getParam('id', {});

    const type = navigation.getParam('type');

    const isEditItem = type === EDIT_ITEM;
    const isAllowToEdit = isEditItem
        ? PermissionService.isAllowToEdit(navigation?.state?.routeName)
        : true;
    const isAllowToDelete = isEditItem
        ? PermissionService.isAllowToDelete(navigation?.state?.routeName)
        : true;

    const isLoading =
        loading?.itemLoading || itemUnitsLoading || (isEditItem && !item);

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId,
        taxTypes,
        taxByItems,
        type,
        isEditItem,
        isAllowToEdit,
        isAllowToDelete,
        currency,
        units: getUnitState(units),
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
    getItemUnits: getItemUnits,
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
