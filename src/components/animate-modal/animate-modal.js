import React from 'react';
import Modal from 'react-native-modal';
import {IProps} from './type.d';

export const AnimateModal = (props: IProps) => {
  const {onToggle, visible, children, modalProps, style} = props;
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={() => onToggle()}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={0}
      onBackButtonPress={() => onToggle()}
      style={[{margin: 0, padding: 0}, style]}
      statusBarTranslucent={true}
      {...modalProps}
    >
      {children}
    </Modal>
  );
};
