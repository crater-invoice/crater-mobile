import {connect} from 'react-redux';
import Navigation from './navigation';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state),
  endpointApi: state?.common?.endpointApi
});

export const ApplicationNavigator = connect(mapStateToProps)(Navigation);
