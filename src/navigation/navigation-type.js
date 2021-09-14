export interface IProps {
  /**
   * The authenticated token of the current login user.
   */
  idToken: string;

  /**
   * The current locale of an app.
   */
  locale: string;

  /**
   * Check is user login or not.
   */
  isLogin: boolean;

  /**
   * Api url of the domain.
   */
  endpointApi: string;
}

export interface IStates {
  /**
   * Handle keyboard visible behavior.
   */
  isKeyboardOpen: boolean;
}
