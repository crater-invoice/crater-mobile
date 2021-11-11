import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Categories from './list-categories';
import {commonSelector} from 'stores/common/selectors';
import {CATEGORIES_FORM} from 'stores/category/types';
import {categoriesSelector} from 'stores/category/selectors';

const mapStateToProps = state => ({
  categories: categoriesSelector(state),
  ...commonSelector(state)
});

const CategoriesForm = reduxForm({form: CATEGORIES_FORM})(Categories);

export const CategoriesContainer: any = connect(mapStateToProps)(
  CategoriesForm
);
