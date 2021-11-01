import {connect} from 'react-redux';
import {Reports} from '../../components/Reports';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => commonSelector(state);

export default connect(mapStateToProps)(Reports);
