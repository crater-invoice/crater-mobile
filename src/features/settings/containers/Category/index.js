import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as actions from '../../actions';
import {Category} from '../../components/Category';
import {CATEGORY_FORM} from '../../constants';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const loading = state.settings?.loading ?? {};
  const {expenseCategoryLoading, initExpenseCategoryLoading} = loading;

  return {
    categoryLoading: expenseCategoryLoading,
    getEditCategoryLoading: initExpenseCategoryLoading,
    formValues: getFormValues(CATEGORY_FORM)(state) || {},
    ...permissionSelector(route),
    ...commonSelector(state),
    initialValues: {
      name: null,
      description: null
    }
  };
};

const mapDispatchToProps = {
  createCategory: actions.createExpenseCategory,
  getEditCategory: actions.getEditExpenseCategory,
  editCategory: actions.editExpenseCategory,
  removeCategory: actions.removeExpenseCategory
};

const addEditPaymentReduxForm = reduxForm({
  form: CATEGORY_FORM,
  validate
})(Category);

const AddEditCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(addEditPaymentReduxForm);

export default AddEditCategoryContainer;
