import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme?.backgroundColor
  }),
  addressStreetField: {
    marginTop: -20
  }
});
