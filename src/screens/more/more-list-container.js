import {connect} from 'react-redux';
import More from './more-list';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const MoreContainer = connect(mapStateToProps)(More);
