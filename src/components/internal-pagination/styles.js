import {Platform, StyleSheet} from 'react-native';
import {defineSize} from '@/helpers/size';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: -20,
        margin: 0,
        padding: 0
      }
    })
  },
  header: {
    paddingTop: 60,
    height: 110
  },
  scrollViewContainer: {
    position: 'relative',
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1
  },
  searchLoader: {
    flex: 0,
    marginTop: defineSize('20%', '20%', '20%', '25%')
  },
  loader: {
    paddingVertical: 20
  }
});
