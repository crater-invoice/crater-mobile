import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import ItemUnits from './item-units';
import {ITEM_UNITS_FORM} from 'stores/item-unit/types';
import {commonSelector} from 'stores/common/selectors';
import * as itemUnitAction from 'stores/item-unit/actions';
import {unitsSelector, loadingSelector} from 'stores/item-unit/selectors';

const mapStateToProps = state => ({
  formValues: getFormValues(ITEM_UNITS_FORM)(state) || {},
  units: unitsSelector(state),
  ...loadingSelector(state),
  ...commonSelector(state)
});

const mapDispatchToProps = {
  fetchItemUnits: itemUnitAction.fetchItemUnits
};

const ItemUnitsForm = reduxForm({form: ITEM_UNITS_FORM})(ItemUnits);

export const ItemUnitsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUnitsForm);
