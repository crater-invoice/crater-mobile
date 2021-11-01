import React from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {StyleProp, ViewStyle} from 'react-native';

export const AnimateModal = (props: IProps) => {
  const {onToggle, visible, children, modalProps, style} = props;
  return (
    <Modal
      isVisible={visible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
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

interface IProps {
  /**
   * A function to toggle modal visibility.
   */
  onToggle?: () => any;

  /**
   * If true the modal is showing.
   */
  visible?: Boolean;

  /**
   * An additional modal accessibility.
   */
  modalProps?: ModalProps | any;

  /**
   * The style of the content container(Modal).
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;
}
