import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Input} from 'react-native-elements';
import debounce from 'lodash/debounce';
import styles from './styles';
import {IProps} from './type.d';
import {colors} from '@/styles';
import {Text, BaseLabel, BaseError, ButtonView, AssetIcon} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {keyboardType, keyboardReturnKeyType} from '@/helpers/keyboard';
import {hasTextLength, hasValue} from '@/constants';

class TextInput extends Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {
      isSecureTextEntry: this.props.secureTextEntry,
      active: false,
      inputVal: ''
    };
  }

  componentDidMount() {
    const {input, isDebounce} = this.props;

    this.initialValue(input?.value);
    this.onErrorCallback = debounce(this.onErrorCallback, 200);
    if (isDebounce) {
      this.onChangeValue = debounce(this.onChangeValue, 500);
    }
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

  onErrorCallback = error => {
    this.props.onError?.(hasValue(error));
  };

  toggleFocus = status => {
    this.setState({active: status});
  };

  onChangeValue = text => {
    this.props.onChangeText?.(text);
  };

  render() {
    const {
      input: {onChange, onFocus},
      hint,
      meta: {error, submitFailed},
      secureTextEntry,
      refLinkFn,
      inputContainerStyle,
      editable = true,
      hideError,
      disabled,
      disabledStyle,
      textColor,
      height,
      setActivity,
      fieldStyle,
      containerStyle,
      leftIcon,
      leftIconSolid = false,
      textStyle,
      inputProps = {},
      rounded,
      isCurrencyInput = false,
      leftIconStyle,
      isRequired = false,
      leftSymbol,
      rightSymbol,
      onError,
      currency,
      theme,
      returnKeyType = keyboardReturnKeyType.NEXT,
      onSubmitEditing,
      placeholder
    } = this.props;

    const {isSecureTextEntry, active, inputVal} = this.state;

    const sign = this.getSign();

    !hideError && onError && this.onErrorCallback(error);
    let leftIconColor =
      theme?.mode === 'dark' && (active || hasTextLength(inputVal))
        ? theme?.text?.secondaryColor
        : theme?.text?.fifthColor;

    let icons = {};
    if (leftIcon) {
      icons = {
        leftIcon: (
          <AssetIcon
            name={leftIcon}
            solid={leftIconSolid}
            size={18}
            color={leftIconColor}
          />
        ),
        leftIconContainerStyle: [
          styles.leftIcon,
          leftIconStyle && leftIconStyle
        ]
      };
    }
    if (isCurrencyInput && currency?.symbol) {
      icons = {
        leftIcon: (
          <View style={styles.leftSymbolView}>
            <Text color={leftIconColor} style={styles.leftSymbol}>
              {currency.symbol}
            </Text>
          </View>
        )
      };
    }
    if (leftSymbol) {
      icons = {
        leftIcon: (
          <View style={styles.leftSymbolView}>
            <Text color={leftIconColor} style={styles.leftSymbol}>
              {leftSymbol}
            </Text>
          </View>
        )
      };
    }

    if (rightSymbol) {
      icons = {
        rightIcon: (
          <View style={styles.rightSymbolView}>
            <Text color={colors.darkGray} medium style={styles.rightSymbol}>
              {rightSymbol}
            </Text>
          </View>
        )
      };
    }

    if (secureTextEntry) {
      icons = {
        rightIcon: (
          <ButtonView
            scale={0.8}
            onPress={this.toggleSecureTextEntry}
            class="justify-center items-center px-15 flex-1"
          >
            <AssetIcon
              name={isSecureTextEntry ? 'eye' : 'eye-slash'}
              size={17}
              color={theme?.icons?.eye?.color}
            />
          </ButtonView>
        )
      };
    }

    let methods: any = {
      onFocus: event => {
        this.toggleFocus(true);
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
        <BaseLabel isRequired={isRequired}>{hint}</BaseLabel>
        <Input
          containerStyle={[
            containerStyle && containerStyle,
            styles.containerStyle
          ]}
          {...icons}
          inputStyle={[
            styles.input(theme, !!icons.leftIcon),
            {
              color: theme?.input?.color
            },
            leftSymbol && styles.withLeftSymbolText,
            rightSymbol && styles.withRightSymbolText,
            active && styles.activeInput,
            textColor && {color: textColor},
            textStyle,
            height && {height},
            inputProps?.multiline && styles.multilineField
          ]}
          inputContainerStyle={[
            styles.inputContainerStyle,
            {
              backgroundColor: theme?.input?.backgroundColor,
              borderColor: theme?.input?.borderColor
            },
            inputContainerStyle && inputContainerStyle,
            rounded && {borderRadius: 5},
            disabled && [
              styles.disabledInput(theme),
              disabledStyle && disabledStyle
            ],
            submitFailed &&
              error && {
                borderColor: theme?.input?.validationBackgroundColor
              }
          ]}
          returnKeyType={returnKeyType}
          onSubmitEditing={e => onSubmitEditing?.(e.nativeEvent.text)}
          placeholder={placeholder}
          keyboardType={this.props.keyboardType ?? keyboardType.DEFAULT}
          {...(this.props.keyboardType &&
            (this.props.keyboardType === keyboardType.EMAIL ||
              this.props.keyboardType === keyboardType.URL) && {
              autoCapitalize: 'none'
            })}
          {...(secureTextEntry && {
            autoCapitalize: 'none'
          })}
          {...inputProps}
          {...methods}
          onChangeText={enteredValue => {
            this.setState({inputVal: enteredValue});
            this.onChangeValue?.(enteredValue);

            isCurrencyInput && this.isNumber(enteredValue)
              ? onChange?.(Math.round(enteredValue * 100))
              : onChange?.(enteredValue);
          }}
          defaultValue={`${inputVal}`}
          secureTextEntry={isSecureTextEntry}
          ref={ref => refLinkFn?.(ref)}
          placeholderTextColor={theme?.input?.placeholderColor}
          editable={editable && !disabled}
          allowFontScaling={false}
          textAlignVertical={inputProps && inputProps?.multiline && 'top'}
          {...(theme?.mode === 'dark' && {
            selectionColor: theme?.text?.primaryColor
          })}
        />
        {sign && (
          <Text positionAbsolute style={styles.signField} opacity={0.6}>
            {sign}
          </Text>
        )}

        <BaseError {...this.props} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currency: currentCurrencySelector(state),
  ...commonSelector(state)
});

export const BaseInput = connect(mapStateToProps)(TextInput);
