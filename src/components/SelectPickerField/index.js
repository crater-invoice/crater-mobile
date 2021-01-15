// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';
import { FakeInput } from '../FakeInput';
import FakeInputStyle from '../FakeInput/styles';

import { AssetIcon } from '../AssetIcon';
import { colors } from '@/styles';
import { isAndroidPlatform, isIosPlatform } from '@/constants';

type IProps = {
    hint: string,
    lightTheme: boolean,
    disabled: boolean,
    input: {
        onChange: Function,
        value: string
    },
    meta: Object,
    fakeInputContainerStyle: Object,
    defaultPickerOptions: Object,
    items: Array<Object>,
    ref: Function,
    onChangeCallback: Function,
    callbackWhenMount: Function,
    refLinkFn: Function,
    onDonePress: Function,
    doneText: string,
    fieldIcon: string,
    containerStyle: Object,
    fakeInputValueStyle: Object,
    label: String,
    isRequired: Boolean,
    isFakeInput: Boolean
};

export class SelectPickerField extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'angle-down',
            selectedItemValue: ''
        };
    }

    componentDidMount() {
        const {
            input: { value, onChange },
            onChangeCallback,
            callbackWhenMount
        } = this.props;

        onChange(value);
        this.setState({ selectedItemValue: value });
        callbackWhenMount ? callbackWhenMount?.() : onChangeCallback?.(value);
    }

    toggleIcon = () => {
        if (isAndroidPlatform()) {
            return;
        }
        const { icon } = this.state;
        this.setState({
            icon: icon === 'angle-down' ? 'angle-up' : 'angle-down'
        });
    };

    onChange = v => {
        const {
            onChangeCallback,
            input: { onChange }
        } = this.props;

        onChange(v);

        this.setState({ selectedItemValue: v });
        onChangeCallback && onChangeCallback(v);
    };

    onDonePress = selectRef => {
        const { onDonePress, isFakeInput } = this.props;

        onDonePress && onDonePress();
    };

    render() {
        const {
            input: { value },
            meta,
            hint,
            items,
            ref,
            disabled,
            isRequired,
            refLinkFn,
            doneText,
            fieldIcon,
            defaultPickerOptions,
            fakeInputContainerStyle,
            containerStyle,
            label,
            isFakeInput,
            fakeInputValueStyle,
            findValueByForm = true
        } = this.props;

        const { icon, selectedItemValue } = this.state;
        let selectRef = null;
        let selected = [];

        if (findValueByForm)
            selected = items && items.find(item => item.value === value);
        else
            selected =
                items && items.find(item => item.value === selectedItemValue);

        let selectedLabel =
            selected && (selected.displayLabel || selected.label);
        let selectedValue = selected && selected.value;

        let placeHolder = {
            ...{ color: colors.darkGray },
            ...defaultPickerOptions
        };

        const pickerField = (
            <RNPickerSelect
                placeholder={defaultPickerOptions && placeHolder}
                items={items.map(item => ({
                    ...item,
                    color: colors.secondary
                }))}
                onValueChange={v => {
                    this.onChange(v);
                }}
                style={{
                    inputIOS: {
                        ...styles.inputIOS,
                        ...(disabled ? styles.disabledSelectedValue : {}),
                        ...(fakeInputContainerStyle && fakeInputContainerStyle),
                        ...(!isFakeInput && { paddingLeft: 41 })
                    },
                    inputIOSContainer: {
                        ...(isFakeInput && { display: 'none' })
                    },
                    iconContainer: {
                        top: 13,
                        right: 11
                    },
                    placeholder: {
                        fontSize: 15
                    }
                }}
                onOpen={() => this.toggleIcon()}
                onClose={() => this.toggleIcon()}
                value={typeof selectedValue !== 'undefined' && selectedValue}
                placeholderTextColor={colors.darkGray}
                ref={(dropdownRef = {}) => {
                    refLinkFn &&
                        refLinkFn({
                            ...dropdownRef,
                            focus: () =>
                                dropdownRef && dropdownRef.togglePicker()
                        });
                    selectRef = dropdownRef && dropdownRef;
                }}
                Icon={() => (
                    <View>
                        <AssetIcon
                            name={icon}
                            size={18}
                            color={colors.darkGray}
                        />
                    </View>
                )}
                modalProps={{
                    animationType: 'slide'
                }}
                disabled={disabled}
                onDonePress={() => this.onDonePress(selectRef)}
                doneText={doneText}
            >
                {!isIosPlatform() && (
                    <View
                        style={[
                            styles.fakeInput,
                            fakeInputContainerStyle && fakeInputContainerStyle
                        ]}
                    >
                        <Text
                            numberOfLines={1}
                            style={[
                                FakeInputStyle.textValue,
                                { paddingRight: 5 },
                                fakeInputValueStyle && fakeInputValueStyle,
                                !isFakeInput && { paddingLeft: 39 },
                                !selectedValue && { color: colors.darkGray }
                            ]}
                        >
                            {!selectedLabel
                                ? defaultPickerOptions &&
                                  (defaultPickerOptions.displayLabel ||
                                      defaultPickerOptions.label)
                                : selectedLabel}
                        </Text>
                        <AssetIcon
                            name={icon}
                            size={18}
                            color={colors.darkGray}
                            style={styles.rightIcon}
                        />
                    </View>
                )}
            </RNPickerSelect>
        );

        const isFakeDisplay = isIosPlatform() && isFakeInput;

        return (
            <View>
                <FakeInput
                    meta={meta}
                    label={label}
                    isRequired={isRequired}
                    values={
                        isFakeDisplay &&
                        (!selectedLabel
                            ? defaultPickerOptions &&
                              (defaultPickerOptions.displayLabel ||
                                  defaultPickerOptions.label)
                            : selectedLabel)
                    }
                    fakeInput={!isFakeDisplay && pickerField}
                    fakeInputContainerStyle={
                        isFakeDisplay && {
                            ...styles.inputIOS,
                            ...(disabled ? styles.disabledSelectedValue : {}),
                            ...(fakeInputContainerStyle &&
                                fakeInputContainerStyle)
                        }
                    }
                    leftIcon={fieldIcon}
                    disabled={disabled}
                    valueStyle={fakeInputValueStyle}
                    rightIcon={isFakeDisplay && icon}
                    onChangeCallback={() =>
                        isFakeDisplay && selectRef.togglePicker()
                    }
                    containerStyle={containerStyle}
                />
                {isFakeDisplay && pickerField}
            </View>
        );
    }
}
