import {connect} from 'react-redux';
import {Endpoint} from '../../components/Endpoint';
import {reduxForm} from 'redux-form';
import {SET_ENDPOINT_API} from '../../constants';
import * as AuthAction from '../../actions';
import {validate} from './validation';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const CRATER_URL = state?.common?.endpointURL ?? '';
  const skipEndpoint = route?.params?.skipEndpoint;

  return {
    skipEndpoint,
    CRATER_URL,
    loading: state?.auth?.loading?.pingEndpointLoading,
    ...commonSelector(state),
    initialValues: {
      endpointURL: CRATER_URL
    }
  };
};

const mapDispatchToProps = {
  saveEndpointApi: AuthAction.saveEndpointApi,
  checkEndpointApi: AuthAction.checkEndpointApi
};

const EndpointReduxForm = reduxForm({
  form: SET_ENDPOINT_API,
  validate
})(Endpoint);

const EndpointContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EndpointReduxForm);

export default EndpointContainer;
