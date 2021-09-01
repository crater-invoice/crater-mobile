import { connect } from 'react-redux';
import { Taxes } from '../../components/Taxes';
import { reduxForm } from 'redux-form';
import { SEARCH_TAX } from '../../constants';
import * as TaxesAction from '../../actions';

const mapStateToProps = ({ settings, common }) => ({
    loading: settings.loading?.getTaxLoading,
    taxTypes: common.taxTypes,
    locale: common?.locale
});

const mapDispatchToProps = {
    getTaxes: TaxesAction.getTaxes
};

const TaxesReduxForm = reduxForm({
    form: SEARCH_TAX
})(Taxes);

const TaxesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaxesReduxForm);

TaxesContainer.navigationOptions = () => ({
    header: null
});

export default TaxesContainer;
