import {colors} from '@/styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  description: {marginTop: -2},
  reteContainer: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  codeText: {
    textAlign: 'center',
    marginRight: 3,
    color: colors.gray6
  },
  codeDisable: {
    opacity: 1,
    backgroundColor: colors.white10
  },
  codeContainer: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  label: {marginBottom: -10},
  refresh: {flexDirection: 'row'}
});
