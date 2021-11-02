import React from 'react';
import {ModalProps} from 'react-native-modal';
import {StyleProp, ViewStyle} from 'react-native';

export interface IProps {
  /**
   * A function to toggle modal visibility.
   */
  onToggle?: () => any;

  /**
   * If true the modal is showing.
   */
  visible?: boolean;

  /**
   * An additional modal accessibility.
   */
  modalProps?: ModalProps | any;

  /**
   * Styling for the modal content container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;
}
