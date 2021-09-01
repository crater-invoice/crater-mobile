import { connect } from 'react-redux';
import { Modal } from '../../components/CompanyModal';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    companies: state.company?.companies ?? [],
    company: state.global?.company,
    ...commonSelector(state)
});

const CompanyModal = connect(mapStateToProps)(Modal);

export default CompanyModal;
