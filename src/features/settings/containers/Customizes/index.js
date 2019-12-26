import React from 'react';
import { connect } from 'react-redux';
import { Customizes } from '../../components/Customizes';
import * as customizesAction from '../../actions'

const mapStateToProps = ({ more, global }) => ({
    language: global.language
});

const mapDispatchToProps = {
    getCustomizeSettings: customizesAction.getCustomizeSettings,
};


// connect
const CustomizesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Customizes);

CustomizesContainer.navigationOptions = () => ({
    header: null
});

export default CustomizesContainer;
