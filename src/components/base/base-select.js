import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {AssetIcon, BaseError, BaseLabel, ButtonView, Text} from '@/components';
import {colors} from '@/styles';
import {commonSelector} from 'stores/common/selectors';

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
    customView
  } = props;

  const leftIconColor = color
    ? color
    : values
    ? theme?.icons?.primaryColor
    : theme?.icons?.secondaryColor;
  const textColor = color
    ? color
    : values
    ? theme?.text?.secondaryColor
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

  if (customView) {
    return customView({props});
  }

  return (
    <Container style={containerStyle}>
      <BaseLabel isRequired={isRequired}>{label}</BaseLabel>
      <ButtonView
        onPress={() => onChangeCallback?.()}
        scale={1}
        style={buttonStyle}
      >
        {icon && (
          <AssetIcon
            name={icon}
            size={16}
            color={leftIconColor}
            solid={leftIconSolid}
            style={[styles.leftIcon, leftIconStyle]}
          />
        )}

        {leftSymbol && (
          <Text h4 medium color={textColor} style={styles.leftSymbol}>
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
    height: 44
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
    paddingLeft: 15
  },
  rightIcon: {
    paddingRight: 15
  },
  text: {
    paddingHorizontal: 13,
    flex: 1,
    fontSize: 15
  },
  validation: {
    marginTop: -10
  }
});

const Container = styled(View)`
  margin-top: 10;
`;

const mapStateToProps = state => commonSelector(state);

export const BaseSelect = connect(mapStateToProps)(SelectView);
