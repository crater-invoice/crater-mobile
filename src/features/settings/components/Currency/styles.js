import {StyleSheet, Platform} from 'react-native';
import {colors, fonts} from '@/styles';

export default styles = StyleSheet.create({
  bodyContainer: {
    paddingHorizontal: 22,
    paddingVertical: 17
  },
  submitButton: {
    paddingHorizontal: 10
  },
  multipleButton: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  btnContainerStyle: {
    marginHorizontal: 10
  },
  flex: {
    flex: 1
  },
  handleBtn: {
    marginHorizontal: 5
  },

  row: {
    flexDirection: 'row'
  },
  column: {
    flex: 1
  },
  columnRight: {
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftText: {
    marginTop: 4,
    width: '43%',
    textAlign: 'right',
    position: 'relative',
    top: 0,
    right: -70,
    ...Platform.select({
      android: {
        right: -50
      }
    })
  },
  positionView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
