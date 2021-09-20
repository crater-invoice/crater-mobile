import {defineSize, isIosPlatform} from '@/constants';
import {Platform, StyleSheet} from 'react-native';

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
  searchView: {
    ...(isIosPlatform && {
      marginTop: defineSize(3, 3, 3, 0)
    })
  },
  listViewContainer: {
    paddingBottom: defineSize(0, 0, 0, 30),
    flex: 0.99
  },
  container: {
    flex: 1
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  handleBtn: {
    marginHorizontal: 9
  },
  btnWhite: {
    paddingVertical: 6
  }
});
