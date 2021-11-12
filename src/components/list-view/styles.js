import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';
import {isAndroidPlatform} from '@/helpers/platform';
import {defineSize} from '@/helpers/size';

export const styles = StyleSheet.create({
  rightTitle: theme => ({
    fontSize: 18,
    color: theme?.listItem?.primary?.color,
    fontWeight: '500',
    fontFamily: fonts.semiBold,
    textAlign: 'left'
  }),
  containerStyle: {
    alignItems: 'flex-start',
    paddingVertical: 13,
    paddingHorizontal: 20
  },
  containerWithAvatar: {
    paddingVertical: 13,
    paddingHorizontal: 20
  },
  checkboxContainerStyle: {
    padding: 0,
    margin: 0,
    paddingTop: 5,
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  checkboxContainerPadding: {
    paddingTop: 12
  },
  rightSubTitle: theme => ({
    fontSize: 13,
    color: theme?.listItem?.third?.color,
    marginTop: 4,
    fontFamily: theme?.mode === 'light' ? fonts.regular : fonts.medium
  }),
  leftSubTitleLabelContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 6
  },
  success: {
    backgroundColor: colors.successLight2,
    color: colors.successDark
  },
  warning: {
    backgroundColor: colors.warningLight,
    color: colors.warningDark
  },
  danger: {
    backgroundColor: colors.dangerLight,
    color: colors.dangerDark
  },
  labelInnerContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 1,
    ...(isAndroidPlatform && {paddingTop: 5})
  },
  labelOutline: {
    borderWidth: 1,
    paddingVertical: defineSize(3, 3, 4, 4),
    ...(isAndroidPlatform && {
      paddingTop: 3,
      paddingBottom: 1,
      paddingVertical: 0,
      paddingHorizontal: 10
    })
  },
  leftSubTitleContainer: {
    paddingLeft: 1
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  rightContentContainer: {
    flex: 1
  },
  leftImage: theme => ({
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: theme.divider.secondaryBgColor
  })
});
