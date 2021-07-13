import { connect } from 'react-redux';
import { Modal } from '../../components/CompanyModal';

const mapStateToProps = ({ global, common }) => ({
    companies: common?.companies ?? [],
    company: global?.company,
    theme: global?.theme,
    locale: global?.locale
});

const CompanyModal = connect(mapStateToProps)(Modal);

export default CompanyModal;
