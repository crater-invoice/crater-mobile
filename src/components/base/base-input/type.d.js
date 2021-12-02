export interface IProps {
  input: {
    onChange: () => void,
    onBlur: () => void,
    onFocus: () => void,
    value: string
  };
  meta: {
    error: string,
    submitFailed: boolean
  };
  options: Array<Object>;

  onSubmitEditing: () => void;
  onChangeText: () => void;
  onSelectOption: () => void;
  setActivity: () => void;
  refLinkFn: () => void;

  dollarField: boolean;
  percentageField: boolean;
  editable: boolean;
  hideError: boolean;
  autocomplete: boolean;
  applyOptionValue: boolean;
  disabled: boolean;
  errorNumberOfLines: boolean;
  isRequired: boolean;
  rounded: boolean;
  isCurrencyInput: boolean;
  secureTextEntry: boolean;
  lightTheme: boolean;
  multiline: boolean;
  autoFocus: boolean;

  height: Number;
  maxLength: number;

  textStyle: Object;
  validationStyle: Object;
  inputProps: Object;
  leftIconStyle: Object;
  fieldStyle: Object;
  hintStyle: Object;
  containerStyle: Object;
  inputContainerStyle: Object;
  disabledStyle: Object;
  inputStyle: Object;

  keyboardType: string;
  textContentType: string;
  tip: string;
  placeholder: string;
  hint: string;
  leftIcon: string;
  textColor: string;
  returnKeyType: string;
  leftSymbol: string;
  onError: Function;
}
