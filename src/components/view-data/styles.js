import {StyleSheet, Platform} from 'react-native';
import {colors, fonts} from '@/styles';
import {isAndroidPlatform} from '@/constants';

export default StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'relative'
  },
  label: {
    paddingBottom: 7,
    fontSize: 14
  },
  required: {
    color: colors.danger
  },
  fakeInput: theme => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 8,
    ...Platform.select({
      ios: {
        paddingTop: 11,
        paddingBottom: 9
      }
    }),
    paddingRight: 5,
    borderWidth: 1,
    borderColor: theme?.input?.borderColor,
    backgroundColor: theme?.thirdBgColor,
    marginBottom: 10,
    borderRadius: 3
  }),
  loadingFakeInput: theme => ({
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: theme?.input?.borderColor,
    backgroundColor: theme?.thirdBgColor,
    marginBottom: 10
  }),
  textValue: {
    fontSize: 17,
    // backgroundColor: 'yellow',
    flex: 0.93
  },
  placeholderText: {
    paddingLeft: 10,
    fontSize: 15
  },
  hasRightIcon: {
    paddingRight: 15
  },
  rightIcon: {
    position: 'absolute',
    top: 13,
    right: 11,
    ...Platform.select({
      android: {
        top: 14,
        right: 11
      }
    })
  },
  leftIcon: {
    zIndex: 20,
    fontSize: 15,
    flex: 0.08
  },
  validation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: -6,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.danger
  },
  inputError: {
    borderColor: colors.dangerLight
  },
  disabledSelectedValue: theme => ({
    backgroundColor: theme?.input?.disableBackgroundColor,
    opacity: 0.7
  }),
  pickerError: {
    borderColor: colors.dangerLight,
    borderWidth: 1
  },

  prefixInput: theme => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 8,
    ...Platform.select({
      ios: {
        paddingTop: 9,
        paddingBottom: 9
      }
    }),
    paddingRight: 5,
    borderWidth: 1,
    borderColor: theme?.input?.borderColor,
    backgroundColor: theme?.thirdBgColor,
    marginBottom: 10,
    borderRadius: 3
  }),
  prefixLabelContainer: {
    marginTop: 1
  },
  prefixInputContainer: {
    flex: 1
  },
  prefixInputContainerStyle: {
    borderWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 0
  },
  prefixInputFieldStyle: {
    marginTop: -15,
    marginBottom: -10,
    ...(isAndroidPlatform && {
      marginTop: -16
    })
  },
  prefixInputText: {
    fontSize: 16.5,
    ...Platform.select({
      android: {
        marginTop: 1,
        fontSize: 17
      }
    })
  },
  prefixLeftIcon: {
    position: 'absolute',
    zIndex: 20,
    left: 14,
    top: 3,
    fontSize: 16,
    ...Platform.select({
      android: {
        left: 14,
        top: 3.5
      }
    })
  },

  leftSymbol: length => ({
    fontSize: 18,
    fontFamily: fonts.medium,
    ...(length >= 3 && {
      fontSize: 14
    })
  }),
  leftSymbolView: length => ({
    position: 'absolute',
    zIndex: 20,
    left: 15,
    top: 9,
    ...Platform.select({
      android: {
        left: 15,
        top: 8
      }
    }),
    ...(length >= 3 && {
      top: 11
    })
  })
});
