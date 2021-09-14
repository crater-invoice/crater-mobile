import {StyleSheet, Platform} from 'react-native';
import {colors, fonts} from '@/styles';
import {definePlatformParam} from '@/constants';

export default styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  // Row Column
  row: {
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    marginLeft: definePlatformParam(-65, -55)
  },
  columnRight: {
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftText: {
    marginTop: 4,
    width: '50%',
    textAlign: 'right',
    position: 'relative',
    top: 0,
    right: 0,
    ...Platform.select({
      android: {
        right: -50
      }
    })
  },
  positionView: {
    justifyContent: 'center',
    width: '45%'
  },
  // help
  helpText: {
    color: colors.darkGray,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: 'left'
  }
});
