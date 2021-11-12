import {StyleSheet, StatusBar} from 'react-native';
import {colors} from '@/styles';
import {isAndroidPlatform} from '@/helpers/platform';
import {defineSize} from '@/helpers/size';

export default StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent'
  },
  containerStyle: theme => ({
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    backgroundColor: theme?.secondaryBgColor,
    height: defineSize(80, 80, 80, 90),
    paddingTop: isAndroidPlatform
      ? (StatusBar.currentHeight / 100) * 7 + 25
      : 25,
    ...(theme?.mode === 'dark' && {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.dark3,
      marginTop: 0
    })
  }),
  borderBottom: {
    borderBottomWidth: 0
  },
  title: theme => ({
    fontSize: 17,
    marginLeft: 10
  }),
  rightBtn: {
    flexDirection: 'row',
    marginRight: 10
  },
  hasCircle: theme => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 28,
    borderRadius: 16,
    backgroundColor: theme?.icons.circle.backgroundColor
  }),
  rightBtnTitle: {
    paddingRight: 10,
    paddingTop: 3
  },
  rightContainer: {
    flexDirection: 'row'
  },
  filterColumn: {
    marginRight: 13,
    marginTop: 3
  }
});
