// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import debounce from 'lodash/debounce';
import styles from './styles';
import { IInputField } from './type';
import { AssetIcon } from '../AssetIcon';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { hasValue } from '@/constants';

export class InputFieldComponent extends Component<IInputField> {
    constructor(props) {
        super(props);

        this.state = {
            isSecureTextEntry: this.props.secureTextEntry,
            active: false,
            inputHeight: 0,
            isOptionsVisible: false,
            autoHeight: props?.defaultHeight ? props?.defaultHeight : null
        };
    }

    componentDidMount() {
        this.setHeight = debounce(this.setHeight, 100);
        this.onErrorCallback = debounce(this.onErrorCallback, 200);
    }

    toggleSecureTextEntry = () => {
        this.setState(({ isSecureTextEntry }) => ({
            isSecureTextEntry: !isSecureTextEntry
        }));
    };

    isNumber = text => !isNaN(parseFloat(text)) && isFinite(text);

    getSign = () => {
        const { dollarField, percentageField } = this.props;

        if (dollarField) {
            return '$';
        }

        if (percentageField) {
            return '%';
        }

        return null;
    };

    saveInputHeight = event => {
        const { height } = event.nativeEvent.layout;
        this.setState({ inputHeight: height });
    };

    setHeight = height => {
        const { defaultHeight } = this.props;

        if (height && defaultHeight && height <= defaultHeight) {
            this.setState({ autoHeight: defaultHeight });
            return;
        }

        if (height >= 300) {
            this.setState({ autoHeight: 300 });
            return;
        }

        this.setState({ autoHeight: height });
    };

    onErrorCallback = error => {
        this.props.onError?.(hasValue(error));
    };

    render() {
        const {
            input: { onChange, onBlur, onFocus, value },
            hint,
            meta: { error, submitFailed },
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
            locale,
            maxNumber = 0,
            maxCharacter = 0,
            minCharacter = 0,
            isRequired = false,
            secureTextIconContainerStyle,
            leftSymbol,
            autoHeight = false,
            onError
        } = this.props;

        const {
            isSecureTextEntry,
            active,
            inputHeight,
            isOptionsVisible
        } = this.state;

        const sign = this.getSign();
        const isOptions = autocomplete && isOptionsVisible && !!options.length;

        let initialValueProps = {};

        if (value && isCurrencyInput && this.isNumber(value)) {
            const newValue = value / 100;
            initialValueProps = { value: `${newValue}` };
        } else {
            initialValueProps = { defaultValue: `${value}` };
        }

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
        if (leftSymbol) {
            leftIconSymbol = {
                leftIcon: (
                    <View style={styles.leftSymbolView}>
                        <Text style={styles.leftSymbol}>{leftSymbol}</Text>
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
            ...(!inputProps?.multiline && {
                blurOnSubmit: inputProps?.onSubmitEditing ? false : true
            })
        };

        return (
            <View
                style={[
                    styles.inputFieldWrapper,
                    fieldStyle && { ...fieldStyle }
                ]}
            >
                {hint && (
                    <Text h6 bold style={[styles.hint, hintStyle && hintStyle]}>
                        {hint}
                        {isRequired ? (
                            <Text style={styles.required}> *</Text>
                        ) : null}
                    </Text>
                )}

                <View style={styles.inputWrapper}>
                    <View onLayout={this.saveInputHeight}>
                        <Input
                            containerStyle={[
                                containerStyle && containerStyle,
                                styles.containerStyle
                            ]}
                            {...leftIconSymbol}
                            inputStyle={[
                                styles.input,
                                active && styles.activeInput,
                                textColor && { color: textColor },
                                textStyle && textStyle,
                                height && { height },
                                autoHeight && { height: this.state.autoHeight },
                                inputProps.multiline && styles.multilineField
                            ]}
                            inputContainerStyle={[
                                styles.inputContainerStyle,
                                secureTextEntry && styles.inputPassword,
                                inputContainerStyle && inputContainerStyle,
                                rounded && { borderRadius: 5 },
                                disabled && styles.disabledInput,
                                submitFailed && error && styles.inputError
                            ]}
                            {...inputProps}
                            {...autoHeightInputProps}
                            {...methods}
                            onChangeText={enteredValue => {
                                onChangeText?.(enteredValue);

                                isCurrencyInput && this.isNumber(enteredValue)
                                    ? onChange(enteredValue * 100)
                                    : onChange(enteredValue);
                            }}
                            onFocus={event => {
                                this.setState({
                                    active: true,
                                    isOptionsVisible: true
                                });
                                setActivity?.(true);
                                if (onFocus) {
                                    onFocus(event);
                                }
                            }}
                            {...initialValueProps}
                            secureTextEntry={isSecureTextEntry}
                            ref={ref => refLinkFn?.(ref)}
                            placeholderTextColor={colors.darkGray}
                            editable={editable && !disabled}
                            allowFontScaling={false}
                            textAlignVertical={
                                inputProps && inputProps.multiline && 'top'
                            }
                        />
                    </View>
                    {sign && (
                        <Text style={styles.signField} opacity={0.6}>
                            {sign}
                        </Text>
                    )}
                    {secureTextEntry && (
                        <TouchableOpacity
                            onPress={this.toggleSecureTextEntry}
                            style={[
                                styles.icon,
                                secureTextIconContainerStyle &&
                                    secureTextIconContainerStyle
                            ]}
                        >
                            <AssetIcon
                                name={isSecureTextEntry ? 'eye' : 'eye-slash'}
                                size={18}
                                color={colors.dark3}
                            />
                        </TouchableOpacity>
                    )}
                    {!hideError && submitFailed && error && (
                        <View
                            style={[
                                styles.validation,
                                { top: inputHeight },
                                validationStyle && validationStyle
                            ]}
                        >
                            <Text
                                numberOfLines={errorNumberOfLines || 3}
                                style={{
                                    color: 'white',
                                    fontSize: 12,
                                    textAlign: 'left'
                                }}
                            >
                                {Lng.t(error, {
                                    locale,
                                    hint,
                                    maxNumber,
                                    maxCharacter,
                                    minCharacter
                                })}
                            </Text>
                        </View>
                    )}
                    {!(submitFailed && error) && !isOptions && tip && (
                        <Text numberOfLines={3} style={styles.inputTip}>
                            {tip}
                        </Text>
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {};

export const InputField = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputFieldComponent);
