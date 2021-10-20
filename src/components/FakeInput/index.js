import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import styles from './styles';
import {colors} from '@/styles';
import {Content} from '../Content';
import {InputField} from '../InputField';
import {AssetIcon} from '../AssetIcon';
import {Text} from '../Text';
import {BaseError, BaseLabel} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {keyboardType} from '@/constants';

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
      meta: {error, submitFailed} = '',
      valueStyle,
      loading = false,
      placeholderStyle,
      leftIconStyle,
      isRequired = false,
      leftIconSolid = true,
      disabled = false,
      prefixProps = null,
      leftSymbol,
      leftSymbolStyle,
      theme
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <BaseLabel isRequired={isRequired}>{label}</BaseLabel>
        {fakeInput ? (
          <TouchableWithoutFeedback onPress={() => onChangeCallback?.()}>
            <View style={submitFailed && error && styles.pickerError}>
              {leftIcon && (
                <AssetIcon
                  name={leftIcon}
                  size={16}
                  color={
                    color
                      ? color
                      : values
                      ? theme?.icons?.primaryColor
                      : theme?.icons?.secondaryColor
                  }
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
              styles.prefixInput(theme),
              submitFailed &&
                error && {
                  ...styles.inputError,
                  borderBottomWidth: 0
                },
              disabled && styles.disabledSelectedValue(theme)
            ]}
          >
            <View style={styles.prefixLabelContainer}>
              {prefixProps.icon && (
                <AssetIcon
                  name={prefixProps.icon}
                  size={16}
                  color={theme?.icons?.primaryColor}
                  solid={prefixProps.iconSolid}
                  style={styles.prefixLeftIcon}
                />
              )}
              <Text
                color={theme?.text?.secondaryColor}
                numberOfLines={1}
                style={[
                  styles.textValue,
                  {
                    fontSize: 16
                  },
                  prefixProps.icon && {paddingLeft: 39}
                ]}
              >
                {`${prefixProps.prefix}-`}
              </Text>
            </View>
            <View style={styles.prefixInputContainer}>
              <Field
                name={prefixProps.fieldName}
                component={InputField}
                keyboardType={keyboardType.NUMERIC}
                fieldStyle={styles.prefixInputFieldStyle}
                inputContainerStyle={styles.prefixInputContainerStyle}
                textStyle={styles.prefixInputText}
                hideError={true}
                disabled={disabled}
              />
            </View>
          </View>
        ) : (
          <Content
            loadingProps={{
              is: loading,
              style: styles.loadingFakeInput(theme),
              size: 'small'
            }}
            theme={theme}
          >
            <TouchableOpacity
              onPress={() => onChangeCallback && onChangeCallback()}
              activeOpacity={disabled ? 1 : 0.7}
            >
              <View
                style={[
                  styles.fakeInput(theme),
                  fakeInputContainerStyle && fakeInputContainerStyle,
                  submitFailed && error && styles.inputError,
                  disabled && styles.disabledSelectedValue(theme)
                ]}
              >
                {icon && (
                  <AssetIcon
                    name={icon}
                    size={16}
                    color={
                      color
                        ? color
                        : values
                        ? theme?.icons?.primaryColor
                        : theme?.icons?.secondaryColor
                    }
                    solid={leftIconSolid}
                    style={[styles.leftIcon, leftIconStyle && leftIconStyle]}
                  />
                )}

                {leftSymbol && (
                  <View style={styles.leftSymbolView(leftSymbol.length)}>
                    <Text
                      medium
                      color={
                        values
                          ? theme?.text?.secondaryColor
                          : theme?.text?.fifthColor
                      }
                      style={[
                        styles.leftSymbol(leftSymbol.length),
                        leftSymbolStyle
                      ]}
                    >
                      {leftSymbol}
                    </Text>
                  </View>
                )}

                {values ? (
                  <Text
                    color={theme?.text?.secondaryColor}
                    numberOfLines={1}
                    medium={theme?.mode === 'dark'}
                    style={[
                      styles.textValue,
                      color && {color: color},
                      icon && {
                        paddingLeft: 39
                      },
                      leftSymbol && {
                        paddingLeft: 50
                      },
                      rightIcon && styles.hasRightIcon,
                      valueStyle && valueStyle,
                      disabled && {
                        opacity: theme?.mode === 'dark' ? 0.9 : 0.5
                      }
                    ]}
                  >
                    {values}
                  </Text>
                ) : (
                  <Text
                    color={theme?.text?.fifthColor}
                    numberOfLines={1}
                    style={[
                      styles.placeholderText,
                      placeholderStyle && placeholderStyle,
                      icon && {
                        paddingLeft: 39
                      },
                      leftSymbol && {
                        paddingLeft: 50
                      },
                      rightIcon && styles.hasRightIcon,
                      color && {color: color},
                      disabled && {opacity: 0.7}
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

        <BaseError {...this.props} style={styles.validation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const FakeInput = connect(mapStateToProps)(FakeInputComponent);
