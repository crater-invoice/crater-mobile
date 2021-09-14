import {definePlatformParam, defineSize} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  animatedToastView: theme => ({
    marginHorizontal: 22,
    paddingHorizontal: 25,
    paddingVertical: 11,
    borderRadius: 25,
    zIndex: 9999,
    position: 'absolute',
    bottom: defineSize(100, 100, 100, 130),
    left: 0,
    right: 0,
    backgroundColor: theme?.toast?.bgColor,
    justifyContent: 'center'
  }),

  title: {
    fontSize: defineSize(13, 13, 13, 15),
    alignSelf: 'stretch',
    paddingTop: definePlatformParam(1, 3)
  }
});
