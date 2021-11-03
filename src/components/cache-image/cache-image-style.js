import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: theme => ({
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme?.backgroundColor
  }),
  loader: theme => ({
    backgroundColor: theme?.backgroundColor,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  })
});

export default styles;
