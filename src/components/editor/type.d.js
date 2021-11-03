import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Reference of editor component.
   */
  reference?: any;

  /**
   * An array of objects with data for each field.
   */
  customFields: Array<any>;

  /**
   * An array of objects with data for each type.
   */
  types?: Array<string>;

  /**
   * The name of editor field.
   */
  name?: string;

  /**
   * Label of editor view.
   */
  label?: string;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * The name of the current screen.
   */
  form?: string;

  /**
   * Gets form data.
   */
  formValues: any;

  /**
   * If true, required validation message shows.
   */
  isRequired?: boolean;

  /**
   * If true, show html content preview.
   */
  showPreview?: boolean;

  /**
   * Render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  customRightLabelComponent?: React.ReactNode | any;

  /**
   * Additional props to pass to the BaseSelect.
   */
  fieldInputProps?: any;

  /**
   * Showing placeholder text until date not selecting.
   */
  placeholder?: string;

  /**
   * Styles for the container surrounding the html preview.
   */
  htmlViewStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styling for main container.
   */
  containerStyle: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the title.
   */
  labelStyle: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the html preview label.
   */
  previewLabelStyle: StyleProp<ViewStyle> | any;

  /**
   * Styling for main html preview container.
   */
  previewContainerStyle: StyleProp<ViewStyle> | any;

  /**
   * If true the user will be able to update the description.
   */
  isAllowToEdit: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export interface IStates {
  /**
   * If true the custom item modal is showing.
   */
  visible?: boolean;

  /**
   * If true the html preview is showing.
   */
  preview: boolean;

  /**
   * If true show error message.
   */
  hasError: boolean;
}
