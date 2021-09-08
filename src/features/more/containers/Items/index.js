import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as ItemsAction from '../../actions';
import { Items } from '../../components/Items';
import { ITEM_SEARCH } from '../../constants';
import { getItemUnits } from 'stores/item-units/actions';
import { getUnitState } from '../../selectors';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    items: state.more?.items,
    currency: state.common?.currency,
    units: getUnitState(state.settings.units),
    formValues: getFormValues(ITEM_SEARCH)(state) || {},
    ...commonSelector(state)
});

const mapDispatchToProps = {
    getItems: ItemsAction.getItems,
    getItemUnits: getItemUnits
};

const ItemsSearchReduxForm = reduxForm({
    form: ITEM_SEARCH
})(Items);

const ItemsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemsSearchReduxForm);

ItemsContainer.navigationOptions = () => ({
    header: null
});

export default ItemsContainer;
