import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CreateCategory from './create-company';
import {validate} from 'stores/categories/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/categories/selectors';
import {CREATE_CATEGORY_FORM} from 'stores/categories/types';

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
