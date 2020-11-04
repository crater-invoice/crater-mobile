import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import { CUSTOMIZE_FORM } from '../../constants';
import * as customizeAction from '../../actions';
import { Customize } from '../../components/Customize';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale },
        settings: {
            customizes,
            paymentMethods,
            units,
            loading: {
                getCustomizeLoading,
                paymentModesLoading,
                customizeLoading,
                paymentModeLoading,
                itemUnitLoading
            }
        }
    } = state;

    const type = navigation.getParam('type');
    let isLoading =
        getCustomizeLoading ||
        paymentModesLoading ||
        customizes === null ||
        typeof customizes === 'undefined';

    return {
        formValues: getFormValues(CUSTOMIZE_FORM)(state) || {},
        locale,
        type,
        customizes,
        paymentMethods,
        units,
        isLoading,
        loading: customizeLoading,
        paymentModeLoading,
        itemUnitLoading,
        initialValues: !isLoading
            ? {
                  ...customizes.settings,
                  invoice_auto_generate: customizes.settings.invoice_auto_generate === 'YES' || customizes.settings.invoice_auto_generate === 1,
                  estimate_auto_generate: customizes.settings.estimate_auto_generate === 'YES' || customizes.settings.estimate_auto_generate === 1,
                  payment_auto_generate: customizes.settings.payment_auto_generate === 'YES' || customizes.settings.payment_auto_generate === 1
              }
            : null
    };
};

const mapDispatchToProps = {
    // Customize
    getCustomizeSettings: customizeAction.getCustomizeSettings,
    setCustomizeSettings: customizeAction.setCustomizeSettings,
    editCustomizeSettings: customizeAction.editCustomizeSettings,
    editSettingItem: customizeAction.editSettingItem,
    // Payment Methods
    createPaymentMode: customizeAction.createPaymentMode,
    editPaymentMode: customizeAction.editPaymentMode,
    removePaymentMode: customizeAction.removePaymentMode,
    // Item Unit
    createItemUnit: customizeAction.createItemUnit,
    editItemUnit: customizeAction.editItemUnit,
    removeItemUnit: customizeAction.removeItemUnit
};

//  Redux Forms
const CustomizeReduxForm = reduxForm({
    form: CUSTOMIZE_FORM,
    validate
})(Customize);

//  connect
const CustomizeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomizeReduxForm);

CustomizeContainer.navigationOptions = () => ({
    header: null
});

export default CustomizeContainer;
