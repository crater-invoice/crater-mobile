import {connect} from 'react-redux';
import Reports from './list-reports';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => commonSelector(state);

export const ReportsContainer = connect(mapStateToProps)(Reports);
