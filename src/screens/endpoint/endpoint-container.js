import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Endpoint from './endpoint';
import {validateEndpoint as validate} from 'stores/common/validator';
import {commonSelector} from 'stores/common/selectors';
import {ENDPOINT_FORM} from 'stores/common/types';

const mapStateToProps = state => ({
  ...commonSelector(state),
  initialValues: {
    url: state?.common?.endpointURL ?? ''
  }
});

const EndpointForm = reduxForm({form: ENDPOINT_FORM, validate})(Endpoint);

export default connect(mapStateToProps)(EndpointForm);
