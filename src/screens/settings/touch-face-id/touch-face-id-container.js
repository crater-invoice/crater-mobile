import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import TouchOrFaceId from './touch-face-id';
import {commonSelector} from 'stores/common/selectors';
import {TOUCH_FACE_ID_FORM} from 'stores/setting/types';

const mapStateToProps = state => ({
  biometryAuthType: state.common?.biometryAuthType,
  initialValues: {biometry: true},
  ...commonSelector(state)
});

const TouchOrFaceIdForm = reduxForm({form: TOUCH_FACE_ID_FORM})(TouchOrFaceId);

export const TouchOrFaceIdContainer = connect(mapStateToProps)(
  TouchOrFaceIdForm
);
