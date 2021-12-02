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

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * Handle future update.
   */
  checkOTAUpdate: () => void;

  /**
   * Get main app data.
   */
  fetchBootstrap: (fun: object) => void;

  /**
   * An array of objects with data for each ability.
   */
  abilities: Array<any>;
}
