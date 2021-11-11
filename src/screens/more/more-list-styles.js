import {StyleSheet} from 'react-native';
import {fonts} from '@/styles';

export default styles = StyleSheet.create({
  listViewScrollContainerStyle: {
    paddingTop: 10
  },
  listViewTitle: theme => ({
    fontFamily: theme?.mode === 'light' ? fonts.regular : fonts.medium,
    color: theme?.listItem?.secondary?.color,
    textAlign: 'left'
  }),
  listViewIcon: {
    width: 28,
    textAlign: 'center'
  },
  itemContainer: {
    marginVertical: -4
  },
  dividerStyle: {
    marginTop: 10
  }
});
