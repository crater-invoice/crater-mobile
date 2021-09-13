import {connect} from 'react-redux';
import {EstimateItem} from '../../components/Item';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as EstimatesAction from '../../actions';
import {ITEM_FORM} from '../../constants';
import {getTaxes} from '@/features/settings/actions';
import {fetchItemUnits} from 'stores/item-units/actions';
import {unitsSelector} from '@/features/more/selectors';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    estimates: {loading},
    itemUnits: {units}
  } = state;

  const item = route?.params?.item ?? {};

  const type = route?.params?.type;
  const discountPerItem = route?.params?.discount_per_item;
  const taxPerItem = route?.params?.tax_per_item;

  const isLoading = loading.editItemLoading || loading.removeItemLoading;

  return {
    loading: isLoading,
    formValues: getFormValues(ITEM_FORM)(state) || {},
    itemId: item && (item.item_id || item.id),
    taxTypes: state.common?.taxTypes,
    currency: route?.params?.currency,
    discountPerItem,
    taxPerItem,
    type,
    units: unitsSelector(units),
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
  fetchItemUnits,
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

export default EstimateItemContainer;
