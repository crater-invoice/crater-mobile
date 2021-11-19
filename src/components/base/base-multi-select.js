import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {
  AssetIcon,
  AssetSvg,
  BaseError,
  BaseLabel,
  ButtonView,
  Text,
  View as BaseView
} from '@/components';
import {colors, fontSizes} from '@/styles';
import {commonSelector} from 'stores/common/selectors';
import {isAndroidPlatform} from '@/helpers/platform';
import {isEmpty} from '@/constants';

const SelectView = props => {
  const {
    label,
    onChangeCallback,
    containerStyle,
    baseSelectContainerStyle,
    meta,
    isRequired = false,
    disabled = false,
    theme,
    items,
    displayName,
    customView
  } = props;

  const buttonStyle = [
    styles.container(theme),
    baseSelectContainerStyle,
    meta?.submitFailed &&
      meta?.error &&
      typeof meta.error === 'string' &&
      styles.error,
    disabled && styles.disableView(theme)
  ];

  if (customView) {
    return customView({props});
  }

  return (
    <Container style={containerStyle}>
      <BaseLabel isRequired={isRequired}>{label}</BaseLabel>
      <ButtonView
        onPress={() => onChangeCallback?.()}
        disabled={disabled}
        scale={1}
        style={buttonStyle}
      >
        <BaseView class="flex-1 flex-row px-10" style={{flexWrap: 'wrap'}}>
          {!isEmpty(items) &&
            items.map((item, i) => {
              return (
                <BaseView
                  key={i}
                  class="px-6 py-4 mr-15 mt-10 mb-10 radius-4 justify-center items-center flex-row"
                  background-color={colors.primary}
                >
                  <Text class="h6 white bold2 px-2 mr-5">
                    {item[displayName]}
                  </Text>
                  <AssetSvg
                    name={AssetSvg.icons.close2(colors.white4)}
                    width={10}
                    height={10}
                  />
                </BaseView>
              );
            })}
        </BaseView>
        <AssetIcon
          name={'angle-down'}
          size={18}
          color={colors.darkGray}
          style={styles.rightIcon}
        />
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
    minHeight: 44,
    ...(isAndroidPlatform && {
      minHeight: 47
    })
  }),
  disableView: theme => ({
    backgroundColor: theme?.input?.disableBackgroundColor,
    opacity: 0.7
  }),
  error: {
    borderColor: colors.dangerLight
  },
  rightIcon: {
    paddingRight: 15
  },
  validation: {
    marginTop: -10,
    marginBottom: 10
  }
});

const Container = styled(View)`
  margin-top: 10;
`;

const mapStateToProps = state => commonSelector(state);

export const BaseMultiSelect = connect(mapStateToProps)(SelectView);
