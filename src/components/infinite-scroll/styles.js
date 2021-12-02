import {StyleSheet} from 'react-native';
import {defineSize} from '@/helpers/size';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    height: '100%'
  },
  loader: {
    paddingVertical: 20
  },
  searchLoader: {
    flex: 0,
    marginTop: defineSize('20%', '20%', '20%', '25%')
  }
});
