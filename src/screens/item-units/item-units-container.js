import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import ItemUnits from './item-units';
import {ITEM_UNITS_FORM} from 'stores/item-units/types';
import {commonSelector} from 'stores/common/selectors';
import * as itemUnitAction from 'stores/item-units/actions';
import {unitsSelector, loadingSelector} from 'stores/item-units/selectors';

const mapStateToProps = state => {
  const {
    itemUnits: {units}
  } = state;

  return {
    formValues: getFormValues(ITEM_UNITS_FORM)(state) || {},
    units: unitsSelector(units),
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  fetchItemUnits: itemUnitAction.fetchItemUnits
};

const ItemUnitsForm = reduxForm({form: ITEM_UNITS_FORM})(ItemUnits);

export const ItemUnitsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUnitsForm);
