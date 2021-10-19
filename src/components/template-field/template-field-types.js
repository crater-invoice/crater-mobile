export type IProps = {
  /**
   * Object of Search-Input props.
   */
  input: Object,

  /**
   * Return when field value change.
   */
  onChangeCallback: Function,

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
  label: String,

  /**
   * Icon for Fake-input.
   */
  icon: String,

  /**
   * Placeholder for Fake-input.
   */
  placeholder: String,

  /**
   * Meta props for Fake-Input field.
   */
  meta: Object,

  /**
   * Is field is disabled.
   */
  disabled: Boolean,

  /**
   * Is field is required.
   */
  isRequired: Boolean
};
