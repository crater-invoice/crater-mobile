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
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.danger,
    marginTop: -9
  },
  inputError: {
    borderColor: colors.dangerLight
  }
});

export default styles;
