import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  currency: {
    marginTop: 24
  },
  billing: theme => ({
    marginTop: -10,
    borderTopWidth: 0,
    ...(theme?.mode === 'dark' && {
      marginTop: -9
    })
  }),
  shipping: theme => ({
    marginTop: -10,
    borderTopWidth: 0,
    ...(theme?.mode === 'dark' && {
      marginTop: -9
    })
  }),
  line: {
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4
  }
});
