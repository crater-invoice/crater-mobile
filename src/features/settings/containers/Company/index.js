import React from 'react';
import { connect } from 'react-redux';
import { Company } from '../../components/Company';
import { reduxForm, getFormValues } from 'redux-form';
import { EDIT_COMPANY } from '../../constants';
import * as CompanyAction from '../../actions';
import { validate } from './validation';
import * as AddressAction from '../../../customers/actions';


const mapStateToProps = (state) => {
    const {
        settings: {
            loading: {
                editCompanyInfoLoading,
                getCompanyInfoLoading
            }
        },
        global: { language },
        customers: {
            countries,
            loading: {
                countriesLoading,
                statesLoading,
                citiesLoading,
            }
        },
    } = state

    return {
        formValues: getFormValues(EDIT_COMPANY)(state) || {},
        language,
        editCompanyLoading: editCompanyInfoLoading,
        getCompanyInfoLoading,
        countries,
        countriesLoading,
        statesLoading,
        citiesLoading
    };
};


const mapDispatchToProps = {
    editCompanyInformation: CompanyAction.editCompanyInformation,
    getCompanyInformation: CompanyAction.getCompanyInformation,
    getCountries: AddressAction.getCountries,
    getStates: AddressAction.getStates,
    getCities: AddressAction.getCities
};

//  Redux Forms
const CompanyReduxForm = reduxForm({
    form: EDIT_COMPANY,
    validate,
})(Company);

//  connect
const CompanyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompanyReduxForm);

CompanyContainer.navigationOptions = () => ({
    header: null,
});

export default CompanyContainer;
