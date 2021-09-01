import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as action from '../../actions';
import TouchOrFaceId from '../../components/Touch-Face-Id';
import { TOUCH_FACE_ID_FORM } from '../../constants';
import { commonSelector } from 'stores/common/selectors';

const mapStateToProps = state => ({
    biometryAuthType: state.common?.biometryAuthType,
    ...commonSelector(state),
    initialValues: {
        biometry: true
    }
});

const mapDispatchToProps = {
    setBiometryAuthType: action.setBiometryAuthType
};

const TouchOrFaceIdReduxForm = reduxForm({
    form: TOUCH_FACE_ID_FORM
})(TouchOrFaceId);

const TouchOrFaceIdContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TouchOrFaceIdReduxForm);

TouchOrFaceIdContainer.navigationOptions = () => ({
    header: null
});

export default TouchOrFaceIdContainer;
