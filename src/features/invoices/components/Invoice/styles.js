import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  itemLeftSubTitle: theme => ({
    color: theme?.listItem?.fourth?.color,
    fontSize: 13
  }),
  itemLeftSubTitleLabel: {
    marginLeft: -6
  }
});
