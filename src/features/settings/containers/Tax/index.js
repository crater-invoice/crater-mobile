import {connect} from 'react-redux';
import {Tax} from '../../components/Tax';
import {reduxForm} from 'redux-form';
import * as TaxAction from '../../actions';
import {validate} from './validation';
import {TAX_FORM} from '../../constants';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {settings} = state;
  const taxType = route?.params?.tax;
  const isLoading =
    settings.loading.editTaxLoading ||
    settings.loading.addTaxLoading ||
    settings.loading.removeTaxLoading;

  return {
    loading: isLoading,
    taxId: taxType && taxType.id,
    ...permissionSelector(route),
    ...commonSelector(state),
    initialValues: {
      collective_tax: 0,
      compound_tax: 0,
      ...taxType
    }
  };
};

const mapDispatchToProps = {
  addTax: TaxAction.addTax,
  editTax: TaxAction.editTax,
  removeTax: TaxAction.removeTax
};

const TaxReduxForm = reduxForm({
  form: TAX_FORM,
  validate
})(Tax);

const TaxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxReduxForm);

export default TaxContainer;
