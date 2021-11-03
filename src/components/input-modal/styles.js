import {StyleSheet} from 'react-native';
import {colors} from '@/styles';

export const styles = StyleSheet.create({
  modalViewContainer: theme => ({
    borderTopWidth: 10,
    borderTopColor: colors.primary,
    backgroundColor: theme.secondaryBgColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 17,
    paddingBottom: 20
  }),
  heading: {
    fontSize: 17
  },

  rowViewContainer: theme => ({
    flexDirection: 'row'
  }),
  rowView: {
    flex: 1
  },
  fieldView: {
    marginVertical: 20
  }
});
