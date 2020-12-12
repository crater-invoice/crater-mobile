import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as action from '../../actions';
import TouchOrFaceId from '../../components/Touch-Face-Id';
import { TOUCH_FACE_ID_FORM } from '../../constants';

const mapStateToProps = ({ global }) => ({
    locale: global?.locale,
    biometryAuthType: global?.biometryAuthType,
    initialValues: {
        biometry: true
    }
});

const mapDispatchToProps = {
    setBiometryAuthType: action.setBiometryAuthType
};

//  Redux Forms
const TouchOrFaceIdReduxForm = reduxForm({
    form: TOUCH_FACE_ID_FORM
})(TouchOrFaceId);

//  connect
const TouchOrFaceIdContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TouchOrFaceIdReduxForm);

TouchOrFaceIdContainer.navigationOptions = () => ({
    header: null
});

export default TouchOrFaceIdContainer;
