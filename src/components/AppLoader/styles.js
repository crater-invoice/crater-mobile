import {StyleSheet} from 'react-native';
import {colors} from '@/styles';

export default StyleSheet.create({
  loadingWrapper: {
    backgroundColor: colors.dark2,
    opacity: 0.8,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }
});
