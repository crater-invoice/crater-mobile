import {connect} from 'react-redux';
import Webview from './webview';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => ({
  idToken: state.auth?.idToken,
  uri: route.params?.uri,
  headerTitle: route.params?.headerTitle,
  ...commonSelector(state)
});

export default connect(mapStateToProps)(Webview);
