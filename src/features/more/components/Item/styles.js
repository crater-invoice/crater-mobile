import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';
import {isAndroidPlatform} from '@/constants';

export default styles = StyleSheet.create({
  amountContainer: theme => ({
    borderWidth: 0.8,
    borderColor: theme?.input?.borderColor,
    marginTop: 24,
    marginBottom: 18,
    padding: 20,
    backgroundColor: theme?.thirdBgColor,
    borderRadius: 3
  }),
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  price: theme => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 16
  }),
  totalPrice: theme => ({
    color: theme?.listItem?.primary?.color,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    fontFamily: fonts.medium
  }),
  divider: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
    borderWidth: 0.7,
    marginTop: 10,
    marginBottom: 8
  },
  units: {
    paddingLeft: 48
  },
  currencySymbol: {
    ...(isAndroidPlatform && {
      marginTop: -5
    })
  }
});
