import {connect} from 'react-redux';
import {CreateItem} from './create-item';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from 'stores/item/validator';
import {CREATE_ITEM_FORM} from 'stores/item/types';
import {fetchItemUnits} from 'stores/item-unit/actions';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/item/selectors';
import {taxTypesSelector} from 'stores/tax-type/selectors';
import {fetchTaxes} from 'stores/tax-type/actions';
import {unitsSelector} from 'stores/item-unit/selectors';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {withExchangedAmount} from '@/utils';
import {isNaN, round} from 'lodash';
import {hasValue} from '@/constants';

const mapStateToProps = (state, {route}) => {
  const {invoice, estimate, recurringInvoice} = state;

  const item = route?.params?.item ?? {};
  const type = route?.params?.type;
  const screen = route?.params?.screen;
  const discountPerItem = route?.params?.discount_per_item;
  const taxPerItem = route?.params?.tax_per_item;
  const isItemScreen = screen === 'item';
  const price =
    isItemScreen || type !== 'ADD'
      ? item?.price
      : round(withExchangedAmount(item?.price));
  return {
    loading:
      invoice?.isSaving || estimate?.isSaving || recurringInvoice?.isSaving,
    formValues: getFormValues(CREATE_ITEM_FORM)(state) || {},
    itemId: item?.id,
    taxTypes: taxTypesSelector(state),
    currency: route?.params?.currency,
    discountPerItem,
    taxPerItem,
    type,
    screen,
    isItemScreen,
    units: unitsSelector(state),
    // customFields: customFieldsSelector(state),
    ...permissionSelector(route),
    ...loadingSelector(state),
    ...commonSelector(state),
    initialValues: {
      quantity: 1,
      unit: null,
      unit_id: null,
      discount_type: 'none',
      discount: 0,
      taxes: [],
      ...item,
      price: !hasValue(price) || isNaN(price) ? 0 : price
    }
  };
};

const mapDispatchToProps = {
  fetchItemUnits,
  fetchTaxes
};

const createItemForm = reduxForm({
  form: CREATE_ITEM_FORM,
  validate
})(CreateItem);

export const CreateItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(createItemForm);
