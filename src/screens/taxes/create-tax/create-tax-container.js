import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import CreateTax from './create-tax';
import {validate} from 'stores/taxes/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/taxes/selectors';
import {CREATE_TAX_FORM} from 'stores/taxes/types';

const mapStateToProps = (state, {route}) => ({
  ...loadingSelector(state),
  ...commonSelector(state),
  ...permissionSelector(route),
  initialValues: {
    name: null,
    percent: null,
    description: null,
    compound_tax: false
  }
});

const CreateTaxForm = reduxForm({form: CREATE_TAX_FORM, validate})(CreateTax);

export const CreateTaxContainer = connect(mapStateToProps)(CreateTaxForm);
