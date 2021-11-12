import {StyleSheet, Platform} from 'react-native';
import {definePlatformParam} from '@/helpers/platform';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 10
  },
  column: {
    flex: 1,
    marginLeft: definePlatformParam(-65, -55)
  },
  leftText: {
    marginTop: 4,
    width: '50%',
    textAlign: 'right',
    position: 'relative',
    top: 0,
    right: 0,
    ...Platform.select({
      android: {
        right: -50
      }
    })
  },
  positionView: {
    justifyContent: 'center',
    width: '45%'
  }
});

export default styles;
