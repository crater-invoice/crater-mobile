import { connect } from 'react-redux';
import * as CategoriesAction from '../../actions';
import { reduxForm } from 'redux-form';
import { Categories } from '../../components/Categories';
import { CATEGORY_SEARCH } from '../../constants';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    categories: state.settings?.categories,
    ...commonSelector(state)
});

const mapDispatchToProps = {
    getExpenseCategories: CategoriesAction.getExpenseCategories
};

const categoriesSearchReduxForm = reduxForm({
    form: CATEGORY_SEARCH
})(Categories);

const CategoriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(categoriesSearchReduxForm);

CategoriesContainer.navigationOptions = () => ({
    header: null
});

export default CategoriesContainer;
