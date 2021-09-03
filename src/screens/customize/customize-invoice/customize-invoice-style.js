import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';

export default styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 20
  },
  dividerLine: {
    marginTop: 18,
    marginBottom: 18,
    backgroundColor: colors.gray,
    borderColor: colors.gray,
    borderWidth: 0.2
  },
  autoGenerateHeader: {
    marginTop: 7,
    fontSize: 20
  }
});
