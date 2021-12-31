import {StyleSheet} from 'react-native';
import {colors} from '@/styles';

export const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 15
  },
  buttonGroupContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30
  },
  horizontalButton: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hintStyle: {
    marginBottom: 15
  },
  circle: theme => ({
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.divider.secondaryBgColor,
    backgroundColor: theme.icons.circle.secondaryBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  }),
  checkedCircle: {
    backgroundColor: colors.primary
  },
  middleCircle: theme => ({
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.icons.circle.secondaryBgColor
  })
});
