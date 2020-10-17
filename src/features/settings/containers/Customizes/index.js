import React from 'react';
import { connect } from 'react-redux';
import { Customizes } from '../../components/Customizes';
import * as customizesAction from '../../actions';

const mapStateToProps = ({
    settings: {
        loading: { paymentModesLoading, itemUnitsLoading }
    },
    global: { locale }
}) => ({
    locale,
    paymentModesLoading,
    itemUnitsLoading
});

const mapDispatchToProps = {
    getCustomizeSettings: customizesAction.getCustomizeSettings,
    getPaymentModes: customizesAction.getPaymentModes,
    getItemUnits: customizesAction.getItemUnits
};

// connect
const CustomizesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Customizes);

CustomizesContainer.navigationOptions = () => ({
    header: null
});

export default CustomizesContainer;
