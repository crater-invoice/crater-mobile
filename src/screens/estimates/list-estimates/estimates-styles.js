import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  tabs: theme => ({
    backgroundColor: theme?.backgroundColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }),
  selectPicker: {
    marginTop: 15
  }
});
