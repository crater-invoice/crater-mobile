import React from 'react';
import { connect } from 'react-redux';
import { Endpoint } from '../../components/Endpoint';
import { reduxForm } from 'redux-form';
import { SET_ENDPOINT_API } from '../../constants';
import * as AuthAction from '../../actions';
import { validate } from './validation';

const mapStateToProps = (state, { navigation }) => {

    const {
        global: { locale, endpointURL },
        auth: { loading }
    } = state

    let CRATER_URL = (typeof endpointURL !== 'undefined' && endpointURL !== null) ? endpointURL : ''

    let skipEndpoint = navigation.getParam('skipEndpoint', false)

    return {
        locale,
        skipEndpoint,
        CRATER_URL,
        loading: loading && loading.pingEndpointLoading,
        initialValues: {
            endpointURL: CRATER_URL,
        }
    };
};

const mapDispatchToProps = {
    saveEndpointApi: AuthAction.saveEndpointApi,
    checkEndpointApi: AuthAction.checkEndpointApi
};

//  Redux Forms
const EndpointReduxForm = reduxForm({
    form: SET_ENDPOINT_API,
    validate
})(Endpoint);

//  connect
const EndpointContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EndpointReduxForm);

EndpointContainer.navigationOptions = () => ({
    header: null
});

export default EndpointContainer;


