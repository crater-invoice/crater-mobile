import {StyleSheet} from 'react-native';
import {colors} from '@/styles';
import {defineSize, SCREEN_HEIGHT} from '@/helpers/size';

const styles = StyleSheet.create({
  modalViewContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.veryLightGray,
    paddingBottom: defineSize(5, 5, 5, 25),
    maxHeight: SCREEN_HEIGHT - 50
  },

  body: {
    flex: 1,
    paddingHorizontal: defineSize(20, 20, 20, 22)
  },
  items: {
    paddingVertical: defineSize(5, 5, 5, 10),
    flexDirection: 'row'
  },
  item: {
    paddingBottom: 1,
    paddingRight: 15,
    flexDirection: 'row'
  },
  itemText: {
    paddingVertical: 6,
    marginLeft: 6
  },

  labelView: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  },
  arrowIcon: {
    justifyContent: 'center'
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: -10,
    alignItems: 'center'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hint: {
    paddingLeft: 4
  },
  insertFields: {
    paddingHorizontal: 5,
    paddingBottom: 4
  },
  pencilIconView: {
    justifyContent: 'center',
    paddingRight: 5,
    paddingBottom: 4
  },
  eyeIconView: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 2
  },
  htmlView: theme => ({
    marginTop: 10,
    marginHorizontal: 0,
    minHeight: 152,
    borderWidth: 0.5,
    backgroundColor: theme?.thirdBgColor,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 3,
    ...(theme?.mode === 'light' && {
      borderColor: colors.gray2
    })
  }),
  error: {
    borderColor: colors.danger
  },
  validation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.danger
  },
  disabledInput: theme => ({
    backgroundColor: theme?.input?.disableBackgroundColor,
    opacity: 0.7
  })
});

export default styles;
