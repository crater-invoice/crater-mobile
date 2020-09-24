import React from 'react';
import { connect } from 'react-redux';
import { Taxes } from '../../components/Taxes';
import { reduxForm } from 'redux-form';
import { SEARCH_TAX } from '../../constants';
import * as TaxesAction from '../../actions';

const mapStateToProps = ({ settings, global }) => ({
    loading: settings.loading.getTaxLoading,
    taxTypes: global.taxTypes,
    language: global.language
});

const mapDispatchToProps = {
    getTaxes: TaxesAction.getTaxes
};

//  Redux Forms
const TaxesReduxForm = reduxForm({
    form: SEARCH_TAX,
})(Taxes);

//  connect
const TaxesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaxesReduxForm);

TaxesContainer.navigationOptions = () => ({
    header: null,
});

export default TaxesContainer;
