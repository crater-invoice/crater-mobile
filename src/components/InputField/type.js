export type IInputField = {
  input: {
    onChange: Function,
    onBlur: Function,
    onFocus: Function,
    value: string
  },
  meta: {
    error: string,
    submitFailed: Boolean
  },
  options: Array<Object>,

  onSubmitEditing: Function,
  onChangeText: Function,
  onSelectOption: Function,
  setActivity: Function,
  refLinkFn: Function,

  dollarField: Boolean,
  percentageField: Boolean,
  editable: Boolean,
  hideError: Boolean,
  autocomplete: Boolean,
  applyOptionValue: Boolean,
  disabled: Boolean,
  errorNumberOfLines: Boolean,
  isRequired: Boolean,
  rounded: Boolean,
  isCurrencyInput: Boolean,
  secureTextEntry: Boolean,
  lightTheme: Boolean,
  multiline: Boolean,
  autoFocus: Boolean,

  height: Number,
  maxLength: number,

  textStyle: Object,
  validationStyle: Object,
  inputProps: Object,
  leftIconStyle: Object,
  fieldStyle: Object,
  hintStyle: Object,
  containerStyle: Object,
  inputContainerStyle: Object,
  inputStyle: Object,
  secureTextIconContainerStyle: Object,

  keyboardType: string,
  textContentType: string,
  tip: string,
  placeholder: string,
  hint: string,
  leftIcon: String,
  textColor: String,
  returnKeyType: string,
  leftSymbol: String,
  onError: Function
};
