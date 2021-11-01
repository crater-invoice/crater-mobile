import {connect} from 'react-redux';
import {Settings} from '../../components/Settings';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => commonSelector(state);

const SettingContainer = connect(mapStateToProps)(Settings);

export default SettingContainer;
