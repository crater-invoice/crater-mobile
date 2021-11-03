import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {colors} from '@/styles';

const container = {
  borderWidth: 1,
  borderColor: colors.gray,
  borderStyle: 'dashed',
  borderRadius: 4
};

export const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    marginTop: 10
  },
  images: {
    height: 110,
    resizeMode: 'contain'
  },
  container: {
    ...container,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22
  },
  loadingContainer: {
    ...container,
    height: 100
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWithIconContainer: {
    position: 'relative'
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.darkGray,
    padding: 8,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: colors.veryLightGray
  },
  imageContainer: {
    ...container,
    padding: 10
  },
  title: {
    paddingTop: 5
  },
  label: {
    paddingBottom: 8,
    marginLeft: -2
  },
  loadImage: {
    width: wp('88%')
  },
  uploadedImage: {
    height: '100%'
  },
  uploadedFullImage: {
    height: 110
  },
  disabledInput: theme => ({
    backgroundColor: theme?.input?.disableBackgroundColor,
    opacity: 0.7
  })
});
