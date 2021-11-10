import React from 'react';
import {StyleSheet, View as RNView} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {colors} from '@/styles';
import {commonSelector} from 'stores/common/selectors';
import {isAndroidPlatform, keyboardType} from '@/constants';
import {
  AssetIcon,
  BaseError,
  BaseLabel,
  BaseInput,
  View,
  Text
} from '@/components';

const InputPrefix = props => {
  const {label, meta, isRequired, disabled, prefix, fieldName, theme} = props;

  return (
    <Container>
      <BaseLabel isRequired={isRequired}>{label}</BaseLabel>
      <View
        style={[
          styles.container(theme),
          meta?.submitFailed && meta?.error && styles.error,
          disabled && styles.disableView(theme)
        ]}
      >
        <AssetIcon
          name={'hashtag'}
          size={16}
          color={theme?.icons?.primaryColor}
          solid={false}
          style={styles.leftIcon}
        />
        <Text
          color={theme?.input?.color}
          style={styles.text(props)}
          numberOfLines={1}
          medium={theme?.mode === 'dark'}
        >
          {`${prefix}-`}
        </Text>
        <Flex>
          <Field
            name={fieldName}
            component={BaseInput}
            keyboardType={keyboardType.NUMERIC}
            inputContainerStyle={styles.input}
            hideError={true}
            disabled={disabled}
          />
        </Flex>
      </View>
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
    paddingLeft: 15,
    ...(isAndroidPlatform && {
      marginTop: -2
    })
  },
  text: props => ({
    paddingLeft: 13,
    fontSize: 15,
    ...(props.disabled && {
      opacity: props.theme?.mode === 'dark' ? 0.9 : 0.6
    })
  }),
  validation: {
    marginTop: -10
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 0,
    height: '100%',
    paddingBottom: 1
  }
});

const Container = styled(RNView)`
  margin-top: 10;
`;

const Flex = styled(RNView)`
  flex: 1;
`;

const mapStateToProps = state => commonSelector(state);

export const BaseInputPrefix = connect(mapStateToProps)(InputPrefix);
