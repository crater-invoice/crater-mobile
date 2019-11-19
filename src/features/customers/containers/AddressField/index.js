import React from 'react';
import { connect } from 'react-redux';
import { AddressField } from '../../components/AddressField';
import * as AddressAction from '../../actions'

const mapStateToProps = ({ customers, global }) => ({
    countries: customers.countries,
    countriesLoading: customers.loading.countriesLoading,
    states: customers.states,
    statesLoading: customers.loading.statesLoading,
    cities: customers.cities,
    citiesLoading: customers.loading.citiesLoading,
    language: global.language,
});

const mapDispatchToProps = {
    getCountries: AddressAction.getCountries,
    getStates: AddressAction.getStates,
    getCities: AddressAction.getCities,
};


//  connect
const AddressFieldContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddressField);


export default AddressFieldContainer;
