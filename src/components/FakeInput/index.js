// @flow

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import styles from './styles';
import { colors } from '../../styles/colors';
import { Content } from '../Content';
import Lng from '../../api/lang/i18n';

type IProps = {
    label: String,
    icon: String,
    onChangeCallback: Function,
    placeholder: String,
    containerStyle: Object,
    rightIcon: String,
    leftIcon: String,
    color: String,
    value: String,
    fakeInput: any,
    fakeInputContainerStyle: Object,
    valueStyle: Object,
    loading: Boolean,
    language: String,
    isRequired: Boolean,
    leftIconSolid: Boolean,
    disabled: Boolean,
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
            language,
            isRequired = false,
            leftIconSolid = true,
            disabled = false,
        } = this.props;

        return (
            <View style={[styles.container, containerStyle && containerStyle]}>
                {label && <Text style={styles.label}>
                    {label}
                    {isRequired && (
                        <Text style={styles.required}> *</Text>
                    )}
                </Text>}
                {fakeInput ? (
                    <TouchableWithoutFeedback onPress={() => onChangeCallback && onChangeCallback()}>
                        <View onLayout={this.saveFakeInputHeight}
                            style={submitFailed && error && styles.pickerError}
                        >
                            {leftIcon && (
                                <Icon
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
                ) : (
                        <Content
                            loadingProps={{
                                is: loading,
                                style: styles.loadingFakeInput
                            }}
                        >

                            <TouchableOpacity
                                onPress={() => onChangeCallback && onChangeCallback()
                                }
                                activeOpacity={disabled ? 1 : 0.7}
                            >
                                <View
                                    style={[
                                        styles.fakeInput,
                                        fakeInputContainerStyle && fakeInputContainerStyle,
                                        submitFailed && error && styles.inputError,
                                        disabled && styles.disabledSelectedValue
                                    ]}
                                >

                                    {icon && (
                                        <Icon
                                            name={icon}
                                            size={16}
                                            color={(color && color) || colors.darkGray}
                                            solid={leftIconSolid}
                                            style={[styles.leftIcon, leftIconStyle && leftIconStyle]}
                                        />
                                    )}

                                    {values ? (
                                        <Text
                                            numberOfLines={1}
                                            style={[
                                                styles.textValue,
                                                color && { color: color },
                                                icon && { paddingLeft: 39 },
                                                rightIcon && styles.hasRightIcon,
                                                valueStyle && valueStyle
                                            ]}
                                        >
                                            {values}
                                        </Text>
                                    ) : (
                                            <Text
                                                numberOfLines={1}
                                                style={[
                                                    styles.placeholderText,
                                                    placeholderStyle && placeholderStyle,
                                                    icon && { paddingLeft: 39 },
                                                    rightIcon && styles.hasRightIcon,
                                                    color && { color: color }
                                                ]}
                                            >
                                                {placeholder && placeholder}
                                            </Text>
                                        )}

                                    {rightIcon && (
                                        <Icon
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
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: 12 }}>
                            {Lng.t(error, {
                                locale: language,
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
    language: global.language,
});

const mapDispatchToProps = {};

export const FakeInput = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FakeInputComponent);

