import {connect} from 'react-redux';
import Settings from './list-settings';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const SettingsContainer: any = connect(mapStateToProps)(Settings);
