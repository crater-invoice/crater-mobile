import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {SCREEN_HEIGHT, defineSize} from '@/helpers/size';
import {definePlatformParam} from '@/helpers/platform';

const customStyleSheet = StyleSheet.create({
  closeButton: {
    paddingRight: 20,
    paddingVertical: 15
  },
  logo: theme => ({
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: theme.divider.secondaryBgColor
  }),
  bottomAction: theme => ({
    borderTopWidth: 1,
    borderTopColor: theme.divider.secondaryBgColor
  }),
  caret: {
    marginTop: definePlatformParam(1.5, 0)
  }
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
