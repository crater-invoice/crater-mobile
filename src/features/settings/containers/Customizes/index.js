import { connect } from 'react-redux';
import { Customizes } from '../../components/Customizes';
import * as customizesAction from '../../actions';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = state => ({
    ...state.settings.loading,
    ...commonSelector(state)
});

const mapDispatchToProps = {
    getCustomizeSettings: customizesAction.getCustomizeSettings,
    getPaymentModes: customizesAction.getPaymentModes,
    getItemUnits: customizesAction.getItemUnits
};

const CustomizesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Customizes);

CustomizesContainer.navigationOptions = () => ({
    header: null
});

export default CustomizesContainer;
