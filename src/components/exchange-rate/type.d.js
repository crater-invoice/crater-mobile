export interface IProps {
  /**
   * Props object from parent props.
   */
  props?: Object;

  /**
   * States object from parent props.
   */
  state?: Object;

  /**
   * States object from parent props.
   */
  setExchangeRate?: (fun: object) => void;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;
}

export interface IStates {
  /**
   * The loading indicator for the refresh button.
   */
  refreshing?: Boolean;
}
