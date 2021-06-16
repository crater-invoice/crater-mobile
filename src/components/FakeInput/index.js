// @flow

import React, { Component } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import styles from './styles';
import { colors } from '@/styles';
import { Content } from '../Content';
import Lng from '@/lang/i18n';
import { InputField } from '../InputField';
import { AssetIcon } from '../AssetIcon';
import { Text } from '../Text';

type IProps = {
    label: String,
    icon: String,
    onChangeCallback: Function,
    placeholder: String,
    containerStyle: Object,
    rightIcon: String,
    leftIcon: String,
    color: String,
    value: string,
    fakeInput: any,
    fakeInputContainerStyle: Object,
    valueStyle: Object,
    prefixProps: Object,
    loading: Boolean,
    locale: String,
    isRequired: Boolean,
    leftIconSolid: Boolean,
    disabled: Boolean
};

export class FakeInputComponent extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            label,
            icon,
            onChangeCallback,
            placeholder,
            containerStyle,
            fakeInputContainerStyle,
            rightIcon,
            leftIcon,
            fakeInput,
            color,
            values,
            meta: { error, submitFailed } = '',
            valueStyle,
            loading = false,
            placeholderStyle,
            leftIconStyle,
            locale,
            isRequired = false,
            leftIconSolid = true,
            disabled = false,
            prefixProps = null
        } = this.props;

        return (
            <View style={[styles.container, containerStyle && containerStyle]}>
                {label && (
                    <Text dark2 left style={styles.label}>
                        {label}
                        {isRequired ? (
                            <Text danger> *</Text>
                        ) : null}
                    </Text>
                )}
                {fakeInput ? (
                    <TouchableWithoutFeedback
                        onPress={() => onChangeCallback && onChangeCallback()}
                    >
                        <View
                            onLayout={this.saveFakeInputHeight}
                            style={submitFailed && error && styles.pickerError}
                        >
                            {leftIcon && (
                                <AssetIcon
                                    name={leftIcon}
                                    size={16}
                                    color={(color && color) || colors.darkGray}
                                    solid
                                    style={styles.leftIcon}
                                />
                            )}
                            {fakeInput}
                        </View>
                    </TouchableWithoutFeedback>
                ) : prefixProps ? (
                    <View
                        style={[
                            styles.prefixInput,
                            submitFailed &&
                                error && {
                                    ...styles.inputError,
                                    borderBottomWidth: 0
                                }
                        ]}
                    >
                        <View style={styles.prefixLabelContainer}>
                            {prefixProps.icon && (
                                <AssetIcon
                                    name={prefixProps.icon}
                                    size={16}
                                    color={colors.darkGray}
                                    solid={prefixProps.iconSolid}
                                    style={styles.prefixLeftIcon}
                                />
                            )}
                            <Text
                                secondary
                                numberOfLines={1}
                                style={[
                                    styles.textValue,
                                    { color: colors.dark2, fontSize: 16 },
                                    prefixProps.icon && { paddingLeft: 39 }
                                ]}
                            >
                                {`${prefixProps.prefix}-`}
                            </Text>
                        </View>
                        <View style={styles.prefixInputContainer}>
                            <Field
                                name={prefixProps.fieldName}
                                component={InputField}
                                inputProps={{
                                    returnKeyType: 'next',
                                    keyboardType: 'numeric'
                                }}
                                fieldStyle={styles.prefixInputFieldStyle}
                                inputContainerStyle={
                                    styles.prefixInputContainerStyle
                                }
                                textStyle={styles.prefixInputText}
                                hideError={true}
                            />
                        </View>
                    </View>
                ) : (
                    <Content
                        loadingProps={{
                            is: loading,
                            style: styles.loadingFakeInput,
                            size: 'small'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                onChangeCallback && onChangeCallback()
                            }
                            activeOpacity={disabled ? 1 : 0.7}
                        >
                            <View
                                style={[
                                    styles.fakeInput,
                                    fakeInputContainerStyle &&
                                        fakeInputContainerStyle,
                                    submitFailed && error && styles.inputError,
                                    disabled && styles.disabledSelectedValue
                                ]}
                            >
                                {icon && (
                                    <AssetIcon
                                        name={icon}
                                        size={16}
                                        color={
                                            (color && color) || colors.darkGray
                                        }
                                        solid={leftIconSolid}
                                        style={[
                                            styles.leftIcon,
                                            leftIconStyle && leftIconStyle
                                        ]}
                                    />
                                )}

                                {values ? (
                                    <Text
                                        secondary
                                        numberOfLines={1}
                                        style={[
                                            styles.textValue,
                                            color && { color: color },
                                            icon && { paddingLeft: 39 },
                                            rightIcon && styles.hasRightIcon,
                                            valueStyle && valueStyle,
                                            disabled && { opacity: 0.5 }
                                        ]}
                                    >
                                        {values}
                                    </Text>
                                ) : (
                                    <Text
                                      darkGray
                                        numberOfLines={1}
                                        style={[
                                            styles.placeholderText,
                                            placeholderStyle &&
                                                placeholderStyle,
                                            icon && { paddingLeft: 39 },
                                            rightIcon && styles.hasRightIcon,
                                            color && { color: color },
                                            disabled && { opacity: 0.5 }
                                        ]}
                                    >
                                        {placeholder && placeholder}
                                    </Text>
                                )}

                                {rightIcon && (
                                    <AssetIcon
                                        name={rightIcon}
                                        size={18}
                                        color={colors.darkGray}
                                        style={styles.rightIcon}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </Content>
                )}

                {submitFailed && error && (
                    <View style={styles.validation}>
                        <Text
                            white
                            h6
                            numberOfLines={1}
                        >
                            {Lng.t(error, {
                                locale,
                                hint: label
                            })}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {};

export const FakeInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(FakeInputComponent);
