import React, {FC, useState} from 'react';
import {Animated, TouchableOpacity, View as RNView} from 'react-native';
import {connect} from 'react-redux';
import {View, Text, ButtonView, Loading} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {colors} from '@/styles';

export const Button = props => {
  const {onPress, theme, loading, disabled, children, type = 'primary'} = props;

  const bgColor = {
    primary: {
      light: colors.primary,
      dark: colors.primaryLight
    },
    danger: {
      light: colors.danger,
      dark: colors.danger
    }
  };

  return (
    <ButtonView
      onPress={onPress}
      background-color={bgColor?.[type]?.[theme?.mode]}
      radius-5
      class="justify-center items-center"
      width="100%"
      height="39"
      disabled={disabled || loading}
    >
      {!loading ? (
        <Text white h5 medium>
          {children}
        </Text>
      ) : (
        <Loading size="small" color={colors.white} />
      )}
    </ButtonView>
  );
};

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const BaseButton = connect(mapStateToProps)(Button);

export const ButtonGroup = props => {
  const {children} = props;
  const isMoreThanTwo = children?.length >= 2;

  if (isMoreThanTwo) {
    return (
      <View class="justify-center flex-row">
        {children.map(c => (
          <View class="flex=1 mx-13">{c}</View>
        ))}
      </View>
    );
  }

  return <View class="mx-13">{children}</View>;
};
