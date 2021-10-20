import {StyleSheet, Platform} from 'react-native';
import {colors, fonts} from '@/styles';
import {SymbolStyle} from '@/components/CurrencyFormat/styles';
import {isAndroidPlatform, isIosPlatform} from '@/constants';

export default styles = StyleSheet.create({
  discount: {
    marginTop: 10
  },
  selectPickerField: theme => ({
    backgroundColor: theme?.card?.primary?.bgColor,
    paddingRight: 15,
    paddingLeft: 5,
    ...Platform.select({
      ios: {
        paddingRight: 30
      }
    }),
    borderLeftWidth: 0,
    ...(theme?.mode === 'dark' && {
      borderColor: colors.gray5
    })
  }),
  fieldStyle: {
    display: 'flex',
    minWidth: 80,
    marginTop: 0
  },
  discountField: {
    display: 'flex',
    flexDirection: 'row'
  },
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
  },
  fakeInputValueStyle: {
    fontSize: 18,
    ...Platform.select({
      android: {
        marginTop: -2
      }
    }),
    ...SymbolStyle
  },
  currencySymbol: {
    ...(isAndroidPlatform && {
      marginTop: -5
    })
  },
  symbol: currency => ({
    ...(isIosPlatform && {marginTop: 2}),
    ...(isAndroidPlatform &&
      currency?.swap_currency_symbol && {
        marginTop: -9
      })
  })
});
