import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '@/styles';
import {defineSize, SCREEN_HEIGHT} from '@/constants';

const customStyleSheet = StyleSheet.create({
  closeButton: {
    paddingRight: 20,
    paddingVertical: 15
  },
  logo: (theme, isMedium) => ({
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: theme.divider.secondaryBgColor,
    ...(isMedium && {
      width: 34,
      height: 34,
      borderRadius: 34
    })
  }),
  bottomAction: theme => ({
    borderTopWidth: 1,
    borderTopColor: theme.divider.secondaryBgColor
  })
});

const Styles = {
  Modal: styled(View)`
    background-color: ${props => props.theme.secondaryBgColor};
    position: absolute;
    top: ${defineSize(
      SCREEN_HEIGHT / 7,
      SCREEN_HEIGHT / 7,
      SCREEN_HEIGHT / 8,
      SCREEN_HEIGHT / 8
    )};
    left: 0;
    right: 0;
    margin-horizontal: 23;
    border-radius: 3;
    max-height: ${SCREEN_HEIGHT * 0.8};
  `,

  ...customStyleSheet
};

export default Styles;
