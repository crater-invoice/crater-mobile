import {StyleSheet} from 'react-native';
import {colors} from '@/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12
  },
  imageList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -10
  },
  image: {
    height: 220,
    width: wp(40),
    borderWidth: 1,
    borderColor: colors.lightGray
  },
  active: {
    borderColor: colors.primary
  },
  imageContainer: {
    position: 'relative',
    overflow: 'visible',
    marginHorizontal: 10,
    marginVertical: 12
  },
  iconStyle: {
    padding: 3
  },
  iconContainer: {
    position: 'absolute',
    top: -7,
    right: -7,
    zIndex: 100,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 0,
    margin: 0
  }
});
