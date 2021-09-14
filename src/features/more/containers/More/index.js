import {connect} from 'react-redux';
import {More} from '../../components/More';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

const MoreContainer = connect(mapStateToProps)(More);

export default MoreContainer;
