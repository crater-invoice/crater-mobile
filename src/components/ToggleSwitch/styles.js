import {isAndroidPlatform, isIosPlatform} from '@/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center'
  },
  hint: {
    marginTop: 4,
    width: '83%'
  },
  switchStyle: {
    transform: isIosPlatform
      ? [{scaleX: 0.8}, {scaleY: 0.8}]
      : [{scaleX: 1.2}, {scaleY: 1.2}]
  },
  switchContainer: {
    height: 20
  },
  descriptionContainer: {
    flex: 1,
    paddingRight: 8,
    marginTop: -5,
    ...(isAndroidPlatform && {
      marginTop: -10
    })
  }
});
