import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';
import {isAndroidPlatform} from '@/helpers/platform';

export default styles = StyleSheet.create({
  discount: {
    marginTop: 10
  },
  discountInputContainer: theme => ({
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    ...(theme.mode === 'dark' && {
      borderColor: theme.backgroundColor,
      backgroundColor: theme.backgroundColor,
      paddingVertical: 2
    })
  }),
  discountInput: (disabled, theme) => ({
    display: 'flex',
    minWidth: 65,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    ...(disabled && {
      backgroundColor: theme?.input?.disableBackgroundColor
    }),
    ...(isAndroidPlatform &&
      theme?.mode == 'dark' && {
        marginBottom: -5
      })
  }),
  discountField: theme => ({
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: theme.input.borderColor,
    marginBottom: 10
  }),
  discountTypeContainer: theme => ({
    borderLeftWidth: 1,
    borderColor: theme.input.borderColor
  }),
  discountType: disabled => ({
    paddingLeft: 15,
    paddingRight: !disabled ? 10 : 20,
    includeFontPadding: false
  }),
  amountContainer: theme => ({
    borderWidth: 0.8,
    borderColor: theme?.input?.borderColor,
    marginTop: 24,
    marginBottom: 10,
    padding: 20,
    backgroundColor: theme?.thirdBgColor,
    borderRadius: 3
  }),
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  amountHeading: {
    color: colors.darkGray,
    fontFamily: fonts.medium,
    marginTop: 6,
    textAlign: 'left'
  },
  subAmount: theme => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 16,
    ...(theme?.mode === 'dark' && {
      fontFamily: fonts.medium
    })
  }),
  taxAmount: theme => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 16
  }),
  finalAmount: theme => ({
    color: theme?.viewLabel?.thirdColor,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    fontFamily: theme?.mode === 'light' ? fonts.medium : fonts.semiBold
  }),
  divider: theme => ({
    backgroundColor: theme?.divider?.secondaryBgColor,
    borderColor: theme?.divider?.secondaryBgColor,
    borderWidth: 0.7,
    marginTop: 10,
    marginBottom: 8
  }),
  SelectPickerContainer: {
    marginTop: 0
  }
});
