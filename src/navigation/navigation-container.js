import {connect} from 'react-redux';
import Navigation from './navigation';
import {commonSelector} from 'stores/common/selectors';
import {checkOTAUpdate, getBootstrap} from '@/features/authentication/actions';

const mapStateToProps = state => ({
  ...commonSelector(state),
  endpointApi: state?.common?.endpointApi,
  isLogin: state?.auth?.isLogin,
  idToken: state?.auth?.idToken
});

const mapDispatchToProps = {
  checkOTAUpdate,
  getBootstrap
};

export const ApplicationNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
