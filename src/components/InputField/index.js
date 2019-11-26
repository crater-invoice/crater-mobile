// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import styles from './styles';
import { IInputField } from './type';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../styles/colors';
import Lng from '../../api/lang/i18n';

export class InputFieldComponent extends Component<IInputField> {
    inputRef = {};

    constructor(props) {
        super(props);

        this.state = {
            isSecureTextEntry: this.props.secureTextEntry,
            active: false,
            inputHeight: 0,
            isOptionsVisible: false,
        };
    }

    toggleSecureTextEntry = () => {
        this.inputRef.blur();
        this.setState((prevState) => ({ isSecureTextEntry: !prevState.isSecureTextEntry }));

        setTimeout(() => {
            this.inputRef.focus();
        }, 100);
    };

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

    saveInputHeight = (event) => {
        const { height } = event.nativeEvent.layout;

        this.setState({ inputHeight: height });
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
            language,
            maxNumber = 0,
            isRequired = false,
            secureTextIconContainerStyle,
        } = this.props;
        const { isSecureTextEntry, active, inputHeight, isOptionsVisible } = this.state;
        const sign = this.getSign();
        const isOptions = autocomplete && isOptionsVisible && !!options.length;

        let initialValueProps = {}

        if(value && isCurrencyInput) {
            const newValue =  (value / 100)
            initialValueProps = { value: `${newValue}` }
        } else {
            initialValueProps = { defaultValue: `${value}` }
        }

        return (
            <View
                style={[
                    styles.inputFieldWrapper,
                    fieldStyle && { ...fieldStyle },
                ]}
            >
                {hint && (
                    <Text h6 bold
                        style={[styles.hint, hintStyle && hintStyle]}>
                        {hint}
                        {isRequired && (
                            <Text style={styles.required}> *</Text>
                        )}
                    </Text>
                )}

                <View style={styles.inputWrapper}>
                    <View onLayout={this.saveInputHeight}>
                        <Input
                            containerStyle={[
                                containerStyle && containerStyle,
                                styles.containerStyle,
                            ]}
                            leftIcon={
                                leftIcon && (
                                    <Icon name={leftIcon} solid={leftIconSolid} size={18} color={colors.darkGray} />
                                )
                            }
                            leftIconContainerStyle={leftIcon &&
                                [styles.leftIcon, leftIconStyle && leftIconStyle]
                            }
                            inputStyle={[
                                styles.input,
                                active && styles.activeInput,
                                textColor && { color: textColor },
                                textStyle && textStyle,
                                height && { height },
                                inputProps.multiline && styles.multilineField
                            ]}
                            inputContainerStyle={[
                                styles.inputContainerStyle,
                                secureTextEntry && styles.inputPassword,
                                inputContainerStyle && inputContainerStyle,
                                rounded && { borderRadius: 5 },
                                disabled && styles.disabledInput,
                                submitFailed && error && styles.inputError,
                            ]}
                            {...inputProps}
                            onChangeText={(enteredValue: string) => {
                                onChangeText && onChangeText(enteredValue);
                                isCurrencyInput ?
                                    onChange(enteredValue * 100) : onChange(enteredValue);

                                setTimeout(() => {
                                    if (this.inputRef) {
                                        this.inputRef.setNativeProps({ text: enteredValue });
                                        this.inputRef.value = isCurrencyInput ?
                                            (enteredValue * 100) : enteredValue;
                                    }
                                });
                            }}
                            onFocus={(event) => {
                                this.setState({
                                    active: true,
                                    isOptionsVisible: true,
                                });
                                setActivity && setActivity(true);
                                if (onFocus) {
                                    onFocus(event);
                                }
                            }}
                            {...initialValueProps}
                            secureTextEntry={isSecureTextEntry}
                            ref={(ref) => {
                                this.inputRef = ref;
                                refLinkFn && refLinkFn(ref);
                            }}
                            placeholderTextColor={colors.darkGray}
                            editable={editable && !disabled}
                            allowFontScaling={false}
                            textAlignVertical={inputProps && inputProps.multiline && 'top'}
                        />
                    </View>
                    {sign && (
                        <Text style={styles.signField} opacity={0.6} >
                            {sign}
                        </Text>
                    )}
                    {secureTextEntry && (
                        <TouchableOpacity onPress={this.toggleSecureTextEntry}
                            style={[styles.icon, secureTextIconContainerStyle && secureTextIconContainerStyle]}
                        >
                            <Icon name={isSecureTextEntry ? 'eye' : 'eye-slash'} size={18} color={colors.dark3} />
                        </TouchableOpacity>
                    )}
                    {!hideError && submitFailed && error && (
                        <View
                            style={[
                                styles.validation,
                                { top: inputHeight },
                                validationStyle && validationStyle,
                            ]}
                        >
                            <Text
                                numberOfLines={errorNumberOfLines || 3}
                                style={{ color: 'white', fontSize: 12 }}
                            >
                                {Lng.t(error, { locale: language, hint, maxNumber })}
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
    language: global.language,
});

const mapDispatchToProps = {};

export const InputField = connect(
    mapStateToProps,
    mapDispatchToProps,
)(InputFieldComponent);
