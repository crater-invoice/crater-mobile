import React from 'react';
import { connect } from 'react-redux';
import { Tax } from '../../components/Tax';
import { reduxForm } from 'redux-form';
import * as TaxAction from '../../actions';
import { validate } from './validation';
import { TAX_FORM, ADD_TAX } from '../../constants';

const mapStateToProps = ({ settings, global }, { navigation }) => {

    const taxType = navigation.getParam('tax', {})
    const type = navigation.getParam('type', ADD_TAX)

    const isLoading = settings.loading.editTaxLoading || settings.loading.addTaxLoading || settings.loading.removeTaxLoading


    return {
        loading: isLoading,
        type,
        taxId: taxType && taxType.id,
        language: global.language,
        initialValues: {
            collective_tax: 0,
            compound_tax: 0,
            ...taxType
        }
    }
};

const mapDispatchToProps = {
    addTax: TaxAction.addTax,
    editTax: TaxAction.editTax,
    removeTax: TaxAction.removeTax,
};

//  Redux Forms
const TaxReduxForm = reduxForm({
    form: TAX_FORM,
    validate,
})(Tax);

//  connect
const TaxContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaxReduxForm);

TaxContainer.navigationOptions = () => ({
    header: null,
});

export default TaxContainer;
