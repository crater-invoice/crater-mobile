import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import ItemUnits from './item-units';
import {ITEM_UNITS_FORM} from 'stores/item-units/types';
import {commonSelector} from 'stores/common/selectors';
import * as itemUnitAction from 'stores/item-units/actions';
import {getUnitState} from 'stores/item-units/selectors';
const mapStateToProps = state => {
  const {
    itemUnits: {
      units,
      loading: {itemUnitLoading, itemUnitsLoading}
    }
  } = state;

  return {
    formValues: getFormValues(ITEM_UNITS_FORM)(state) || {},
    units: getUnitState(units),
    itemUnitLoading,
    itemUnitsLoading,
    loading: itemUnitLoading,
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getItemUnits: itemUnitAction.getItemUnits
};

const ItemUnitsForm = reduxForm({form: ITEM_UNITS_FORM})(ItemUnits);

export const ItemUnitsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUnitsForm);

ItemUnitsContainer.navigationOptions = () => ({
  header: null
});
