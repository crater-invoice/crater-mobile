import { connect } from 'react-redux';
import { Modal } from '../../components/CompanyModal';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    companies: state.common?.companies ?? [],
    company: state.global?.company,
    ...commonSelector(state)
});

const CompanyModal = connect(mapStateToProps)(Modal);

export default CompanyModal;
