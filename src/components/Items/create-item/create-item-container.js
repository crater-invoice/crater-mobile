import {connect} from 'react-redux';
import {CreateItem} from './create-item';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from 'stores/items/validator';
import {CREATE_ITEM_FORM} from 'stores/items/types';
import {getTaxes} from '@/features/settings/actions';
import {fetchItemUnits} from 'stores/item-units/actions';
import {unitsSelector} from '@/features/more/selectors';
import {commonSelector} from 'stores/common/selectors';
import {getItems} from '@/features/more/actions';
const mapStateToProps = (state, {route}) => {
  const {
    itemUnits: {units},
    invoices,
    estimates,
    recurringInvoices
  } = state;

  const item = route?.params?.item ?? {};

  const type = route?.params?.type;
  const screen = route?.params?.screen;
  const discountPerItem = route?.params?.discount_per_item;
  const taxPerItem = route?.params?.tax_per_item;
  const isLoading = () => {
    return (
      invoices?.isSaving ||
      invoices?.isDeleting ||
      estimates?.isSaving ||
      estimates?.isDeleting ||
      recurringInvoices?.isSaving ||
      recurringInvoices?.isDeleting
    );
  };
  return {
    loading: isLoading(),
    formValues: getFormValues(CREATE_ITEM_FORM)(state) || {},
    itemId: item && (item.item_id || item.id),
    taxTypes: state.common?.taxTypes,
    currency: route?.params?.currency,
    discountPerItem,
    taxPerItem,
    type,
    screen,
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
  getItems,
  fetchItemUnits,
  getTaxes
};

const createItemReduxForm = reduxForm({
  form: CREATE_ITEM_FORM,
  validate
})(CreateItem);

export const CreateItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(createItemReduxForm);
