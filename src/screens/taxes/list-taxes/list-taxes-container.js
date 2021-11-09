import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Taxes from './list-taxes';
import {commonSelector} from 'stores/common/selectors';
import {taxTypesSelector} from 'stores/taxes/selectors';
import {TAXES_FORM} from 'stores/taxes/types';

const mapStateToProps = state => ({
  taxTypes: taxTypesSelector(state),
  ...commonSelector(state)
});

const TaxesForm = reduxForm({form: TAXES_FORM})(Taxes);

export const TaxesContainer: any = connect(mapStateToProps)(TaxesForm);
