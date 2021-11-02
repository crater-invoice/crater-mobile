import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Label of file picker view.
   */
  label?: string;

  /**
   * The style of the content container(FilePicker).
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * An action to return the base64 file.
   */
  onChangeCallback?: (callback: any) => void;

  /**
   * The style of the content container(View).
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * The style of the content container(Image).
   */
  imageContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, show avatar based view.
   */
  hasAvatar?: boolean;

  /**
   * The style of the content container(Loader).
   */
  loadingContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, show document based view.
   */
  withDocument?: boolean;

  /**
   * An action to return document availability.
   */
  fileLoading?: (callback: any) => void;

  /**
   * The URL of current uploaded document.
   */
  uploadedFileUrl?: string;

  /**
   * The type of current uploaded document.
   */
  uploadedFileType?: string;

  /**
   * If true, save the image in the cache.
   */
  showUploadedImageAsCache?: boolean;

  /**
   * If true, disable press event.
   */
  disabled?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export interface IStates {
  /**
   * The path of currently uploaded image
   */
  image: string;

  /**
   * The loading indicator for the document.
   */
  loading?: boolean;

  /**
   * The type of action for the uploaded files.
   */
  action: string | 'DOCUMENT' | 'GALLERY' | 'CAMERA';

  /**
   * An array of objects with data for each dropdown option.
   */
  options: Array<any>;
}
