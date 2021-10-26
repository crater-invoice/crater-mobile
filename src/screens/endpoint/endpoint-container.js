import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Endpoint from './endpoint';
import {validateEndpoint as validate} from 'stores/common/validator';
import {commonSelector} from 'stores/common/selectors';
import {ENDPOINT_FORM} from 'stores/common/types';

const mapStateToProps = (state, {route}) => ({
  showBackButton: route?.params?.showBackButton,
  ...commonSelector(state),
  initialValues: {
    // url: state?.common?.endpointURL ?? '',
    url: 'http://crater-web.test/'
  }
});

const EndpointForm = reduxForm({form: ENDPOINT_FORM, validate})(Endpoint);

export const EndpointContainer = connect(mapStateToProps)(EndpointForm);
