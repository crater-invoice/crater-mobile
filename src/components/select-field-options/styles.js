import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';

export default styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column1: {
    flex: 0.4,
    justifyContent: 'center'
  },
  column2: {
    flex: 2,
    justifyContent: 'center'
  },
  scrollContainer: {
    minHeight: 240,
    borderWidth: 0.8,
    borderRadius: 6,
    marginTop: 12,
    borderColor: colors.darkGray
  },
  itemList: {
    paddingBottom: 20
  },
  item: {
    flexDirection: 'row',
    marginBottom: -12
  },
  inputField: {
    backgroundColor: colors.lightGray
  },
  input: {
    borderWidth: 1,
    marginLeft: 20
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: colors.danger
  },
  removeButtonWhiteLine: {
    width: 12,
    height: 3.5,
    backgroundColor: colors.white
  }
});
