import {defineSize, isIosPlatform} from '@/constants';
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  listViewContainer: {
    paddingBottom: defineSize(0, 0, 0, 30),
    flex: 0.99
  },
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
  searchView: {
    ...(isIosPlatform && {
      marginTop: defineSize(3, 3, 3, 0)
    })
  }
});
