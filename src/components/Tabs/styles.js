import {StyleSheet} from 'react-native';
import {colors, fonts} from '@/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  tabs: {
    width: '100%',
    height: 38,
    display: 'flex',
    flexDirection: 'row'
  },
  tab: theme => ({
    flex: 1,
    borderBottomWidth: 2,
    borderColor: theme?.tab?.borderColor,
    fontFamily: fonts.semiBold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left'
  }),
  selected_tab: theme => ({
    borderBottomWidth: 2,
    borderBottomColor: theme?.tab?.borderBottomColor
  }),
  selectedTabTitle: theme => ({
    color: theme?.tab?.activeColor
  })
});
