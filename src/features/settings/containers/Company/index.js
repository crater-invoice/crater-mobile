import React from 'react';
import { connect } from 'react-redux';
import { Company } from '../../components/Company';
import { reduxForm, getFormValues } from 'redux-form';
import { EDIT_COMPANY } from '../../constants';
import * as CompanyAction from '../../actions';
import { validate } from './validation';
import { getCountries } from '@/features/customers/actions';

const mapStateToProps = (state) => {
    const {
        settings: {
            loading: {
                editCompanyInfoLoading,
                getCompanyInfoLoading
            }
        },
        global: { locale },
        customers: {
            countries,
            loading: {
                countriesLoading,
            }
        },
    } = state

    return {
        formValues: getFormValues(EDIT_COMPANY)(state) || {},
        locale,
        editCompanyLoading: editCompanyInfoLoading,
        getCompanyInfoLoading,
        countries,
        countriesLoading,
    };
};


const mapDispatchToProps = {
    editCompanyInformation: CompanyAction.editCompanyInformation,
    getCompanyInformation: CompanyAction.getCompanyInformation,
    getCountries
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
