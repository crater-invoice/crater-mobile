import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import Items from './list-items';
import {ITEMS_FORM} from 'stores/item/types';
import {itemsSelector} from 'stores/item/selectors';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchItemUnits} from 'stores/item-unit/actions';
import {unitsSelector} from 'stores/item-unit/selectors';

const mapStateToProps = (state, {route}) => ({
  items: itemsSelector(state),
  currency: currentCurrencySelector(state),
  units: unitsSelector(state),
  formValues: getFormValues(ITEMS_FORM)(state) || {},
  ...commonSelector(state),
  ...permissionSelector(route),
  ...settingsSelector(state)
});

const mapDispatchToProps = {fetchItemUnits};

const ItemsForm = reduxForm({form: ITEMS_FORM})(Items);

export const ItemsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsForm);
