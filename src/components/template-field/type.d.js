export type IProps = {
  /**
   * Object of Search-Input props.
   */
  input: Object,

  /**
   * Return when field value change.
   */
  onChangeCallback: () => void,

  /**
   * Content-Container style.
   */
  containerStyle: Object,

  /**
   * An array of objects with data for each template.
   */
  templates: Array,

  /**
   * Label for Fake-input.
   */
  label: string,

  /**
   * Icon for Fake-input.
   */
  icon: string,

  /**
   * Placeholder for Fake-input.
   */
  placeholder: string,

  /**
   * Meta props for Fake-Input field.
   */
  meta: Object,

  /**
   * Is field is disabled.
   */
  disabled: boolean,

  /**
   * Is field is required.
   */
  isRequired: boolean
};
