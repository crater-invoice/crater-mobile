import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginRight: 10
  },
  iconStyle: theme => ({
    color: theme?.icons?.primaryBgColor
  })
});
