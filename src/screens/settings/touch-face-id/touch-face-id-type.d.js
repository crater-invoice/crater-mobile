import {INavigation, ITheme} from '@/interfaces';

export interface IProps {
  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation: INavigation;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * onSubmit handler.
   * It will run validation, both sync and async, and, if the form is valid, it will call this.props.onSubmit(data) with the contents of the form data.
   */
  handleSubmit: (fun: object) => any;

  /**
   * The loading indicator for the button.
   */
  isSaving: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Current navigation object values.
   */
  route: any;

  /**
   * Available biometric auth type.
   */
  biometryAuthType: 'FINGERPRINT' | 'FACE' | string;
}

export interface IStates {
  /**
   * If true, biometry auth is supported in this device.
   * @default true
   */
  isCompatible: boolean;

  /**
   * If true, biometry auth is enrolled in the current user.
   */
  isEnrolled: boolean;

  /**
   * Available biometric auth type.
   */
  supportBiometryType: 'FINGERPRINT' | 'FACE' | string;

  /**
   * If true, show touch/face recognition view.
   */
  isAllowToScan: boolean;

  /**
   * The loading indicator for the button.
   */
  loading: boolean;

  /**
   * If true, hide touch/face recognition view animation.
   */
  stopScanAnimation: boolean;
}
