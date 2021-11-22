import {StyleSheet, Platform} from 'react-native';
import {colors, fonts} from '@/styles';
import {isRTL} from '@/utils';
import {isAndroidPlatform, definePlatformParam} from '@/helpers/platform';

export default StyleSheet.create({
  inputFieldWrapper: {
    flexShrink: 0,
    marginVertical: 10
  },
  input: (theme, hasLeftIcon) => ({
    fontSize: 16,
    paddingTop: 1,
    fontFamily: theme?.mode === 'light' ? fonts.regular : fonts.medium,
    textAlign: 'left',
    height: 40,
    ...(!hasLeftIcon && {
      paddingLeft: 5
    }),
    ...Platform.select({
      android: {
        height: 44
      }
    }),
    ...(isRTL() && {
      writingDirection: 'rtl',
      textAlign: 'right'
    })
  }),
  multilineField: {
    paddingHorizontal: 2,
    paddingTop: 6,
    paddingBottom: 5
  },
  inputContainerStyle: {
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 3
  },
  containerStyle: {
    paddingHorizontal: 0
  },
  inputPassword: {
    paddingRight: 30
  },
  leftIcon: {
    marginLeft: 5,
    marginRight: 10
  },
  activeInput: {},
  inputTip: {
    opacity: 0.5,
    top: 38,
    left: 0,
    right: 0
  },
  dollarFieldInput: {
    paddingLeft: 15
  },
  percentageFieldInput: {
    paddingLeft: 22
  },
  signField: {
    top: 4,
    left: 0
  },
  optionsList: {},
  disabledInput: theme => ({
    backgroundColor: theme?.input?.disableBackgroundColor,
    opacity: 0.6
  }),
  pointIcon: {
    position: 'absolute',
    top: 3
  },
  value: {
    color: colors.danger,
    fontWeight: '600'
  },
  additionalValue: {
    opacity: 0.7
  },

  leftSymbol: {
    fontSize: 20,
    width: '100%',
    fontWeight: '500',
    paddingRight: 8,
    marginTop: 1,
    ...(isAndroidPlatform && {marginTop: 5})
  },
  rightSymbol: {
    fontSize: 16,
    width: '100%',
    fontWeight: '500',
    ...(isAndroidPlatform && {marginTop: 5})
  },
  leftSymbolView: {
    height: '100%',
    marginLeft: -20,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 10,
    paddingRight: 5
  },
  rightSymbolView: {
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: 10,
    paddingLeft: 5
  },
  withLeftSymbolText: {
    paddingTop: definePlatformParam(1, 4)
  },
  withRightSymbolText: {
    paddingTop: definePlatformParam(1, 4)
  }
});
