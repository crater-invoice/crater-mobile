import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {AssetIcon, BaseError, BaseLabel, ButtonView, Text} from '@/components';
import {colors, fontSizes} from '@/styles';
import {commonSelector} from 'stores/common/selectors';
import {isAndroidPlatform} from '@/helpers/platform';

const SelectView = props => {
  const {
    label,
    icon,
    onChangeCallback,
    placeholder,
    containerStyle,
    baseSelectContainerStyle,
    rightIcon,
    color,
    values,
    meta,
    valueStyle,
    placeholderStyle,
    leftIconStyle,
    isRequired = false,
    leftIconSolid = true,
    disabled = false,
    leftSymbol,
    theme,
    customView,
    leftIconProps,
    leftSymbolStyle,
    description
  } = props;

  if (customView) {
    return customView({props});
  }

  const leftIconColor = color
    ? color
    : values
    ? theme?.icons?.primaryColor
    : theme?.icons?.secondaryColor;
  const textColor = color
    ? color
    : values
    ? theme?.input?.color
    : theme?.text?.fifthColor;

  const buttonStyle = [
    styles.container(theme),
    baseSelectContainerStyle,
    meta?.submitFailed && meta?.error && styles.error,
    disabled && styles.disableView(theme)
  ];

  const textStyle = [
    styles.text,
    values && valueStyle,
    !values && placeholderStyle
  ];

  return (
    <Container style={containerStyle}>
      <BaseLabel isRequired={isRequired}>{label}</BaseLabel>
      <ButtonView
        onPress={() => onChangeCallback?.()}
        disabled={disabled}
        scale={1}
        style={buttonStyle}
      >
        {icon && (
          <AssetIcon
            name={icon}
            size={leftIconSize(icon)}
            color={leftIconColor}
            solid={leftIconSolid}
            style={[styles.leftIcon, leftIconStyle]}
            {...leftIconProps}
          />
        )}

        {leftSymbol && (
          <Text
            h4
            medium
            color={textColor}
            style={[styles.leftSymbol, leftSymbolStyle]}
          >
            {leftSymbol}
          </Text>
        )}

        <Text
          color={textColor}
          style={textStyle}
          numberOfLines={1}
          medium={theme?.mode === 'dark'}
        >
          {values ? values : placeholder}
        </Text>

        {rightIcon && (
          <AssetIcon
            name={rightIcon}
            size={18}
            color={colors.darkGray}
            style={styles.rightIcon}
          />
        )}
      </ButtonView>
      {description ? (
        <Text class={`h6 mx-2 darkGray ${props['description-class']}`}>
          {description}
        </Text>
      ) : null}
      <BaseError {...props} style={styles.validation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme?.input?.borderColor,
    backgroundColor: theme?.thirdBgColor,
    marginBottom: 10,
    borderRadius: 3,
    height: 44,
    ...(isAndroidPlatform && {
      height: 47
    })
  }),
  disableView: theme => ({
    backgroundColor: theme?.input?.disableBackgroundColor,
    opacity: 0.7
  }),
  error: {
    borderColor: colors.dangerLight
  },
  leftIcon: {
    paddingLeft: 15
  },
  leftSymbol: {
    paddingLeft: 15,
    ...(isAndroidPlatform && {
      marginTop: 4
    })
  },
  rightIcon: {
    paddingRight: 15
  },
  text: {
    paddingHorizontal: 13,
    flex: 1,
    fontSize: fontSizes.h5,
    ...(isAndroidPlatform && {
      paddingTop: 4
    })
  },
  validation: {
    marginTop: -10,
    marginBottom: 10
  }
});

const Container = styled(View)`
  margin-top: 10;
`;

const leftIconSize = name => (name === 'align-center' ? 14 : 16);

const mapStateToProps = state => commonSelector(state);

export const BaseSelect = connect(mapStateToProps)(SelectView);
