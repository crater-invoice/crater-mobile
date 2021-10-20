import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '@/components';
import {colors} from '@/styles';
import {commonSelector} from 'stores/common/selectors';
import t from 'locales/use-translation';

export const Error = props => {
  const {
    meta,
    hideError,
    style,
    maxNumber = 0,
    maxCharacter = 0,
    minCharacter = 0,
    theme
  } = props;

  const hasError = !hideError && meta?.submitFailed && meta?.error;

  if (!hasError) {
    return null;
  }

  return (
    <View style={[styles.validation, style]}>
      <Text white h6 medium={theme?.mode === 'dark'}>
        {t(meta?.error, {maxNumber, maxCharacter, minCharacter})}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  validation: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.danger
  }
});

const mapStateToProps = state => commonSelector(state);

export const BaseError = connect(mapStateToProps)(Error);
