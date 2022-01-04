import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Taxation from './taxation';
import {commonSelector} from 'stores/common/selectors';
import {TAXATION_FORM} from 'stores/taxation/types';
import getFormValues from 'redux-form/lib/getFormValues';

const mapStateToProps = state => ({
  ...commonSelector(state),
  isSaving: state?.taxation?.isSaving,
  formValues: getFormValues(TAXATION_FORM)(state) || {}
});

const TaxationForm = reduxForm({form: TAXATION_FORM})(Taxation);

export const TaxationContainer = connect(mapStateToProps)(TaxationForm);
