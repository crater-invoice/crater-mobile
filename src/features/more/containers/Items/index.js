import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as ItemsAction from '../../actions';
import {Items} from '../../components/Items';
import {ITEM_SEARCH} from '../../constants';
import {fetchItemUnits} from 'stores/item-units/actions';
import {unitsSelector} from '../../selectors';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  items: state.more?.items,
  currency: state.common?.currency,
  units: unitsSelector(state.settings.units),
  formValues: getFormValues(ITEM_SEARCH)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getItems: ItemsAction.getItems,
  fetchItemUnits: fetchItemUnits
};

const ItemsSearchReduxForm = reduxForm({
  form: ITEM_SEARCH
})(Items);

const ItemsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsSearchReduxForm);

export default ItemsContainer;
