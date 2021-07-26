import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import t from 'locales/use-translation';
import {CtButton} from './Button';
import {BUTTON_COLOR, BUTTON_TYPE, isEmpty, isIPhoneX} from '@/constants';

export const ActionButton = props => {
  const {buttons} = props;
  const [buttonRefs, setButtonRefs] = useState([]);

  if (isEmpty(buttons)) {
    return null;
  }

  const actions = [];

  const onBtnPress = (callBack, label) => {
    if (buttonRefs.length <= 1) {
      callBack?.();
      return;
    }

    buttonRefs.map(ref => {
      if (t(label) !== ref?.props?.btnTitle && ref?.state?.buttonFocus) {
        ref?.toggleFocus?.(false);
      }
    });

    callBack?.();
  };

  buttons.map((button, i) => {
    const {label, onPress, loading, show = true} = button;

    if (!show) {
      return null;
    }

    actions.push(
      <CtButton
        key={i}
        onPress={() => onBtnPress(onPress, label)}
        btnTitle={t(label)}
        containerStyle={styles.buttonContainer}
        buttonContainerStyle={styles.buttonView}
        loading={loading}
        {...(button?.bgColor === 'btn-danger' && {
          buttonColor: BUTTON_COLOR.DANGER
        })}
        {...(button?.type === 'btn-outline' && {
          type: BUTTON_TYPE.OUTLINE
        })}
        reference={ref => setButtonRefs(refs => [...refs, ref])}
      />
    );
  });

  if (isEmpty(actions)) {
    return null;
  }

  if (props?.['hide-container-style']) {
    return <Row>{actions}</Row>;
  }

  return (
    <Container>
      <Row>{actions}</Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 9
  },
  buttonView: {
    flex: 1
  }
});

const Container = styled(View)`
  background-color: ${props => props.theme?.secondaryBgColor};
  border-color: ${props => props.theme?.input?.borderColor};
  padding-vertical: 15;
  padding-horizontal: 10;
  padding-bottom: ${isIPhoneX() ? 35 : 13};
  border-top-width: 1;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
