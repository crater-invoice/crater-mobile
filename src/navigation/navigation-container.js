import {connect} from 'react-redux';
import Navigation from './navigation';
import {commonSelector} from 'stores/common/selectors';
import {fetchBootstrap, checkOTAUpdate} from 'stores/common/actions';

const mapStateToProps = state => ({
  ...commonSelector(state),
  endpointApi: state?.common?.endpointApi,
  isLogin: state?.auth?.isLogin,
  idToken: state?.auth?.idToken
});

const mapDispatchToProps = {
  checkOTAUpdate,
  fetchBootstrap
};

export const ApplicationNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
