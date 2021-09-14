import {connect} from 'react-redux';
import Navigation from './navigation';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state),
  endpointApi: state?.common?.endpointApi,
  isLogin: state?.auth?.isLogin,
  idToken: state?.auth?.idToken
});

export const ApplicationNavigator = connect(mapStateToProps)(Navigation);
