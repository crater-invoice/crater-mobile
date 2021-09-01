import { connect } from 'react-redux';
import { EstimateItem } from '../../components/Item';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as EstimatesAction from '../../actions';
import { ITEM_FORM } from '../../constants';
import { getItemUnits, getTaxes } from '@/features/settings/actions';
import { getUnitState } from '@/features/more/selectors';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        estimates: { loading },
        settings: {
            units,
            loading: { itemUnitsLoading }
        }
    } = state;

    const item = navigation.getParam('item', {});

    const type = navigation.getParam('type');
    const discountPerItem = navigation.getParam('discount_per_item');
    const taxPerItem = navigation.getParam('tax_per_item');

    const isLoading =
        loading.editItemLoading ||
        loading.removeItemLoading ||
        itemUnitsLoading;

    return {
        loading: isLoading,
        formValues: getFormValues(ITEM_FORM)(state) || {},
        itemId: item && (item.item_id || item.id),
        taxTypes: state.common?.taxTypes,
        currency: navigation.getParam('currency'),
        discountPerItem,
        taxPerItem,
        type,
        units: getUnitState(units),
        ...commonSelector(state),
        initialValues: {
            price: null,
            quantity: 1,
            discount_type: 'none',
            discount: 0,
            taxes: [],
            ...item
        }
    };
};

const mapDispatchToProps = {
    addItem: EstimatesAction.addItem,
    setEstimateItems: EstimatesAction.setEstimateItems,
    removeEstimateItem: EstimatesAction.removeEstimateItem,
    getItemUnits,
    getTaxes
};

const addItemReduxForm = reduxForm({
    form: ITEM_FORM,
    validate
})(EstimateItem);

const EstimateItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addItemReduxForm);

EstimateItemContainer.navigationOptions = () => ({
    header: null
});

export default EstimateItemContainer;
