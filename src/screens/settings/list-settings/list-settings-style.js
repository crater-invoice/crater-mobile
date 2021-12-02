import {StyleSheet} from 'react-native';
import {fonts} from '@/styles';
import {defineSize} from '@/helpers/size';

const styles = StyleSheet.create({
  listViewTitle: theme => ({
    fontFamily: theme?.mode === 'light' ? fonts.regular : fonts.medium,
    color: theme?.listItem?.secondary?.color,
    marginLeft: defineSize(-4, -4, -4, 0),
    marginRight: defineSize(-11, -11, -11, 0),
    textAlign: 'left'
  }),
  listViewIcon: {
    width: 26,
    textAlign: 'center'
  },
  itemContainer: {
    marginVertical: -2
  }
});

export default styles;
