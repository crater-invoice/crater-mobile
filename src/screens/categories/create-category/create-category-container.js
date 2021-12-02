import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CreateCategory from './create-category';
import {validate} from 'stores/category/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/category/selectors';
import {CREATE_CATEGORY_FORM} from 'stores/category/types';

const mapStateToProps = (state, {route}) => ({
  ...loadingSelector(state),
  ...commonSelector(state),
  ...permissionSelector(route),
  initialValues: {
    name: null,
    description: null
  }
});

const CreateCategoryForm = reduxForm({form: CREATE_CATEGORY_FORM, validate})(
  CreateCategory
);

export const CreateCategoryContainer = connect(mapStateToProps)(
  CreateCategoryForm
);
