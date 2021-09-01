import { connect } from 'react-redux';
import { Item } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as MoreAction from '../../actions';
import { ITEM_FORM } from '../../constants';
import { getUnitState } from '../../selectors';
import { commonSelector, permissionSelector } from 'stores/common/selectors';
import {
    getItemUnits,
    getSettingInfo,
    getTaxes
} from '@/features/settings/actions';

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
    const permissions = permissionSelector(navigation);
    const isEditScreen = permissions.isEditScreen;

    const isLoading =
        loading?.itemLoading || itemUnitsLoading || (isEditScreen && !item);

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId,
        taxTypes,
        taxByItems,
        currency,
        units: getUnitState(units),
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
