import {StyleSheet} from 'react-native';
import {colors} from '@/styles';

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    marginTop: -8
  },
  dateColumn: {
    flex: 1.2
  },
  timeColumn: theme => ({
    flex: 1,
    marginLeft: theme?.mode === 'light' ? 0 : 1
  }),
  validation: {
    marginTop: -10
  },
  inputError: {
    borderColor: colors.dangerLight
  }
});

export default styles;
