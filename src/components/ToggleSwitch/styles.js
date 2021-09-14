import {isIosPlatform} from '@/constants';
import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';

export const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginVertical: 15
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
    marginTop: -5
  }
});
