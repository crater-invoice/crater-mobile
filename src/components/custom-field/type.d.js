export interface IProps {
  /**
   * An array of objects with data for each custom field.
   */
  customFields?: Array<any>;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * The name of the active form.
   */
  form?: string;

  /**
   * Gets form data.
   */
  formValues: any;

  /**
   * Type of active feature modal..
   */
  type?: string;

  /**
   * If true the user will be able to update the custom field data.
   */
  isAllowToEdit: boolean;
}
