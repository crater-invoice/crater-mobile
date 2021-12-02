import {colors} from '@/styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  description: {marginTop: -2},
  reteContainer: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  codeText: theme => ({
    textAlign: 'center',
    marginRight: 3,
    color: theme?.text?.seventhColor
  }),
  codeDisable: theme => ({
    backgroundColor: theme?.input?.firstColor,
    opacity: 1
  }),
  codeContainer: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  label: {marginBottom: -10},
  refresh: {flexDirection: 'row'}
});
