import {connect} from 'react-redux';
import Navigation from './navigation';

const mapStateToProps = state => ({
  theme: state?.common?.theme,
  abilities: state?.common?.abilities,
  endpointApi: state?.common?.endpointApi,
  isLogin: state?.auth?.isLogin
});

export const ApplicationNavigator = connect(mapStateToProps)(Navigation);
