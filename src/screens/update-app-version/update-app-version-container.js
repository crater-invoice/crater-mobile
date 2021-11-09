import {connect} from 'react-redux';
import UpdateAppVersion from './update-app-version';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export default connect(mapStateToProps)(UpdateAppVersion);
