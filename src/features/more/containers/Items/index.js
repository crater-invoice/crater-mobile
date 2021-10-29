import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as ItemsAction from '../../actions';
import {Items} from '../../components/Items';
import {ITEMS_FORM} from '../../constants';
import {fetchItemUnits} from 'stores/item-units/actions';
import {unitsSelector} from '../../selectors';
import {commonSelector} from 'stores/common/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';

const mapStateToProps = state => ({
  items: state.more?.items,
  currency: currentCurrencySelector(state),
  units: unitsSelector(state.settings.units),
  formValues: getFormValues(ITEMS_FORM)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getItems: ItemsAction.getItems,
  fetchItemUnits: fetchItemUnits
};

const ItemsSearchReduxForm = reduxForm({
  form: 'items/ITEMS_FORM'
})(Items);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsSearchReduxForm);
