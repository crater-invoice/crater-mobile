import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Input} from 'react-native-elements';
import debounce from 'lodash/debounce';
import styles from './styles';
import {IInputField} from './type';
import {AssetIcon} from '../AssetIcon';
import {colors} from '@/styles';
import t from 'locales/use-translation';
import {hasTextLength, hasValue} from '@/constants';
import {Text} from '../Text';
import {Label} from '../Label';
import {commonSelector} from 'stores/common/selectors';

export class InputFieldComponent extends Component<IInputField> {
  constructor(props) {
    super(props);

    this.state = {
      isSecureTextEntry: this.props.secureTextEntry,
      active: false,
      inputHeight: 0,
      isOptionsVisible: false,
      autoHeight: props?.defaultHeight ? props?.defaultHeight : null,
      inputVal: ''
    };
  }

  componentDidMount() {
    this.initialValue(this.props.input?.value);
    this.setHeight = debounce(this.setHeight, 100);
    this.onErrorCallback = debounce(this.onErrorCallback, 200);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps?.input?.value !== this.props.input?.value)
      this.initialValue(nextProps?.input?.value);
  }

  initialValue = value => {
    const {isCurrencyInput} = this.props;

    if (value && isCurrencyInput && this.isNumber(value)) {
      this.setState({inputVal: `${value / 100}`});
      return;
    }

    this.setState({inputVal: `${value}`});
  };

  toggleSecureTextEntry = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState(({isSecureTextEntry}) => ({
      isSecureTextEntry: !isSecureTextEntry
    }));
  };

  isNumber = text => !isNaN(parseFloat(text)) && isFinite(text);

  getSign = () => {
    const {dollarField, percentageField} = this.props;

    if (dollarField) {
      return '$';
    }

    if (percentageField) {
      return '%';
    }

    return null;
  };

  saveInputHeight = event => {
    const {height} = event.nativeEvent.layout;
    this.setState({inputHeight: height});
  };

  setHeight = height => {
    const {defaultHeight} = this.props;

    if (height && defaultHeight && height <= defaultHeight) {
      this.setState({autoHeight: defaultHeight});
      return;
    }

    if (height >= 300) {
      this.setState({autoHeight: 300});
      return;
    }

    this.setState({autoHeight: height});
  };

  onErrorCallback = error => {
    this.props.onError?.(hasValue(error));
  };

  toggleFocus = status => {
    this.setState({active: status});
  };

  render() {
    const {
      input: {onChange, onFocus},
      hint,
      meta: {error, submitFailed},
      secureTextEntry,
      refLinkFn,
      tip,
      inputContainerStyle,
      onChangeText,
      editable = true,
      hideError,
      autocomplete,
      options,
      disabled,
      textColor,
      height,
      setActivity,
      errorNumberOfLines,
      fieldStyle,
      hintStyle,
      containerStyle,
      leftIcon,
      leftIconSolid = false,
      textStyle,
      validationStyle,
      inputProps,
      rounded,
      isCurrencyInput = false,
      leftIconStyle,
      maxNumber = 0,
      maxCharacter = 0,
      minCharacter = 0,
      isRequired = false,
      secureTextIconContainerStyle,
      leftSymbol,
      autoHeight = false,
      onError,
      currency,
      theme
    } = this.props;

    const {
      isSecureTextEntry,
      active,
      inputHeight,
      isOptionsVisible,
      inputVal
    } = this.state;

    const sign = this.getSign();
    const isOptions = autocomplete && isOptionsVisible && !!options.length;

    !hideError && onError && this.onErrorCallback(error);

    let leftIconSymbol = {};
    if (leftIcon) {
      leftIconSymbol = {
        leftIcon: (
          <AssetIcon
            name={leftIcon}
            solid={leftIconSolid}
            size={18}
            color={colors.darkGray}
          />
        ),
        leftIconContainerStyle: [
          styles.leftIcon,
          leftIconStyle && leftIconStyle
        ]
      };
    }
    if (isCurrencyInput && currency?.symbol) {
      leftIconSymbol = {
        leftIcon: (
          <View style={styles.leftSymbolView}>
            <Text
              color={
                active || hasTextLength(inputVal)
                  ? theme?.text?.secondaryColor
                  : theme?.text?.fifthColor
              }
              style={styles.leftSymbol}
            >
              {currency.symbol}
            </Text>
          </View>
        )
      };
    }
    if (leftSymbol) {
      leftIconSymbol = {
        leftIcon: (
          <View style={styles.leftSymbolView}>
            <Text
              color={
                active || hasTextLength(inputVal)
                  ? theme?.text?.secondaryColor
                  : theme?.text?.fifthColor
              }
              style={styles.leftSymbol}
            >
              {leftSymbol}
            </Text>
          </View>
        )
      };
    }

    let autoHeightInputProps = {};

    if (autoHeight) {
      autoHeightInputProps = {
        onContentSizeChange: event => {
          this.setHeight(event?.nativeEvent?.contentSize?.height);
        }
      };
    }

    let methods: any = {
      onFocus: event => {
        this.toggleFocus(true);
        this.setState({isOptionsVisible: true});
        setActivity?.(true);
        onFocus?.(event);
      },
      ...(!inputProps?.multiline && {
        blurOnSubmit: inputProps?.onSubmitEditing ? false : true
      }),
      ...(!inputProps?.multiline && {
        onEndEditing: () => this.toggleFocus(false)
      }),
      ...(inputProps?.multiline && {
        onBlur: () => this.toggleFocus(false)
      })
    };

    return (
      <View style={[styles.inputFieldWrapper, fieldStyle && {...fieldStyle}]}>
        <Label
          h5
          theme={theme}
          isRequired={isRequired}
          medium={theme?.mode === 'dark'}
        >
          {hint}
        </Label>

        <View style={styles.inputWrapper}>
          <View onLayout={this.saveInputHeight}>
            <Input
              containerStyle={[
                containerStyle && containerStyle,
                styles.containerStyle
              ]}
              {...leftIconSymbol}
              inputStyle={[
                styles.input(theme),
                {
                  color: theme?.input?.color
                },
                leftSymbol && styles.withLeftSymbolText,
                active && styles.activeInput,
                textColor && {color: textColor},
                textStyle && textStyle,
                height && {height},
                autoHeight && {height: this.state.autoHeight},
                inputProps.multiline && styles.multilineField
              ]}
              inputContainerStyle={[
                styles.inputContainerStyle,
                {
                  backgroundColor: theme?.input?.backgroundColor,
                  borderColor: theme?.input?.borderColor
                },
                secureTextEntry && styles.inputPassword,
                inputContainerStyle && inputContainerStyle,
                rounded && {borderRadius: 5},
                disabled && styles.disabledInput(theme),
                submitFailed &&
                  error && {
                    borderColor: theme?.input?.validationBackgroundColor
                  }
              ]}
              {...inputProps}
              {...autoHeightInputProps}
              {...methods}
              onChangeText={enteredValue => {
                this.setState({inputVal: enteredValue});
                onChangeText?.(enteredValue);

                isCurrencyInput && this.isNumber(enteredValue)
                  ? onChange(Math.round(enteredValue * 100))
                  : onChange(enteredValue);
              }}
              defaultValue={`${inputVal}`}
              secureTextEntry={isSecureTextEntry}
              ref={ref => refLinkFn?.(ref)}
              placeholderTextColor={theme?.input?.placeholderColor}
              editable={editable && !disabled}
              allowFontScaling={false}
              textAlignVertical={inputProps && inputProps.multiline && 'top'}
              {...(theme?.mode === 'dark' && {
                selectionColor: theme?.text?.primaryColor
              })}
            />
          </View>
          {sign && (
            <Text positionAbsolute style={styles.signField} opacity={0.6}>
              {sign}
            </Text>
          )}
          {secureTextEntry && (
            <TouchableOpacity
              onPress={this.toggleSecureTextEntry}
              style={[
                styles.icon,
                secureTextIconContainerStyle && secureTextIconContainerStyle
              ]}
              hitSlop={{
                top: 13,
                left: 13,
                bottom: 13,
                right: 13
              }}
            >
              <AssetIcon
                name={isSecureTextEntry ? 'eye' : 'eye-slash'}
                size={18}
                color={theme?.icons?.eye?.color}
              />
            </TouchableOpacity>
          )}
          {!hideError && submitFailed && error && (
            <View
              style={[
                styles.validation,
                {top: inputHeight},
                validationStyle && validationStyle
              ]}
            >
              <Text
                white
                h6
                numberOfLines={errorNumberOfLines || 3}
                medium={theme?.mode === 'dark'}
              >
                {t(error, {
                  hint,
                  maxNumber,
                  maxCharacter,
                  minCharacter
                })}
              </Text>
            </View>
          )}
          {!(submitFailed && error) && !isOptions && tip && (
            <Text
              white
              positionAbsolute
              numberOfLines={3}
              style={styles.inputTip}
            >
              {tip}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.common?.currency,
  ...commonSelector(state)
});

export const InputField = connect(mapStateToProps)(InputFieldComponent);
