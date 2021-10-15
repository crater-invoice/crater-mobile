import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {AssetIcon} from '../AssetIcon';
import {Text} from '../Text';
import {Label} from '../Label';
import {commonSelector} from 'stores/common/selectors';
import {View as CtView} from '@/components';

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

export default class ViewDataComponent extends Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      label,
      icon,
      placeholder,
      containerStyle,
      fakeInputContainerStyle,
      rightIcon,
      inPairs,
      color,
      values,
      placeholderStyle,
      leftSymbol,
      valueStyle,
      disabled,
      theme,
      solid,
      iconStyle,
      first,
      second
    } = this.props;
    return (
      <View style={[styles.container, containerStyle && containerStyle]}>
        {inPairs ? (
          <CtView flex-row>
            <CtView flex={1} justify-between>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                  // backgroundColor: 'blue'
                }}
              >
                {first?.icon && (
                  <AssetIcon
                    name={first?.icon}
                    size={16}
                    color={
                      color
                        ? color
                        : values
                        ? theme?.icons?.primaryColor
                        : theme?.icons?.secondaryColor
                    }
                    solid={solid}
                    style={
                      ([styles.leftIcon, iconStyle && iconStyle], {flex: 0.22})
                    }
                  />
                )}
                <Text style={{fontSize: 16}} theme={theme}>
                  {first?.label}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                  // backgroundColor: 'green'
                }}
              >
                {first?.values ? (
                  <Text
                    color={theme?.text?.secondaryColor}
                    numberOfLines={1}
                    medium={theme?.mode === 'dark'}
                    style={[
                      styles.textValue,
                      color && {color: color},
                      rightIcon && styles.hasRightIcon,
                      valueStyle && valueStyle,
                      disabled && {
                        opacity: theme?.mode === 'dark' ? 0.9 : 0.5
                      }
                    ]}
                  >
                    {first?.values}
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
                    {first?.placeholder && first?.placeholder}
                  </Text>
                )}
              </View>
            </CtView>
            {/* <CtView flex={0.07} /> */}
            <CtView flex={1} justify-between>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                  // backgroundColor: 'blue'
                }}
              >
                {second?.icon && (
                  <AssetIcon
                    name={second?.icon}
                    size={16}
                    color={
                      color
                        ? color
                        : values
                        ? theme?.icons?.primaryColor
                        : theme?.icons?.secondaryColor
                    }
                    solid={solid}
                    style={[
                      styles.leftIcon,
                      iconStyle && iconStyle,
                      {flex: 0.3}
                    ]}
                  />
                )}
                <Text style={{fontSize: 16}} theme={theme}>
                  {second?.label}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                  // backgroundColor: 'green'
                }}
              >
                {second?.values ? (
                  <Text
                    color={theme?.text?.secondaryColor}
                    numberOfLines={1}
                    medium={theme?.mode === 'dark'}
                    style={[
                      styles.textValue,
                      color && {color: color},
                      rightIcon && styles.hasRightIcon,
                      valueStyle && valueStyle,
                      disabled && {
                        opacity: theme?.mode === 'dark' ? 0.9 : 0.5
                      }
                    ]}
                  >
                    {second?.values}
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
                    {second?.placeholder && second?.placeholder}
                  </Text>
                )}
              </View>
            </CtView>
          </CtView>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
                // backgroundColor: 'blue'
              }}
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
                  solid={solid}
                  style={[styles.leftIcon, iconStyle && iconStyle]}
                />
              )}
              <Text style={{fontSize: 16}} theme={theme}>
                {label}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
                // backgroundColor: 'green'
              }}
            >
              {values ? (
                <Text
                  color={theme?.text?.secondaryColor}
                  numberOfLines={1}
                  medium={theme?.mode === 'dark'}
                  style={[
                    styles.textValue,
                    color && {color: color},
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
            </View>
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const ViewData = connect(mapStateToProps)(ViewDataComponent);
